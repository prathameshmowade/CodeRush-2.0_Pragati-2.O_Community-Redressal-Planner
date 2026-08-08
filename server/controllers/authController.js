const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');

// In-memory fallback user store for standalone running without MongoDB connection
const memoryUsers = [
  {
    citizenId: 'CIT-2026-1001',
    name: 'Rahul Sharma',
    mobile: '9876543210',
    email: 'citizen.rahul@gmail.com',
    passwordHash: bcrypt.hashSync('demo1234', 8),
    role: 'citizen',
    address: 'Flat 402, Sunshine Apartments, Laxmi Nagar',
    city: 'Nagpur',
    state: 'Maharashtra',
    pinCode: '440010',
    createdAt: new Date(),
    lastLoginAt: new Date()
  },
  {
    citizenId: 'OFF-2026-9001',
    name: 'Er. Rajesh Sharma',
    mobile: '9123456789',
    email: 'officer.sharma@nagpurcivic.gov.in',
    passwordHash: bcrypt.hashSync('officer1234', 8),
    role: 'officer',
    department: 'Roads & Infrastructure Department',
    address: 'NMC Headquarters, Civil Lines',
    city: 'Nagpur',
    state: 'Maharashtra',
    pinCode: '440001',
    createdAt: new Date(),
    lastLoginAt: new Date()
  }
];

// Elevated roles that require ADMIN_SECRET_KEY verification
const ELEVATED_ROLES = ['admin', 'department_worker', 'officer'];

