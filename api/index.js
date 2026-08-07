const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database Fallback for Serverless
const sampleComplaints = require('../data/sample_complaints.json');
const wardsData = require('../data/wards.json');

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Awaaz AI Vercel Serverless API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/complaints', (req, res) => {
  res.json(sampleComplaints);
});

app.post('/api/complaints', (req, res) => {
  const newComplaint = {
    _id: `CMP-${Date.now()}`,
    ...req.body,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  sampleComplaints.unshift(newComplaint);
  res.status(201).json(newComplaint);
});

app.get('/api/analytics', (req, res) => {
  res.json({
    totalComplaints: sampleComplaints.length,
    resolvedCount: sampleComplaints.filter(c => c.status === 'Resolved').length,
    pendingCount: sampleComplaints.filter(c => c.status !== 'Resolved').length,
    wardStats: wardsData
  });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, role } = req.body;
  res.json({
    success: true,
    user: {
      name: role === 'officer' ? 'Er. Rajesh Sharma' : 'Rahul Sharma',
      email: identifier,
      role: role || 'citizen',
      wardId: 12
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const citizenId = `CIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  res.json({
    success: true,
    citizenId,
    message: 'Registered successfully'
  });
});

module.exports = app;
