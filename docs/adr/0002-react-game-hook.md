Title: Create reusable `useGame` hook for game logic
Status: Accepted
Date: 2025-12-05
Decision Makers: Frontend team / repository maintainer

Context:
- The memory game logic (card state, flipping, matching, reset, shuffle) currently lives in `src/App.tsx`.
- Logic mutates card objects in-place and mixes UI composition with behavior.
- We want testable, reusable, and predictable state management.

Decision:
- Extract game state and behavior into a custom hook: `src/hooks/useGame.ts`.
- Add a small deterministic initializer util `src/utils/createShuffledCards.ts` (or `shuffle.ts`) that returns the initial card array.
- Implement the hook using `useReducer` and pure action handlers, and expose:
  - `state.cards: CardState[]`
  - `state.clickCount: number`
  - `actions.toggleCard(index: number)`
  - `actions.resetGame()`
- Keep UI components (including `App.tsx`) responsible only for composition and rendering.
- Optionally provide `src/context/GameProvider.tsx` that uses the hook and exposes it via React Context if multiple deep components need access.

Rationale:
- Separation of concerns improves maintainability and discoverability.
- `useReducer` + pure actions remove in-place mutation bugs and make the logic unit-testable.
- A small `createShuffledCards` util centralizes initialization and makes testing deterministic.
- Hook is reusable across different UIs or for a future `GameProvider`.

Alternatives considered:
- Keep logic in `App.tsx` (simple, but unscalable).
- Use global store (Redux) — overkill for this small app.
- Expose imperative helpers only — loses React state benefits.

Consequences:
- Files to add: `src/hooks/useGame.ts`, `src/utils/createShuffledCards.ts` (or `shuffle.ts`). Optionally `src/context/GameProvider.tsx`.
- Update `src/App.tsx` to use the hook and prefer `key={item.id}` (not index).
- Add unit tests for reducer and initializer.
- Slight refactor work and import path updates.

Migration plan:
1. Add `createShuffledCards` util.
2. Add `useGame` hook implementing the reducer and actions.
3. Update `App.tsx` to consume the hook and remove in-file game logic.
4. Run the project build and tests, then tidy up any remaining mutations.