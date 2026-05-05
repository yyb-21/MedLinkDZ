import pool from '../config/db.js';

// Get all categories
export const getAllCategories = async () => {
    const result = await pool.query('SELECT * FROM categories ORDER BY nom');
    return result.rows;
};

// Get all medicaments (with optional search and category filter)
export const getMedicaments = async (filters = {}) => {
    const { search, categorie_id } = filters;
    let query = `
        SELECT m.*, c.nom AS categorie_nom 
        FROM medicaments m 
        LEFT JOIN categories c ON m.categorie_id = c.id
        WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (search) {
        query += ` AND (m.dci ILIKE $${paramIndex} OR m.marque ILIKE $${paramIndex})`;
        params.push(`%${search}%`);
        paramIndex++;
    }

    if (categorie_id) {
        query += ` AND m.categorie_id = $${paramIndex++}`;
        params.push(categorie_id);
    }

    query += ' ORDER BY m.marque';

    const result = await pool.query(query, params);
    return result.rows;
};

// Get all wilayas
export const getAllWilayas = async () => {
    const result = await pool.query('SELECT * FROM wilayas ORDER BY id');
    return result.rows;
};

// Find a medicament by name (case-insensitive) or create a new one
export const findOrCreateMedicament = async (name) => {
    const trimmed = name.trim();
    // 1. Try exact match on marque or dci
    const found = await pool.query(
        `SELECT * FROM medicaments WHERE LOWER(marque) = LOWER($1) OR LOWER(dci) = LOWER($1) LIMIT 1`,
        [trimmed]
    );
    if (found.rows.length > 0) return found.rows[0];

    // 2. Create a new entry if not found
    const created = await pool.query(
        `INSERT INTO medicaments (dci, marque) VALUES ($1, $1) RETURNING *`,
        [trimmed]
    );
    return created.rows[0];
};
