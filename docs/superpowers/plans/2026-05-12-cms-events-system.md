# Decap CMS + Système d'événements — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre tout le contenu du site Impulse éditable via Decap CMS, et ajouter un système d'événements avec liens statiques, pages détail riches, transition automatique à venir → passé, et galerie photos.

**Architecture:** Decap CMS chargé en CDN dans `/admin`. Contenu stocké dans `content/` (JSON pour les sections, markdown avec frontmatter pour les événements). Chaque composant React lit son contenu depuis un fichier dédié au build time. La nouvelle section Événements (3 blocs : Hero "Prochain" + "Et après…" + "Souvenirs") remplace le `Calendar.tsx` actuel. Partition à venir / passé calculée côté client au chargement.

**Tech Stack:** Next.js 16 (App Router, static export), TypeScript 5.9, Tailwind 3.4, React 19, Decap CMS v3, gray-matter (parser markdown), node:test (tests pure fonctions).

**Phases :**
- **Phase A — Fondations** (Tasks A1–A4) : Decap admin, dépendance gray-matter, types, dossier content/.
- **Phase B — Migration contenu existant** (Tasks B1–B5) : extraction de chaque section vers JSON.
- **Phase C — Système d'événements** (Tasks C1–C11) : collection events, composants, page détail, lightbox, partition.

Chaque phase produit du code fonctionnel et testable indépendamment. Tu peux t'arrêter à la fin de n'importe quelle phase.

---

## Phase A — Fondations

### Task A1: Installer gray-matter et créer le dossier content/

**Files:**
- Modify: `package.json`
- Create: `content/.gitkeep`

- [ ] **Step 1: Installer gray-matter**

```bash
pnpm add gray-matter
```

- [ ] **Step 2: Vérifier l'installation**

Run: `pnpm list gray-matter`
Expected: affiche `gray-matter` avec une version `^4.x.x`.

- [ ] **Step 3: Créer le dossier content avec un placeholder**

Crée `content/.gitkeep` (fichier vide).

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml content/.gitkeep
git commit -m "📦 Add gray-matter and content/ directory"
```

---

### Task A2: Définir les types TypeScript du contenu

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: Créer le fichier types.ts**

```typescript
// src/lib/types.ts

export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  social: {
    linkedin?: string;
    instagram?: string;
  };
};

export type EventGuest = {
  name: string;
  role?: string;
  photo?: string;
};

export type ImpulseEvent = {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  location: string;
  tagline?: string;
  time?: string;
  price?: string;
  reservationUrl?: string;
  coverPhoto?: string;
  description?: string;
  guest?: EventGuest;
  gallery?: string[];
  summary?: string;
};
```

- [ ] **Step 2: Vérifier que TypeScript compile**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "🏷️ Add TypeScript types for site content and events"
```

---

### Task A3: Créer le shell Decap admin

**Files:**
- Create: `public/admin/index.html`
- Create: `public/admin/config.yml`

- [ ] **Step 1: Créer index.html du CMS**

```html
<!-- public/admin/index.html -->
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Impulse — Espace contenu</title>
    <!-- Auth widget (DecapBridge ou Netlify Identity) à ajouter ici lors du setup auth -->
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Créer config.yml minimal (sans collections — elles arrivent phases B et C)**

```yaml
# public/admin/config.yml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: 'content: create {{collection}} "{{slug}}"'
    update: 'content: update {{collection}} "{{slug}}"'
    delete: 'content: delete {{collection}} "{{slug}}"'
    uploadMedia: 'content: upload "{{path}}"'
    deleteMedia: 'content: delete "{{path}}"'

media_folder: public/images/uploads
public_folder: /images/uploads

site_url: https://communaute-impulse.com
display_url: https://communaute-impulse.com

locale: 'fr'

collections: []
```

- [ ] **Step 3: Créer le dossier images/uploads avec placeholder**

```bash
mkdir -p public/images/uploads && touch public/images/uploads/.gitkeep
```

- [ ] **Step 4: Vérifier que le build passe toujours**

Run: `pnpm run build`
Expected: build successful, dossier `out/` généré, `out/admin/index.html` et `out/admin/config.yml` présents.

- [ ] **Step 5: Commit**

```bash
git add public/admin public/images/uploads/.gitkeep
git commit -m "🔧 Add Decap CMS admin shell"
```

---

### Task A4: Documenter le setup auth dans le README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Lire le README actuel pour repérer où insérer**

Run: `head -50 README.md`

- [ ] **Step 2: Ajouter une section "Espace contenu (CMS)" avant la section "License"**

Édite `README.md` et ajoute juste avant `## License` :

```markdown
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
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "📚 Document Decap CMS auth setup options"
```

---

## Phase B — Migration du contenu existant

À la fin de cette phase, toutes les sections existantes lisent leur contenu depuis `content/*.json` au lieu de données hardcodées. Decap a une collection par section éditable.

**Pattern commun :** chaque section suit la même recette :
1. Extraire les données hardcodées vers `content/<section>.json`
2. Modifier le composant React pour accepter ses données via props (typage strict)
3. Charger le JSON dans `src/app/page.tsx` (server component) et passer en props
4. Vérifier que le rendu est identique
5. Ajouter la collection au `config.yml` Decap

### Task B1: Migrer la section Hero (proof of pattern)

**Files:**
- Create: `content/hero.json`
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`
- Modify: `public/admin/config.yml`
- Create: `src/lib/content.ts`

- [ ] **Step 1: Lire le composant Hero pour extraire ses données**

Lis `src/components/Hero.tsx` en entier et identifie chaque chaîne de caractères affichée (titre, sous-titres, CTA, etc.).

- [ ] **Step 2: Créer content/hero.json avec ces données**

Crée `content/hero.json` avec la structure exacte des chaînes trouvées. Exemple (adapter au contenu réel) :

```json
{
  "tagline": "Le club business mensuel des femmes d'impact à Barcelone",
  "title": "Impulse",
  "subtitle": "Une fois par mois, on se retrouve pour échanger, construire, célébrer.",
  "primaryCta": { "label": "Rejoindre la communauté", "href": "#contact" },
  "secondaryCta": { "label": "Découvrir nos soirées", "href": "#evenements" }
}
```

- [ ] **Step 3: Étendre les types**

Ajoute à `src/lib/types.ts` :

```typescript
export type Cta = { label: string; href: string };

export type HeroContent = {
  tagline: string;
  title: string;
  subtitle: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};
```

- [ ] **Step 4: Créer le loader content.ts**

Crée `src/lib/content.ts` :

```typescript
// src/lib/content.ts
// Chargement statique du contenu JSON au build time.
// Utilise import direct (Next.js inline les JSON dans le bundle SSG).

import type { HeroContent, SiteSettings } from './types';

import heroData from '../../content/hero.json';

export const getHero = (): HeroContent => heroData as HeroContent;
```

- [ ] **Step 5: Modifier Hero.tsx pour accepter le contenu via props**

Refactore `src/components/Hero.tsx` pour exporter un composant qui reçoit `content: HeroContent` et utilise les valeurs des props au lieu des chaînes hardcodées. La structure JSX, classes Tailwind et animations restent identiques.

```typescript
// src/components/Hero.tsx
import type { HeroContent } from '@/lib/types';

type Props = { content: HeroContent };

export default function Hero({ content }: Props) {
  // utilise content.tagline, content.title, etc. partout où il y avait du texte hardcodé
  // ...
}
```

- [ ] **Step 6: Charger le contenu dans page.tsx**

Modifie `src/app/page.tsx` :

```typescript
import { getHero } from '@/lib/content';
// ... autres imports

