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

export const initializeDB = async () => {
  const dropTableQuery = `DROP TABLE IF EXISTS donors;`;

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

  const donors = [
    {
      name: 'Buy-Low Foods',
      address: '6095 Fraser St',
      longitude: 49.229350,
      latitude: -123.091058,
      date: '2025-04-06',
      pickupTime: '',
    },
    {
      name: 'Bob Brown',
      address: '456 Matcha Drive',
      longitude: -123.0001,
      latitude: 37.8000,
      date: '2025-04-07',
      pickupTime: 'afternoon',
    },
    // Add more donors as needed
  ];

  try {
    // Drop and recreate the table
    await pool.query(dropTableQuery);
    console.log('Dropped existing donors table');

    // Create the donors table
    await pool.query(createTableQuery);
    console.log('✅ Donors table created or already exists');

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

    console.log(`✅ Inserted ${donors.length} donors into the database`);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};


export default pool;
