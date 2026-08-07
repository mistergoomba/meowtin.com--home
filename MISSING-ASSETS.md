# Missing image assets

Every red **MISSING IMAGE** square on the site is listed here. They come from
`components/home/AssetSlot.tsx`, which renders a loud red block whenever it's
given no `src` — so nothing can quietly ship without art.

To find them in the built output: `grep -rl 'data-missing-asset' out/`

To fill one: drop the file in `public/projects/`, then set `thumbnail` (and/or
push into `screenshots`) on that project in
[app/development/config/projects.ts](app/development/config/projects.ts).

---

## Blocking — projects with no imagery at all

These four render a red square on the `/development` grid **and** a second red
square in the Screenshots section of their detail page.

### 1. AI Agent Platform — `ai-agent-platform`

**This is flagship #1, the first large card on the page.** Highest priority.

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/agent-platform-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/agent-platform-1.webp` … | 2–4 images |

⚠️ **Client is under NDA.** Anything captured needs the client's branding, real
org names, real deal/contact data, and real people's names removed or replaced
with synthetic data before it goes public. Safest candidates: the chat surface
with a rendered tool result (that's the actual story), a dashboard widget grid,
or an anonymized tool-call flow.

### 2. Sage & Madison — `sage-and-madison`

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/sage-madison-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/sage-madison-1.webp` … | 2–4 images |

Easiest of the four — the site is public at
[sageandmadison.com](https://sageandmadison.com). Worth capturing: the homepage
hero, the rebuilt Press page (the masthead rows are the most impressive piece),
and the History timeline.

### 3. A Handmade Story — `a-handmade-story`

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/handmade-story-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/handmade-story-1.webp` … | 2–4 images |

A **before/after pair** would sell this one far harder than a plain screenshot —
the story is the rescue, not the design. Note the engagement is still pre-launch
per the knowledge base, so captures may need to come from the local mirror.

### 4. Smart Broadcast — `smart-broadcast`

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/smart-broadcast-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/smart-broadcast-1.webp` … | 2–4 images |

Admin dashboard and the live command-progress UI are the obvious captures. An
architecture diagram of the microservices would also work here and might be
easier than screenshots.

---

## Home page

`components/home/SelectedProjects.tsx` — the **AI Agent Platform** tile renders a
red square. It shares the blocker above, but note this grid is **portrait (3:4)**,
so it wants its own crop rather than reusing the landscape card thumbnail.

---

## Verify — existing images that may be wrong

Not missing, but worth a look:

- **`casino-simulator-thumb.webp` / `casino-simulator-1.webp`** — the old site
  copy described this project as a React Native + Expo floor-layout tool. The
  knowledge base describes the current build as React 19 + Phaser + PyTorch. The
  copy has been rewritten to match the knowledge base; **confirm the screenshots
  show the current build** and not the earlier one.
- **`ai-avatar.webp`** — used for the AI Clinical Assessment card and its only
  screenshot. Confirm it's a real capture and NDA-safe, not stock art.
- **`custom-mics-thumb.webp` on the home page** — it's a landscape thumb being
  cropped into a 3:4 portrait tile. A dedicated portrait crop would look better.

---

## Also worth doing

- **`public/share-image-dev.png`** — the Open Graph share image referenced by
  [app/development/layout.tsx](app/development/layout.tsx). It still says "Developer
  Portfolio"; the page is now "Development & AI Engineering".
