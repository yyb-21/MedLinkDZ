import pool from '../config/db.js';

// Create a new user
export const createUser = async (userData) => {
    const { nom, prenom, email, password_hash, phone } = userData;
    const query = `
        INSERT INTO users (nom, prenom, email, password_hash, phone, role, is_verified) 
        VALUES ($1, $2, $3, $4, $5, 'USER', false) 
        RETURNING id, nom, prenom, email, phone, role, is_verified, created_at
    `;
    const result = await pool.query(query, [nom, prenom, email, password_hash, phone]);
    return result.rows[0];
};

// Find a user by email (includes password_hash for login verification)
export const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Find a user by ID (excludes password_hash)
export const findUserById = async (id) => {
    const query = 'SELECT id, nom, prenom, email, phone, role, avatar_url, is_verified, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Update user profile info
export const updateUser = async (id, updates) => {
    const { nom, prenom, phone, avatar_url } = updates;
    const query = `
        UPDATE users 
        SET nom = COALESCE($1, nom), 
            prenom = COALESCE($2, prenom), 
            phone = COALESCE($3, phone), 
            avatar_url = COALESCE($4, avatar_url)
        WHERE id = $5
        RETURNING id, nom, prenom, email, phone, role, avatar_url, is_verified, created_at
    `;
    const result = await pool.query(query, [nom, prenom, phone, avatar_url, id]);
    return result.rows[0];
};

// Count total users (for admin stats)
export const countUsers = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    return parseInt(result.rows[0].count);
};
