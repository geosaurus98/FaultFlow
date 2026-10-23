# FaultFlow

**AI-assisted maintenance triage.** A technician describes an equipment fault in plain language, and FaultFlow turns it into a structured report for review: fault category, urgency, safety concerns, missing information, recommended actions and a draft work order.

> **Status: early prototype.** The report flow and validation are built, but the analysis currently comes from a placeholder (`lib/ai/fakeAnalysis.ts`). No AI model is called yet.

## How it works

1. **Submit** — the technician enters the equipment and a description of the fault on `/new`.
2. **Analyse** — the report is sent to an analysis function. Today that is a stand-in with the same signature the real model call will have, so the page will not change when a model is connected.
3. **Validate** — every response is parsed with the Zod schema in `lib/validation/faultAnalysis.ts` before it reaches the UI. The model never decides the shape of the data.
4. **Review** — the technician can edit the result and approve it.

Urgency levels (low, medium, high, critical) have written definitions in the schema file. These are shared by the UI, the future system prompt and the benchmark cases.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Zod for schema validation (the TypeScript types are inferred from the schema)

## Running locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and choose **New Fault Report**.

## Project structure

```text
app/
  page.tsx                  # Landing page
  new/page.tsx              # Fault report form and result view
components/
  FaultForm.tsx             # Equipment + description form with validation
  FaultAnalysisResult.tsx   # Structured result with edit / approve
lib/
  ai/fakeAnalysis.ts        # Placeholder analysis (to be replaced by a model call)
  validation/faultAnalysis.ts  # Zod schema: single source of truth for a fault analysis
types/
  fault.ts                  # Input types
```

## Next steps

- Connect a real language model behind the existing analysis interface
- Store approved reports
- Build benchmark cases to check category and urgency accuracy
