import pool from '../config/db.js';

// Add media for an annonce
export const addMedia = async (annonce_id, url, type) => {
    const query = `
        INSERT INTO medias (annonce_id, url, type)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const result = await pool.query(query, [annonce_id, url, type]);
    return result.rows[0];
};

// Get all media for an annonce
export const getMediaByAnnonceId = async (annonce_id) => {
    const query = 'SELECT * FROM medias WHERE annonce_id = $1 ORDER BY uploaded_at';
    const result = await pool.query(query, [annonce_id]);
    return result.rows;
};

// Delete a media entry
export const deleteMedia = async (id) => {
    const result = await pool.query('DELETE FROM medias WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
