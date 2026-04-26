import pool from '../config/db.js';
import * as userService from './userService.js';
import * as annonceService from './annonceService.js';
import * as ordonnanceService from './ordonnanceService.js';

// Get system-wide statistics
export const getStats = async () => {
    const totalUsers = await userService.countUsers();
    const totalAnnonces = await annonceService.countAnnonces();
    const pendingAnnonces = await annonceService.countAnnoncesByStatut('EN_ATTENTE');
    const publishedAnnonces = await annonceService.countAnnoncesByStatut('PUBLIEE');
    const pendingOrdonnances = await ordonnanceService.countPendingOrdonnances();

    return {
        totalUsers,
        totalAnnonces,
        pendingAnnonces,
        publishedAnnonces,
        pendingOrdonnances
    };
};

// Get all pending items (annonces + ordonnances waiting for approval)
export const getPendingItems = async () => {
    // Get pending annonces
    const annoncesQuery = `
        SELECT a.*, 
               m.dci, m.marque,
               w.nom_fr AS wilaya_nom,
               u.nom AS user_nom, u.prenom AS user_prenom
        FROM annonces a
        JOIN medicaments m ON a.medicament_id = m.id
        JOIN wilayas w ON a.wilaya_id = w.id
        JOIN users u ON a.user_id = u.id
        WHERE a.statut = 'EN_ATTENTE'
        ORDER BY a.created_at DESC
    `;
    const annoncesResult = await pool.query(annoncesQuery);

    // Get pending ordonnances
    const pendingOrdonnances = await ordonnanceService.getPendingOrdonnances();

    return {
        annonces: annoncesResult.rows,
        ordonnances: pendingOrdonnances
    };
};

// Moderate an annonce (approve or reject)
export const moderateAnnonce = async (annonceId, moderatorId, statut) => {
    const query = `
        UPDATE annonces 
        SET moderator_id = $1, statut = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
    `;
    const result = await pool.query(query, [moderatorId, statut, annonceId]);
    return result.rows[0];
};
