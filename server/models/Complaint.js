const mongoose = require('mongoose');
const s = new mongoose.Schema({ 
  complaintId: { type: String, required: true, unique: true }, 
  title: { type: String, required: true }, 
  description: String, 
  category: { type: String, default: 'Road Damage' }, 
  urgency: { type: String, enum: ['Low','Medium','High','Critical','Low Priority','Medium Priority','High Priority','Critical Priority'], default: 'Medium' }, 
  status: { type: String, enum: ['New','Assigned','In Progress','Pending Verification','Resolved','Verified & Resolved','Escalated'], default: 'New' }, 
  department: String, 
  location: { address: String, lat: Number, lng: Number }, 
  language: { type: String, default: 'en' }, 
  source: { type: String, enum: ['web', 'sms', 'call', 'whatsapp'], default: 'web' },
  citizenPhone: { type: String },
  confidenceScore: Number, 
  slaHoursTotal: Number, 
  slaHoursRemaining: Number, 
  impactScore: Number, 
  isDuplicate: Boolean, 
  xaiExplanation: Object, 
  blockchainHash: String, 
  resolutionProof: String,
  resolutionNotes: String,
  recordingUrl: String,
  recordingSid: String,
  recordingDuration: Number,
  messageSid: String,
  verifications: [{ citizenName: String, comment: String, verifiedAt: Date }],
  verificationsCount: { type: Number, default: 0 },
  requiredVerifications: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now } 
});
module.exports = mongoose.model('Complaint', s);



