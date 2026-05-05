import pool from '../logic/config/db.js';

async function fix() {
  try {
    console.log('Attempting to alter column quantite...');
    await pool.query('ALTER TABLE annonces ALTER COLUMN quantite TYPE VARCHAR(255);');
    console.log('Success: quantite column is now VARCHAR(255)');
  } catch (err) {
    console.error('Failed to alter column:', err.message);
  } finally {
    process.exit();
  }
}

fix();
