Title: React component structure
Status: Accepted
Date: 2025-12-05
Decision Makers: Frontend team / repository maintainer
Context:
- The project is a small React + Vite + TypeScript app located under `my-react-app/`.
- Current UI pieces are in `src/components` and include files like `Card.tsx`, `CardGrid.tsx`, `Header.tsx`, `Counter.tsx`, `ResetButton.tsx` alongside their CSS files.
- We want a scalable, easy-to-navigate component organization that supports growth, testing, and maintainability while keeping file discovery simple for contributors.

Decision:
- Use a component-per-folder structure with co-located assets:
  - Each component lives in `src/components/<ComponentName>/` (PascalCase for component folder names).
  - Inside each folder, co-locate:
    - `<ComponentName>.tsx` — component implementation (functional component + hooks).
    - `<ComponentName>.css` (or `.module.css` if scoping desired) — component styles.
    - `index.ts` — re-exports the component: `export { default } from './<ComponentName>';`
    - `<ComponentName>.test.tsx` (when tests exist).
    - `types.ts` (only if component-specific types are needed).
- Keep `src/components` for shared, reusable UI primitives and small composed components.
- For larger, feature-specific UIs, prefer a `src/features/<featureName>/` structure that contains pages and composed components relevant only to that feature.
- Prefer small, single-responsibility presentational components where possible. For stateful logic, use hooks:
  - Co-locate `useXxx` hooks either next to the component if local, or under `src/hooks/` if reusable across multiple components.
- Provide a top-level barrel `src/components/index.ts` that re-exports commonly used components (keep it manually curated to avoid large monolithic barrels).
- Use composition over inheritance, and prefer props + children for customization. Keep components small and focused (one concern per component).
- Use TypeScript for props and explicit exported component types.

Rationale:
- Co-location (component + styles + tests) improves discoverability and reduces friction when editing a component.
- A folder-per-component avoids naming collisions and makes it simpler to add assets and tests incrementally.
- Barrel exports simplify imports for consumers while keeping individual component imports possible for tree-shaking and clarity.
- Separating shared UI primitives from feature-specific components keeps the repo modular and reduces coupling.
- Using hooks for logic encourages reuse and readably separates UI from behavior.

Alternatives considered:
1. Flat file structure (`src/components/Header.tsx`, `Header.css`): simple for tiny projects, but scales poorly as a component gains tests/assets and becomes harder to discover.
2. Atomic design folders (Atoms/Molecules/Organisms): can be helpful but introduces subjective classification and frequent reorganization; chosen approach favors pragmatic simplicity with feature separation.
3. Monolithic barrels (auto-export everything): convenient but can hide tree-shaking and increase bundle size; prefer curated barrels.

Consequences:
- Migration work required for existing components (move into their folders and add `index.ts`).
- Slight increase in number of directories; beneficial for long-term maintenance.
- Tests and styles placed beside components will be simpler to maintain.
- Developers need to follow the naming conventions and export pattern.

Migration Plan (small repo / incremental):
- For each component in `src/components`:
  1. Create `src/components/<ComponentName>/`.
  2. Move `<ComponentName>.tsx` and `<ComponentName>.css` into that folder.
  3. Add `index.ts` with `export { default } from './<ComponentName>';`
  4. Run TypeScript build + tests to verify no import breakages.
- Where imports reference moved files, update import paths (or rely on barrel exports if preferred).
- For larger features, create `src/features/<featureName>/` and move feature-specific components there.
- Add the ADR file to `docs/adr/0001-react-component-structure.md`.

Examples (applies to current repo):
- `src/components/Card/`
  - `Card.tsx`
  - `Card.css`
  - `index.ts` -> `export { default } from './Card';`
  - `Card.test.tsx` (optional)
- `src/components/Header/`
  - `Header.tsx`, `Header.css`, `index.ts`
- Top-level barrel:
  - `src/components/index.ts`
    - `export { default as Card } from './Card';`
    - `export { default as Header } from './Header';`

Notes & Implementation Guidelines:
- Use PascalCase for component filenames and folder names.
- Prefer `.module.css` if local scope is desired; otherwise use plain `.css`.
- Keep `index.ts` minimal and explicit (avoid `export * from` patterns).
- For large shared primitives (e.g., Button, Modal), prefer to add them to `src/components/primitives/` or `src/components/ui/`.
- Document this ADR in `docs/adr/` and mention it in the project README as the canonical component organization policy.
