import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './routes/userRoutes.js';
import annonceRoutes from './routes/annonceRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';
import ordonnanceRoutes from './routes/ordonnanceRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Import error handler
import errorMiddleware from './middlewares/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Global Middlewares ---
app.use(cors());
app.use(express.json());

// Serve uploaded files as static (e.g. /uploads/image.jpg)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- API Routes ---
app.use('/api/auth', userRoutes);
app.use('/api/annonces', annonceRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/ordonnances', ordonnanceRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Backend MedLink DZ API en cours d\'exécution.' });
});

// --- Error Handler (must be last) ---
app.use(errorMiddleware);

export default app;
