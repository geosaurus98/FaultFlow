export type {
  FaultAnalysis,
  FaultCategory,
  FaultUrgency,
} from "@/lib/validation/faultAnalysis";

/** What a technician submits before any AI is involved. */
export interface FaultReportInput {
  equipment: string;
  description: string;
}
