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
    const result = await pool.query('SELECT * FROM donors WHERE pickup_time != \'\'');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
};

export const updateDonor = async (req, res) => {
  console.log("Received update req:", req.body);
  try {
    const { name, date, pickupTime } = req.body;

    if (!name || !date || !pickupTime) {
      return res.status(400).json({ error: 'Missing required fields: id, date, pickupTime' });
    }

    const query = `
      UPDATE donors 
      SET date = $1, pickup_time = $2
      WHERE name = $3
      RETURNING *;
    `;
    const values = [date, pickupTime, name];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({ error: 'Failed to update donor' });
  }
};