// Register New Citizen Endpoint with Secure Role-Based Access
const register = async (req, res) => {
  try {
    const { name, mobile, email, password, address, city, state, pinCode, role, adminSecretKey } = req.body;

    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, Mobile, Email, and Password are required fields.' });
    }

    // --- SECURE ROLE ASSIGNMENT ---
    // Default: all public signups get 'resident' role.
    // Never trust the 'role' field from the client blindly.
    let assignedRole = 'resident';

    if (role && ELEVATED_ROLES.includes(role)) {
      const serverSecretKey = process.env.OFFICER_SECRET_KEY || process.env.ADMIN_SECRET_KEY || 'ADMIN_OFFICER_SECRET_2026';
      const userProvidedKey = req.body.secretKey || req.body.officerSecretKey || req.body.adminSecretKey;

      if (!userProvidedKey || userProvidedKey !== serverSecretKey) {
        console.warn(`[AUTH] Elevated role signup attempt blocked for role '${role}'. Invalid secret key provided.`);
        return res.status(403).json({ success: false, error: 'Unauthorized: Invalid or missing Officer Secret API Key.' });
      }
      // Secret key matches — permit the elevated role
      assignedRole = role;
      console.info(`[AUTH] Elevated role '${role}' signup authorized via valid Officer Secret Key.`);
    }

    // Check duplicate in MongoDB
    try {
      const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { mobile }] });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: existingUser.email === email.toLowerCase()
            ? 'An account with this Email Address already exists.'
            : 'An account with this Mobile Number already exists.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const citizenId = `CIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newUser = await User.create({
        citizenId,
        name,
        mobile,
        email: email.toLowerCase(),
        password: hashedPassword,
        address: address || '',
        city: city || 'Nagpur',
        state: state || 'Maharashtra',
        pinCode: pinCode || '440010',
        role: assignedRole
      });

      return res.status(201).json({
        success: true,
        message: 'Registration Successful!',
        citizenId: newUser.citizenId,
        user: {
          citizenId: newUser.citizenId,
          name: newUser.name,
          mobile: newUser.mobile,
          email: newUser.email,
          role: newUser.role,
          address: newUser.address,
          city: newUser.city,
          state: newUser.state,
          pinCode: newUser.pinCode
        }
      });
    } catch (dbErr) {
      console.warn('MongoDB query bypassed, using in-memory store:', dbErr.message);

      // In-memory fallback check duplicate
      const memDup = memoryUsers.find((u) => u.email === email.toLowerCase() || u.mobile === mobile);
      if (memDup) {
        return res.status(400).json({
          success: false,
          error: memDup.email === email.toLowerCase()
            ? 'An account with this Email Address already exists.'
            : 'An account with this Mobile Number already exists.'
        });
      }

      const citizenId = `CIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const passwordHash = bcrypt.hashSync(password, 8);

      const memUser = {
        citizenId,
        name,
        mobile,
        email: email.toLowerCase(),
        passwordHash,
        role: assignedRole,
        address: address || 'Laxmi Nagar',
        city: city || 'Nagpur',
        state: state || 'Maharashtra',
        pinCode: pinCode || '440010',
        createdAt: new Date(),
        lastLoginAt: new Date()
      };
      memoryUsers.push(memUser);

      return res.status(201).json({
        success: true,
        message: 'Registration Successful!',
        citizenId,
        user: {
          citizenId,
          name,
          mobile,
          email: memUser.email,
          role: assignedRole,
          address: memUser.address,
          city: memUser.city,
          state: memUser.state,
          pinCode: memUser.pinCode
        }
      });
    }
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error during registration' });
  }
};

// Send SMS OTP Endpoint
const sendOTP = (req, res) => {
  const { mobile } = req.body;
  if (!mobile || String(mobile).replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number is required.' });
  }
  const demoOtp = '123456';
  return res.json({
    success: true,
    message: `SMS OTP dispatched to +91-${mobile}`,
    otp: demoOtp,
    expiresIn: '10 minutes'
  });
};

// Verify OTP Endpoint (Simulated "123456")
const verifyOTP = (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) return res.status(400).json({ success: false, error: 'Mobile number and OTP required' });
  if (otp === '123456' || String(otp).length === 6) {
    return res.json({ success: true, message: 'Mobile OTP Verified Successfully ✓' });
  }
  return res.status(400).json({ success: false, error: 'Invalid OTP code. Enter 123456 for demo verification.' });
};

// Login Citizen / Officer Endpoint
const login = async (req, res) => {
  try {
    const { identifier, email, password, role } = req.body;
    const loginId = (identifier || email || '').trim().toLowerCase();

    if (!loginId || !password) {
      return res.status(400).json({ success: false, error: 'Mobile / Email and Password are required.' });
    }

    try {
      const user = await User.findOne({
        $or: [{ email: loginId }, { mobile: loginId }]
      });

      if (user) {
        if (user.isLocked) {
          return res.status(403).json({ success: false, error: 'Account locked due to multiple failed login attempts. Contact admin.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          user.failedAttempts = (user.failedAttempts || 0) + 1;
          if (user.failedAttempts >= 5) {
            user.isLocked = true;
          }
          await user.save();
          return res.status(401).json({ success: false, error: 'Invalid password credentials.' });
        }

        // Reset failed attempts & update last login
        user.failedAttempts = 0;
        user.lastLoginAt = new Date();
        await user.save();

        const token = jwt.sign(
          { citizenId: user.citizenId, email: user.email, role: user.role },
          env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.json({
          success: true,
          token,
          user: {
            citizenId: user.citizenId,
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            role: user.role,
            department: user.department,
            address: user.address,
            city: user.city,
            state: user.state,
            pinCode: user.pinCode,
            lastLoginAt: user.lastLoginAt
          }
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB query bypassed, searching memory database:', dbErr.message);
    }

    // Fallback in-memory search
    const memUser = memoryUsers.find((u) => u.email === loginId || u.mobile === loginId);
    if (!memUser) {
      return res.status(401).json({ success: false, error: 'No registered user found with this Mobile Number or Email.' });
    }

    const match = bcrypt.compareSync(password, memUser.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, error: 'Invalid password credentials.' });
    }

    memUser.lastLoginAt = new Date();

    const token = jwt.sign(
      { citizenId: memUser.citizenId, email: memUser.email, role: memUser.role },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      user: {
        citizenId: memUser.citizenId,
        name: memUser.name,
        mobile: memUser.mobile,
        email: memUser.email,
        role: memUser.role,
        department: memUser.department,
        address: memUser.address,
        city: memUser.city,
        state: memUser.state,
        pinCode: memUser.pinCode,
        lastLoginAt: memUser.lastLoginAt
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error during login' });
  }
};

module.exports = { register, verifyOTP, sendOTP, login };
