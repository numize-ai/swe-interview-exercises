# SWE interview exercises

Two short code-review and refactoring exercises, ~20 minutes each.

Nothing here is a trick and nothing is hidden: both exercises are plain files you read and improve
out loud. Use your IDE and your AI assistant exactly as you would on a normal working day — we do.

## Setup

```bash
pnpm install   # npm install works too
pnpm check     # lint + typecheck + test
```

`pnpm check` is green on a fresh clone. If it is red before you have touched anything, tell us —
that is our bug, not yours.

## Exercise 1 — TypeScript & software craftsmanship

**File: `src/typescript/executeQuery.ts`**

> Imagine you own this code in production. Review it and improve it as much as you think is
> appropriate. Explain your decisions as you go.

Not under review, but yours to change if your design needs it:

- `src/typescript/database.ts` — an in-memory stand-in for the real database layer.
- `src/typescript/executeQuery.test.ts` — one smoke test, so `pnpm test` has something to run.

## Exercise 2 — React

**File: `src/react/Dashboard.tsx`**

> Review this component. What problems do you see, and how would you improve it?

There is no server behind it: `/api/dashboards/:id` does not exist, and the component is here to be
read and reasoned about rather than run. `Chart.tsx`, `Spinner.tsx` and `types.ts` are support code.
