# Impulse

The monthly Barcelona business meetup for women of impact.

Website: [communaute-impulse.com](https://communaute-impulse.com)

## Tech Stack

- **Framework**: Next.js 16 (App Router) with static export
- **Styling**: Tailwind CSS with custom design system
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages
- **Contact API**: Azure Logic Apps (deployed separately)
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
    ├── Benefits.tsx    # Benefits
    ├── Team.tsx        # Founding team
    ├── Testimonials.tsx # Testimonials
    ├── Contact.tsx     # Contact form
    └── Footer.tsx      # Footer
```

## Design System

### Colors

| Name  | Hex       | Usage                    |
|-------|-----------|--------------------------|
| Navy  | `#1e3a5f` | Headings, logo           |
| Gold  | `#c9a227` | Accents, CTA             |
| Cream | `#faf7f2` | Light background         |
| Rose  | `#f5e6e0` | Gradients                |
| Beige | `#efe8e1` | Gradients                |

### Typography

- **Headings**: Cormorant Garamond (elegant serif)
- **Scripts**: Great Vibes (cursive for accents)
- **Body**: Source Sans 3 (readable sans-serif)
- **Logo**: Montserrat uppercase
- **Accent**: Above The Beyond (local font)

## Contact API Configuration

The contact form uses an Azure Logic Apps API. Set the environment variable:

```bash
NEXT_PUBLIC_IMPULSE_CONTACT_API=https://your-logic-app-url
```

The form includes:
- Anti-spam protection (honeypot)
- Client-side rate limiting
- 5-minute cooldown between submissions

## SEO

The site includes:

- Complete metadata (title, description, keywords)
- Open Graph for social sharing
- Twitter Cards
- JSON-LD Schema.org (Organization)
- PWA Manifest
- Preconnect for Google Fonts

## Next.js 16 Features

- **React Compiler**: Automatic component memoization
- **Turbopack**: Ultra-fast bundler by default
- **React 19**: Latest React features

## Espace contenu (CMS)

Le contenu du site (sections home, événements, paramètres) est éditable via Decap CMS à l'URL `/admin`.

### Premier setup de l'authentification

Decap a besoin d'un fournisseur d'authentification pour autoriser l'écriture sur le repo. Deux options :

**Option 1 — DecapBridge (recommandé, zéro infra)**

1. Créer un compte sur https://decapbridge.com
2. Connecter le repo `communaute-impulse`
3. Récupérer les `identity_url` et `gateway_url` fournis
4. Les ajouter dans `public/admin/config.yml` sous la clé `backend:`
5. Inviter Marina par email depuis DecapBridge

**Option 2 — Netlify Identity**

1. Créer un site Netlify pointant sur ce repo
2. Activer Identity dans le dashboard Netlify
3. Activer Git Gateway
4. Ajouter dans `public/admin/index.html`, dans le `<head>` :
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```
5. Ajouter le même script dans `src/app/layout.tsx` pour la détection de redirection après login

### Accès quotidien

Une fois auth configuré, Marina ouvre `https://communaute-impulse.com/admin/`, se connecte, modifie le contenu. Chaque sauvegarde déclenche un commit Git → GitHub Actions rebuild → site mis à jour en ~2 minutes.

## License

All rights reserved © 2026 Impulse
