# Missing image assets

Every red **MISSING IMAGE** square on the site is listed here. They come from
`components/home/AssetSlot.tsx`, which renders a loud red block whenever it's
given no `src` — so nothing can quietly ship without art.

To find them in the built output: `grep -rl 'data-missing-asset' out/`

To fill one: drop the file in `public/projects/`, then set `thumbnail` (and/or
push into `screenshots`) on that project in
[app/development/config/projects.ts](app/development/config/projects.ts).

---

## Done

### AI Agent Platform — `ai-agent-platform` ✅

Flagship #1. All imagery in place; no red squares remain on this project.

| Asset | Status |
|---|---|
| Card thumbnail (`/development`) | ✅ `agent-platform-thumb.webp` — 1200px, 57 KB |
| Home page tile (3:4) | ✅ `agent-platform-portrait.webp` — 420px, 28 KB |
| Detail — tools & skills layer | ✅ `agent-platform-tools.webp` — 1100px, 46 KB |
| Detail — orgs & inherited authority | ✅ `agent-platform-orgs.webp` — 1100px, 43 KB |

All four are AI-generated concept illustrations, not UI captures — the client is
under NDA. The detail-page section is labelled **Architecture** rather than
Screenshots (`imagesLabel` on the project) so that's stated honestly.

The portrait tile is a centered 3:4 crop of the card thumbnail source, so it
stays in sync — rerun `npm run optimize:images` after replacing any PNG.

If NDA-safe UI captures ever become available (branding, org names,
deal/contact data, and people's names scrubbed or replaced with synthetic data),
they'd be an upgrade over the diagrams — but they're not blocking.

#### Prompts used

Kept for regenerating or matching style on future projects.

##### Image 2 — the tools & skills layer

> A dark, cinematic technical illustration on a near-black background (#08080a),
> showing a layered stack diagram viewed straight on. At the top, a single
> glowing teal hexagonal node representing an AI agent. Below it, a horizontal
> translucent band of small connected diamond shapes representing a skills layer.
> Below that, a wider horizontal band of many small glowing squares arranged in a
> grid, representing a large tool library. From that bottom band, three groups of
> thin luminous lines branch downward into three distinct clusters of simple
> geometric icons — one cluster emerald, one cool blue, one violet — representing
> three categories of integration. Fine connecting lines and small data-flow dots
> travel along every path. Color palette: deep black and charcoal with emerald
> and teal glow (#2dd4bf, #34d399), a cool blue accent (#38bdf8), and a single
> violet accent (#a855f7). Style: precise, technical, minimal, high-contrast,
> like a premium enterprise infrastructure diagram. Thin elegant linework, subtle
> bloom, generous negative space. No text, no words, no labels, no letters
> anywhere in the image. Widescreen composition, centered, 16:10 aspect ratio.

##### Image 3 — organizations & inherited authority

Deliberately a **different visual language** from images 1 and 2: isometric
rather than flat, solid translucent volumes rather than thin linework, staggered
rather than radially symmetric. Same palette so the set still coheres. The
negative-prompt line at the end is load-bearing — without it the model drifts
straight back to hexagons and glowing node graphs.

> An isometric three-dimensional illustration on a near-black background
> (#08080a), viewed from a high three-quarter angle. A set of large translucent
> glass slabs, like frosted panes of smoked glass with visible thickness and
> depth, stacked and nested inside one another — one big outer chamber holding
> two medium chambers, each of those holding smaller chambers within. The
> containers are staggered and offset rather than centered, giving the
> composition an asymmetric architectural feel, like a cutaway view of a modern
> building. A soft volumetric shaft of emerald-green light pours down from above
> through the largest chamber and spills into the ones nested inside it, the
> light growing dimmer at each level, and the light is visibly contained by the
> glass walls — it never escapes sideways into the dark. Faint caustic
> reflections on the glass surfaces. Color palette: deep black and charcoal
> smoked glass with emerald and teal illumination (#2dd4bf, #34d399) and a cool
> blue rim light on the glass edges (#38bdf8). Style: cinematic architectural
> render, soft focus falloff, atmospheric haze in the light beams, generous
> negative space around the structure. No text, no words, no labels, no letters
> anywhere in the image. Widescreen composition, 16:10 aspect ratio.
>
> Do not use: hexagons, circular rings, node-and-line network diagrams, flat
> head-on symmetrical layouts, wireframe outlines, or HUD graphics.

##### Image 1 — the card art (three-ring workforce diagram)

> A dark, cinematic technical illustration of an AI agent platform, rendered as a
> three-ring concentric diagram on a near-black background (#08080a). At the
> center, a glowing teal-green core labeled with a subtle geometric icon,
> representing a company's shared memory. Around it, a middle ring of eight
> evenly spaced hexagonal nodes connected to the core by thin luminous lines —
> these are specialized AI agents. Around that, an outer ring of eight smaller,
> dimmer circular nodes representing people, connected inward. Fine connecting
> lines between all layers suggest constant data flow. Color palette: deep black
> and charcoal, with emerald and teal accent glow (#2dd4bf, #34d399) and a
> single cool blue highlight (#38bdf8). Style: precise, technical, minimal,
> high-contrast — like a premium enterprise infrastructure diagram or a sci-fi
> HUD. Thin elegant linework, subtle bloom on the glowing elements, generous
> negative space. No text, no words, no labels, no letters anywhere in the image.
> Widescreen composition, centered, 16:10 aspect ratio.

The **"no text"** instruction is load-bearing — image models produce garbled
pseudo-text, and this sits at the top of the page.

---

## Blocking — projects with no imagery at all

These three render a red square on the `/development` grid **and** in the
Screenshots section of their detail page.

### 1. Sage & Madison — `sage-and-madison`

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/sage-madison-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/sage-madison-1.webp` … | 2–4 images |

Easiest of the three — the site is public at
[sageandmadison.com](https://sageandmadison.com). Worth capturing: the homepage
hero, the rebuilt Press page (the masthead rows are the most impressive piece),
and the History timeline.

### 2. A Handmade Story — `a-handmade-story`

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/handmade-story-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/handmade-story-1.webp` … | 2–4 images |

A **before/after pair** would sell this one far harder than a plain screenshot —
the story is the rescue, not the design. Note the engagement is still pre-launch
per the knowledge base, so captures may need to come from the local mirror.

### 3. Smart Broadcast — `smart-broadcast`

| Need | Path to create | Notes |
|---|---|---|
| Card thumbnail | `public/projects/smart-broadcast-thumb.webp` | Landscape, 16:10 |
| Detail screenshots | `public/projects/smart-broadcast-1.webp` … | 2–4 images |

Admin dashboard and the live command-progress UI are the obvious captures. An
architecture diagram of the microservices would also work here and might be
easier than screenshots.

---

## Home page

✅ Clear — no red squares. The AI Agent Platform tile in
`components/home/SelectedProjects.tsx` now uses
`agent-platform-portrait.webp`. Note this grid is **portrait (3:4)**, so any
replacement needs its own crop rather than the landscape card thumbnail.

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
