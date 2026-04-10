import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });

export interface CustomerData {
  customerId: string;
  mrr: number;
  subscriptionAge: number; // days
  paymentFailed: boolean;
  cancelledAt: string | null;
  usageDropped: boolean;
  lastActiveAt?: string;
  planName?: string;
}

export interface CustomerAnalysis {
  riskScore: number;
  reason: string;
  emailSubjectLine: string;
  emailBody: string;
}

export async function analyzeCustomer(
  data: CustomerData,
): Promise<CustomerAnalysis> {
  const prompt = `You are a churn prevention specialist for a SaaS business. Analyze this customer's data and return a JSON object.

Customer data:
- Customer ID: ${data.customerId}
- Monthly Recurring Revenue: $${data.mrr}
- Subscription age: ${data.subscriptionAge} days
- Payment failed recently: ${data.paymentFailed}
- Subscription cancelled: ${data.cancelledAt ? `yes, at ${data.cancelledAt}` : "no"}
- Usage dropped significantly: ${data.usageDropped}
- Last active: ${data.lastActiveAt ?? "unknown"}
- Plan: ${data.planName ?? "unknown"}

Return ONLY valid JSON (no markdown, no explanation) with this exact shape:
{
  "riskScore": <number 0-100, where 100 = certain churn>,
  "reason": "<1-2 sentence plain-English explanation of the risk>",
  "emailSubjectLine": "<compelling win-back subject line, under 60 chars>",
  "emailBody": "<personalized win-back email body, 3-4 short paragraphs, warm and direct, focus on value not desperation>"
}`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected Claude response type");
  }

  const analysis = JSON.parse(content.text) as CustomerAnalysis;
  return analysis;
}