export default function Home() {
  const hero = getHero();
  return (
    <>
      <Header />
      <main className="snap-container">
        <Hero content={hero} />
        <Mission />
        {/* ... reste inchangé pour l'instant */}
      </main>
    </>
  );
}
```

- [ ] **Step 7: Vérifier en dev**

Run: `pnpm run dev`
Ouvre http://localhost:3000.
Expected: le Hero s'affiche identiquement à avant.

- [ ] **Step 8: Vérifier le build statique**

Run: `pnpm run build`
Expected: build successful, 0 erreur TypeScript, 0 erreur ESLint.

- [ ] **Step 9: Ajouter la collection Hero dans config.yml**

Édite `public/admin/config.yml`, remplace `collections: []` par :

```yaml
collections:
  - name: 'homepage'
    label: 'Page d''accueil'
    files:
      - name: 'hero'
        label: 'Hero (haut de page)'
        file: 'content/hero.json'
        fields:
          - { label: 'Tagline (label en haut)', name: 'tagline', widget: 'string' }
          - { label: 'Titre principal', name: 'title', widget: 'string' }
          - { label: 'Sous-titre', name: 'subtitle', widget: 'text' }
          - label: 'Bouton principal'
            name: 'primaryCta'
            widget: 'object'
            required: false
            fields:
              - { label: 'Libellé', name: 'label', widget: 'string' }
              - { label: 'Lien', name: 'href', widget: 'string' }
          - label: 'Bouton secondaire'
            name: 'secondaryCta'
            widget: 'object'
            required: false
            fields:
              - { label: 'Libellé', name: 'label', widget: 'string' }
              - { label: 'Lien', name: 'href', widget: 'string' }
```

- [ ] **Step 10: Commit**

```bash
git add content/hero.json src/lib/types.ts src/lib/content.ts src/components/Hero.tsx src/app/page.tsx public/admin/config.yml
git commit -m "♻️ Migrate Hero content to JSON + Decap config"
```

---

### Task B2: Migrer les sections texte simples (Mission, Problem, Solution, Pillars, Audience, HowItWorks, Benefits)

Ces 7 sections suivent le même pattern que Hero. Le nombre d'étapes par section est volontairement plus court car le pattern est désormais établi.

**Files (créés pour chaque section) :**
- Create: `content/mission.json`, `content/problem.json`, `content/solution.json`, `content/pillars.json`, `content/audience.json`, `content/how-it-works.json`, `content/benefits.json`
- Modify: les 7 composants correspondants
- Modify: `src/app/page.tsx`
- Modify: `src/lib/types.ts`, `src/lib/content.ts`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Pour chaque section, extraire vers JSON**

Pour chacune des 7 sections (Mission, Problem, Solution, Pillars, Audience, HowItWorks, Benefits) :
1. Lis le composant existant
2. Identifie toutes les chaînes affichées et les listes (piliers, bénéfices, étapes, etc.)
3. Crée `content/<nom>.json` avec la structure correspondante

Exemple pour Pillars (3 piliers) :

```json
{
  "kicker": "Nos 3 piliers",
  "title": "Construire ensemble",
  "items": [
    { "title": "Rencontre", "description": "..." },
    { "title": "Business", "description": "..." },
    { "title": "Gastronomie", "description": "..." }
  ]
}
```

- [ ] **Step 2: Étendre types.ts avec les 7 nouveaux types**

Ajoute dans `src/lib/types.ts` un type par section. Exemple :

```typescript
export type PillarItem = { title: string; description: string };
export type PillarsContent = {
  kicker: string;
  title: string;
  items: PillarItem[];
};

export type MissionContent = {
  kicker: string;
  title: string;
  manifesto: string[];
  signature?: string;
};

// ... etc pour Problem, Solution, Audience, HowItWorks, Benefits
```

Adapte chaque type à la structure réelle du composant existant.

- [ ] **Step 3: Étendre content.ts avec les 7 nouveaux loaders**

```typescript
// src/lib/content.ts
import heroData from '../../content/hero.json';
import missionData from '../../content/mission.json';
import problemData from '../../content/problem.json';
import solutionData from '../../content/solution.json';
import pillarsData from '../../content/pillars.json';
import audienceData from '../../content/audience.json';
import howItWorksData from '../../content/how-it-works.json';
import benefitsData from '../../content/benefits.json';

import type {
  HeroContent, MissionContent, ProblemContent, SolutionContent,
  PillarsContent, AudienceContent, HowItWorksContent, BenefitsContent
} from './types';

