# Payment Optimizer

`/payments` uses `src/data/paymentOptimizer.expanded.v13.json` as its authoritative, reviewed baseline. At request time, a published Sanity `paymentOptimizer` document with key `default` may supply a v13-or-newer JSON override. The override is accepted only after runtime normalization verifies the schema, all 19 card references, and the full merchant catalog; missing, older, or malformed remote data falls back to the checked-in file.

## Editing workflow

1. Edit and review the expanded v13 JSON outside the UI.
2. Replace `src/data/paymentOptimizer.expanded.v13.json` with the reviewed result.
3. Run `npm run validate:payments`, `npx tsc --noEmit`, and `npm run build`.
4. Optionally upload the same validated file to Sanity and update `lastUpdated`. Sanity is an override, not the only copy.
5. Test Stores, Cards, and Settings on desktop and mobile. Confirm search aliases, details, local preference persistence, and recommendation changes.

The normalizer deliberately sends only recommendation fields, card facts, sources, coverage, and preference defaults to the client. Profile data, old recommendation history, archived methods, tasks, and unnecessary account identifiers are not exposed. Settings are stored in browser local storage and JSON export contains preferences only.

Reward percentages are comparisons, not guarantees. JAL results use the user’s yen-per-mile valuation. JCB 20x is modeled as about 10% point value and remains conditional until OS eligibility and merchant registration are confirmed. Unknown activations, caps, and pending bank or utility conditions are not assumed.
