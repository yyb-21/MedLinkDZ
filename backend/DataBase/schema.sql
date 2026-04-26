-- Création des types ENUM correspondants aux mots-clés du diagramme de classe
CREATE TYPE RoleEnum AS ENUM ('USER', 'ADMIN', 'PHARMACY');
CREATE TYPE TypeEnum AS ENUM ('DON', 'DEMANDE', 'ECHANGE');
CREATE TYPE StatutEnum AS ENUM ('EN_ATTENTE', 'PUBLIEE', 'REJETEE', 'CLOTUREE', 'SUSPENDUE');
CREATE TYPE StatutOrdEnum AS ENUM ('EN_ATTENTE', 'VALIDEE', 'REJETEE');
CREATE TYPE TypeMediaEnum AS ENUM ('IMAGE', 'DOCUMENT');

-- Table: User (Hérite Admin)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role RoleEnum DEFAULT 'USER',
    avatar_url VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Categorie (0..* Médicaments par 1 Catégorie)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table: Medicament (Concerne)
CREATE TABLE medicaments (
    id SERIAL PRIMARY KEY,
    categorie_id INT REFERENCES categories(id) ON DELETE SET NULL,
    dci VARCHAR(255) NOT NULL,
    marque VARCHAR(255) NOT NULL,
    prescription_required BOOLEAN DEFAULT FALSE
);

-- Table: Wilaya (0..* Annonces localisées dans 1 Wilaya)
CREATE TABLE wilayas (
    id SERIAL PRIMARY KEY,
    nom_fr VARCHAR(255) NOT NULL,
    nom_ar VARCHAR(255) NOT NULL,
    region VARCHAR(100)
);

-- Table: Ordonnance
-- 1 Annonce nécessite 0..1 Ordonnance et 1 Ordonnance validée par 1 Admin (0..*)
CREATE TABLE ordonnances (
    id SERIAL PRIMARY KEY,
    admin_id INT REFERENCES users(id) ON DELETE SET NULL,
    fichier_url VARCHAR(255) NOT NULL,
    statut StatutOrdEnum DEFAULT 'EN_ATTENTE',
    admin_comment TEXT,
    validated_at TIMESTAMP
);

-- Table: Annonce
CREATE TABLE annonces (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,           -- Publier par User
    moderator_id INT REFERENCES users(id) ON DELETE SET NULL,              -- Modéré par Admin
    medicament_id INT NOT NULL REFERENCES medicaments(id) ON DELETE RESTRICT, -- Concerne (Medicament)
    ordonnance_id INT REFERENCES ordonnances(id) ON DELETE SET NULL UNIQUE, -- Nécessite (Ordonnance)
    wilaya_id INT NOT NULL REFERENCES wilayas(id) ON DELETE RESTRICT,      -- Localisée dans
    type TypeEnum NOT NULL,
    quantite INT NOT NULL,
    description TEXT,
    statut StatutEnum DEFAULT 'EN_ATTENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Media (1 Annonce contient 0..* Media)
CREATE TABLE medias (
    id SERIAL PRIMARY KEY,
    annonce_id INT NOT NULL REFERENCES annonces(id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    type TypeMediaEnum NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
