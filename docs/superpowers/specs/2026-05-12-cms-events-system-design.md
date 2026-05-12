# CMS Decap + système d'événements — Design

**Date :** 2026-05-12
**Statut :** Validé, prêt pour le plan d'implémentation

## Contexte

Aujourd'hui le site Impulse est un Next.js 16 en static export avec tout le contenu codé en dur dans les composants React (Hero, Mission, Calendar, Team, etc.). Marina ne peut rien modifier sans intervention dev.

Elle anime par ailleurs des soirées mensuelles "IMPULSE Night" qu'elle communique sur LinkedIn avec des posts riches (titre, invitée, histoire, lieu, prix, lien de réservation). Aujourd'hui le site n'expose qu'un calendrier annuel statique avec un thème par mois, sans détail par événement.

## Objectifs

1. **Rendre tout le contenu du site éditable** par Marina via Decap CMS (git-based, gratuit, parfait pour static export).
2. **Permettre à Marina de publier des événements** avec lien statique par événement (ex. `/evenements/impulse-night-juin-2026`).
3. **Bascule automatique** d'un événement de "à venir" vers "passé" le lendemain de sa date, sans intervention manuelle ni rebuild.
4. **Section "Souvenirs"** sur la home et page détail enrichie avec photos + résumé optionnels.
5. **Robustesse visuelle** : chaque bloc reste stylé même si l'événement n'a que les champs obligatoires (titre, date, lieu).

## Périmètre

### Inclus
- Configuration Decap CMS (`/admin`) avec authentification (DecapBridge ou Netlify Identity — choix lors du setup).
- Migration du contenu existant (Hero, Mission, Calendar, Team, Pillars, Audience, HowItWorks, Benefits, Testimonials, Contact, Footer, settings) vers des fichiers JSON dans `content/`.
- Nouvelle collection `events` (un fichier markdown ou JSON par événement).
- Remplacement de la section Calendar actuelle par une nouvelle section Événements (3 blocs : Hero "Prochain", "Et après…", "Souvenirs").
- Pages détail statiques par événement : `/evenements/[slug]`.
- Mécanisme de bascule à venir → passé côté client (au chargement de page).

### Hors périmètre
- Système d'inscription/paiement intégré (les résa restent gérées par lien externe : Linktree, Eventbrite, etc.).
- Système d'authentification multi-utilisateurs côté admin (un seul rôle : Marina).
- Notifications email automatiques.
- Recherche/filtres sur les événements passés.

## Architecture

### Stack
- **CMS :** Decap CMS v3 chargé en CDN dans `public/admin/index.html`, config dans `public/admin/config.yml`.
- **Auth :** à choisir au setup. DecapBridge recommandé (zéro infrastructure) ou Netlify Identity (si on veut héberger en parallèle sur Netlify).
- **Stockage contenu :** fichiers dans `content/` à la racine, commit Git par Decap via git-gateway.
- **Build :** Next.js 16 static export inchangé. Le contenu est lu au build via `import` JSON ou `fs.readFileSync` pour les fichiers markdown.
- **Déploiement :** GitHub Pages inchangé. Chaque save Decap déclenche un commit → GitHub Actions rebuild → mise en ligne en ~2 minutes.

### Structure du contenu

```
content/
├── settings.json              # nom site, email, social
├── hero.json                  # contenu Hero
├── mission.json               # Mission + manifesto
├── pillars.json               # 3 piliers
├── audience.json              # Public cible
├── how-it-works.json
├── benefits.json
├── team.json                  # membres fondatrices
├── testimonials.json
├── contact.json
├── footer.json
└── events/
    ├── 2026-06-impulse-night-juin.md
    ├── 2026-05-intelligence-artificielle.md
    └── 2026-04-vente-prospection.md
```

Chaque événement = un fichier markdown avec frontmatter YAML. Le slug est dérivé du nom de fichier.

### Schéma d'un événement

```yaml
---
# Obligatoires
title: "IMPULSE Night avec Emma Bénet"
date: 2026-06-16
location: "Espai Nu, Barcelona"

# Optionnels (enrichissent quand présents)
tagline: "une soirée pour"          # script doré au-dessus du titre
time: "19h"
price: "Tarif duo disponible"
reservationUrl: "https://lnkd.in/epwTwp5H"
coverPhoto: "/images/uploads/impulse-night-juin.jpg"
description: |
  Rencontre, business, gastronomie. Une soirée créée par et pour
  celles qui construisent, osent, avancent.
guest:
  name: "Emma Bénet"
  role: "Fondatrice de Doneuvi"
  photo: "/images/uploads/emma-benet.jpg"
gallery:
  - "/images/uploads/ia-mai-1.jpg"
  - "/images/uploads/ia-mai-2.jpg"
  # ... illimité
summary: |
  Sophie nous a partagé sa méthode pour intégrer l'IA dans le quotidien.
  On en est reparties avec 3 outils à tester dès le lendemain.
---
```

Aucun champ "isPast" ni "status" stocké : la bascule se calcule à la lecture (voir plus bas).

## Composants front

### Nouvelle section Événements (remplace `Calendar.tsx`)

Trois blocs verticaux dans une section snap unique :

**Bloc 1 — Hero "Prochain événement"**
- Carte navy avec dégradé doré radial
- Gauche : badge "Prochain événement", tagline scriptée, titre, méta (date, lieu, mention), description, CTA "Réserver ma place"
- Droite : photo invitée 4:5 si `guest.photo`. Sinon, ornement géométrique (cercles concentriques + "I" en Great Vibes).
- Si pas d'événement à venir du tout : on masque ce bloc.

