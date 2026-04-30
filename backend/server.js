// server.js - Point d'entrée principal
import dotenv from 'dotenv';
dotenv.config();

//allow the browser to connect to our server (APIs)
import cors from 'cors'; 
app.use(cors({
  origin: 'http://localhost:3000' 
}));

import path from 'path';
import { fileURLToPath } from 'url';

// 1. Initialiser dotenv au tout début en ciblant le .env à la racine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// 2. Importer l'application express (depuis le dossier logic)
import app from './logic/app.js';

// 3. Définir le port et démarrer l'écoute
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré avec succès sur le port ${PORT}`);
});
