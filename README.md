# DevLinks — Annuaire de Développeurs

> Crée ton profil public, expose tes compétences et tes projets, et fais-toi trouver.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=flat-square&logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel)

---

## Présentation

**DevLinks** est une plateforme fullstack d'annuaire de développeurs. Les développeurs créent leur profil public, mettent en avant leurs compétences et projets, et se rendent visibles auprès de recruteurs ou d'équipes.

### Fonctionnalités

- **Profil public** — nom, rôle, bio, localisation, disponibilité
- **Compétences** — liste de skills avec niveau
- **Projets** — titre, description, lien, image
- **Liens sociaux** — GitHub, LinkedIn, Portfolio
- **Annuaire** — liste paginée avec recherche et filtres par compétence
- **Authentification** — connexion via Google et GitHub (Better Auth)
- **Avatar** — upload et hébergement via Cloudinary

---

## Stack technique

| Couche          | Technologie                        |
|-----------------|------------------------------------|
| Framework       | Next.js 14 (App Router)            |
| Langage         | TypeScript                         |
| Style           | Tailwind CSS + shadcn/ui           |
| Auth            | Better Auth (Google, GitHub OAuth) |
| ORM             | Prisma                             |
| Base de données | PostgreSQL                         |
| Stockage        | Cloudinary (upload avatar)         |
| Déploiement     | Vercel                             |

---

## Structure du projet

```
devlinks/
├── app/                   # Routes Next.js App Router
│   ├── (auth)/            # Pages login / register
│   ├── (dashboard)/       # Pages profil authentifiées
│   └── page.tsx           # Annuaire public
├── components/            # Composants React
├── lib/
│   ├── actions/           # Server Actions (Next.js)
│   └── prisma.ts          # Client Prisma
├── generated/prisma/      # Client Prisma généré
├── prisma/
│   └── schema.prisma      # Schéma de la base de données
└── types/                 # Types TypeScript partagés
```

---

## Installation

### Prérequis

- Node.js 18+
- Une base de données PostgreSQL
- Un compte [Cloudinary](https://cloudinary.com) (upload avatar)
- Identifiants OAuth Google & GitHub

### Lancer le projet

```bash
# 1. Cloner le repo
git clone https://github.com/razanakoto-carlos/devlinks.git
cd devlinks

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# 4. Pousser le schéma Prisma
npx prisma db push

# 5. Générer le client Prisma
npx prisma generate

# 6. Lancer le serveur de développement
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) pour voir l'application.

---

## Variables d'environnement

```bash
# .env.example

# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/devlinks

# Better Auth
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

# OAuth Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OAuth GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
---

## Licence

MIT