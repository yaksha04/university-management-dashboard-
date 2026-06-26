require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/reports', reportRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok' }));

module.exports = app;
