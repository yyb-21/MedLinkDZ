import * as annonceService from '../services/annonceService.js';
import * as mediaService from '../services/mediaService.js';

// GET /api/annonces
export const getAnnonces = async (req, res) => {
    try {
        const { type, wilaya_id, medicament_id, search } = req.query;
        const annonces = await annonceService.getAnnonces({ type, wilaya_id, medicament_id, search });

        res.status(200).json({ success: true, count: annonces.length, annonces });
    } catch (error) {
        console.error('Error fetching annonces:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// GET /api/annonces/my-annonces
export const getMyAnnonces = async (req, res) => {
    try {
        const annonces = await annonceService.getAnnoncesByUserId(req.user.id);
        res.status(200).json({ success: true, count: annonces.length, annonces });
    } catch (error) {
        console.error('Error fetching user annonces:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// GET /api/annonces/:id
export const getAnnonceById = async (req, res) => {
    try {
        const annonce = await annonceService.getAnnonceById(req.params.id);
        if (!annonce) {
            return res.status(404).json({ success: false, message: 'Annonce non trouvée.' });
        }

        // Also fetch media for this annonce
        const medias = await mediaService.getMediaByAnnonceId(annonce.id);

        res.status(200).json({ success: true, annonce: { ...annonce, medias } });
    } catch (error) {
        console.error('Error fetching annonce:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// POST /api/annonces
export const createAnnonce = async (req, res) => {
    try {
        const { medicament_id, ordonnance_id, wilaya_id, type, quantite, description } = req.body;

        if (!medicament_id || !wilaya_id || !type || !quantite) {
            return res.status(400).json({ success: false, message: 'Champs obligatoires manquants.' });
        }

        const annonce = await annonceService.createAnnonce({
            user_id: req.user.id,
            medicament_id,
            ordonnance_id: (ordonnance_id && ordonnance_id !== 'null') ? parseInt(ordonnance_id, 10) : null,
            wilaya_id,
            type,
            quantite,
            description
        });

        // If files were uploaded, save them as media
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const mediaType = file.mimetype.startsWith('image/') ? 'IMAGE' : 'DOCUMENT';
                await mediaService.addMedia(annonce.id, `/uploads/${file.filename}`, mediaType);
            }
        }

        res.status(201).json({ success: true, message: 'Annonce créée avec succès.', annonce });
    } catch (error) {
        console.error('Error creating annonce:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la création.' });
    }
};

// PUT /api/annonces/:id
export const updateAnnonce = async (req, res) => {
    try {
        // Check if the annonce exists
        const existing = await annonceService.getAnnonceById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Annonce non trouvée.' });
        }

        // Check if user is the owner or an admin
        if (existing.user_id !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ success: false, message: 'Vous n\'êtes pas autorisé à modifier cette annonce.' });
        }

        const updated = await annonceService.updateAnnonce(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Annonce mise à jour.', annonce: updated });
    } catch (error) {
        console.error('Error updating annonce:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// DELETE /api/annonces/:id
export const deleteAnnonce = async (req, res) => {
    try {
        const existing = await annonceService.getAnnonceById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Annonce non trouvée.' });
        }

        // Check if user is the owner or an admin
        if (existing.user_id !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ success: false, message: 'Vous n\'êtes pas autorisé à supprimer cette annonce.' });
        }

        await annonceService.deleteAnnonce(req.params.id);
        res.status(200).json({ success: true, message: 'Annonce supprimée avec succès.' });
    } catch (error) {
        console.error('Error deleting annonce:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};
