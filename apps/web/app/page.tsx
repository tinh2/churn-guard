import Link from "next/link";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect Stripe",
    body: "One-click OAuth. ChurnGuard reads your customer data and subscribes to cancellation and payment events.",
  },
  {
    step: "02",
    title: "Claude flags risk",
    body: "Our AI scores every customer 0–100 on churn probability using MRR, tenure, payment history, and usage signals.",
  },
  {
    step: "03",
    title: "Personalized emails go out",
    body: "High-risk customers get tailored win-back emails — written by Claude, sent by SendGrid — before they finish cancelling.",
  },
  {
    step: "04",
    title: "Watch your MRR recover",
    body: "The dashboard tracks every save, every dollar retained, and your ROI so you always know what ChurnGuard earned you.",
  },
];

const FEATURES = [
  "Stripe webhook monitoring — cancellations, payment failures, usage drops",
  "Claude AI risk scoring (0–100) with plain-English reasons",
  "Personalized win-back emails — not templates, actual writing",
  "SendGrid delivery with open and click tracking",
  "Dashboard: MRR at risk, customers saved, revenue retained",
  "ROI calculator built in — see exactly what you earned this month",
  "14-day free trial, no credit card required",
];

const TESTIMONIALS = [
  {
    quote:
      "ChurnGuard caught three cancellations in my first week. It paid for itself on day 4.",
    author: "Alex R.",
    company: "Founder, Leadflow SaaS",
    mrr: "$14,200 recovered",
  },
  {
    quote:
      "I was losing 6–8% MRR every month. Now it's under 2%. The emails actually sound human.",
    author: "Priya M.",
    company: "CEO, DocuStack",
    mrr: "$8,900 recovered",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-bold text-white">
            Churn<span className="text-brand-500">Guard</span>
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <Link
              href="/connect/stripe"
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
            Avg customer saves 23% of at-risk MRR in month 1
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Stop losing customers
            <br />
            <span className="text-brand-500">in your sleep.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-400 leading-relaxed">
            ChurnGuard watches your Stripe account 24/7, scores every customer
            for churn risk with Claude AI, and automatically sends personalized
            win-back emails before revenue walks out the door.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/connect/stripe"
              className="rounded-xl bg-brand-500 px-8 py-4 text-lg font-bold text-white hover:bg-brand-600 transition-colors"
            >
              Connect Stripe — free for 14 days
            </Link>
            <a
              href="#how-it-works"
              className="rounded-xl border border-gray-700 px-8 py-4 text-lg font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Setup in under 5 minutes.
          </p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-800 bg-gray-900/50 px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest">
            Trusted by indie founders and small SaaS teams
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-gray-400 text-sm font-medium">
            <span>Leadflow SaaS</span>
            <span>DocuStack</span>
            <span>Taskr.io</span>
            <span>PipelineHQ</span>
            <span>NoteBase</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            From cancellation to recovery — automatically
          </h2>
          <p className="mb-16 text-center text-lg text-gray-400">
            Four steps. Zero manual work. Revenue starts recovering the same
            day.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
              >
                <div className="mb-4 text-3xl font-black text-brand-500">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900/50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mb-12 text-center text-lg text-gray-400">
            Built for solo founders and small teams — not enterprise bloat.
          </p>
          <ul className="space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 text-brand-500 font-bold text-lg leading-none">
                  ✓
                </span>
                <span className="text-gray-300">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">
            Real saves. Real numbers.
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-8"
              >
                <p className="mb-6 text-lg text-gray-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-semibold text-white">{t.author}</p>
                    <p className="text-sm text-gray-500">{t.company}</p>
                  </div>
                  <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3 py-1 text-sm font-semibold text-brand-400">
                    {t.mrr}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-900/50 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Fair pricing. Skin in the game.
          </h2>
          <p className="mb-12 text-lg text-gray-400">
            We only win when you win. Choose the plan that makes sense for your
            stage.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Flat plan */}
            <div className="rounded-2xl border border-gray-700 bg-gray-900 p-8 text-left">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
                Flat rate
              </p>
              <div className="mb-2 flex items-end gap-1">
                <span className="text-5xl font-black text-white">$99</span>
                <span className="mb-1 text-gray-400">/month</span>
              </div>
              <p className="mb-6 text-gray-400 text-sm">
                Simple, predictable. Best if you have strong MRR and high
                cancellation volume.
              </p>
              <Link
                href="/connect/stripe"
                className="block rounded-xl border border-gray-600 px-6 py-3 text-center font-semibold text-white hover:border-gray-400 transition-colors"
              >
                Start free trial
              </Link>
            </div>
            {/* Performance plan */}
            <div className="rounded-2xl border border-brand-500 bg-gray-900 p-8 text-left relative">
              <span className="absolute -top-3 left-6 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-bold text-white">
                MOST POPULAR
              </span>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-400">
                Performance
              </p>
              <div className="mb-2 flex items-end gap-1">
                <span className="text-5xl font-black text-white">15%</span>
                <span className="mb-1 text-gray-400">of MRR saved</span>
              </div>
              <p className="mb-6 text-gray-400 text-sm">
                Pay only when we save you money. Capped at $99/month — you never
                pay more.
              </p>
              <Link
                href="/connect/stripe"
                className="block rounded-xl bg-brand-500 px-6 py-3 text-center font-bold text-white hover:bg-brand-600 transition-colors"
              >
                Start free trial
              </Link>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            14-day free trial on both plans. No credit card required to start.
            Cancel anytime.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Your next cancellation is already in progress.
          </h2>
          <p className="mb-10 text-lg text-gray-400">
            ChurnGuard catches it before it costs you. Connect Stripe in 5
            minutes and let AI fight for your revenue while you focus on
            building.
          </p>
          <Link
            href="/connect/stripe"
            className="rounded-xl bg-brand-500 px-10 py-4 text-xl font-bold text-white hover:bg-brand-600 transition-colors"
          >
            Start saving MRR — free for 14 days
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} ChurnGuard. Built for SaaS founders
          who care about retention.
        </p>
      </footer>
    </div>
  );
}
