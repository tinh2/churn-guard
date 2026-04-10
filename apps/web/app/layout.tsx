import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChurnGuard — Stop Losing Customers in Your Sleep",
  description:
    "ChurnGuard connects to your Stripe account and automatically identifies at-risk customers, then sends AI-personalized win-back emails before they're gone. Avg customer saves 23% of at-risk MRR in month 1.",
  openGraph: {
    title: "ChurnGuard — Stop Losing Customers in Your Sleep",
    description:
      "AI-powered churn prevention for SaaS. Connect Stripe, let Claude identify at-risk customers, recover revenue automatically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
