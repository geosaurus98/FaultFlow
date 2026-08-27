import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        FaultFlow
      </h1>
      <p className="text-lg text-zinc-500 dark:text-zinc-400">
        AI-assisted maintenance triage
      </p>
      <Link
        href="/new"
        className="mt-4 rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        New Fault Report
      </Link>
    </main>
  );
}
