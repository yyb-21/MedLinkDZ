import pool from '../config/db.js';

// Create a new ordonnance (prescription)
export const createOrdonnance = async (fichier_url) => {
    const query = `
        INSERT INTO ordonnances (fichier_url, statut)
        VALUES ($1, 'EN_ATTENTE')
        RETURNING *
    `;
    const result = await pool.query(query, [fichier_url]);
    return result.rows[0];
};

// Get ordonnance by ID
export const getOrdonnanceById = async (id) => {
    const query = `
        SELECT o.*, u.nom AS admin_nom, u.prenom AS admin_prenom
        FROM ordonnances o
        LEFT JOIN users u ON o.admin_id = u.id
        WHERE o.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Get all pending ordonnances (for admin)
export const getPendingOrdonnances = async () => {
    const query = `
        SELECT o.*, a.id AS annonce_id, u.nom AS user_nom, u.prenom AS user_prenom
        FROM ordonnances o
        LEFT JOIN annonces a ON a.ordonnance_id = o.id
        LEFT JOIN users u ON a.user_id = u.id
        WHERE o.statut = 'EN_ATTENTE'
        ORDER BY o.id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
};

// Update ordonnance status (admin moderation)
export const updateOrdonnanceStatus = async (id, adminId, statut, comment) => {
    const query = `
        UPDATE ordonnances 
        SET admin_id = $1, statut = $2, admin_comment = $3, validated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
    `;
    const result = await pool.query(query, [adminId, statut, comment, id]);
    return result.rows[0];
};

// Count pending ordonnances (for admin stats)
export const countPendingOrdonnances = async () => {
    const result = await pool.query("SELECT COUNT(*) FROM ordonnances WHERE statut = 'EN_ATTENTE'");
    return parseInt(result.rows[0].count);
};
