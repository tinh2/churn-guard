import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export interface WinbackEmailOptions {
  to: string;
  subject: string;
  body: string;
  template?: string;
}

export async function sendWinbackEmail(
  options: WinbackEmailOptions,
): Promise<void> {
  const fromEmail = process.env.FROM_EMAIL ?? "hello@churnguard.io";
  const fromName = process.env.FROM_NAME ?? "ChurnGuard";

  const msg = {
    to: options.to,
    from: { email: fromEmail, name: fromName },
    subject: options.subject,
    text: options.body,
    html: bodyToHtml(options.body),
    categories: ["churn-prevention", options.template ?? "winback"],
    customArgs: {
      template_type: options.template ?? "winback",
    },
  };

  await sgMail.send(msg);
  console.log(`Win-back email sent to ${options.to} [${options.template}]`);
}

function bodyToHtml(text: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 40px; }
    p { line-height: 1.6; color: #374151; margin: 0 0 16px; }
    .footer { font-size: 12px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="wrapper">
    ${text
      .split("\n\n")
      .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
      .join("")}
    <div class="footer">
      You received this because you recently cancelled or had a payment issue with your subscription.
      <br/><a href="{{unsubscribe}}">Unsubscribe</a>
    </div>
  </div>
</body>
</html>`;
}
