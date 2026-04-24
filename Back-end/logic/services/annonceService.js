import pool from '../config/db.js';

// Create a new annonce
export const createAnnonce = async (data) => {
    const { user_id, medicament_id, ordonnance_id, wilaya_id, type, quantite, description } = data;
    const query = `
        INSERT INTO annonces (user_id, medicament_id, ordonnance_id, wilaya_id, type, quantite, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;
    const result = await pool.query(query, [user_id, medicament_id, ordonnance_id, wilaya_id, type, quantite, description]);
    return result.rows[0];
};

// Get all annonces with filters (only published ones for public)
export const getAnnonces = async (filters = {}) => {
    const { type, wilaya_id, medicament_id, search, statut } = filters;
    let query = `
        SELECT a.*, 
               m.dci, m.marque,
               c.nom AS categorie_nom,
               w.nom_fr AS wilaya_nom,
               u.nom AS user_nom, u.prenom AS user_prenom
        FROM annonces a
        JOIN medicaments m ON a.medicament_id = m.id
        LEFT JOIN categories c ON m.categorie_id = c.id
        JOIN wilayas w ON a.wilaya_id = w.id
        JOIN users u ON a.user_id = u.id
        WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    // By default show only published annonces (for public access)
    if (statut) {
        query += ` AND a.statut = $${paramIndex++}`;
        params.push(statut);
    } else {
        query += ` AND a.statut = 'PUBLIEE'`;
    }

    if (type) {
        query += ` AND a.type = $${paramIndex++}`;
        params.push(type);
    }

    if (wilaya_id) {
        query += ` AND a.wilaya_id = $${paramIndex++}`;
        params.push(wilaya_id);
    }

    if (medicament_id) {
        query += ` AND a.medicament_id = $${paramIndex++}`;
        params.push(medicament_id);
    }

    if (search) {
        query += ` AND (m.dci ILIKE $${paramIndex} OR m.marque ILIKE $${paramIndex} OR a.description ILIKE $${paramIndex})`;
        params.push(`%${search}%`);
        paramIndex++;
    }

    query += ' ORDER BY a.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
};

// Get a single annonce by ID with full details
export const getAnnonceById = async (id) => {
    const query = `
        SELECT a.*, 
               m.dci, m.marque, m.prescription_required,
               c.nom AS categorie_nom,
               w.nom_fr AS wilaya_nom,
               u.nom AS user_nom, u.prenom AS user_prenom, u.phone AS user_phone, u.created_at AS user_joined
        FROM annonces a
        JOIN medicaments m ON a.medicament_id = m.id
        LEFT JOIN categories c ON m.categorie_id = c.id
        JOIN wilayas w ON a.wilaya_id = w.id
        JOIN users u ON a.user_id = u.id
        WHERE a.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Get annonces for a specific user
export const getAnnoncesByUserId = async (userId) => {
    const query = `
        SELECT a.*, 
               m.dci, m.marque,
               c.nom AS categorie_nom,
               w.nom_fr AS wilaya_nom
        FROM annonces a
        JOIN medicaments m ON a.medicament_id = m.id
        LEFT JOIN categories c ON m.categorie_id = c.id
        JOIN wilayas w ON a.wilaya_id = w.id
        WHERE a.user_id = $1
        ORDER BY a.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

// Update an existing annonce
export const updateAnnonce = async (id, data) => {
    const { medicament_id, wilaya_id, type, quantite, description } = data;
    const query = `
        UPDATE annonces 
        SET medicament_id = COALESCE($1, medicament_id),
            wilaya_id = COALESCE($2, wilaya_id),
            type = COALESCE($3, type),
            quantite = COALESCE($4, quantite),
            description = COALESCE($5, description),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
    `;
    const result = await pool.query(query, [medicament_id, wilaya_id, type, quantite, description, id]);
    return result.rows[0];
};

// Delete an annonce
export const deleteAnnonce = async (id) => {
    const result = await pool.query('DELETE FROM annonces WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Count total annonces (for admin stats)
export const countAnnonces = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM annonces');
    return parseInt(result.rows[0].count);
};

// Count annonces by statut (for admin stats)
export const countAnnoncesByStatut = async (statut) => {
    const result = await pool.query('SELECT COUNT(*) FROM annonces WHERE statut = $1', [statut]);
    return parseInt(result.rows[0].count);
};
