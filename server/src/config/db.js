// src/config/db.js
import pg from 'pg';
import dotenv from 'dotenv';
import { donors } from '../data/donorData.js';
import { recipients } from '../data/recipientData.js';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'foodstash',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

export const initializeDB = async () => {
  const dropTableQuery = `DROP TABLE IF EXISTS donors;`;
  const dropRecipientTableQuery = `DROP TABLE IF EXISTS recipients;`;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS donors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      longitude DECIMAL(9,6),
      latitude DECIMAL(9,6),
      date DATE DEFAULT CURRENT_DATE,
      pickup_time TEXT
    );
  `;

  const createRecipientTableQuery = `
    CREATE TABLE IF NOT EXISTS recipients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      longitude DECIMAL(9,6),
      latitude DECIMAL(9,6),
      date DATE DEFAULT CURRENT_DATE,
      dropoff_time TEXT
    );
  `;


  try {
    // Drop and recreate the table
    await pool.query(dropTableQuery);
    console.log('Dropped existing donors table');

    await pool.query(dropRecipientTableQuery);
    console.log('Dropped existing recipients table');

    // Create the donors table
    await pool.query(createTableQuery);
    console.log('✅ Donors table created or already exists');

    // Create the recipients table
    await pool.query(createRecipientTableQuery);
    console.log('Recipients table created or already exists');

    // Seed donors into the table
    for (const donor of donors) {
      const insertQuery = `
        INSERT INTO donors (name, address, longitude, latitude, date, pickup_time)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING;
      `;

      const values = [
        donor.name,
        donor.address,
        donor.longitude,
        donor.latitude,
        donor.date,
        donor.pickupTime,
      ];

      await pool.query(insertQuery, values);
    }

    // Seed recipients into the table
    for (const recipient of recipients) {
      const insertQuery = `
        INSERT INTO recipients (name, address, longitude, latitude, date, dropoff_time)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING;
      `;

      const values = [
        recipient.name,
        recipient.address,
        recipient.longitude,
        recipient.latitude,
        recipient.date,
        recipient.dropoffTime,
      ];

      await pool.query(insertQuery, values);
    }

    console.log(`✅ Inserted ${recipients.length} recipients into the database`);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};


export default pool;
