# MedLink DZ

Plateforme d'entraide médicale pour l'Algérie — mise en relation entre personnes ayant des médicaments inutilisés et celles qui en ont besoin.

## Repo layout

```
MedLinkDZ/
├── frontend/     React + Vite (port 5173)
└── backend/      Express + PostgreSQL (port 5000)
```

Each side is self-contained with its own `package.json`, `.env`, and dependencies.

## Quick start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+ (or Docker)

### 1. Backend

```bash
cd backend
cp .env.example .env          # fill in DATABASE_URL and JWT_SECRET
npm install
# Initialize DB (once):
psql $DATABASE_URL -f DataBase/schema.sql
npm run dev                   # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env          # set VITE_API_URL=http://localhost:5000
npm install
npm run dev                   # http://localhost:5173
```

### Run both at once (from repo root)

```bash
npm install                   # installs `concurrently`
npm run dev                   # starts backend + frontend
```

## Documentation

- **API reference**: [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md)
- **Database schema**: [`backend/DataBase/schema.sql`](backend/DataBase/schema.sql)
- **Class diagram**: [`backend/DataBase/Class Diagram.pdf`](backend/DataBase/Class%20Diagram.pdf)

## Tech stack

**Frontend** — React 19, React Router 7, Vite, Framer Motion, Lucide, Axios
**Backend** — Express 4, PostgreSQL (pg), JWT, bcryptjs, multer

## Branches

- `main` — stable
- feature branches → PR → `main`
