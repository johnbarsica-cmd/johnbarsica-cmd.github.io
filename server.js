const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MySQL Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'map_comments',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize database
async function initDatabase() {
    const connection = await pool.getConnection();
    try {
        // Create locations table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS locations (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                latitude DECIMAL(10, 8) NOT NULL,
                longitude DECIMAL(11, 8) NOT NULL,
                type VARCHAR(50) NOT NULL,
                info JSON
            )
        `);

        // Create comments table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                location_id VARCHAR(50) NOT NULL,
                author VARCHAR(100) NOT NULL,
                text TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (location_id) REFERENCES locations(id)
            )
        `);

        // Insert initial locations if they don't exist
        const locations = [
            { id: 'mall-1', name: 'Santolan Town Plaza', lat: 14.604715, lon: 121.033720, type: 'mall', info: JSON.stringify(['Wheelchair-accessible entrances', 'Elevator access on all floors', 'Universal Washroom on 2nd Floor']) },
            { id: 'mall-2', name: 'Puregold Agora', lat: 14.605218, lon: 121.023248, type: 'mall', info: JSON.stringify(['Wheelchair-accessible entrances', 'Universal Washroom on 1st Floor']) },
            { id: 'mall-3', name: 'GH Mall', lat: 14.601245, lon: 121.048031, type: 'mall', info: JSON.stringify(['Wheelchair-accessible entrances', 'Elevator access on all floors', 'Universal Washroom on 2nd Floor']) },
            { id: 'gov-1', name: 'City Hall', lat: 14.604858, lon: 121.029903, type: 'government', info: JSON.stringify([]) },
            { id: 'gov-2', name: 'National Government Center', lat: 14.603879, lon: 121.031914, type: 'government', info: JSON.stringify([]) },
            { id: 'park-1', name: 'Pinaglabanan Park', lat: 14.604730, lon: 121.030581, type: 'park', info: JSON.stringify([]) },
            { id: 'park-2', name: 'Mini Park', lat: 14.603928, lon: 121.028049, type: 'park', info: JSON.stringify([]) }
        ];

        for (const loc of locations) {
            await connection.query(
                'INSERT IGNORE INTO locations (id, name, latitude, longitude, type, info) VALUES (?, ?, ?, ?, ?, ?)',
                [loc.id, loc.name, loc.lat, loc.lon, loc.type, loc.info]
            );
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    } finally {
        connection.release();
    }
}

// API Routes

// Get all comments for a location
app.get('/api/comments/:locationId', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT * FROM comments WHERE location_id = ? ORDER BY timestamp DESC',
            [req.params.locationId]
        );
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Add a comment
app.post('/api/comments', async (req, res) => {
    const { locationId, author, text } = req.body;

    if (!locationId || !author || !text) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO comments (location_id, author, text) VALUES (?, ?, ?)',
            [locationId, author, text]
        );
        connection.release();

        res.json({ 
            id: result.insertId, 
            locationId, 
            author, 
            text,
            timestamp: new Date().toLocaleString()
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Delete a comment
app.delete('/api/comments/:commentId', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(
            'DELETE FROM comments WHERE id = ?',
            [req.params.commentId]
        );
        connection.release();
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// Get all locations with their comments
app.get('/api/locations', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [locations] = await connection.query('SELECT * FROM locations');
        
        const locationsWithComments = await Promise.all(
            locations.map(async (loc) => {
                const [comments] = await connection.query(
                    'SELECT id, author, text, timestamp FROM comments WHERE location_id = ? ORDER BY timestamp DESC',
                    [loc.id]
                );
                return {
                    ...loc,
                    info: JSON.parse(loc.info),
                    comments: comments
                };
            })
        );
        
        connection.release();
        res.json(locationsWithComments);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    initDatabase().catch(error => {
        console.log('Database not available, continuing without database features');
    });
});
