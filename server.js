const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to Aurora MySQL database');
    }
});

// Models
const User = require('./models/user')(db);

// Routes
const userRoutes = require('./routes/users')(User);
app.use('/users', userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
