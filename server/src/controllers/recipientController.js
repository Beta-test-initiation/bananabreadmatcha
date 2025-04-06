import pool from '../config/db.js';

export const getRecipients = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM recipients ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching recipients:', error);
      res.status(500).json({ error: 'Failed to fetch recipients' });
    }
  };

  export const updateRecipient = async (req, res) => {
    try {
      const { name, date, dropoffTime } = req.body;
  
      if (!name || !date || !dropoffTime) {
        return res.status(400).json({ error: 'Missing required fields: name, date, dropoffTime' });
      }
  
      const query = `
        UPDATE recipients 
        SET date = $1, dropoff_time = $2
        WHERE name = $3
        RETURNING *;
      `;
      const values = [date, dropoffTime, name];
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Recipient not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating recipient:', error);
      res.status(500).json({ error: 'Failed to update recipient' });
    }
  };