Environment (the actual blocker):

Neither Node.js, npm, nor Git existed on this machine. Git installed cleanly via winget. Node's MSI needed an admin UAC prompt I can't click through non-interactively, so I installed a portable Node 22 LTS build under %LOCALAPPDATA%\Programs\node-portable and added it to your user PATH — a fresh terminal (or VS Code reload) will just see node/npm from now on.
Project lives locally at C:\Users\gjo77\Projects\faultflow (not the network share) — avoids the UNC-path flakiness with Next.js file watching.
App — matches your "start tonight" 5 items:

Git repo initialised, remote set to github.com/geosaurus98/FaultFlow.git
Next.js 16 + TypeScript + Tailwind (App Router), scaffolded and building clean
FaultAnalysis type + Zod schema in lib/validation/faultAnalysis.ts (single source of truth — type is inferred from the schema, not hand-duplicated)
/new with equipment + description form, 10-char validation, loading state
Fake analysis in lib/ai/fakeAnalysis.ts — same signature the real Claude call will have later, and even the fake output goes through FaultAnalysisSchema.parse() — plus the result view with Edit/Approve
Verified: tsc --noEmit clean, npm run build clean, dev server serves the homepage correctly. Two commits made locally (Initialise Next.js application, Add FaultAnalysis schema and fault report submission flow with fake AI response).