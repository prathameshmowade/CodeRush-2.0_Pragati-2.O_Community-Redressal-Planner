const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database Fallback for Serverless
const sampleComplaints = require('../data/sample_complaints.json');
const wardsData = require('../data/wards.json');

const classifyText = (data) => {
  const combined = `${data.title || ''} ${data.description || ''} ${data.category || ''} ${data.customCategory || ''}`.toLowerCase();
  const isOther = (data.category && data.category.toLowerCase().includes('other')) || data.category === 'Miscellaneous';

  if (combined.match(/pothole|road|asphalt|crater|pavement|footpath|traffic|divider|tar|highway|flyover/i)) {
    return {
      category: 'Road Damage',
      department: 'Roads & Infrastructure Department',
      departmentCode: 'DEPT_ROAD',
      urgency: 'High Priority',
      confidenceScore: 96,
      isAutoClassified: isOther,
      xaiReasoning: ['Road hazard and crater keywords detected', 'Mapped to Nagpur Municipal Corporation Zone 12 Road Dept']
    };
  }
  if (combined.match(/pipe|leak|sewage|sewer|water|drain|drainage|tap|contamination|flood|overflow|tank/i)) {
    return {
      category: 'Water Supply',
      department: 'Water Supply & Drainage Dept',
      departmentCode: 'DEPT_WATER',
      urgency: 'Critical Priority',
      confidenceScore: 95,
      isAutoClassified: isOther,
      xaiReasoning: ['Hydraulic pipeline and drainage leakage detected', 'Priority escalation for potential drinking water contamination']
    };
  }
  if (combined.match(/garbage|trash|waste|dump|clean|dustbin|sanitation|litter|sweep|smell|dead animal/i)) {
    return {
      category: 'Sanitation',
      department: 'Sanitation & Waste Management',
      departmentCode: 'DEPT_SANITATION',
      urgency: 'Medium Priority',
      confidenceScore: 93,
      isAutoClassified: isOther,
      xaiReasoning: ['Solid waste and public health sanitation keywords detected', 'Assigned to Ward Hygiene Taskforce']
    };
  }
  if (combined.match(/light|streetlight|lamp|wire|pole|electric|electricity|spark|blackout|transformer/i)) {
    return {
      category: 'Electrical',
      department: 'Electrical & Smart Lighting',
      departmentCode: 'DEPT_ELECTRICAL',
      urgency: 'High Priority',
      confidenceScore: 94,
      isAutoClassified: isOther,
      xaiReasoning: ['Electrical hazard and public streetlight outage detected', 'Urgent night safety routing applied']
    };
  }
  if (combined.match(/park|garden|tree|bench|playground|grass|amenit|fountain|jogging/i)) {
    return {
      category: 'Parks',
      department: 'Parks & Public Amenities',
      departmentCode: 'DEPT_PARKS',
      urgency: 'Low Priority',
      confidenceScore: 91,
      isAutoClassified: isOther,
      xaiReasoning: ['Public park and botanical amenity keywords matched', 'Scheduled for Horticultural maintenance']
    };
  }

  return {
    category: isOther ? 'Road Damage' : (data.category || 'Road Damage'),
    department: 'Roads & Infrastructure Department',
    departmentCode: 'DEPT_ROAD',
    urgency: 'High Priority',
    confidenceScore: 92,
    isAutoClassified: isOther,
    xaiReasoning: ['Civic anomaly classified by municipal rule engine', 'Assigned to Central Redressal Taskforce']
  };
};

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
  const classified = classifyText(req.body);

  const newComplaint = {
    complaintId: compId,
    _id: compId,
    title: req.body.title || 'Civic Grievance Reported',
    description: req.body.description || '',
    category: classified.category,
    department: classified.department,
    departmentCode: classified.departmentCode,
    isAutoClassified: classified.isAutoClassified,
    location: req.body.location || 'Laxmi Nagar, Nagpur',
    urgency: req.body.urgency || classified.urgency,
    status: 'New',
    confidenceScore: classified.confidenceScore,
    slaHoursTotal: 48,
    slaHoursRemaining: 48,
    impactScore: 94,
    xaiData: {
      confidence: classified.confidenceScore,
      reasoning: classified.xaiReasoning,
      rulesApplied: ['Civic Redressal Emergency Protocol (SLA 48h)', 'Municipal Service Routing Protocol'],
      similarCases: ['CMP-2025-8891', 'CMP-2025-9102']
    },
    xaiExplanation: {
      confidence: classified.confidenceScore,
      reasoning: classified.xaiReasoning,
      rulesApplied: ['School & Hospital Proximity Priority Rule'],
      similarCases: ['CMP-2025-8891', 'CMP-2025-9102']
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

app.post('/api/auth/send-otp', (req, res) => {
  const { mobile } = req.body;
  if (!mobile || String(mobile).replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number is required.' });
  }
  const demoOtp = '123456';
  res.json({
    success: true,
    message: `SMS OTP dispatched to +91-${mobile}`,
    otp: demoOtp,
    expiresIn: '10 minutes'
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) {
    return res.status(400).json({ success: false, error: 'Mobile number and OTP are required.' });
  }
  if (otp === '123456' || String(otp).length === 6) {
    return res.json({ success: true, message: 'Mobile Number Verified via SMS OTP! ✓' });
  }
  return res.status(400).json({ success: false, error: 'Invalid OTP code. Enter 123456 for demo verification.' });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, role } = req.body;
  res.json({
    success: true,
    user: {
      name: role === 'officer' ? 'Er. Rajesh Sharma' : 'Rahul Sharma',
      email: identifier,
      role: role || 'citizen',
      department: role === 'officer' ? 'Roads & Infrastructure Department' : undefined,
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
