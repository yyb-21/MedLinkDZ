import * as catalogService from '../services/catalogService.js';

// GET /api/catalog/categories
export const getCategories = async (req, res) => {
    try {
        const categories = await catalogService.getAllCategories();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// GET /api/catalog/medicaments
export const getMedicaments = async (req, res) => {
    try {
        const { search, categorie_id } = req.query;
        const medicaments = await catalogService.getMedicaments({ search, categorie_id });
        res.status(200).json({ success: true, medicaments });
    } catch (error) {
        console.error('Error fetching medicaments:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// GET /api/catalog/wilayas
export const getWilayas = async (req, res) => {
    try {
        const wilayas = await catalogService.getAllWilayas();
        res.status(200).json({ success: true, wilayas });
    } catch (error) {
        console.error('Error fetching wilayas:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};
