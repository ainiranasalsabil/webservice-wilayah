const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// FRONTEND
app.use(express.static(path.join(__dirname, 'public')));

// API ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/wilayah', require('./routes/wilayahRoutes'));

// ROOT
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

module.exports = app;
