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
  res.json({ success: true, count: sampleComplaints.length, data: sampleComplaints });
});

app.get('/api/complaints/:id', (req, res) => {
  const { id } = req.params;
  const found = sampleComplaints.find(c => c.complaintId === id || c._id === id);
  if (!found) return res.status(404).json({ success: false, message: 'Complaint not found' });
  res.json({ success: true, data: found });
});

app.post('/api/complaints', (req, res) => {
  const compId = req.body.complaintId || `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;
  const newComplaint = {
    complaintId: compId,
    _id: compId,
    title: req.body.title || 'Civic Grievance Reported',
    description: req.body.description || '',
    category: req.body.category || 'Road Damage',
    location: req.body.location || 'Laxmi Nagar, Nagpur',
    urgency: req.body.urgency || 'High Priority',
    status: 'New',
    confidenceScore: req.body.confidenceScore || 96,
    slaHoursTotal: 48,
    slaHoursRemaining: 48,
    impactScore: 94,
    xaiData: {
      confidence: 96,
      reasoning: [
        `Category keywords matched for ${req.body.category || 'Road Damage'}`,
        `Mapped to ${req.body.location || 'Laxmi Nagar, Nagpur'} Zone Jurisdiction`,
        'School & Hospital Zone Priority Rule Applied'
      ],
      rulesApplied: ['Civic Redressal Emergency Protocol (SLA 48h)'],
      similarCases: ['CMP-2025-8891', 'CMP-2025-9102']
    },
    xaiExplanation: {
      confidence: 96,
      reasoning: [
        `Category keywords matched for ${req.body.category || 'Road Damage'}`,
        `Mapped to ${req.body.location || 'Laxmi Nagar, Nagpur'} Zone Jurisdiction`
      ],
      rulesApplied: ['School & Hospital Proximity Priority Rule']
    },
    createdAt: new Date().toISOString()
  };
  sampleComplaints.unshift(newComplaint);
  res.status(201).json({ success: true, data: newComplaint });
});

app.patch('/api/complaints/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, resolutionProof, resolutionNotes, aiSimilarityScore } = req.body;
  const target = sampleComplaints.find(c => c.complaintId === id || c._id === id);
  if (target) {
    if (status) target.status = status;
    if (resolutionProof) target.resolutionProof = resolutionProof;
    if (resolutionNotes) target.resolutionNotes = resolutionNotes;
    if (aiSimilarityScore) target.aiSimilarityScore = aiSimilarityScore;
  }
  res.json({ success: true, data: target });
});

app.post('/api/complaints/:id/verify', (req, res) => {
  const { id } = req.params;
  const { citizenName, comment } = req.body;
  const target = sampleComplaints.find(c => c.complaintId === id || c._id === id);
  if (target) {
    if (!target.verifications) target.verifications = [];
    target.verifications.push({
      citizenName: citizenName || 'Verified Citizen',
      comment: comment || 'Verified at site.',
      verifiedAt: new Date().toISOString()
    });
    target.verificationsCount = target.verifications.length;
    if (target.verificationsCount >= 3) {
      target.status = 'Verified & Resolved';
    }
  }
  res.json({ success: true, data: target });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    totalComplaints: sampleComplaints.length,
    resolvedCount: sampleComplaints.filter(c => c.status === 'Resolved' || c.status === 'Verified & Resolved').length,
    pendingCount: sampleComplaints.filter(c => c.status !== 'Resolved' && c.status !== 'Verified & Resolved').length,
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
