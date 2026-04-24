import * as ordonnanceService from '../services/ordonnanceService.js';

// POST /api/ordonnances/upload
export const uploadOrdonnance = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Fichier requis. Veuillez uploader une ordonnance (image ou PDF).' });
        }

        const fichier_url = `/uploads/${req.file.filename}`;
        const ordonnance = await ordonnanceService.createOrdonnance(fichier_url);

        res.status(201).json({
            success: true,
            message: 'Ordonnance uploadée avec succès. En attente de validation.',
            ordonnance
        });
    } catch (error) {
        console.error('Error uploading ordonnance:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de l\'upload.' });
    }
};

// GET /api/ordonnances/:id
export const getOrdonnance = async (req, res) => {
    try {
        const ordonnance = await ordonnanceService.getOrdonnanceById(req.params.id);
        if (!ordonnance) {
            return res.status(404).json({ success: false, message: 'Ordonnance non trouvée.' });
        }

        res.status(200).json({ success: true, ordonnance });
    } catch (error) {
        console.error('Error fetching ordonnance:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};
