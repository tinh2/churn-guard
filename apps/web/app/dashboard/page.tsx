import Link from "next/link";

// Mock data — in production, fetched from the API + DB
const STATS = {
  mrrAtRisk: 4_820,
  revenueSaved: 11_340,
  customersFlagged: 7,
  customersSaved: 4,
  emailsSentThisMonth: 12,
};

const AT_RISK_CUSTOMERS = [
  {
    id: "cus_001",
    name: "Acme Corp",
    email: "billing@acmecorp.com",
    mrr: 1200,
    riskScore: 91,
    lastActive: "8 days ago",
    status: "cancellation_intent",
  },
  {
    id: "cus_002",
    name: "Bright Ideas LLC",
    email: "admin@brightideas.io",
    mrr: 349,
    riskScore: 78,
    lastActive: "12 days ago",
    status: "usage_drop",
  },
  {
    id: "cus_003",
    name: "Derek Paulson",
    email: "derek@paulson.dev",
    mrr: 99,
    riskScore: 72,
    lastActive: "5 days ago",
    status: "payment_failed",
  },
  {
    id: "cus_004",
    name: "Streamline Co.",
    email: "ops@streamline.co",
    mrr: 2100,
    riskScore: 65,
    lastActive: "3 days ago",
    status: "usage_drop",
  },
  {
    id: "cus_005",
    name: "Nova Analytics",
    email: "team@novaanalytics.com",
    mrr: 799,
    riskScore: 61,
    lastActive: "7 days ago",
    status: "cancellation_intent",
  },
];

const RECENT_EMAILS = [
  {
    id: 1,
    customer: "Riverdale Tools",
    subject: "We miss you — and we want to fix it",
    sent: "2 hours ago",
    opened: true,
    mrr: 450,
  },
  {
    id: 2,
    customer: "Greta Hoffmann",
    subject: "Your payment didn't go through — here's how to fix it fast",
    sent: "Yesterday",
    opened: true,
    mrr: 99,
  },
  {
    id: 3,
    customer: "PulseMetrics",
    subject: "Before you go — one thing we'd like to share",
    sent: "2 days ago",
    opened: false,
    mrr: 1200,
  },
  {
    id: 4,
    customer: "Marco Delgado",
    subject: "You left something valuable behind",
    sent: "3 days ago",
    opened: true,
    mrr: 199,
  },
];

function RiskBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-red-500/10 text-red-400 border-red-500/30"
      : score >= 65
        ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${color}`}
    >
      {score}
    </span>
  );
}

function StatusLabel({ status }: { status: string }) {
  const map: Record<string, string> = {
    cancellation_intent: "Cancel intent",
    usage_drop: "Usage drop",
    payment_failed: "Payment failed",
  };
  return <span className="text-gray-400 text-sm">{map[status] ?? status}</span>;
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Churn<span className="text-brand-500">Guard</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">workspace@example.com</span>
            <button className="rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:border-gray-500 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-gray-400">
            Last synced with Stripe 4 minutes ago
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="MRR at risk this week"
            value={`$${STATS.mrrAtRisk.toLocaleString()}`}
            sub={`${STATS.customersFlagged} customers flagged`}
            accent="red"
          />
          <StatCard
            label="Revenue saved this month"
            value={`$${STATS.revenueSaved.toLocaleString()}`}
            sub={`${STATS.customersSaved} customers retained`}
            accent="green"
          />
          <StatCard
            label="Win-back emails sent"
            value={String(STATS.emailsSentThisMonth)}
            sub="This month"
            accent="blue"
          />
          <StatCard
            label="ROI this month"
            value={`${Math.round((STATS.revenueSaved / 99) * 10) / 10}x`}
            sub={`$99 spent → $${STATS.revenueSaved.toLocaleString()} saved`}
            accent="purple"
          />
        </div>

        {/* At-risk table */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Customers at churn risk
            </h2>
            <span className="text-sm text-gray-500">
              {AT_RISK_CUSTOMERS.length} flagged
            </span>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    MRR
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Risk score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Signal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Last active
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {AT_RISK_CUSTOMERS.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-gray-500 text-xs">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      ${c.mrr.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge score={c.riskScore} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusLabel status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-400">{c.lastActive}</td>
                    <td className="px-6 py-4">
                      <button className="rounded-lg bg-brand-500/10 border border-brand-500/30 px-3 py-1.5 text-xs font-semibold text-brand-400 hover:bg-brand-500/20 transition-colors">
                        Send win-back
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent emails */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Recent win-back emails
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {RECENT_EMAILS.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">
                    {e.customer}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5 truncate">
                    {e.subject}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{e.sent}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm font-semibold text-white">
                    ${e.mrr}/mo
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      e.opened
                        ? "bg-brand-500/10 text-brand-400"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {e.opened ? "Opened" : "Sent"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "red" | "green" | "blue" | "purple";
}) {
  const accentClasses = {
    red: "border-red-500/20 bg-red-500/5",
    green: "border-brand-500/20 bg-brand-500/5",
    blue: "border-blue-500/20 bg-blue-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
  };
  return (
    <div
      className={`rounded-2xl border p-6 ${accentClasses[accent]} bg-gray-900`}
    >
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );
}
