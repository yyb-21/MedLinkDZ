import pool from '../logic/config/db.js';

async function fix() {
  try {
    console.log('Attempting to add is_suspended column to users table...');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN DEFAULT FALSE;');
    console.log('Success: is_suspended column is now in users table');
  } catch (err) {
    console.error('Failed to alter table:', err.message);
  } finally {
    process.exit();
  }
}

fix();