export const getHero = () => heroData as HeroContent;
export const getMission = () => missionData as MissionContent;
export const getProblem = () => problemData as ProblemContent;
export const getSolution = () => solutionData as SolutionContent;
export const getPillars = () => pillarsData as PillarsContent;
export const getAudience = () => audienceData as AudienceContent;
export const getHowItWorks = () => howItWorksData as HowItWorksContent;
export const getBenefits = () => benefitsData as BenefitsContent;
```

- [ ] **Step 4: Modifier chaque composant pour recevoir son contenu via props**

Pour chacun des 7 composants : ajoute `type Props = { content: <TypeContent> }`, accepte `content` en prop, remplace toutes les chaînes hardcodées par des accès `content.xxx`. La structure JSX et le styling restent identiques.

- [ ] **Step 5: Modifier page.tsx pour charger et passer les 7 contenus**

```typescript
export default function Home() {
  const hero = getHero();
  const mission = getMission();
  const problem = getProblem();
  const solution = getSolution();
  const pillars = getPillars();
  const audience = getAudience();
  const howItWorks = getHowItWorks();
  const benefits = getBenefits();
  return (
    <>
      <Header />
      <main className="snap-container">
        <Hero content={hero} />
        <Mission content={mission} />
        <Problem content={problem} />
        <Solution content={solution} />
        <Pillars content={pillars} />
        <Audience content={audience} />
        <HowItWorks content={howItWorks} />
        <Calendar />
        <Benefits content={benefits} />
        <Team />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Vérifier dev + build**

Run: `pnpm run dev`, ouvre http://localhost:3000, parcours toutes les sections.
Expected: rendu identique à avant.

Run: `pnpm run build`
Expected: 0 erreur.

- [ ] **Step 7: Ajouter les 7 collections dans config.yml**

Dans `public/admin/config.yml`, sous la collection `homepage`, ajoute un fichier par section. Exemple pour Pillars :

```yaml
      - name: 'pillars'
        label: 'Section Piliers'
        file: 'content/pillars.json'
        fields:
          - { label: 'Kicker', name: 'kicker', widget: 'string' }
          - { label: 'Titre', name: 'title', widget: 'string' }
          - label: 'Les piliers'
            name: 'items'
            widget: 'list'
            min: 1
            max: 6
            fields:
              - { label: 'Titre', name: 'title', widget: 'string' }
              - { label: 'Description', name: 'description', widget: 'text' }
```

Fais l'équivalent pour Mission, Problem, Solution, Audience, HowItWorks, Benefits. Pour chaque type de champ : `string` pour les courts, `text` pour multi-ligne, `list` pour les tableaux d'items.

- [ ] **Step 8: Commit**

```bash
git add content/ src/lib src/components/{Mission,Problem,Solution,Pillars,Audience,HowItWorks,Benefits}.tsx src/app/page.tsx public/admin/config.yml
git commit -m "♻️ Migrate 7 text sections to JSON + Decap collections"
```

---

### Task B3: Migrer les sections à listes (Team, Testimonials)

**Files:**
- Create: `content/team.json`, `content/testimonials.json`
- Modify: `src/components/Team.tsx`, `src/components/Testimonials.tsx`
- Modify: `src/lib/types.ts`, `src/lib/content.ts`
- Modify: `src/app/page.tsx`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Extraire les membres de Team vers JSON**

Lis `src/components/Team.tsx`. Pour chaque membre fondateur :

```json
{
  "kicker": "Notre équipe",
  "title": "Les fondatrices",
  "members": [
    {
      "name": "Marina Serr",
      "role": "Founder & CEO",
      "bio": "...",
      "photo": "/images/team/marina.jpg",
      "linkedin": "https://linkedin.com/in/marina-serr"
    }
  ]
}
```

Les photos restent à leur emplacement actuel (`public/images/team/...`). On les référence telles quelles dans le JSON.

- [ ] **Step 2: Extraire les témoignages vers JSON**

```json
{
  "kicker": "Elles en parlent",
  "title": "Témoignages",
  "items": [
    {
      "quote": "...",
      "author": "Prénom Nom",
      "role": "Founder de XXX",
      "photo": "/images/testimonials/xxx.jpg"
    }
  ]
}
```

- [ ] **Step 3: Ajouter les types**

```typescript
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
};
export type TeamContent = { kicker: string; title: string; members: TeamMember[] };

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  photo?: string;
};
export type TestimonialsContent = { kicker: string; title: string; items: Testimonial[] };
```

- [ ] **Step 4: Ajouter les loaders**

```typescript
import teamData from '../../content/team.json';
import testimonialsData from '../../content/testimonials.json';

export const getTeam = () => teamData as TeamContent;
export const getTestimonials = () => testimonialsData as TestimonialsContent;
```

- [ ] **Step 5: Modifier Team.tsx et Testimonials.tsx pour accepter content en props**

Même pattern que les sections précédentes.

- [ ] **Step 6: Charger dans page.tsx**

Ajoute `const team = getTeam()` et `const testimonials = getTestimonials()`, passe-les en props.

- [ ] **Step 7: Vérifier**

Run: `pnpm run dev`
Vérifie que Team et Testimonials s'affichent identiquement.

Run: `pnpm run build`
Expected: 0 erreur.

- [ ] **Step 8: Ajouter les collections Decap**

```yaml
      - name: 'team'
        label: 'Section Équipe'
        file: 'content/team.json'
        fields:
          - { label: 'Kicker', name: 'kicker', widget: 'string' }
          - { label: 'Titre', name: 'title', widget: 'string' }
          - label: 'Membres'
            name: 'members'
            widget: 'list'
            fields:
              - { label: 'Nom', name: 'name', widget: 'string' }
              - { label: 'Rôle', name: 'role', widget: 'string' }
              - { label: 'Bio', name: 'bio', widget: 'text' }
              - { label: 'Photo', name: 'photo', widget: 'image' }
              - { label: 'LinkedIn', name: 'linkedin', widget: 'string', required: false }

      - name: 'testimonials'
        label: 'Témoignages'
        file: 'content/testimonials.json'
        fields:
          - { label: 'Kicker', name: 'kicker', widget: 'string' }
          - { label: 'Titre', name: 'title', widget: 'string' }
          - label: 'Témoignages'
            name: 'items'
            widget: 'list'
            fields:
              - { label: 'Citation', name: 'quote', widget: 'text' }
              - { label: 'Auteur', name: 'author', widget: 'string' }
              - { label: 'Rôle', name: 'role', widget: 'string', required: false }
              - { label: 'Photo', name: 'photo', widget: 'image', required: false }
```

- [ ] **Step 9: Commit**

```bash
git add content/team.json content/testimonials.json src/lib src/components/{Team,Testimonials}.tsx src/app/page.tsx public/admin/config.yml
git commit -m "♻️ Migrate Team and Testimonials sections to JSON"
```

---

### Task B4: Migrer Contact, Footer/Header settings

**Files:**
- Create: `content/contact.json`, `content/settings.json`
- Modify: `src/components/Contact.tsx`, `src/components/Footer.tsx`, `src/components/Header.tsx`
- Modify: `src/lib/types.ts`, `src/lib/content.ts`
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Créer content/settings.json**

```json
{
  "siteName": "Impulse",
  "tagline": "Le club business mensuel des femmes d'impact à Barcelone",
  "description": "...",
  "contactEmail": "contact@communaute-impulse.com",
  "social": {
    "linkedin": "https://www.linkedin.com/company/impulse-...",
    "instagram": "https://www.instagram.com/impulse_communaute"
  }
}
```

- [ ] **Step 2: Créer content/contact.json**

Lis `src/components/Contact.tsx` et extrais le titre, sous-titre, libellés des champs du formulaire, message de succès, etc.

```json
{
  "kicker": "Rejoindre",
  "title": "On se rencontre ?",
  "subtitle": "Laissez-nous un message...",
  "fields": {
    "nameLabel": "Prénom",
    "emailLabel": "Email",
    "messageLabel": "Message",
    "submitLabel": "Envoyer"
  },
  "successMessage": "Merci, on revient vers vous très vite.",
  "errorMessage": "Oups, une erreur. Réessaye dans un instant."
}
```

- [ ] **Step 3: Ajouter les types**

```typescript
export type ContactContent = {
  kicker: string;
  title: string;
  subtitle: string;
  fields: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
  };
  successMessage: string;
  errorMessage: string;
};
```

`SiteSettings` est déjà défini en A2.

- [ ] **Step 4: Ajouter les loaders**

```typescript
import settingsData from '../../content/settings.json';
import contactData from '../../content/contact.json';

export const getSettings = () => settingsData as SiteSettings;
export const getContact = () => contactData as ContactContent;
```

- [ ] **Step 5: Modifier Contact.tsx pour accepter content en props**

Remplace les chaînes hardcodées par les valeurs de `content.fields`, `content.successMessage`, etc.

- [ ] **Step 6: Modifier Footer.tsx et Header.tsx pour accepter settings en props**

Footer affiche `settings.siteName`, les liens sociaux, le copyright. Header peut afficher le `siteName` comme logo.

- [ ] **Step 7: Charger dans page.tsx + layout.tsx**

Page :

```typescript
const settings = getSettings();
const contact = getContact();
return (
  <>
    <Header settings={settings} />
    <main className="snap-container">
      {/* ... */}
      <Contact content={contact} />
    </main>
    <Footer settings={settings} />
  </>
);
```

Note : si Footer était précédemment dans `layout.tsx`, déplace-le dans `page.tsx` ou bien passe `settings` depuis `layout.tsx`. Le plus simple : Footer dans `page.tsx`.

Si `layout.tsx` utilise des métadonnées (title, description), modifie-le pour les lire depuis settings :

```typescript
// src/app/layout.tsx
import { getSettings } from '@/lib/content';

const settings = getSettings();

export const metadata = {
  title: settings.siteName,
  description: settings.description,
};
```

- [ ] **Step 8: Vérifier**

Run: `pnpm run dev`
Vérifie le Header (logo), le footer (liens sociaux, copyright), et le formulaire Contact.

Run: `pnpm run build`
Expected: 0 erreur.

- [ ] **Step 9: Ajouter les collections Decap**

```yaml
  - name: 'settings'
    label: 'Réglages généraux'
    files:
      - name: 'site'
        label: 'Site'
        file: 'content/settings.json'
        fields:
          - { label: 'Nom du site', name: 'siteName', widget: 'string' }
          - { label: 'Tagline', name: 'tagline', widget: 'string' }
          - { label: 'Description SEO', name: 'description', widget: 'text' }
          - { label: 'Email de contact', name: 'contactEmail', widget: 'string' }
          - label: 'Réseaux sociaux'
            name: 'social'
            widget: 'object'
            fields:
              - { label: 'LinkedIn', name: 'linkedin', widget: 'string', required: false }
              - { label: 'Instagram', name: 'instagram', widget: 'string', required: false }

      - name: 'contact'
        label: 'Section Contact'
        file: 'content/contact.json'
        fields:
          - { label: 'Kicker', name: 'kicker', widget: 'string' }
          - { label: 'Titre', name: 'title', widget: 'string' }
          - { label: 'Sous-titre', name: 'subtitle', widget: 'text' }
          - label: 'Libellés du formulaire'
            name: 'fields'
            widget: 'object'
            fields:
              - { label: 'Libellé Prénom', name: 'nameLabel', widget: 'string' }
              - { label: 'Libellé Email', name: 'emailLabel', widget: 'string' }
              - { label: 'Libellé Message', name: 'messageLabel', widget: 'string' }
              - { label: 'Libellé Bouton', name: 'submitLabel', widget: 'string' }
          - { label: 'Message de succès', name: 'successMessage', widget: 'string' }
          - { label: 'Message d''erreur', name: 'errorMessage', widget: 'string' }
```

- [ ] **Step 10: Commit**

```bash
git add content/settings.json content/contact.json src/lib src/components/{Contact,Footer,Header}.tsx src/app public/admin/config.yml
git commit -m "♻️ Migrate Contact, Header/Footer settings to JSON"
```

---

### Task B5: Vérification globale Phase B

**Files:** aucun changement.

- [ ] **Step 1: Lint global**

Run: `pnpm run lint`
Expected: 0 erreur.

- [ ] **Step 2: Build complet**

Run: `pnpm run build`
Expected: build successful, dossier `out/` complet, fichiers JSON présents dans le bundle.

- [ ] **Step 3: Dev server — checklist visuelle**

Run: `pnpm run dev`
Ouvre http://localhost:3000 et vérifie section par section :
- [ ] Hero — titre, sous-titre, CTAs OK
- [ ] Mission — texte, manifesto OK
- [ ] Problem — OK
- [ ] Solution — OK
- [ ] Pillars — 3 piliers OK
- [ ] Audience — OK
- [ ] HowItWorks — étapes OK
- [ ] Calendar — toujours hardcodé (sera remplacé en Phase C)
- [ ] Benefits — OK
- [ ] Team — membres + photos + LinkedIn OK
- [ ] Testimonials — OK
- [ ] Contact — formulaire + libellés OK
- [ ] Footer — liens sociaux + copyright OK
- [ ] Header — logo + navigation OK

- [ ] **Step 4: Si tout est OK, taguer la fin de phase B**

```bash
git tag phase-b-complete
```

---

## Phase C — Système d'événements

Cette phase ajoute la collection events, la nouvelle section UI (3 blocs), les pages détail, et la logique de partition. Au terme de la phase, `Calendar.tsx` est supprimé et remplacé par `EventsSection.tsx`.

### Task C1: Chargement des événements (markdown + frontmatter)

**Files:**
- Create: `src/lib/events.ts`
- Modify: `src/lib/types.ts` (si besoin, déjà fait en A2)

- [ ] **Step 1: Créer le loader events.ts**

```typescript
// src/lib/events.ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ImpulseEvent } from './types';

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events');

/**
 * Lit tous les événements depuis content/events/*.md.
 * Le slug est le nom de fichier sans extension.
 * S'exécute au build time uniquement.
 */
export function getAllEvents(): ImpulseEvent[] {
  if (!fs.existsSync(EVENTS_DIR)) return [];

  const files = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.md'));

  return files.map(filename => {
    const fullPath = path.join(EVENTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);
    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
    } as ImpulseEvent;
  });
}

export function getEventBySlug(slug: string): ImpulseEvent | null {
  return getAllEvents().find(e => e.slug === slug) ?? null;
}
```

- [ ] **Step 2: Créer le dossier events avec un placeholder**

```bash
mkdir -p content/events && touch content/events/.gitkeep
```

- [ ] **Step 3: Vérifier que le code compile**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 4: Commit**

```bash
git add src/lib/events.ts content/events/.gitkeep
git commit -m "🏗️ Add markdown event loader"
```

---

### Task C2: Fonction pure de partition à venir / passé + test unitaire

**Files:**
- Create: `src/lib/partition.ts`
- Create: `src/lib/partition.test.ts`

- [ ] **Step 1: Écrire le test (échouera)**

```typescript
// src/lib/partition.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partitionEvents } from './partition';
import type { ImpulseEvent } from './types';

const make = (slug: string, date: string): ImpulseEvent => ({
  slug, title: slug, date, location: 'Barcelona',
});

test('partitionEvents classe les événements futurs en upcoming, triés par date croissante', () => {
  const today = new Date('2026-05-12T10:00:00Z');
  const events = [
    make('a', '2026-06-16'),
    make('b', '2026-05-13'),
    make('c', '2026-09-01'),
  ];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming.map(e => e.slug), ['b', 'a', 'c']);
  assert.deepEqual(past, []);
});

test('partitionEvents classe les événements passés en past, triés par date décroissante', () => {
  const today = new Date('2026-05-12T10:00:00Z');
  const events = [
    make('a', '2026-01-15'),
    make('b', '2026-04-12'),
    make('c', '2026-03-10'),
  ];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past.map(e => e.slug), ['b', 'c', 'a']);
});

test('partitionEvents : un événement le jour même est considéré comme à venir', () => {
  const today = new Date('2026-05-12T23:59:59Z');
  const events = [make('today', '2026-05-12')];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming.map(e => e.slug), ['today']);
  assert.deepEqual(past, []);
});

test('partitionEvents : un événement de la veille est considéré comme passé', () => {
  const today = new Date('2026-05-12T00:00:00Z');
  const events = [make('yesterday', '2026-05-11')];
  const { upcoming, past } = partitionEvents(events, today);
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past.map(e => e.slug), ['yesterday']);
});

test('partitionEvents : tableau vide', () => {
  const { upcoming, past } = partitionEvents([], new Date());
  assert.deepEqual(upcoming, []);
  assert.deepEqual(past, []);
});
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

Run: `pnpm exec node --import tsx --test src/lib/partition.test.ts`

Note : si `tsx` n'est pas installé, installer d'abord :

```bash
pnpm add -D tsx
```

Expected: erreurs "cannot find module './partition'" — bon signe.

- [ ] **Step 3: Implémenter partition.ts**

```typescript
// src/lib/partition.ts
import type { ImpulseEvent } from './types';

/**
 * Partitionne une liste d'événements en "à venir" et "passés" par rapport à `now`.
 * Un événement le jour même reste "à venir" jusqu'à minuit suivant.
 * upcoming est trié par date croissante (le plus proche en premier).
 * past est trié par date décroissante (le plus récent en premier).
 */
export function partitionEvents(
  events: ImpulseEvent[],
  now: Date,
): { upcoming: ImpulseEvent[]; past: ImpulseEvent[] } {
  const startOfToday = new Date(now);
  startOfToday.setUTCHours(0, 0, 0, 0);

  const upcoming: ImpulseEvent[] = [];
  const past: ImpulseEvent[] = [];

  for (const e of events) {
    const eventDate = new Date(e.date);
    if (eventDate.getTime() >= startOfToday.getTime()) {
      upcoming.push(e);
    } else {
      past.push(e);
    }
  }

  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
}
```

- [ ] **Step 4: Relancer les tests**

Run: `pnpm exec node --import tsx --test src/lib/partition.test.ts`
Expected: 5 tests passent.

- [ ] **Step 5: Ajouter un script test au package.json**

Édite `package.json`, ajoute dans `scripts` :

```json
"test": "node --import tsx --test src/**/*.test.ts"
```

- [ ] **Step 6: Vérifier `pnpm test`**

Run: `pnpm test`
Expected: 5 tests passent.

- [ ] **Step 7: Commit**

```bash
git add src/lib/partition.ts src/lib/partition.test.ts package.json pnpm-lock.yaml
git commit -m "✅ Add upcoming/past event partition with unit tests"
```

---

### Task C3: Composant ornement de fallback

**Files:**
- Create: `src/components/events/EventOrnament.tsx`

- [ ] **Step 1: Créer EventOrnament.tsx**

Ce composant est utilisé quand un événement n'a pas de photo invitée ou de cover. Il reprend le langage visuel doré (cercles concentriques + "I" Great Vibes).

```typescript
// src/components/events/EventOrnament.tsx
type Props = {
  /** Variante 'hero' : grand ornement pour le bloc Hero "Prochain". */
  /** Variante 'cover' : ornement avec chiffre+mois pour les cartes Souvenir. */
  variant: 'hero' | 'cover';
  day?: string;
  month?: string;
};

export default function EventOrnament({ variant, day, month }: Props) {
  if (variant === 'hero') {
    return (
      <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 border border-gold/50 rounded-full" />
        <div className="absolute inset-[18px] border border-gold/30 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center font-greatvibes text-gold/85 text-6xl">
          I
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute inset-4 border border-gold/35 rounded-lg" />
      <div className="absolute inset-6 border border-gold/20 rounded-md" />
      <div className="relative z-10 text-center text-white">
        {day && <div className="font-cormorant text-4xl font-semibold leading-none">{day}</div>}
        {month && (
          <div className="font-montserrat uppercase tracking-[0.4em] text-[9px] text-gold mt-1">
            {month}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Vérifier le typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 3: Commit**

```bash
git add src/components/events/EventOrnament.tsx
git commit -m "✨ Add EventOrnament fallback component"
```

---

### Task C4: Composant EventHero (bloc "Prochain événement")

**Files:**
- Create: `src/components/events/EventHero.tsx`

- [ ] **Step 1: Créer EventHero.tsx**

Reproduit la maquette validée : carte sombre navy avec dégradé doré radial, layout 2 colonnes (texte gauche, photo invitée ou ornement droite). Si pas d'événement à venir → null.

```typescript
// src/components/events/EventHero.tsx
import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import EventOrnament from './EventOrnament';
import { formatEventDate } from '@/lib/format';

type Props = { event: ImpulseEvent | null };

export default function EventHero({ event }: Props) {
  if (!event) return null;

  return (
    <a
      href={`/evenements/${event.slug}`}
      className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-dark text-white shadow-xl group"
    >
      {/* Décor doré */}
      <div
        className="pointer-events-none absolute -right-12 -bottom-12 w-56 h-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.22), transparent 70%)' }}
      />

      <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-6 p-6 md:p-8 items-center">
        <div>
          <span className="inline-block font-montserrat uppercase tracking-[0.3em] text-[10px] text-gold border border-gold/50 rounded-full px-3 py-1 mb-3">
            Prochain événement
          </span>
          {event.tagline && (
            <p className="font-greatvibes text-gold text-2xl leading-none mb-1">{event.tagline}</p>
          )}
          <h3 className="font-cormorant text-2xl md:text-3xl font-semibold leading-tight mb-3">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-3 text-xs opacity-85 mb-3">
            <span>{formatEventDate(event.date)}{event.time ? ` · ${event.time}` : ''}</span>
            <span className="before:content-['•_'] before:text-gold">{event.location}</span>
            {event.price && (
              <span className="before:content-['•_'] before:text-gold">{event.price}</span>
            )}
          </div>
          {event.description && (
            <p className="text-sm opacity-85 leading-relaxed mb-4 line-clamp-3">
              {event.description}
            </p>
          )}
          <span className="inline-block bg-gold text-white px-5 py-2 rounded-md font-source text-xs uppercase tracking-widest">
            {event.reservationUrl ? 'Réserver ma place →' : 'En savoir plus →'}
          </span>
        </div>

        <div className="relative">
          {event.guest?.photo ? (
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={event.guest.photo}
                alt={event.guest.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ) : (
            <EventOrnament variant="hero" />
          )}
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Créer src/lib/format.ts pour formatEventDate**

```typescript
// src/lib/format.ts
const MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** "2026-06-16" → "16 juin" */
export function formatEventDate(iso: string): string {
  const [, m, d] = iso.split('-').map(Number) as [number, number, number];
  return `${d} ${MONTHS_FR[m - 1]}`;
}

/** "2026-06-16" → { day: "16", month: "Juin" } pour les cartes souvenir */
export function splitEventDate(iso: string): { day: string; month: string } {
  const [, m, d] = iso.split('-').map(Number) as [number, number, number];
  const month = MONTHS_FR[m - 1];
  return { day: String(d), month: month.charAt(0).toUpperCase() + month.slice(1) };
}
```

- [ ] **Step 3: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 4: Commit**

```bash
git add src/components/events/EventHero.tsx src/lib/format.ts
git commit -m "✨ Add EventHero component for next upcoming event"
```

---

### Task C5: Composant UpcomingStrip (bloc "Et après…")

**Files:**
- Create: `src/components/events/UpcomingStrip.tsx`

- [ ] **Step 1: Créer UpcomingStrip.tsx**

```typescript
// src/components/events/UpcomingStrip.tsx
import type { ImpulseEvent } from '@/lib/types';
import { formatEventDate } from '@/lib/format';

type Props = { events: ImpulseEvent[] };

export default function UpcomingStrip({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between border-b border-navy/10 pb-2 mb-4">
        <h4 className="font-cormorant text-lg font-semibold text-navy">Et après…</h4>
        <span className="font-montserrat uppercase tracking-[0.2em] text-[9px] text-gold">
          Mis à jour automatiquement
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {events.slice(0, 3).map(event => (
          <a
            key={event.slug}
            href={`/evenements/${event.slug}`}
            className="bg-gradient-to-b from-cream to-rose/40 rounded-xl p-4 border-l-2 border-transparent hover:border-gold transition-all min-h-[120px] flex flex-col justify-between"
          >
            <div>
              <div className="font-montserrat uppercase tracking-[0.2em] text-[10px] text-gold">
                {formatEventDate(event.date)}
              </div>
              {event.tagline && (
                <div className="font-greatvibes text-gold text-lg leading-none mt-0.5">
                  {event.tagline}
                </div>
              )}
              <h5 className="font-cormorant font-semibold text-base text-navy leading-tight mt-0.5">
                {event.title}
              </h5>
            </div>
            <div className={event.location ? 'text-xs text-navy/65 mt-2' : 'text-xs italic text-navy/40 mt-2'}>
              {event.location || 'Lieu à confirmer'}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 3: Commit**

```bash
git add src/components/events/UpcomingStrip.tsx
git commit -m "✨ Add UpcomingStrip component for next events"
```

---

### Task C6: Composants SouvenirCard et SouvenirsCarousel

**Files:**
- Create: `src/components/events/SouvenirCard.tsx`
- Create: `src/components/events/SouvenirsCarousel.tsx`

- [ ] **Step 1: Créer SouvenirCard.tsx**

```typescript
// src/components/events/SouvenirCard.tsx
import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import EventOrnament from './EventOrnament';
import { splitEventDate } from '@/lib/format';

type Props = { event: ImpulseEvent };

export default function SouvenirCard({ event }: Props) {
  const { day, month } = splitEventDate(event.date);
  const photoCount = event.gallery?.length ?? 0;

  return (
    <a
      href={`/evenements/${event.slug}`}
      className="flex-none w-60 bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform snap-start"
    >
      <div className="relative h-36 overflow-hidden">
        {event.coverPhoto ? (
          <>
            <Image
              src={event.coverPhoto}
              alt={event.title}
              fill
              className="object-cover"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
            {photoCount > 0 && (
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur text-white text-[10px] px-2 py-1 rounded-full">
                📷 {photoCount} photos
              </div>
            )}
            <div className="absolute bottom-2.5 left-2.5 font-montserrat uppercase tracking-[0.25em] text-[9.5px] text-white">
              {day} {month} {event.date.slice(0, 4)}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark">
            <EventOrnament variant="cover" day={day} month={month} />
          </div>
        )}
      </div>

      <div className="p-3.5">
        <div className="font-greatvibes text-gold text-base leading-none">retour sur</div>
        <h4 className="font-cormorant font-semibold text-[15px] text-navy leading-tight mt-0.5">
          {event.title}
        </h4>
        {event.summary ? (
          <p className="text-[11.5px] text-navy/65 mt-1.5 leading-relaxed line-clamp-2">
            {event.summary}
          </p>
        ) : (
          <p className="text-[11.5px] italic text-navy/50 mt-1.5 flex items-center gap-1.5 before:content-[''] before:inline-block before:w-4 before:h-px before:bg-gold">
            Une édition Impulse Night
          </p>
        )}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Créer SouvenirsCarousel.tsx**

```typescript
// src/components/events/SouvenirsCarousel.tsx
import type { ImpulseEvent } from '@/lib/types';
import SouvenirCard from './SouvenirCard';

type Props = { events: ImpulseEvent[] };

export default function SouvenirsCarousel({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <div className="mt-8 bg-gradient-to-b from-white to-rose/60 rounded-2xl p-5 md:p-6">
      <div className="text-center mb-5">
        <p className="font-greatvibes text-gold text-2xl leading-none">les éditions passées</p>
        <h3 className="font-cormorant font-semibold text-2xl text-navy">Souvenirs</h3>
        <p className="text-sm text-navy/70 mt-1">Revivez les soirées qui ont marqué la communauté.</p>
      </div>

      <div className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-2 px-2">
        {events.map(event => (
          <SouvenirCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 4: Commit**

```bash
git add src/components/events/SouvenirCard.tsx src/components/events/SouvenirsCarousel.tsx
git commit -m "✨ Add SouvenirCard and SouvenirsCarousel components"
```

---

### Task C7: EventsSection + intégration dans page.tsx (remplace Calendar)

**Files:**
- Create: `src/components/events/EventsSection.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/components/Calendar.tsx`

- [ ] **Step 1: Créer EventsSection.tsx — composant client pour la partition runtime**

```typescript
// src/components/events/EventsSection.tsx
'use client';

import { useEffect, useState } from 'react';
import type { ImpulseEvent } from '@/lib/types';
import { partitionEvents } from '@/lib/partition';
import EventHero from './EventHero';
import UpcomingStrip from './UpcomingStrip';
import SouvenirsCarousel from './SouvenirsCarousel';

type Props = { events: ImpulseEvent[] };

export default function EventsSection({ events }: Props) {
  // Partition initiale calculée au build (date de build). Hydratée côté client avec la vraie date du jour.
  const [{ upcoming, past }, setPartition] = useState(() => partitionEvents(events, new Date()));

  useEffect(() => {
    setPartition(partitionEvents(events, new Date()));
  }, [events]);

  const noEvents = upcoming.length === 0 && past.length === 0;
  if (noEvents) return null;

  const next = upcoming[0] ?? null;
  const afterNext = upcoming.slice(1, 4);

  return (
    <section id="evenements" className="snap-section section bg-white">
      <div className="container-impulse px-4 h-full flex flex-col justify-center py-12">
        <div className="text-center mb-8">
          <p className="font-montserrat uppercase tracking-[0.3em] text-[11px] text-navy/70">
            Les rendez-vous Impulse
          </p>
          <p className="font-greatvibes text-gold text-3xl leading-none mt-1">une fois par mois</p>
          <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-navy">Événements</h2>
          <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mx-auto mt-2" />
        </div>

        <EventHero event={next} />
        <UpcomingStrip events={afterNext} />
        <SouvenirsCarousel events={past} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modifier page.tsx pour charger les événements et remplacer Calendar par EventsSection**

```typescript
// src/app/page.tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// ... autres imports
import EventsSection from '@/components/events/EventsSection';

import {
  getHero, getMission, getProblem, getSolution, getPillars,
  getAudience, getHowItWorks, getBenefits, getTeam, getTestimonials,
  getContact, getSettings,
} from '@/lib/content';
import { getAllEvents } from '@/lib/events';

export default function Home() {
  const hero = getHero();
  // ... tous les autres get* déjà ajoutés en phase B
  const settings = getSettings();
  const contact = getContact();
  const events = getAllEvents();

  return (
    <>
      <Header settings={settings} />
      <main className="snap-container">
        <Hero content={hero} />
        <Mission content={mission} />
        <Problem content={problem} />
        <Solution content={solution} />
        <Pillars content={pillars} />
        <Audience content={audience} />
        <HowItWorks content={howItWorks} />
        <EventsSection events={events} />
        <Benefits content={benefits} />
        <Team content={team} />
        <Testimonials content={testimonials} />
        <Contact content={contact} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
```

Note : retire l'import de `Calendar`.

- [ ] **Step 3: Supprimer le composant Calendar**

```bash
git rm src/components/Calendar.tsx
```

- [ ] **Step 4: Vérifier le build (sans encore avoir d'événements concrets)**

Run: `pnpm run build`
Expected: 0 erreur. Le `out/` ne contient pas d'erreur (la section Événements est masquée puisqu'aucun event).

- [ ] **Step 5: Commit**

```bash
git add src/components/events/EventsSection.tsx src/app/page.tsx
git commit -m "♻️ Replace Calendar with EventsSection (no events yet)"
```

---

### Task C8: Page détail /evenements/[slug]

**Files:**
- Create: `src/app/evenements/[slug]/page.tsx`
- Create: `src/components/events/EventDetail.tsx`
- Create: `src/components/events/EventGallery.tsx`

- [ ] **Step 1: Créer EventGallery.tsx (sans lightbox pour l'instant — vient en C9)**

```typescript
// src/components/events/EventGallery.tsx
import Image from 'next/image';

type Props = { photos: string[]; title: string };

export default function EventGallery({ photos, title }: Props) {
  if (photos.length === 0) return null;

  return (
    <section className="px-6 md:px-8 pb-6 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-navy/70">
          Galerie
        </h3>
        <span className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold">
          {photos.length} photo{photos.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((src, i) => (
          <div
            key={src}
            className={`relative overflow-hidden rounded-lg ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3]' : 'aspect-square'}`}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Créer EventDetail.tsx**

```typescript
// src/components/events/EventDetail.tsx
import Image from 'next/image';
import type { ImpulseEvent } from '@/lib/types';
import { formatEventDate } from '@/lib/format';
import EventGallery from './EventGallery';

type Props = { event: ImpulseEvent; isPast: boolean };

export default function EventDetail({ event, isPast }: Props) {
  const monthLabel = new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const crumbCategory = isPast ? 'Souvenirs' : 'Événements';
  const hasGallery = (event.gallery?.length ?? 0) > 0;
  const hasContent = event.description || hasGallery || event.summary;

  return (
    <article className="min-h-screen bg-white">
      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-white p-6 md:p-10">
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.18), transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto">
          <a href="/" className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold/85 hover:text-gold">
            ← {crumbCategory} / {monthLabel}
          </a>
          {isPast && (
            <div className="mt-3">
              <span className="inline-block bg-white/10 border border-white/20 text-white font-montserrat uppercase tracking-[0.25em] text-[9px] px-3 py-1 rounded-full">
                Événement passé
              </span>
            </div>
          )}
          {event.tagline && (
            <p className="font-greatvibes text-gold text-2xl leading-none mt-3">{event.tagline}</p>
          )}
          <h1 className="font-cormorant text-3xl md:text-4xl font-semibold leading-tight mt-1">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs opacity-85 mt-3">
            <span>{formatEventDate(event.date)}{event.time ? ` · ${event.time}` : ''}</span>
            <span className="before:content-['•_'] before:text-gold">{event.location}</span>
            {event.guest && (
              <span className="before:content-['•_'] before:text-gold">Avec {event.guest.name}</span>
            )}
          </div>
          {!isPast && event.reservationUrl && (
            <a
              href={event.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-6 py-2.5 rounded-md font-source text-xs uppercase tracking-widest mt-5"
            >
              Réserver ma place →
            </a>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="max-w-3xl mx-auto">
        {event.description ? (
          <p className="font-cormorant italic text-base md:text-lg text-navy/85 leading-relaxed border-l-2 border-gold pl-4 m-6 md:m-8">
            {event.description}
          </p>
        ) : (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 text-navy/40">
              <span className="w-8 h-px bg-gold/50" />
              <em className="font-greatvibes text-gold text-xl not-italic opacity-70">I</em>
              <span className="w-8 h-px bg-gold/50" />
            </div>
          </div>
        )}

        {/* Photo invitée pleine largeur */}
        {event.guest?.photo && (
          <div className="px-6 md:px-8 mb-6">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
              <Image src={event.guest.photo} alt={event.guest.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
            {event.guest.role && (
              <p className="text-center text-sm text-navy/65 mt-2">
                <span className="font-cormorant font-semibold">{event.guest.name}</span> — {event.guest.role}
              </p>
            )}
          </div>
        )}

        <EventGallery photos={event.gallery ?? []} title={event.title} />

        {event.summary && (
          <div className="mx-6 md:mx-8 mb-8 bg-gradient-to-br from-cream to-rose p-5 rounded-xl border-l-4 border-gold">
            <div className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold mb-2">
              Résumé de la soirée
            </div>
            <p className="font-cormorant italic text-base text-navy/85 leading-relaxed">
              {event.summary}
            </p>
          </div>
        )}

        {/* Fallback : événement passé sans aucun contenu enrichi */}
        {isPast && !hasContent && (
          <div className="text-center py-10 px-6 bg-gradient-to-b from-white to-rose">
            <p className="font-greatvibes text-gold text-2xl leading-none">à très vite</p>
            <h2 className="font-cormorant font-semibold text-xl text-navy mt-1">
              Une nouvelle édition chaque mois
            </h2>
            <p className="text-sm text-navy/70 mt-2 max-w-md mx-auto">
              Les souvenirs photos arrivent bientôt. En attendant, retrouvez-nous pour la prochaine soirée.
            </p>
            <div className="w-10 h-px bg-gold mx-auto mt-4" />
          </div>
        )}

        <div className="text-center py-8">
          <a href="/" className="inline-block font-montserrat uppercase tracking-[0.25em] text-[11px] text-navy/70 hover:text-gold">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Créer la route /evenements/[slug]/page.tsx**

```typescript
// src/app/evenements/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllEvents, getEventBySlug } from '@/lib/events';
import { partitionEvents } from '@/lib/partition';
import EventDetail from '@/components/events/EventDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSettings } from '@/lib/content';

export function generateStaticParams() {
  return getAllEvents().map(event => ({ slug: event.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  // Partition au build : utilisée pour l'affichage initial du badge "passé"
  // Sera réajustée côté client si on veut absolument la date du jour,
  // mais pour la page détail c'est suffisant (l'événement est rarement le jour même du build)
  const { past } = partitionEvents([event], new Date());
  const isPast = past.length > 0;

  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <EventDetail event={event} isPast={isPast} />
      <Footer settings={settings} />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title} — Impulse`,
    description: event.description ?? `Événement Impulse — ${event.location}`,
  };
}
```

- [ ] **Step 4: Build pour vérifier les routes générées**

Run: `pnpm run build`
Expected: 0 erreur. Comme aucun événement n'existe encore, `generateStaticParams` retourne `[]` — pas de page générée.

- [ ] **Step 5: Commit**

```bash
git add src/app/evenements src/components/events/EventDetail.tsx src/components/events/EventGallery.tsx
git commit -m "✨ Add /evenements/[slug] detail page with rich content"
```

---

### Task C9: Lightbox pour la galerie

**Files:**
- Modify: `src/components/events/EventGallery.tsx`
- Create: `src/components/events/Lightbox.tsx`

- [ ] **Step 1: Créer Lightbox.tsx**

```typescript
// src/components/events/Lightbox.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type Props = {
  photos: string[];
  index: number | null;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ photos, index, title, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 text-white/85 hover:text-white text-3xl leading-none"
      >
        ×
      </button>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Photo précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Photo suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl"
      >
        ›
      </button>
      <div
        className="relative w-full max-w-5xl aspect-[3/2]"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt={`${title} — photo ${index + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
        <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Modifier EventGallery pour utiliser le Lightbox**

Remplace `src/components/events/EventGallery.tsx` :

```typescript
// src/components/events/EventGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

type Props = { photos: string[]; title: string };

export default function EventGallery({ photos, title }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section className="px-6 md:px-8 pb-6 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-navy/70">
          Galerie
        </h3>
        <span className="font-montserrat uppercase tracking-[0.25em] text-[10px] text-gold">
          {photos.length} photo{photos.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`relative overflow-hidden rounded-lg group ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3]' : 'aspect-square'}`}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={openIndex}
        title={title}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex(i => i === null ? null : (i - 1 + photos.length) % photos.length)}
        onNext={() => setOpenIndex(i => i === null ? null : (i + 1) % photos.length)}
      />
    </section>
  );
}
```

- [ ] **Step 3: Vérifier**

Run: `pnpm exec tsc --noEmit`
Expected: 0 erreur.

Run: `pnpm run build`
Expected: 0 erreur.

- [ ] **Step 4: Commit**

```bash
git add src/components/events/EventGallery.tsx src/components/events/Lightbox.tsx
git commit -m "✨ Add keyboard-navigable lightbox for event galleries"
```

---

### Task C10: Migrer les 6 événements initiaux

**Files:**
- Create: `content/events/2026-01-objectif-2026.md`
- Create: `content/events/2026-02-facturation.md`
- Create: `content/events/2026-03-vitalite.md`
- Create: `content/events/2026-04-vente-prospection.md`
- Create: `content/events/2026-05-ia.md`
- Create: `content/events/2026-06-impulse-night-juin.md`

- [ ] **Step 1: Créer les 6 fichiers markdown**

Reprendre les données de l'ancien `Calendar.tsx` (sauvegardées dans l'historique git). Chaque fichier ressemble à :

```markdown
---
title: "Objectif 2026"
date: 2026-01-15
location: "Barcelona"
tagline: "on prend les commandes"
description: |
  Repartez avec une vision claire de 2026, des priorités assumées et un plan d'actions
  réaliste pour piloter votre business sans vous éparpiller.
---
```

Fais l'équivalent pour :
- `2026-02-facturation.md` : "Facturation & recouvrement", date 2026-02-15
- `2026-03-vitalite.md` : "Vitalité & business", date 2026-03-15
- `2026-04-vente-prospection.md` : "Vente & prospection", date 2026-04-15
- `2026-05-ia.md` : "Intelligence artificielle", date 2026-05-15
- `2026-06-impulse-night-juin.md` : "IMPULSE Night", date 2026-06-15

Note : la description vient du tableau `events` de l'ancien `Calendar.tsx` (voir `git log`).

- [ ] **Step 2: Build complet**

Run: `pnpm run build`
Expected: 6 pages générées dans `out/evenements/<slug>/index.html`. Vérifier avec :

```bash
ls out/evenements/
```

Expected: 6 dossiers.

- [ ] **Step 3: Dev — vérifier l'affichage**

Run: `pnpm run dev`
Ouvre http://localhost:3000 → la section Événements doit maintenant afficher :
- Hero "Prochain événement" = celui de juin (selon date du jour 12 mai 2026)
- "Et après…" = vide (un seul événement à venir)
- Souvenirs = janvier, février, mars, avril (4 cartes), affichées avec l'ornement (pas de photos)

Ouvre http://localhost:3000/evenements/2026-06-impulse-night-juin → page détail affichée correctement.

- [ ] **Step 4: Commit**

```bash
git add content/events/
git commit -m "📅 Migrate 6 initial events from Calendar component"
```

---

### Task C11: Collection events dans Decap config

**Files:**
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Ajouter la collection events**

Édite `public/admin/config.yml` et ajoute après la collection `homepage` :

```yaml
  - name: 'events'
    label: 'Événements'
    label_singular: 'Événement'
    folder: 'content/events'
    create: true
    slug: '{{year}}-{{month}}-{{slug}}'
    format: 'frontmatter'
    extension: 'md'
    summary: "{{date | date('YYYY-MM-DD')}} — {{title}}"
    sortable_fields: ['date', 'title']
    view_filters:
      - label: 'À venir'
        field: date
        pattern: '^2027|^2026-1[0-2]|^2026-0[6-9]'
      - label: 'Passés'
        field: date
        pattern: '^2026-0[1-5]|^2025'
    fields:
      # Obligatoires
      - { label: 'Titre', name: 'title', widget: 'string' }
      - { label: 'Date', name: 'date', widget: 'datetime', date_format: 'YYYY-MM-DD', time_format: false, format: 'YYYY-MM-DD' }
      - { label: 'Lieu', name: 'location', widget: 'string' }
      # Optionnels — pratique
      - { label: 'Heure (ex. 19h)', name: 'time', widget: 'string', required: false }
      - { label: 'Prix / mention tarifaire', name: 'price', widget: 'string', required: false }
      - { label: 'Lien de réservation', name: 'reservationUrl', widget: 'string', required: false, hint: 'URL externe (Linktree, Eventbrite, etc.)' }
      # Optionnels — contenu éditorial
      - { label: 'Tagline (script doré au-dessus du titre)', name: 'tagline', widget: 'string', required: false, hint: 'Ex. "une soirée pour"' }
      - { label: 'Description / chapeau', name: 'description', widget: 'text', required: false }
      - { label: 'Photo de couverture', name: 'coverPhoto', widget: 'image', required: false, hint: 'Utilisée dans le carrousel Souvenirs' }
      # Invitée
      - label: 'Invitée (optionnel)'
        name: 'guest'
        widget: 'object'
        required: false
        collapsed: true
        fields:
          - { label: 'Nom', name: 'name', widget: 'string' }
          - { label: 'Rôle / titre', name: 'role', widget: 'string', required: false }
          - { label: 'Photo', name: 'photo', widget: 'image', required: false }
      # Post-événement
      - label: 'Galerie photos (à remplir après la soirée)'
        name: 'gallery'
        widget: 'list'
        required: false
        field: { label: 'Photo', name: 'photo', widget: 'image' }
      - { label: 'Résumé / debrief de la soirée', name: 'summary', widget: 'text', required: false, hint: 'À remplir après l''événement' }
```

- [ ] **Step 2: Vérifier le YAML est valide**

Run: `pnpm run build`
Expected: build successful — le fichier config.yml est juste copié dans `out/admin/`.

- [ ] **Step 3: Commit**

```bash
git add public/admin/config.yml
git commit -m "🔧 Add events collection to Decap config"
```

---

### Task C12: Vérification finale Phase C

**Files:** aucun changement.

- [ ] **Step 1: Tests unitaires**

Run: `pnpm test`
Expected: 5 tests passent (partition).

- [ ] **Step 2: Lint**

Run: `pnpm run lint`
Expected: 0 erreur.

- [ ] **Step 3: Build statique complet**

Run: `pnpm run build`
Expected: 0 erreur, dossier `out/` contient :
- `out/index.html` (home)
- `out/admin/index.html` + `out/admin/config.yml`
- `out/evenements/<slug>/index.html` × 6
- `out/images/uploads/` (vide pour l'instant)

- [ ] **Step 4: Smoke test manuel**

Run: `pnpm run dev`

Checklist visuelle :
- [ ] Home — section Événements à la place de Calendar
- [ ] Hero "Prochain événement" = celui de juin, ornement doré (pas de photo invitée pour l'instant)
- [ ] "Et après…" = masqué (un seul à venir)
- [ ] Souvenirs = 4 cartes (janvier→avril), ornement avec chiffre+mois
- [ ] Cliquer sur une carte souvenir → page détail
- [ ] Page détail d'un événement passé sans contenu → fallback "Une nouvelle édition chaque mois" affiché
- [ ] Page détail de l'événement de juin → CTA "Réserver" masqué (pas de reservationUrl pour l'instant) — c'est OK
- [ ] Lien "Retour à l'accueil" en bas fonctionne
- [ ] Cliquer sur le hero → page détail de juin
- [ ] Aucune erreur dans la console

- [ ] **Step 5: Test du basculement (simuler)**

Modifie temporairement la date dans `content/events/2026-06-impulse-night-juin.md` à `2026-05-01`, recharge la page. L'événement de juin doit basculer en Souvenirs et un autre devient "Prochain" (mai). Remets la date à `2026-06-15` après vérification.

- [ ] **Step 6: Taguer la fin de phase C**

```bash
git tag phase-c-complete
```

- [ ] **Step 7: Note finale**

Le système est complet côté code. Pour mettre Marina en autonomie complète :
1. Configurer l'auth Decap (DecapBridge ou Netlify Identity — voir README)
2. Pousser sur main, vérifier que GitHub Actions déploie
3. Faire un walkthrough avec Marina depuis `/admin`

---

## Récap structure finale

```
content/
├── settings.json
├── hero.json
├── mission.json
├── problem.json
├── solution.json
├── pillars.json
├── audience.json
├── how-it-works.json
├── benefits.json
├── team.json
├── testimonials.json
├── contact.json
└── events/
    └── 2026-*.md (× 6 initiaux)

public/admin/
├── index.html         (shell Decap CDN)
└── config.yml         (collections homepage, settings, events)

public/images/uploads/  (médias uploadés depuis Decap)

src/
├── lib/
│   ├── types.ts        (HeroContent, ImpulseEvent, etc.)
│   ├── content.ts      (loaders JSON)
│   ├── events.ts       (loader markdown)
│   ├── partition.ts    (upcoming/past pure fn)
│   ├── partition.test.ts
│   └── format.ts       (formatEventDate, splitEventDate)
├── components/
│   ├── (Hero, Mission, …, Footer modifiés pour recevoir content en props)
│   └── events/
│       ├── EventsSection.tsx       (client, partition runtime)
│       ├── EventHero.tsx
│       ├── UpcomingStrip.tsx
│       ├── SouvenirsCarousel.tsx
│       ├── SouvenirCard.tsx
│       ├── EventOrnament.tsx       (fallback ornement)
│       ├── EventDetail.tsx
│       ├── EventGallery.tsx        (client, ouvre Lightbox)
│       └── Lightbox.tsx            (client)
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── evenements/
        └── [slug]/
            └── page.tsx
```

Composant `Calendar.tsx` supprimé.
