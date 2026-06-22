# Design — "Partenaires" section

**Date:** 2026-06-22
**Status:** Approved (pending spec review)

## Goal

Add a **Partenaires** section to the Impulse single-page site, placed immediately
before the Contact section, matching the provided mockup
(`WhatsApp Image 2026-05-19 at 15.48.09.jpeg`) while staying faithful to the
site's existing visual language. The section presents the partnership value
proposition and a wall of partner logos. All content is editable via Decap CMS,
consistent with the rest of the site.

## Placement

In `src/app/HomeClient.tsx`, insert `<Partners content={content.partners} />`
between `<Testimonials />` and `<Contact />`. The section uses `id="partenaires"`.

Add a `Partenaires` link to `src/components/Header.tsx` `navLinks`, between
`Équipe` (`#equipe`) and `Contact` (`#contact`), pointing to `#partenaires`.
Both the desktop and mobile nav render from the same `navLinks` array, so one
edit covers both.

## Architecture

The section follows the existing per-section pattern exactly. Four moving parts,
each with one clear responsibility:

1. **Content** — `content/sections/partners.md` (frontmatter), seeded with all
   copy and the 11 partners.
2. **Data layer** — `PartnersContent` type + `getPartnersContent()` getter in
   `src/lib/sections.ts`, added to `AllSectionsContent` and
   `getAllSectionsContent()`.
3. **View** — `src/components/Partners.tsx`, a server component taking
   `{ content: PartnersContent }`, matching the markup conventions of
   `Audience.tsx` / `Benefits.tsx`.
4. **CMS** — a `partners` file entry under the `sections` collection in
   `public/admin/config.yml`, with French labels like the other sections.

### Data shape

```ts
export type PartnerItem = {
  name: string;        // used as alt text and accessible label
  logo: string;        // path under /images/partners/... or CMS upload
  url?: string;        // optional external link
};
export type PartnerBenefit = { text: string };
export type PartnersContent = {
  eyebrow: string;            // "Partenaires"
  intro1: string;             // first intro paragraph (italic)
  intro2: string;             // second intro paragraph (italic)
  benefits: PartnerBenefit[]; // 4 chevron bullets
  tagline: string;            // gold script line
  partners: PartnerItem[];    // logo wall, ordered
};
```

## Layout & styling

Section background: `bg-blush` (consistent with `Benefits`, sits naturally
between Testimonials on white and Contact). Standard section padding
(`py-20 md:py-28`) and `container-impulse px-6 md:px-8`.

1. **Header** — eyebrow `PARTENAIRES` in `font-montserrat uppercase tracking-[0.3em]`
   followed by the gold gradient divider
   (`w-16 h-px bg-gradient-to-r from-gold to-transparent`), matching every other
   section header.
2. **Intro paragraphs** — two italic paragraphs in `font-tenor`, navy, max-width
   constrained for readability. Mirrors the mockup's italic intro.
3. **Benefits list** — 4 items, each with a **gold chevron (›) marker** (the
   mockup uses chevrons rather than the site's usual round dots; we honor the
   mockup here). Text in `font-tenor`, navy. The chevron is a small inline SVG or
   styled glyph in `text-gold`.
4. **Tagline** — the "Une marque se retient lorsqu'elle est vécue…" line rendered
   in the site's `font-script` in **gold** (not the mockup's red), centered, sized
   like other script accents.
5. **Logo wall** — responsive grid of the 11 partner logos, **full color** on a
   light background. Suggested grid: 2 columns on mobile, 3 on `sm`, 4–5 on `lg`,
   with generous gap. Each cell centers the logo with a constrained height
   (e.g. `h-12 md:h-16 w-auto object-contain`) so disparate aspect ratios align
   on a common baseline. Logos use `next/image`.
   - A partner **with** a `url` renders inside an `<a target="_blank"
     rel="noopener noreferrer">` with an accessible label; **without** a `url` it
     renders as a plain image. Only MonEntreprise.es has a URL initially
     (`https://monentreprise.es/`).

Entry animations reuse the existing `animate-fade-in-up` + staggered
`animationDelay` pattern seen in `Audience`/`Benefits`.

