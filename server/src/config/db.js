// src/config/db.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'foodstash',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

// Function to initialize database (create donors table)
export const initializeDB = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS donors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      longitude DECIMAL(9,6),
      latitude DECIMAL(9,6),
      date DATE DEFAULT CURRENT_DATE,
      pickup_time TIME,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Donors table created or already exists');
  } catch (error) {
    console.error('Error creating donors table:', error);
    throw error;
  }
};

export default pool;
