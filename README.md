# Impulse

Le rendez-vous business mensuel des femmes d'impact à Barcelone.

Site web : [communaute-impulse.com](https://communaute-impulse.com)

## Tech Stack

- **Framework**: Next.js 16 (App Router) avec export statique
- **Styling**: Tailwind CSS avec design system personnalisé
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages
- **Contact API**: Azure Logic Apps (déployé séparément)
- **Performance**: Turbopack + React Compiler

## Installation

```bash
pnpm install
```

## Développement

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

> Le serveur de dev utilise Turbopack par défaut (5-10x plus rapide que Webpack)

## Build

```bash
pnpm build
```

Les fichiers statiques sont générés dans le dossier `out/`.

## Déploiement GitHub Pages

1. Push sur la branche `main`
2. Le workflow GitHub Actions se déclenche automatiquement
3. Le site est déployé sur GitHub Pages

### Configuration requise

Dans les paramètres du repo GitHub :

- Settings > Pages > Source: "GitHub Actions"

## Structure du projet

```text
src/
├── app/
│   ├── layout.tsx      # Layout avec SEO et métadonnées
│   ├── page.tsx        # Page principale
│   └── globals.css     # Styles globaux + fonts
└── components/
    ├── Header.tsx      # Navigation sticky
    ├── Hero.tsx        # Section hero avec photos
    ├── Mission.tsx     # Manifeste et valeurs
    ├── Problem.tsx     # Problématique
    ├── Solution.tsx    # Intention et ambition
    ├── Pillars.tsx     # Les 3 piliers (triangle)
    ├── Audience.tsx    # Public cible
    ├── HowItWorks.tsx  # Format mensuel
    ├── Calendar.tsx    # Calendrier 2026
    ├── Benefits.tsx    # Bénéfices
    ├── Team.tsx        # Équipe fondatrice
    ├── Testimonials.tsx # Témoignages
    ├── Contact.tsx     # Formulaire de contact
    └── Footer.tsx      # Pied de page
```

## Design System

### Couleurs

| Nom   | Hex       | Usage                    |
|-------|-----------|--------------------------|
| Navy  | `#1e3a5f` | Titres, logo             |
| Gold  | `#c9a227` | Accents, CTA             |
| Cream | `#faf7f2` | Fond clair               |
| Rose  | `#f5e6e0` | Dégradés                 |
| Beige | `#efe8e1` | Dégradés                 |

### Typographie

- **Titres**: Cormorant Garamond (serif élégant)
- **Scripts**: Great Vibes (cursive pour accents)
- **Corps**: Source Sans 3 (sans-serif lisible)
- **Logo**: Montserrat uppercase
- **Accent**: Above The Beyond (font locale)

## Configuration Contact API

Le formulaire de contact utilise une API Azure Logic Apps. Définir la variable d'environnement :

```bash
NEXT_PUBLIC_IMPULSE_CONTACT_API=https://your-logic-app-url
```

Le formulaire inclut :
- Protection anti-spam (honeypot)
- Rate limiting côté client
- Cooldown de 5 minutes entre les soumissions

## SEO

Le site inclut :

- Métadonnées complètes (title, description, keywords)
- Open Graph pour le partage social
- Twitter Cards
- JSON-LD Schema.org (Organization)
- PWA Manifest
- Preconnect et preload pour les fonts

## Fonctionnalités Next.js 16

- **React Compiler**: Mémoisation automatique des composants
- **Turbopack**: Bundler ultra-rapide par défaut
- **React 19**: Dernières fonctionnalités React

## Licence

Tous droits réservés © 2026 Impulse
