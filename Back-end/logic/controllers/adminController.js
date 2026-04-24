import * as adminService from '../services/adminService.js';
import * as ordonnanceService from '../services/ordonnanceService.js';

// GET /api/admin/stats
export const getStats = async (req, res) => {     //to get the stats of
    try {                                         //the user (or the dashboard)
        const stats = await adminService.getStats();            
        res.status(200).json({ success: true, stats });        
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// GET /api/admin/pending
export const getPending = async (req, res) => {       // get pending annonces
    try {                                             //or pending ordonnances
        const pending = await adminService.getPendingItems();        
        res.status(200).json({ success: true, pending });          
    } catch (error) {
        console.error('Error fetching pending items:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// PATCH /api/admin/moderate/:id
export const moderateAnnonce = async (req, res) => {   //moderate an annonce
    try {
        const { statut } = req.body;

        // Validate the status value
        const validStatuts = ['PUBLIEE', 'REJETEE', 'SUSPENDUE'];    
        if (!statut || !validStatuts.includes(statut)) {             
            return res.status(400).json({
                success: false,
                message: `Statut invalide. Valeurs autorisées: ${validStatuts.join(', ')}`
            });
        }

        const moderated = await adminService.moderateAnnonce(req.params.id, req.user.id, statut);
        if (!moderated) {
            return res.status(404).json({ success: false, message: 'Annonce non trouvée.' });
        }

        res.status(200).json({ success: true, message: `Annonce ${statut.toLowerCase()} avec succès.`, annonce: moderated });
    } catch (error) {
        console.error('Error moderating annonce:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// PATCH /api/admin/ordonnance/:id
export const moderateOrdonnance = async (req, res) => {   //moderate an annonce
    try {
        const { statut, comment } = req.body;

        const validStatuts = ['VALIDEE', 'REJETEE'];
        if (!statut || !validStatuts.includes(statut)) {
            return res.status(400).json({
                success: false,
                message: `Statut invalide. Valeurs autorisées: ${validStatuts.join(', ')}`
            });
        }

        const moderated = await ordonnanceService.updateOrdonnanceStatus(
            req.params.id, req.user.id, statut, comment || null
        );

        if (!moderated) {
            return res.status(404).json({ success: false, message: 'Ordonnance non trouvée.' });
        }

        res.status(200).json({ success: true, message: `Ordonnance ${statut.toLowerCase()} avec succès.`, ordonnance: moderated });
    } catch (error) {
        console.error('Error moderating ordonnance:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};
