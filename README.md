# Impulse - Landing Page

The monthly Barcelona business meetup for women of impact.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with static export
- **Styling**: Tailwind CSS with custom design system
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages
- **Form**: Formspree (to configure)
- **Performance**: Turbopack + React Compiler

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

> The dev server uses Turbopack by default (5-10x faster than Webpack)

## Build

```bash
pnpm build
```

Static files are generated in the `out/` folder.

## GitHub Pages Deployment

1. Push to the `main` branch
2. The GitHub Actions workflow triggers automatically
3. The site is deployed to GitHub Pages

### Required Configuration

In the GitHub repo settings:

- Settings > Pages > Source: "GitHub Actions"

If the repo is not `username.github.io`, uncomment and configure `basePath` in `next.config.ts`.

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx      # Layout with SEO and metadata
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles + fonts
└── components/
    ├── Header.tsx      # Sticky navigation
    ├── Hero.tsx        # Hero section with photos
    ├── Mission.tsx     # Manifesto and values
    ├── Problem.tsx     # Problem statement
    ├── Solution.tsx    # Intention and ambition
    ├── Pillars.tsx     # The 3 pillars (triangle)
    ├── Audience.tsx    # Target audience
    ├── HowItWorks.tsx  # Monthly format
    ├── Calendar.tsx    # 2026 Calendar
    ├── Pricing.tsx     # 2 pricing tiers
    ├── Benefits.tsx    # Benefits
    ├── Team.tsx        # Founding team
    ├── Testimonials.tsx # Testimonials
    └── Contact.tsx     # Contact form + footer
```

## Design System

### Colors

- Navy: `#1e3a5f` (headings, logo)
- Gold: `#c9a227` (accents, CTA)
- Cream: `#faf7f2` (light background)
- Rose: `#f5e6e0` (gradient)
- Beige: `#efe8e1` (gradient)

### Typography

- **Headings**: Cormorant Garamond (elegant serif)
- **Scripts**: Great Vibes (cursive for accents)
- **Body**: Source Sans Pro (readable sans-serif)
- **Logo**: Montserrat uppercase

## Formspree Configuration

1. Create an account on [Formspree](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORM_ID` in `src/components/Contact.tsx` with your ID

## SEO

The site includes:

- Complete metadata (title, description, keywords)
- Open Graph for social sharing
- Twitter Cards
- JSON-LD Schema.org (Organization)
- robots.txt and sitemap.xml
- PWA Manifest

## Next.js 16 Features

- **React Compiler**: Automatic component memoization
- **Turbopack**: Ultra-fast bundler by default
- **React 19.2**: Latest React features

## Customization

### Images

Replace placeholders in `public/images/`:

- `og-image.jpg` (1200x630) - Open Graph image
- `placeholder-team.svg` - Team photos
- `placeholder-photo.svg` - Event photos

### Content

Content is directly in the React components. Edit files in `src/components/` to customize.

## License

All rights reserved © 2026 Impulse
