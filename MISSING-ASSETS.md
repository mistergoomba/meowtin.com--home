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

### AI capability page — `/development/ai` ✅

The three AI engagements are no longer project entries. They were subcontracted
and stay unbranded, with no public URL and no shareable screenshot, so they now
live on **/development/ai** as capability with evidence attached. See the header
comment in [app/development/config/ai.ts](app/development/config/ai.ts).

**That page needs no photography.** The 14 ability cards use drawn line-art
glyphs from
[components/development/CapabilityGlyph.tsx](components/development/CapabilityGlyph.tsx)
— stroke-only SVG inheriting `currentColor`, so there is no asset to go missing
and nothing to commission. A page of red squares would have been worse than no
imagery at all.

The four existing illustrations are still in use:

| Asset | Where | Status |
|---|---|---|
| `agent-platform-thumb.webp` | `/development` AI spotlight + `/development/ai` Architecture | ✅ 1200px, 57 KB |
| `agent-platform-portrait.webp` | Home page tile (3:4) | ✅ 420px, 28 KB |
| `agent-platform-tools.webp` | `/development/ai` Architecture | ✅ 1100px, 46 KB |
| `agent-platform-orgs.webp` | `/development/ai` Architecture | ✅ 1100px, 43 KB |

All four are AI-generated concept illustrations, not UI captures. The section on
`/development/ai` is headed **Architecture** and says so in its blurb — implying
they were screenshots would undercut a page whose whole argument is care with
the truth.

The portrait tile is a centered 3:4 crop of the card thumbnail source, so it
stays in sync — rerun `npm run optimize:images` after replacing any PNG.

Two assets are now **orphaned** and can be deleted once you're sure the copy has
settled: `ai-casino.webp` / `.png`, `casino-simulator-thumb.webp`,
`casino-simulator-1.webp`, and `ai-avatar.webp` / `.png` — all belonged to the
removed casino-simulator and clinical-assessment project entries.

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

### Sage & Madison — `sage-and-madison` ✅

Thumbnail and four detail images are in: the homepage (`-1`), the History page
(`-2`), the events page with the brand-activation block (`-3`), and The Society
newspaper page (`-4`). The thumbnail is the homepage crop scaled to 1200px.

Still open:

- **The Press page.** Six publication mastheads over horizontal-scrolling
  clipping rows is the most impressive thing in the rebuild and the description
  singles it out, but there is no capture of it yet.
- The History page's **era timeline row** (BC → 2020–Future) sits just below the
  16:10 crop of `-2`, so the timeline the copy names is not actually visible. A
  reshoot framed on the timeline would fix it.

### A Handmade Story — `a-handmade-story` ✅

Thumbnail and three detail images are in: the homepage with the rewired nav
(`-1`), a recipe post (`-2`), and the recipe card (`-3`).

**These are AFTER captures only.** A before/after pair would still sell this one
far harder — the story is the rescue, not the design — so if any capture of the
original site survives, it belongs here. Until then the rescue is carried
entirely by the description.

---

## Nothing is blocking

**No project renders a red square any more.** `grep -rl 'data-missing-asset' out/`
returns only the shared JS chunks, which contain the placeholder component
itself rather than a live placeholder. Everything below is a follow-up on
imagery that already exists.

### 0. Roswell Back Office — `roswell-back-office` ✅

Thumbnail and two detail images are in: the Serial History Editor (`-1`) and the
Custom Shop Assets catalog manager (`-2`, also the thumbnail).

**Both are redacted, and the fills are painted into the files — never re-export
from the raw captures.** Solid fill, never blur: blurred short numeric strings
can be recovered, and these are real serials. Covered in `-1`: every mic serial,
every order number, and the `SS order ID` / `ownerID` / `shiptoID` on the edited
entry. A serial paired with its order number is exactly the warranty-lookup key
this project exists to protect. Covered in `-2`: the RM8 rows (unreleased
product) across MODEL NAME through VARIANT ID; the SDC / SDC-84 rows are
unreleased too and fall below the 16:10 crop entirely.

