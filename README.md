
<div align="center">

# 🏥 MedLink DZ 💊

### Plateforme algérienne de partage de médicaments

Relier les personnes ayant des médicaments non utilisés  
avec celles qui en ont besoin — à travers les **58 wilayas d’Algérie 🇩🇿**

<br/>

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Academic%20Project-purple?style=for-the-badge)

</div>

---

## ✨ Aperçu

**MedLink DZ** est une plateforme web full-stack permettant aux citoyens algériens de :

- 📢 Publier des annonces de médicaments
- 🔍 Rechercher des médicaments disponibles
- 🏥 Aider les personnes dans le besoin
- ⚖️ Garantir la sécurité via un système de modération

Le projet couvre les **58 wilayas algériennes** avec une architecture moderne basée sur :

- ⚛️ React + Vite
- 🚀 Node.js + Express
- 🐘 PostgreSQL
- 🔐 JWT Authentication

---

# 📚 Table des matières

- [🚀 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technologies](#️-technologies)
- [⚙️ Installation](#️-installation)
- [🔐 Configuration](#-configuration)
- [🗄️ Base de données](#️-base-de-données)
- [▶️ Lancement](#️-lancement)
- [📁 Structure du projet](#-structure-du-projet)
- [📡 API Reference](#-api-reference)
- [👥 Rôles & Permissions](#-rôles--permissions)
- [🛡️ Système de modération](#️-système-de-modération)
- [📤 Upload de fichiers](#-upload-de-fichiers)
- [📧 Emails transactionnels](#-emails-transactionnels)
- [👨‍💻 Auteur](#-auteur)

---

# 🚀 Fonctionnalités

## 👤 Utilisateurs

### 🔐 Authentification
- Inscription avec vérification email
- Connexion sécurisée avec JWT
- Réinitialisation du mot de passe
- Gestion du profil utilisateur

### 📢 Gestion des annonces
- Création d’annonces en plusieurs étapes
- Upload d’images
- Gestion personnelle des annonces
- Suppression et modification

### 🔎 Recherche intelligente
- Filtrage par :
  - Wilaya 🇩🇿
  - Catégorie 💊
  - Type 📦
  - Recherche texte 🔍

---

## 🛡️ Administrateurs

- 📊 Dashboard statistiques
- ⚖️ Validation/Rejet des annonces
- 👥 Gestion des utilisateurs
- 🧾 Contrôle des ordonnances

---

## 🌐 Public

Sans connexion, les visiteurs peuvent :

- Consulter les annonces publiées
- Voir les statistiques globales
- Rechercher des médicaments disponibles

---

# 🏗️ Architecture

```txt
MedLinkDZ/
├── frontend/   → React + Vite SPA
└── backend/    → Node.js + Express REST API
```

## 📌 Architecture utilisée

- Frontend découplé du backend
- API REST sécurisée avec JWT
- Communication JSON & multipart/form-data
- PostgreSQL utilisé sans ORM (`pg`)

---

# 🛠️ Technologies

## 🎨 Frontend

| Technologie | Rôle |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| React Router DOM | SPA Routing |
| Framer Motion | Animations |
| Axios | HTTP Client |
| Lucide React | Icônes |
| Vanilla CSS | UI / Glassmorphism |

---

## ⚙️ Backend

| Technologie | Rôle |
|---|---|
| Node.js | Runtime |
| Express | HTTP Server |
| PostgreSQL | Base de données |
| pg | PostgreSQL Driver |
| bcryptjs | Hash passwords |
| jsonwebtoken | JWT Authentication |
| multer | File uploads |
| nodemailer | Emails |
| dotenv | Env variables |

---

# ⚙️ Installation

## 1️⃣ Cloner le projet

```bash
git clone <url-du-repo>
cd MedLinkDZ
```

---

## 2️⃣ Installer le backend

```bash
cd backend
npm install
```

---

## 3️⃣ Installer le frontend

```bash
cd ../frontend
npm install
```

---

# 🔐 Configuration

## 📄 Backend `.env`

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Project
DB_PASS=your_password
DB_PORT=5432

PORT=5000

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=your@gmail.com
```

---

## 📄 Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

# 🗄️ Base de données

## Créer la base

```sql
CREATE DATABASE "Project";
```

---

## Appliquer le schéma

```bash
psql -U postgres -d Project -f backend/DataBase/schema.sql
```

---

## Seed des wilayas

```bash
psql -U postgres -d Project -f backend/DataBase/seed_wilayas.sql
```

✅ Insertion automatique des **58 wilayas algériennes**

---

# ▶️ Lancement

## 🚀 Backend

```bash
cd backend
npm run dev
```

Backend disponible sur :

```txt
http://localhost:5000
```

---

## 🎨 Frontend

```bash
cd frontend
npm run dev
```

Frontend disponible sur :

```txt
http://localhost:5173
```

---

# 📁 Structure du projet

```txt
MedLinkDZ/

├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── uploads/
│   └── DataBase/

└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── context/
    │   └── hooks/
```

---

# 📡 API Reference

## 🔐 Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create account |
| POST | `/login` | Login |
| GET | `/verify-email` | Verify email |
| POST | `/forgot-password` | Forgot password |
| POST | `/reset-password` | Reset password |

---

## 📢 Annonces — `/api/annonces`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get annonces |
| GET | `/:id` | Get annonce details |
| POST | `/` | Create annonce |
| PUT | `/:id` | Update annonce |
| DELETE | `/:id` | Delete annonce |

---

# 👥 Rôles & Permissions

| Action | USER | ADMIN |
|---|:---:|:---:|
| Voir annonces | ✅ | ✅ |
| Publier annonce | ✅ | ✅ |
| Dashboard admin | ❌ | ✅ |
| Modération | ❌ | ✅ |
| Gestion utilisateurs | ❌ | ✅ |

---

# 🛡️ Système de modération

```txt
EN_ATTENTE
   │
   ├──▶ PUBLIEE
   │
   ├──▶ REJETEE
   │
   └──▶ SUSPENDUE
```

Toutes les annonces passent par validation administrateur avant publication.

---

# 📤 Upload de fichiers

### ✅ Types supportés
- JPEG
- PNG
- WEBP
- PDF

### 📏 Limites
- Maximum : **5 MB**
- Jusqu’à **5 images**

### 📂 Stockage
```txt
backend/uploads/
```

---

# 📧 Emails transactionnels

Le système utilise **Nodemailer + Gmail SMTP** pour :

- ✅ Vérification email
- 🔑 Réinitialisation mot de passe
- 📩 Renvoi des liens de vér<div align="center">

# 🏥 MedLink DZ 💊

### Plateforme algérienne de partage de médicaments

Relier les personnes ayant des médicaments non utilisés  
avec celles qui en ont besoin — à travers les **58 wilayas d’Algérie 🇩🇿**

<br/>

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Academic%20Project-purple?style=for-the-badge)

</div>

---

## ✨ Aperçu

**MedLink DZ** est une plateforme web full-stack permettant aux citoyens algériens de :

- 📢 Publier des annonces de médicaments
- 🔍 Rechercher des médicaments disponibles
- 🏥 Aider les personnes dans le besoin
- ⚖️ Garantir la sécurité via un système de modération

Le projet couvre les **58 wilayas algériennes** avec une architecture moderne basée sur :

- ⚛️ React + Vite
- 🚀 Node.js + Express
- 🐘 PostgreSQL
- 🔐 JWT Authentication

---

# 📚 Table des matières

- [🚀 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technologies](#️-technologies)
- [⚙️ Installation](#️-installation)
- [🔐 Configuration](#-configuration)
- [🗄️ Base de données](#️-base-de-données)
- [▶️ Lancement](#️-lancement)
- [📁 Structure du projet](#-structure-du-projet)
- [📡 API Reference](#-api-reference)
- [👥 Rôles & Permissions](#-rôles--permissions)
- [🛡️ Système de modération](#️-système-de-modération)
- [📤 Upload de fichiers](#-upload-de-fichiers)
- [📧 Emails transactionnels](#-emails-transactionnels)
- [👨‍💻 Auteur](#-auteur)

---

# 🚀 Fonctionnalités

## 👤 Utilisateurs

### 🔐 Authentification
- Inscription avec vérification email
- Connexion sécurisée avec JWT
- Réinitialisation du mot de passe
- Gestion du profil utilisateur

### 📢 Gestion des annonces
- Création d’annonces en plusieurs étapes
- Upload d’images
- Gestion personnelle des annonces
- Suppression et modification

### 🔎 Recherche intelligente
- Filtrage par :
  - Wilaya 🇩🇿
  - Catégorie 💊
  - Type 📦
  - Recherche texte 🔍

---

## 🛡️ Administrateurs

- 📊 Dashboard statistiques
- ⚖️ Validation/Rejet des annonces
- 👥 Gestion des utilisateurs
- 🧾 Contrôle des ordonnances

---

## 🌐 Public

Sans connexion, les visiteurs peuvent :

- Consulter les annonces publiées
- Voir les statistiques globales
- Rechercher des médicaments disponibles

---

# 🏗️ Architecture

```txt
MedLinkDZ/
├── frontend/   → React + Vite SPA
└── backend/    → Node.js + Express REST API
```

## 📌 Architecture utilisée

- Frontend découplé du backend
- API REST sécurisée avec JWT
- Communication JSON & multipart/form-data
- PostgreSQL utilisé sans ORM (`pg`)

---

# 🛠️ Technologies

## 🎨 Frontend

| Technologie | Rôle |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| React Router DOM | SPA Routing |
| Framer Motion | Animations |
| Axios | HTTP Client |
| Lucide React | Icônes |
| Vanilla CSS | UI / Glassmorphism |

---

## ⚙️ Backend

| Technologie | Rôle |
|---|---|
| Node.js | Runtime |
| Express | HTTP Server |
| PostgreSQL | Base de données |
| pg | PostgreSQL Driver |
| bcryptjs | Hash passwords |
| jsonwebtoken | JWT Authentication |
| multer | File uploads |
| nodemailer | Emails |
| dotenv | Env variables |

---

# ⚙️ Installation

## 1️⃣ Cloner le projet

```bash
git clone <url-du-repo>
cd MedLinkDZ
```

---

## 2️⃣ Installer le backend

```bash
cd backend
npm install
```

---

## 3️⃣ Installer le frontend

```bash
cd ../frontend
npm install
```

---

# 🔐 Configuration

## 📄 Backend `.env`

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Project
DB_PASS=your_password
DB_PORT=5432

PORT=5000

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=your@gmail.com
```

---

## 📄 Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

# 🗄️ Base de données

## Créer la base

```sql
CREATE DATABASE "Project";
```

---

## Appliquer le schéma

```bash
psql -U postgres -d Project -f backend/DataBase/schema.sql
```

---

## Seed des wilayas

```bash
psql -U postgres -d Project -f backend/DataBase/seed_wilayas.sql
```

✅ Insertion automatique des **58 wilayas algériennes**

---

# ▶️ Lancement

## 🚀 Backend

```bash
cd backend
npm run dev
```

Backend disponible sur :

```txt
http://localhost:5000
```

---

## 🎨 Frontend

```bash
cd frontend
npm run dev
```

Frontend disponible sur :

```txt
http://localhost:5173
```

---

# 📁 Structure du projet

```txt
MedLinkDZ/

├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── uploads/
│   └── DataBase/

└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── context/
    │   └── hooks/
```

---

# 📡 API Reference

## 🔐 Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create account |
| POST | `/login` | Login |
| GET | `/verify-email` | Verify email |
| POST | `/forgot-password` | Forgot password |
| POST | `/reset-password` | Reset password |

---

## 📢 Annonces — `/api/annonces`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get annonces |
| GET | `/:id` | Get annonce details |
| POST | `/` | Create annonce |
| PUT | `/:id` | Update annonce |
| DELETE | `/:id` | Delete annonce |

---

# 👥 Rôles & Permissions

| Action | USER | ADMIN |
|---|:---:|:---:|
| Voir annonces | ✅ | ✅ |
| Publier annonce | ✅ | ✅ |
| Dashboard admin | ❌ | ✅ |
| Modération | ❌ | ✅ |
| Gestion utilisateurs | ❌ | ✅ |

---

# 🛡️ Système de modération

```txt
EN_ATTENTE
   │
   ├──▶ PUBLIEE
   │
   ├──▶ REJETEE
   │
   └──▶ SUSPENDUE
```

Toutes les annonces passent par validation administrateur avant publication.

---

# 📤 Upload de fichiers

### ✅ Types supportés
- JPEG
- PNG
- WEBP
- PDF

### 📏 Limites
- Maximum : **5 MB**
- Jusqu’à **5 images**

### 📂 Stockage
```txt
backend/uploads/
```

---

# 📧 Emails transactionnels

Le système utilise **Nodemailer + Gmail SMTP** pour :

- ✅ Vérification email
- 🔑 Réinitialisation mot de passe
- 📩 Renvoi des liens de vérification

---

# 👨‍💻 Auteur

Projet réalisé dans le cadre d’un cursus universitaire à :

### 🇩🇿 ESTIN
**École Supérieure en Sciences et Technologies de l’Informatique et du Numérique**

---

<div align="center">

## 💊 MedLink DZ

### *Relier les médicaments avec ceux qui en ont besoin*

</div>ification

---

# 👨‍💻 Auteur

Projet réalisé dans le cadre d’un cursus universitaire à :

### 🇩🇿 ESTIN
**École Supérieure en Sciences et Technologies de l’Informatique et du Numérique**

---

<div align="center">

## 💊 MedLink DZ

### *Relier les médicaments avec ceux qui en ont besoin*

</div><div align="center">

# 🏥 MedLink DZ 💊

### Plateforme algérienne de partage de médicaments

Relier les personnes ayant des médicaments non utilisés  
avec celles qui en ont besoin — à travers les **58 wilayas d’Algérie 🇩🇿**

<br/>

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Academic%20Project-purple?style=for-the-badge)

</div>

---

## ✨ Aperçu

**MedLink DZ** est une plateforme web full-stack permettant aux citoyens algériens de :

- 📢 Publier des annonces de médicaments
- 🔍 Rechercher des médicaments disponibles
- 🏥 Aider les personnes dans le besoin
- ⚖️ Garantir la sécurité via un système de modération

Le projet couvre les **58 wilayas algériennes** avec une architecture moderne basée sur :

- ⚛️ React + Vite
- 🚀 Node.js + Express
- 🐘 PostgreSQL
- 🔐 JWT Authentication

---

# 📚 Table des matières

- [🚀 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technologies](#️-technologies)
- [⚙️ Installation](#️-installation)
- [🔐 Configuration](#-configuration)
- [🗄️ Base de données](#️-base-de-données)
- [▶️ Lancement](#️-lancement)
- [📁 Structure du projet](#-structure-du-projet)
- [📡 API Reference](#-api-reference)
- [👥 Rôles & Permissions](#-rôles--permissions)
- [🛡️ Système de modération](#️-système-de-modération)
- [📤 Upload de fichiers](#-upload-de-fichiers)
- [📧 Emails transactionnels](#-emails-transactionnels)
- [👨‍💻 Auteur](#-auteur)

---

# 🚀 Fonctionnalités

## 👤 Utilisateurs

### 🔐 Authentification
- Inscription avec vérification email
- Connexion sécurisée avec JWT
- Réinitialisation du mot de passe
- Gestion du profil utilisateur

### 📢 Gestion des annonces
- Création d’annonces en plusieurs étapes
- Upload d’images
- Gestion personnelle des annonces
- Suppression et modification

### 🔎 Recherche intelligente
- Filtrage par :
  - Wilaya 🇩🇿
  - Catégorie 💊
  - Type 📦
  - Recherche texte 🔍

---

## 🛡️ Administrateurs

- 📊 Dashboard statistiques
- ⚖️ Validation/Rejet des annonces
- 👥 Gestion des utilisateurs
- 🧾 Contrôle des ordonnances

---

## 🌐 Public

Sans connexion, les visiteurs peuvent :

- Consulter les annonces publiées
- Voir les statistiques globales
- Rechercher des médicaments disponibles

---

# 🏗️ Architecture

```txt
MedLinkDZ/
├── frontend/   → React + Vite SPA
└── backend/    → Node.js + Express REST API
```

## 📌 Architecture utilisée

- Frontend découplé du backend
- API REST sécurisée avec JWT
- Communication JSON & multipart/form-data
- PostgreSQL utilisé sans ORM (`pg`)

---

# 🛠️ Technologies

## 🎨 Frontend

| Technologie | Rôle |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| React Router DOM | SPA Routing |
| Framer Motion | Animations |
| Axios | HTTP Client |
| Lucide React | Icônes |
| Vanilla CSS | UI / Glassmorphism |

---

## ⚙️ Backend

| Technologie | Rôle |
|---|---|
| Node.js | Runtime |
| Express | HTTP Server |
| PostgreSQL | Base de données |
| pg | PostgreSQL Driver |
| bcryptjs | Hash passwords |
| jsonwebtoken | JWT Authentication |
| multer | File uploads |
| nodemailer | Emails |
| dotenv | Env variables |

---

# ⚙️ Installation

## 1️⃣ Cloner le projet

```bash
git clone <url-du-repo>
cd MedLinkDZ
```

---

## 2️⃣ Installer le backend

```bash
cd backend
npm install
```

---

## 3️⃣ Installer le frontend

```bash
cd ../frontend
npm install
```

---

# 🔐 Configuration

## 📄 Backend `.env`

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Project
DB_PASS=your_password
DB_PORT=5432

PORT=5000

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=your@gmail.com
```

---

## 📄 Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

# 🗄️ Base de données

## Créer la base

```sql
CREATE DATABASE "Project";
```

---

## Appliquer le schéma

```bash
psql -U postgres -d Project -f backend/DataBase/schema.sql
```

---

## Seed des wilayas

```bash
psql -U postgres -d Project -f backend/DataBase/seed_wilayas.sql
```

✅ Insertion automatique des **58 wilayas algériennes**

---

# ▶️ Lancement

## 🚀 Backend

```bash
cd backend
npm run dev
```

Backend disponible sur :

```txt
http://localhost:5000
```

---

## 🎨 Frontend

```bash
cd frontend
npm run dev
```

Frontend disponible sur :

```txt
http://localhost:5173
```

---

# 📁 Structure du projet

```txt
MedLinkDZ/

├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── uploads/
│   └── DataBase/

└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── context/
    │   └── hooks/
```

---

# 📡 API Reference

## 🔐 Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create account |
| POST | `/login` | Login |
| GET | `/verify-email` | Verify email |
| POST | `/forgot-password` | Forgot password |
| POST | `/reset-password` | Reset password |

---

## 📢 Annonces — `/api/annonces`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get annonces |
| GET | `/:id` | Get annonce details |
| POST | `/` | Create annonce |
| PUT | `/:id` | Update annonce |
| DELETE | `/:id` | Delete annonce |

---

# 👥 Rôles & Permissions

| Action | USER | ADMIN |
|---|:---:|:---:|
| Voir annonces | ✅ | ✅ |
| Publier annonce | ✅ | ✅ |
| Dashboard admin | ❌ | ✅ |
| Modération | ❌ | ✅ |
| Gestion utilisateurs | ❌ | ✅ |

---

# 🛡️ Système de modération

```txt
EN_ATTENTE
   │
   ├──▶ PUBLIEE
   │
   ├──▶ REJETEE
   │
   └──▶ SUSPENDUE
```

Toutes les annonces passent par validation administrateur avant publication.

---

# 📤 Upload de fichiers

### ✅ Types supportés
- JPEG
- PNG
- WEBP
- PDF

### 📏 Limites
- Maximum : **5 MB**
- Jusqu’à **5 images**

### 📂 Stockage
```txt
backend/uploads/
```

---

# 📧 Emails transactionnels

Le système utilise **Nodemailer + Gmail SMTP** pour :

- ✅ Vérification email
- 🔑 Réinitialisation mot de passe
- 📩 Renvoi des liens de vérification

---

# 👨‍💻 Auteur

Projet réalisé dans le cadre d’un cursus universitaire à :

### 🇩🇿 ESTIN
**École Supérieure en Sciences et Technologies de l’Informatique et du Numérique**

---

<div align="center">

## 💊 MedLink DZ

### *Relier les médicaments avec ceux qui en ont besoin*

</div>