## Assets

Commit the 11 logos to `public/images/partners/` with clean kebab-case filenames.
Source: `IMPULSE LOGOS.zip` (10 logos, numbered 1–10) + `logosmonentreprise_es.zip`.

| File | Partner | Source |
|------|---------|--------|
| `4q.png` | 4Q | impulse `1.png` |
| `place-to-live.png` | Place to Live | impulse `2.png` |
| `stephanie-tabernenk.png` | Stéphanie Tabernenk | impulse `3.png` |
| `delphine-dolynny.png` | Delphine Dolynny | impulse `4.png` |
| `mon-petit-pot.png` | mon petit pot | impulse `5.png` |
| `atomic-pastries.png` | Atomic Pastries | impulse `6.png` |
| `valla-long.png` | Valla & Long | impulse `7.png` |
| `beau-boulot.png` | beau BOULOT | impulse `8.png` |
| `marina-serr.png` | Marina Serr | impulse `9.png` |
| `so-focus.png` | so.focus | impulse `10.png` |
| `monentreprise-es.png` | MonEntreprise.es | `MonEntreprise.es LOGO 2 - 1.png` (horizontal navy/orange on transparent) |

`partners.md` references these via `/images/partners/<file>`. CMS uploads of
new/replacement logos land in `/images/uploads` per the existing `public_folder`
config; both path styles coexist fine in the image widget.

## CMS config (Decap)

Add under the `sections` collection `files:` list:

```yaml
- label: 'Partenaires'
  name: 'partners'
  file: 'content/sections/partners.md'
  fields:
    - { label: 'Étiquette de section', name: 'eyebrow', widget: 'string' }
    - { label: 'Paragraphe d''intro 1', name: 'intro1', widget: 'text' }
    - { label: 'Paragraphe d''intro 2', name: 'intro2', widget: 'text' }
    - label: 'Bénéfices (puces)'
      name: 'benefits'
      widget: 'list'
      fields:
        - { label: 'Texte', name: 'text', widget: 'string' }
    - { label: 'Tagline (script doré)', name: 'tagline', widget: 'string' }
    - label: 'Partenaires (logos)'
      name: 'partners'
      widget: 'list'
      fields:
        - { label: 'Nom (sert de texte alternatif)', name: 'name', widget: 'string' }
        - { label: 'Logo', name: 'logo', widget: 'image' }
        - { label: 'Lien (URL site, optionnel)', name: 'url', widget: 'string', required: false }
```

## Seed content (`partners.md`)

- **eyebrow:** `Partenaires`
- **intro1:** "Nous construisons des partenariats avec des acteurs qui partagent
  nos valeurs : exigence, qualité, humain et impact, au service d'une expérience
  à forte valeur ajoutée."
- **intro2:** "Chaque partenaire contribue à enrichir l'expérience des
  participantes."
- **benefits:**
  1. "Mise en avant auprès d'une audience qualifiée (entrepreneuses & dirigeantes)"
  2. "Expérience produit vécue en direct (et non publicité passive)"
  3. "Association à un événement premium et engagé"
  4. "Visibilité sur nos supports (présentation, réseaux, communication événement)"
- **tagline:** "Une marque se retient lorsqu'elle est vécue. Pas seulement
  lorsqu'elle est vue."
- **partners:** the 11 entries from the asset table above; `url` set only for
  MonEntreprise.es (`https://monentreprise.es/`).

## Out of scope (YAGNI)

- No per-partner descriptions, categories, or detail pages — logo + name + optional link only.
- No carousel/animation beyond the existing fade-in pattern.
- No CMS-driven background or layout options.
- No changes to other sections.

## Testing / verification

- `pnpm lint` and `pnpm build` pass.
- Section renders between Testimonials and Contact; `#partenaires` anchor scroll
  works from both desktop and mobile nav.
- All 11 logos load (no 404s); MonEntreprise.es logo links to the site in a new tab.
- Responsive logo grid reflows cleanly at mobile / tablet / desktop widths.
- Editing `partners.md` (add/remove a partner) reflects on the page.
