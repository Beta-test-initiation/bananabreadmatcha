import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

// Load environment variables first
dotenv.config();

// Initialize Express app
const app = express();

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'foodstash',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
    
    // Create the Donor table if it doesn't exist
    createDonorTable();
  }
});

// Function to create Donor table
const createDonorTable = async () => {
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
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Food Stash API' });
});

// Donor routes
app.post('/donors', async (req, res) => {
  try {
    const { name, address, longitude, latitude, date, pickupTime } = req.body;
    
    const query = `
      INSERT INTO donors (name, address, longitude, latitude, date, pickup_time)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    
    const values = [name, address, longitude, latitude, date, pickupTime];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating donor:', error);
    res.status(500).json({ error: 'Failed to create donor' });
  }
});

app.get('/donors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});