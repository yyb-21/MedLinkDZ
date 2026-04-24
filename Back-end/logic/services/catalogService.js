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
