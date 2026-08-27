import { z } from "zod";

/**
 * The single source of truth for what a fault analysis looks like.
 *
 * The LLM never gets to decide this shape — we decide it here, then force
 * every model response through this schema before it's allowed anywhere
 * near the database or the UI.
 */
export const FaultAnalysisSchema = z.object({
  equipment: z.string().min(1),

  category: z.enum([
    "electrical",
    "mechanical",
    "controls",
    "pneumatic",
    "hydraulic",
    "unknown",
  ]),

  urgency: z.enum(["low", "medium", "high", "critical"]),

  summary: z.string().min(1),

  safetyConcerns: z.array(z.string()),

  missingInformation: z.array(z.string()),

  recommendedActions: z.array(z.string()),

  workOrderDescription: z.string().min(1),

  confidence: z.number().min(0).max(1),
});

export type FaultAnalysis = z.infer<typeof FaultAnalysisSchema>;

export type FaultCategory = FaultAnalysis["category"];
export type FaultUrgency = FaultAnalysis["urgency"];

/**
 * Definitions for each urgency level. Used in the UI, the system prompt,
 * and as the ground-truth reference when writing benchmark cases later.
 */
export const URGENCY_DEFINITIONS: Record<FaultUrgency, string> = {
  low: "Minor issue that does not significantly affect operation.",
  medium: "Degraded performance, but operation may continue.",
  high: "Production stopped, or there is a risk of equipment damage.",
  critical: "Possible immediate safety risk.",
};

export const CATEGORY_LABELS: Record<FaultCategory, string> = {
  electrical: "Electrical",
  mechanical: "Mechanical",
  controls: "Controls",
  pneumatic: "Pneumatic",
  hydraulic: "Hydraulic",
  unknown: "Unknown",
};
