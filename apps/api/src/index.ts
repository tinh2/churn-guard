import express from "express";
import { stripeWebhookRouter } from "./routes/stripeWebhook";
import { analyzeRouter } from "./routes/analyze";
import { emailRouter } from "./routes/email";

const app = express();
const PORT = process.env.PORT ?? 3001;

// Raw body needed for Stripe webhook signature verification
app.use("/webhooks/stripe", express.raw({ type: "application/json" }));

// JSON body for all other routes
app.use(express.json());

app.use("/webhooks/stripe", stripeWebhookRouter);
app.use("/analyze", analyzeRouter);
app.use("/email", emailRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "churn-guard-api" });
});

app.listen(PORT, () => {
  console.log(`ChurnGuard API listening on port ${PORT}`);
});

export default app;
