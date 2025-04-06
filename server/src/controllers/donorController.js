// src/controllers/donorController.js
import pool from '../config/db.js';

export const createDonor = async (req, res) => {
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
};

export const getDonors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
};
