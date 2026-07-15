# LifeView Posters — Public Web Gallery (handoff brief)

## What this is
Publish the **16 LifeView framework posters** as a simple, fast, public website — a
gallery of Rob's ("Higher Power Sedona") healing-framework posters — to be linked as a
page/button off the main site **higherpowersedona.org**.

**This is a standalone public project.** It has nothing to do with — and must NOT touch —
the private LifeView Companion app at `C:\HPC` (a mental-health app with a strict
privacy/encryption architecture). Work only inside `C:\lifeview-posters`.

## The assets (already staged for you)
`C:\lifeview-posters\posters\` — 16 `.jsx` files. Each is a **self-contained React
component**: a `export default function <Name>() { … }`, whose ONLY import is
`react` (some also call `useEffect` to inject a Google-Fonts `<link>`). All data, SVG,
and styles are inline. No other dependencies.

| File | Poster |
|---|---|
| 00-LifeView Framework.jsx | The overall framework map |
| 01-The Three Healings.jsx | Self → Others → World |
| 02-Source Vs Control.jsx | The Source vs Control-Matrix pairs |
| 03-Quiet The Ego.jsx | Activation 1 |
| 04-Heal The Inner Child.jsx | Activation 2 |
| 05-Awaken The Higher Self.jsx | Activation 3 |
| 06-Connect To Soul.jsx | Activation 4 (Identity/Passion/Purpose) |
| 07-The Hero's Journey.jsx | The 7-step Sovereign Hero's Journey |
| 10-The Three Zones.jsx | Nervous-system regulation (Red/Green/Blue) |
| 11-The Three Keys.jsx | Relational success |
| 12-The Four Horsemen.jsx | Destructive communication + antidotes |
| 13-The Four Agreements.jsx | |
| 14-The Four Enemies.jsx | |
| 15-The Five Rhythms.jsx | Movement practice |
| 16-The Five Parts.jsx | IFS parts model |
| 17-The Four Meditations.jsx | |

**Size note:** the small ones (02, 07, 10–17: 6–25 KB) are pure code. The large ones
(01, 03, 04, 05, 06: 350–580 KB) embed base64 images — same component shape, just heavy;
**lazy-load / code-split these** so the gallery stays fast.

*(Canonical source, if you ever need to re-copy: `C:\HPC\docs\framework\posters\`.)*

## Goal
A responsive static site:
- **Gallery / index** listing all 16 (title + small preview or a labeled card).
- **Per-poster full view** (click a card → the poster rendered large, centered, scaled to fit).
- Fast on mobile and desktop; deployable to free static hosting; then linked from
  higherpowersedona.org.

## Recommended approach (Vite + React — simplest for existing JSX components)
1. **Scaffold** in `C:\lifeview-posters`:
   `npm.cmd create vite@latest . -- --template react`  (on this Windows machine use
   `npm.cmd`/`npx.cmd`, not `npm`/`npx` — the PowerShell execution policy blocks the .ps1 shim).
2. **Move** `posters/*.jsx` into `src/posters/` and **rename** to safe module names —
   the current names have spaces, numbers, and an apostrophe (e.g. `07-The Hero's Journey.jsx`
   → `HeroJourney.jsx`). Note each file's `export default` component name.
3. **Router + gallery:** add `react-router-dom`. Build `/` (gallery of 16 cards) and
   `/p/:slug` (full poster). Import each poster with `React.lazy()` so the big ones only
   load when opened.
4. **Sizing:** the posters were designed at a fixed poster aspect ratio. Wrap each in a
   container that scales to fit the viewport while preserving aspect ratio (e.g. a
   max-width wrapper + `transform: scale()` or CSS `aspect-ratio`); allow scroll on mobile.
5. **Fonts:** if a poster injects a Google Font via `useEffect`, that still works in the
   client app; optionally hoist the `<link>` into `index.html` for no flash.
6. **Verify each of the 16 renders** (the big base64 ones may render slowly — that's expected).
7. **Deploy:** Vercel (`npx.cmd vercel`), Netlify, or Cloudflare Pages — all free static hosting.
8. **Link from higherpowersedona.org:** add a nav link/button to the deployed URL, or set
   up a custom subdomain (e.g. `posters.higherpowersedona.org`) via the host's domain settings.

## Gotchas
- Filenames need cleaning (spaces / leading numbers / apostrophe) before importing.
- Components are browser-only (`useEffect`, `document`) — fine in a client React app, but
  if you choose Next.js instead of Vite, mark them `"use client"`.
- The 5 large posters bloat the bundle — lazy-load them (step 3) so the gallery is snappy.
- Do NOT import anything from `C:\HPC`. Keep this project fully self-contained.

## Deliverable
A deployed public URL showing all 16 posters, plus the exact link/snippet to drop into
higherpowersedona.org's main page.