Left visible on purpose: Shopify variant ids for shipping product, which appear
in any storefront's public product JSON, and the `COST ($)` column, which is
retail pricing already on the public builder.

Still open:

- **The ShipStation order pull across the 7 sales channels**, and the
  **field-level diff before a catalog publish** — the two captures MISSING-ASSETS
  originally asked for. The diff in particular is the "suggest, never silently
  expand" claim made visible, and neither shot here carries it.
- The **serial-entry screen at the bench**. `-1` shows the editor for an existing
  entry, not the moment of capture the description opens with.

Check whether either existing `custom-mics-1.webp` / `custom-mics-2.webp` is
actually a back-office capture rather than a storefront one — if so, move it.

### 0b. Short Fuse Shop — `short-fuse-shop` ✅

Thumbnail and five detail images are in. **`short-fuse-shop-5.webp` is a real
order and its customer name, email and shipping address are painted out in the
image itself** — if that shot is ever re-taken, redact it again before it lands
in `public/`. No Stripe dashboard captures, ever.

Still open, if the entry ever wants more:

- Product detail on a **shirt** rather than the album, so the size selector and a
  sold-out size are visible — that's the per-size availability claim, and the
  current product shot (an album) can't carry it.
- The offers editor with the four trigger types showing.
- Mobile storefront. Merch gets bought on phones.

### 0c. Short Fuse site — `short-fuse` ✅

Thumbnail and three detail images are in, replacing the pre-redesign
`sites-*.webp` captures. The Next.js dev-overlay badge was painted out of the
bottom-left corner of all three — **shoot the production build next time**, or
the badge has to be cropped again.

Still open:

- **The shows strip with 3+ flyers**, so the carousel arrows actually render. The
  current shot has two flyers, which fit, so the auto-carousel the description
  makes a point of is invisible in it.
- `/epk` — nothing else in the portfolio shows a press kit.
- One phone-shaped mobile hero.

**Captures predate the animation commit.** If that work changed the static
layout, these three need reshooting; if it only added motion, they stand.

**Stills, not video.** `projectImages()` filters `.mp4` out, and the `preview`
mp4s are legacy and no longer rendered on the redesigned pages.

### 0d. Both Short Fuse projects — the shared-design-system shot

One composite image: the band site's merch row beside the store's homepage.
That's the "one design system across two repos" claim made visible, and it's the
only image that argues for both projects at once. Goes in **both** entries'
`screenshots` arrays. Both halves already exist as source captures —
`short-fuse-3.webp` has the merch row, `short-fuse-shop-1.webp` the storefront.

---

## Home page

✅ Clear — no red squares. Two tiles in
`components/home/SelectedProjects.tsx` changed when the AI project pages were
removed:

- Tile 1 is now **AI & Agent Engineering** → `/development/ai`, still using
  `agent-platform-portrait.webp`.
- Tile 2 was Casino Simulator (dead link); it is now **Petition Platform** →
  `/development/petition-platform`.

⚠️ Tile 2 uses `petition-thumb.webp`, which is a **landscape** thumb being
cropped into this grid's **portrait (3:4)** tile. It renders, but a dedicated
portrait crop would look better — same open item as `custom-mics-thumb.webp`
below.

---

## Verify — existing images that may be wrong

Not missing, but worth a look:

- **`custom-mics-thumb.webp` on the home page** — it's a landscape thumb being
  cropped into a 3:4 portrait tile. A dedicated portrait crop would look better.
  Same now applies to `petition-thumb.webp` in tile 2.

The two earlier entries here — the casino screenshots possibly showing an
outdated build, and whether `ai-avatar.webp` was a real NDA-safe capture — are
**resolved by deletion**: both projects are gone from the portfolio and neither
image is referenced any more.

---

## Also worth doing

- **`public/share-image-dev.png`** — the Open Graph share image referenced by
  [app/development/layout.tsx](app/development/layout.tsx). It still says "Developer
  Portfolio"; the page is now "Development & AI Engineering".
