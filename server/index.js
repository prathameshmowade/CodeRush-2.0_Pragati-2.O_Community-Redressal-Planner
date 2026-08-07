const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./config/env');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => res.json({ 
  status: 'ok', 
  service: 'Awaaz AI API Service', 
  version: '2.0.0',
  timestamp: new Date().toISOString()
}));

// Route Endpoints
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/officers', require('./routes/officers'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/audit', require('./routes/audit'));

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

connectDB();

const PORT = process.env.PORT || env.PORT || 5000;
app.listen(PORT, () => console.log(`Awaaz AI Server running on port ${PORT}`));
