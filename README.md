# Awaaz AI — AI-Powered Community Redressal & Predictive Civic Infrastructure Planner

## Project Information
• **Team Name**: CodeRush 2.0 (Pragati 2.O)  
• **Project Title**: Awaaz AI — Smart Community Redressal Management & Predictive Civic Planner  
• **Track/Theme**: Track 3: Sustainable Development Goals (SDG-01 & Smart Cities / Community Redressal)  
• **Repository**: [https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner](https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner)

---

## Project Description
Awaaz AI transforms municipal grievance management from a slow, opaque bureaucratic pipeline into an explainable, real-time, and privacy-first civic governance platform. 

### The Problem
Traditional municipal redressal systems suffer from high friction (complex web portals, English-only text), delayed routing, duplicate complaint flooding, zero visibility for citizens on ticket progress, lack of cryptographic verification proof for completed repairs, and silent ticket closures.

### The Proposed Solution
Awaaz AI empowers citizens to report civic grievances in 30 seconds via Speech/Voice (English, Hindi, Marathi), WhatsApp simulator, or web form with automatic GPS geolocation and PII masking. The core AI engine extracts entities, computes triage urgency, clusters duplicates, and automatically dispatches tasks to ward officers with transparent Explainable AI (XAI) rationale. Field officers use an interactive Kanban Dashboard and an AI Resolution Copilot with physical computer vision before/after photo verification, SLA countdown timers, and a predictive City Digital Twin.

---

## Technical Stack
List of technologies used in this project:
• **Frontend**: React 18, Vite, Tailwind CSS (Custom Light Green & Dark Slate Theme System), Chart.js, Lucide Icons, Google Maps JavaScript API v3, Web Speech Recognition API  
• **Backend**: Node.js, Express.js REST API, Fast Natural NLP Triage Engine, YOLOv8 Object Anonymizer (Face & License Plate Masking), CLIP Visual Verification Proof  
• **Database**: MongoDB (Mongoose ODM) with In-Memory Mock Failover Engine for zero-dependency offline evaluations  
• **Tools/APIs**: Web Speech API, Google Maps API v3, SHA-256 Blockchain Ledger, WhatsApp Civic Simulator, Axios, PostCSS, Autoprefixer  

---

## 👥 Team Members & Contributions
1. **Prathamesh Mowade** ([@prathameshmowade](https://github.com/prathameshmowade)) — Full-Stack Architecture, Node/Express Backend, Google Maps Integration  
2. **Neha Musale** ([@NehaMusale11](https://github.com/NehaMusale11)) — UI/UX Lead, React Component Hierarchy, ThemeToggle Switch & Responsive Design  
3. **Yash K** ([@Yash-k10](https://github.com/Yash-k10)) — AI/ML Lead, NLP Triage Classification, SLA Timer Countdown Logic & Status Tracking  
4. **Kanchan** ([@kanchan874](https://github.com/kanchan874)) — Backend Engineer, Analytics Dashboard, ErrorBoundary & WhatsApp Civic Simulator  
5. **Dhanshree** ([@Dhanshree010](https://github.com/Dhanshree010)) — Frontend Engineer, Multi-lingual Voice Recognition, Digital Twin Map & Telemetry  

---

## Setup and Installation
Provide instructions on how to run your project locally:

### 1. Clone the repository
```bash
git clone https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner.git
cd CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner
```

### 2. Install dependencies
```bash
# Install frontend client dependencies
cd client
npm install

# Install backend server dependencies
cd ../server
npm install
cd ..
```

### 3. Configure environment variables
Create a `.env` file in the `server` directory (or use `.env.example` as a template):
```bash
# Server Environment
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awaaz_ai
NODE_ENV=development
```

### 4. Start the development server
Open two terminal windows:

**Terminal 1 — Start Backend Server:**
```bash
cd server
npm start
# Backend API will run on http://localhost:5000
```

**Terminal 2 — Start Frontend Server:**
```bash
cd client
npm run dev
# Frontend Client will run on http://localhost:3000
```

---

## 🌟 Key Innovations & Live Endpoints
- **🏛️ Government Login & Demo SSO**: [http://localhost:3000/login](http://localhost:3000/login) (1-Click Demo Citizen & Demo Officer Access)
- **📍 Citizen Intake & Voice AI**: [http://localhost:3000/citizen](http://localhost:3000/citizen)
- **📋 Officer Kanban Dashboard**: [http://localhost:3000/officer](http://localhost:3000/officer)
- **🗺️ Predictive City Digital Twin**: [http://localhost:3000/digital-twin](http://localhost:3000/digital-twin)
- **📊 Ward SLA Analytics**: [http://localhost:3000/analytics](http://localhost:3000/analytics)
