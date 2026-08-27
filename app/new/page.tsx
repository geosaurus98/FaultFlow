"use client";

import { useState } from "react";
import { FaultForm } from "@/components/FaultForm";
import { FaultAnalysisResult } from "@/components/FaultAnalysisResult";
import { analyseFaultFake } from "@/lib/ai/fakeAnalysis";
import { FaultAnalysis } from "@/lib/validation/faultAnalysis";
import { FaultReportInput } from "@/types/fault";

type ViewState =
  | { step: "form" }
  | { step: "loading" }
  | { step: "result"; analysis: FaultAnalysis; status: "new" | "approved" }
  | { step: "error"; message: string };

export default function NewFaultReportPage() {
  const [state, setState] = useState<ViewState>({ step: "form" });

  async function handleSubmit(input: FaultReportInput) {
    setState({ step: "loading" });

    try {
      // Swapped for a real model call once lib/ai/analyseFault.ts exists —
      // the rest of this page doesn't change.
      const analysis = await analyseFaultFake(input);
      setState({ step: "result", analysis, status: "new" });
    } catch {
      setState({
        step: "error",
        message: "The AI service is temporarily unavailable. The report has not been submitted.",
      });
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          New Fault Report
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Describe the fault in plain language. FaultFlow will structure it for review.
        </p>
      </div>

      {state.step === "form" && <FaultForm onSubmit={handleSubmit} />}

      {state.step === "loading" && (
        <div className="flex flex-col gap-6">
          <FaultForm onSubmit={handleSubmit} disabled />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Analysing fault report&hellip;
          </p>
        </div>
      )}

      {state.step === "error" && (
        <div className="flex flex-col gap-4">
          <FaultForm onSubmit={handleSubmit} />
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {state.message}
          </p>
        </div>
      )}

      {state.step === "result" && (
        <FaultAnalysisResult
          analysis={state.analysis}
          status={state.status}
          onEdit={() => setState({ step: "form" })}
          onApprove={() =>
            setState({ step: "result", analysis: state.analysis, status: "approved" })
          }
        />
      )}
    </main>
  );
}