**Bloc 2 — "Et après…"**
- 3 cartes max sur fond cream/rose, alignées sur les événements à venir suivants
- Chaque carte : date Montserrat, tagline scriptée optionnelle, titre Cormorant, lieu (ou "Lieu à confirmer" en italique discret si vide)
- Bloc masqué s'il n'y a pas de 2e événement à venir
- Petit label "Mis à jour automatiquement" en Montserrat doré

**Bloc 3 — "Souvenirs"**
- Titre central avec tagline scriptée
- Carrousel horizontal (scroll-snap) des événements passés, triés par date décroissante, illimité
- Chaque carte : cover photo si présente (avec overlay gradient + badge "12 photos"), sinon cover navy avec ornement (chiffre Cormorant + mois Montserrat doré). Body : tagline "retour sur", titre, summary tronqué (ou phrase fallback "Une édition Impulse Night")
- Bloc masqué s'il n'y a aucun événement passé

### Page détail `/evenements/[slug]`

Hero sombre navy + body + galerie + résumé.

- **Hero** : breadcrumb scripté doré (`Souvenirs / Mai 2026` ou `Événements / Juin 2026`), badge "Événement passé" si applicable, tagline scriptée, titre, méta (date, lieu, invitée), CTA résa si à venir ET `reservationUrl` présent.
- **Body** : `description` en chapeau italique Cormorant avec barre dorée à gauche. Si vide → ornement central doré (`— I —`).
- **Galerie** : grille adaptive (1 grande + 4 petites en pattern, extensible illimitée). Lightbox au clic. Masquée si `gallery` vide ou absente.
- **Résumé** : bloc cream/rose avec label Montserrat doré "Résumé de la soirée" + texte italique Cormorant. Masqué si `summary` absent.
- **Fallback final** : si l'événement passé n'a NI description NI galerie NI résumé, on affiche un bloc "Une nouvelle édition chaque mois" pour ne jamais avoir un trou.

### Mécanisme de bascule à venir → passé

**Décision : côté client au chargement**, pas au build.

Raison : le site n'est rebuilt qu'à chaque save Decap. Sans rebuild quotidien, un événement passerait toujours pour "à venir" jusqu'à la prochaine édition Decap. Côté client, on compare `event.date` avec `new Date()` :

```ts
const isPast = new Date(event.date) < startOfToday();
```

- Liste "à venir" = events filtrés `!isPast`, triés date croissante
- Liste "passés" (souvenirs) = events filtrés `isPast`, triés date décroissante
- Aucune intervention de Marina, aucune cron, aucun rebuild forcé

**Effet de bord SSG :** le HTML statique peut afficher un état périmé pendant quelques secondes au premier chargement (avant l'hydratation React). C'est acceptable. Si on veut zéro flash, on peut rendre la partition côté serveur au build (date au moment du build) ET côté client (date réelle) — React réconcilie. À implémenter dans le plan.

## Configuration Decap

`public/admin/config.yml` étend la base WebsiteBuilder avec :
- Collection `homepage` avec un fichier par section (hero, mission, pillars, audience, etc.)
- Collection `events` (type `folder`, chemin `content/events`, slug auto basé sur `date + title`)
- Collection `settings` (site name, social, email)
- Media folder `public/images/uploads` (par défaut Decap)

Auth : configurée via `/setup-cms` au moment de l'installation (DecapBridge ou Netlify Identity).

## Robustesse contenu pauvre

Règle générale : **chaque champ optionnel a un fallback visuel élégant**, pas une absence brute.

- Pas de photo invitée → ornement géométrique doré
- Pas de description → chapeau ornemental doré centré
- Pas de galerie → section masquée
- Pas de summary → section masquée
- Pas de coverPhoto sur carte souvenir → cover navy avec ornement chiffre+mois
- Lieu vide sur carte à venir → texte italique discret "Lieu à confirmer"
- Aucun événement à venir → bloc Hero masqué (on garde Souvenirs)
- Aucun événement passé → bloc Souvenirs masqué (on garde Hero + À venir)
- Aucun événement du tout → section Événements entière masquée

Tous les champs obligatoires (title, date, location) sont garantis remplis par la validation Decap (`required: true`).

## Migration

L'ancien tableau hardcodé dans `Calendar.tsx` (6 entrées : janvier→juin avec thème + description) est migré en 6 événements markdown initiaux. Les dates sont fixées au 15 du mois correspondant (modifiable par Marina ensuite). Comme on est le 12 mai 2026, janvier→avril basculeront immédiatement en "Souvenirs", mai et juin restent "à venir".

## Décisions tranchées

| Décision | Choix |
|---|---|
| Layout événements | Option B enrichie (Hero + À venir + Souvenirs) |
| Galerie photos | Illimitée, lightbox au clic |
| Résumé post-event | Champ `summary` neutre (pas "Mot de Marina") |
| Bascule passé/à venir | Côté client, au chargement, comparée à `new Date()` |
| Page archive séparée | Non — le carrousel Souvenirs suffit pour le volume attendu |
| Réservations | Lien externe, pas d'intégration |
| Auth Decap | À choisir au moment du setup (DecapBridge ou Netlify Identity) |

## Critères de réussite

1. Marina peut créer un événement complet depuis `/admin` sans toucher au code.
2. Un événement avec uniquement titre + date + lieu s'affiche aussi bien qu'un événement complet.
3. Le lendemain d'un événement, il passe automatiquement dans Souvenirs (vérifié en changeant l'horloge système).
4. Toutes les sections existantes du site (Hero, Mission, Pillars, etc.) sont éditables depuis Decap.
5. Le build statique fonctionne (pnpm build) et le site se déploie sur GitHub Pages comme avant.
6. Aucune régression visuelle sur les sections existantes après migration vers le contenu JSON.
