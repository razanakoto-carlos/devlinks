# DevLinks — Annuaire de Développeurs

> Crée ton profil public, expose tes compétences et tes projets, et fais-toi trouver.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## Présentation

DevLinks est une plateforme fullstack d'annuaire de développeurs. Les développeurs peuvent créer leur profil public, mettre en avant leurs compétences et projets, et être découverts par des recruteurs ou des équipes.

## Stack technique

| Couche          | Technologie                  |
|-----------------|------------------------------|
| Frontend        | Next.js 14 (App Router)      |
| Langage         | TypeScript                   |
| Style           | Tailwind CSS + shadcn/ui     |
| Auth            | NextAuth.js (Google, GitHub) |
| ORM             | Prisma                       |
| Base de données | PostgreSQL                   |
| Stockage        | Cloudinary (upload avatar)   |

## Installation

### Prérequis

- Node.js 18+
- Une base de données PostgreSQL
- Identifiants OAuth Google & GitHub

### Lancer le projet

```bash
# Cloner le repo
git clone https://github.com/razanakoto-carlos/devlinks.git
cd devlinks

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# Pousser le schéma Prisma
npx prisma db push

# Lancer le serveur de développement
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) pour voir l'application.

## Variables d'environnement

```bash
# .env.example

DATABASE_URL=postgresql://user:password@localhost:5432/devlinks

```
