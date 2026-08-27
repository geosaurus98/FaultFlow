import { FaultAnalysis, FaultAnalysisSchema } from "@/lib/validation/faultAnalysis";
import { FaultReportInput } from "@/types/fault";

/**
 * Stand-in for the real LLM call (see docs/development-notes.md).
 *
 * Deliberately has the same signature and return type that
 * `analyseFault()` in lib/ai/analyseFault.ts will have once a real model
 * is wired up — the rest of the app doesn't need to know which one it's
 * talking to.
 */
export async function analyseFaultFake(
  input: FaultReportInput,
): Promise<FaultAnalysis> {
  // Simulate network latency so the loading state is worth building.
  await new Promise((resolve) => setTimeout(resolve, 900));

  const result: FaultAnalysis = {
    equipment: input.equipment || "Unknown equipment",
    category: "electrical",
    urgency: "high",
    summary:
      "The equipment appears to be overheating and repeatedly tripping its overload protection. This is a placeholder analysis — no AI model has been called yet.",
    safetyConcerns: [
      "Possible motor overheating",
      "Repeated overload operation",
    ],
    missingInformation: [
      "Motor current",
      "Motor temperature",
      "Load condition",
      "Supply voltage",
    ],
    recommendedActions: [
      "Stop repeated restart attempts",
      "Check motor current against nameplate rating",
      "Inspect for mechanical binding",
      "Check overload relay setting",
    ],
    workOrderDescription: `Investigate ${input.equipment || "equipment"} for overheating and repeated overload trips.`,
    confidence: 0.88,
  };

  // Even fake data goes through the schema, so the UI is built against
  // exactly what the real model output will look like.
  return FaultAnalysisSchema.parse(result);
}
