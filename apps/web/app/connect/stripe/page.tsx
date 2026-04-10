import Link from "next/link";

const PERMISSIONS = [
  "Read customer and subscription data",
  "Receive webhook events (cancellations, payment failures)",
  "View invoice and payment history",
  "Read plan and pricing information",
];

export default function ConnectStripePage() {
  // In production: generate Stripe Connect OAuth URL with state param
  const stripeOAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
    process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID ?? "ca_placeholder"
  }&scope=read_only&redirect_uri=${encodeURIComponent(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  )}/connect/stripe/callback`;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Churn<span className="text-brand-500">Guard</span>
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
            {/* Stripe logo placeholder */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#635bff]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-white fill-current"
                >
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-lg">Connect Stripe</p>
                <p className="text-sm text-gray-400">
                  Read-only access · No charges
                </p>
              </div>
            </div>

            <h1 className="mb-2 text-2xl font-bold text-white">
              Link your Stripe account
            </h1>
            <p className="mb-6 text-gray-400 leading-relaxed">
              ChurnGuard uses read-only Stripe access to monitor your
              subscriptions and flag at-risk customers. We never charge or
              modify your data.
            </p>

            {/* Permissions list */}
            <div className="mb-8 rounded-xl border border-gray-700 bg-gray-800/50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                ChurnGuard will be able to
              </p>
              <ul className="space-y-2.5">
                {PERMISSIONS.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2.5 text-sm text-gray-300"
                  >
                    <span className="text-brand-500 font-bold">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a
              href={stripeOAuthUrl}
              className="block w-full rounded-xl bg-[#635bff] px-6 py-4 text-center text-base font-bold text-white hover:bg-[#5147e5] transition-colors"
            >
              Connect with Stripe
            </a>

            <p className="mt-4 text-center text-xs text-gray-500">
              You&apos;ll be redirected to Stripe to authorize access. This
              takes about 30 seconds.
            </p>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
            <span>256-bit encryption</span>
            <span>·</span>
            <span>Read-only OAuth</span>
            <span>·</span>
            <span>Revoke anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
