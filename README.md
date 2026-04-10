# ChurnGuard

AI-powered churn prevention for small SaaS companies. Connect your Stripe account — ChurnGuard watches for cancellations and usage drops, scores customers with Claude AI, and automatically sends personalized win-back emails via SendGrid.

**Pricing:** $99/month flat OR 15% of MRR saved (whichever is lower) · 14-day free trial

---

## Project structure

```
churn-guard/
├── apps/
│   ├── web/          # Next.js 14 — landing page, dashboard, Stripe connect
│   └── api/          # Express + TypeScript — webhooks, Claude analysis, email
└── templates/        # Win-back email HTML templates
```

---

## Prerequisites

- Node.js 20+
- Stripe account (for webhook events)
- Anthropic API key (Claude)
- SendGrid account and verified sender domain

---

## Environment variables

### `apps/api/.env`

```
PORT=3001

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# SendGrid
SENDGRID_API_KEY=SG....
FROM_EMAIL=hello@yourdomain.com
FROM_NAME=YourProduct
```

### `apps/web/.env.local`

```
NEXT_PUBLIC_STRIPE_CLIENT_ID=ca_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## Local development

### 1. Install dependencies

```bash
cd apps/api && npm install
cd ../web && npm install
```

### 2. Start the API

```bash
cd apps/api
npm run dev
# API runs on http://localhost:3001
```

### 3. Start the web app

```bash
cd apps/web
npm run dev
# Web runs on http://localhost:3000
```

### 4. Forward Stripe webhooks locally

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli), then:

```bash
stripe listen --forward-to localhost:3001/webhooks/stripe
```

Copy the webhook signing secret it outputs and set it as `STRIPE_WEBHOOK_SECRET`.

---

## Stripe webhook events handled

| Event                           | Action                                            |
| ------------------------------- | ------------------------------------------------- |
| `customer.subscription.deleted` | Claude scores risk → win-back email if score ≥ 60 |
| `invoice.payment_failed`        | Payment recovery email via SendGrid               |
| `customer.updated`              | Re-score churn risk in background                 |

---

## API endpoints

### `POST /webhooks/stripe`

Receives Stripe events. Requires valid `stripe-signature` header.

### `POST /analyze/customer`

Calls Claude to score a customer's churn risk.

**Request body:**

```json
{
  "customerId": "cus_xxx",
  "mrr": 299,
  "subscriptionAge": 180,
  "paymentFailed": false,
  "cancelledAt": null,
  "usageDropped": true,
  "lastActiveAt": "2026-03-20T10:00:00Z",
  "planName": "Pro"
}
```

**Response:**

```json
{
  "riskScore": 74,
  "reason": "Customer shows significant usage drop over 3 weeks with no login in 12 days on a plan active for 6 months.",
  "emailSubjectLine": "Still getting value from [Product]? Here's what's new.",
  "emailBody": "..."
}
```

### `POST /email/winback`

Sends a win-back email via SendGrid.

**Request body:**

```json
{
  "to": "customer@example.com",
  "subject": "We miss you",
  "body": "...",
  "template": "cancel-high-mrr"
}
```

---

## Email templates

Located in `templates/`:

| File                         | When it's used                     |
| ---------------------------- | ---------------------------------- |
| `payment-failure.html`       | `invoice.payment_failed` webhook   |
| `cancel-high-mrr.html`       | Cancellation, MRR ≥ $500           |
| `cancel-low-mrr.html`        | Cancellation, MRR < $500           |
| `inactive-reactivation.html` | No login in 14+ days, still paying |

All templates use `{{handlebars_style}}` placeholder variables for personalization.

---

## Deployment

### API

Deploy to any Node.js host (Railway, Fly.io, Render). Set all env vars listed above.

### Web

Deploy to Vercel: `vercel --prod` from `apps/web/`.

### Stripe webhooks (production)

Register your production webhook URL in the Stripe dashboard:
`https://api.yourdomain.com/webhooks/stripe`

Events to subscribe to:

- `customer.subscription.deleted`
- `invoice.payment_failed`
- `customer.updated`
