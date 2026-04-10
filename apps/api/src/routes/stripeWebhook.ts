import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { analyzeCustomer } from "../services/claude";
import { sendWinbackEmail } from "../services/sendgrid";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      sig as string,
      webhookSecret,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  console.log(`Processing Stripe event: ${event.type}`);

  switch (event.type) {
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancelled(subscription);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentFailed(invoice);
      break;
    }

    case "customer.updated": {
      const customer = event.data.object as Stripe.Customer;
      await handleCustomerUpdated(customer);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

async function handleSubscriptionCancelled(
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const mrr = (subscription.items.data[0]?.plan?.amount ?? 0) / 100;

  const analysis = await analyzeCustomer({
    customerId,
    mrr,
    subscriptionAge: Math.floor(
      (Date.now() - subscription.created * 1000) / (1000 * 60 * 60 * 24),
    ),
    paymentFailed: false,
    cancelledAt: new Date().toISOString(),
    usageDropped: false,
  });

  if (analysis.riskScore >= 60) {
    await sendWinbackEmail({
      to: customerId, // resolved to email in production via Stripe API
      subject: analysis.emailSubjectLine,
      body: analysis.emailBody,
      template: mrr >= 500 ? "cancel-high-mrr" : "cancel-low-mrr",
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : (invoice.customer?.id ?? "");

  const mrr = (invoice.amount_due ?? 0) / 100;

  const analysis = await analyzeCustomer({
    customerId,
    mrr,
    subscriptionAge: 0,
    paymentFailed: true,
    cancelledAt: null,
    usageDropped: false,
  });

  await sendWinbackEmail({
    to: customerId,
    subject: analysis.emailSubjectLine,
    body: analysis.emailBody,
    template: "payment-failure",
  });
}

async function handleCustomerUpdated(customer: Stripe.Customer): Promise<void> {
  // Re-score churn risk on any customer update
  console.log(`Re-scoring churn risk for customer: ${customer.id}`);
  // In production: fetch subscriptions, compute usage delta, update risk score in DB
}

export { router as stripeWebhookRouter };
