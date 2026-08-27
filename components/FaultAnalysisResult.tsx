import { FaultAnalysis, FaultUrgency, CATEGORY_LABELS } from "@/lib/validation/faultAnalysis";

const URGENCY_STYLES: Record<FaultUrgency, string> = {
  low: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  critical: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

interface FaultAnalysisResultProps {
  analysis: FaultAnalysis;
  status: "new" | "approved";
  onApprove: () => void;
  onEdit: () => void;
}

export function FaultAnalysisResult({
  analysis,
  status,
  onApprove,
  onEdit,
}: FaultAnalysisResultProps) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {analysis.equipment}
          </p>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Fault Analysis
          </h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${URGENCY_STYLES[analysis.urgency]}`}
        >
          {analysis.urgency}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100">
            {CATEGORY_LABELS[analysis.category]}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Confidence</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100">
            {Math.round(analysis.confidence * 100)}%
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
            {status}
          </dd>
        </div>
      </div>

      <Section title="Summary">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{analysis.summary}</p>
      </Section>

      <Section title="Safety concerns">
        <BulletList items={analysis.safetyConcerns} empty="None identified." />
      </Section>

      <Section title="Missing information">
        <BulletList items={analysis.missingInformation} empty="None identified." />
      </Section>

      <Section title="Recommended next steps">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {analysis.recommendedActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </Section>

      <Section title="Suggested work order">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          {analysis.workOrderDescription}
        </p>
      </Section>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        AI-generated recommendation. Technician review required.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={status === "approved"}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {status === "approved" ? "Approved" : "Approve Work Order"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">{empty}</p>;
  }

  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
