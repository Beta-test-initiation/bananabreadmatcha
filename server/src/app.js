// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import donorRoutes from './routes/donors.js';
import recipientRoutes from './routes/recipients.js';
import { initializeDB } from './config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Food Stash API' });
});

// Donor routes
app.use('/donors', donorRoutes);
app.use('/recipients', recipientRoutes);

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Initialize the database, then start the server
initializeDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize the database:', error);
  });
