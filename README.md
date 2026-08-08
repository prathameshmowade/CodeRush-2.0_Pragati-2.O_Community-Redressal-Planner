# 🏛️ Awaaz AI (आवाज़.ai) — AI-Powered Community Redressal & Predictive Civic Infrastructure Planner

> **Pragati 2.0 Hackathon | Track 3: Sustainable Development Goals (SDG-01: No Poverty & SDG-11: Sustainable Cities & Communities)**  
> **Transforming municipal grievances into explainable, prioritized, and cryptographically verified civic outcomes.**

---

## 🌐 Live Production Deployment

| Service | Live URL | Description |
| :--- | :--- | :--- |
| **🚀 Production Web App** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/](https://code-rush-2-0-pragati-2-o-community.vercel.app/) | Live full-stack portal with instant English <-> Hindi toggle |
| **👮 Officer Kanban Dashboard** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/officer](https://code-rush-2-0-pragati-2-o-community.vercel.app/officer) | Department bifurcation dropdown, SLA timers, and copilot |
| **👤 Citizen Intake & Voice AI** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/citizen](https://code-rush-2-0-pragati-2-o-community.vercel.app/citizen) | Multi-lingual speech, Google Maps, and YOLOv8 privacy blur |
| **🗺️ City Digital Twin & Heatmap** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/digital-twin](https://code-rush-2-0-pragati-2-o-community.vercel.app/digital-twin) | Ward 12 telemetry simulation and 3-citizen photo audit |
| **📊 City Resolution Analytics** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/analytics](https://code-rush-2-0-pragati-2-o-community.vercel.app/analytics) | Real-time SLA trends, failure hotspots, and resolution KPIs |
| **🔑 Single Sign-On Gateway** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/login](https://code-rush-2-0-pragati-2-o-community.vercel.app/login) | SMS OTP verification & Officer Secret API Key authorization |

---

## 📋 Project Information

| Field | Details |
| :--- | :--- |
| **Team Name** | **CodeRush 2.0 (Pragati 2.O)** |
| **Project Title** | **Awaaz AI — Smart Community Redressal Management & Predictive Civic Planner** |
| **Track / Theme** | **Track 3: Sustainable Development Goals (SDG-01 & SDG-11: Smart Sustainable Cities)** |
| **Repository** | [https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner](https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner) |
| **Live Vercel URL** | [https://code-rush-2-0-pragati-2-o-community.vercel.app/](https://code-rush-2-0-pragati-2-o-community.vercel.app/) |
| **Live Local URL** | `http://localhost:3000` |

---

## 💡 Project Description

### 🔴 The Problem
Traditional municipal redressal systems suffer from severe friction:
1. **High Access Barriers**: Complex English-only forms exclude rural and non-tech-savvy citizens who communicate via regional voice.
2. **Duplicate Flooding**: Multiple citizens reporting the same pothole create massive backlog clutter without intelligent deduplication.
3. **Opaque Bureaucracy**: Grievances disappear into silent government queues without real-time tracking or explainable routing rationale.
4. **Zero Verification Proof**: Tickets are frequently marked "Resolved" by contractors without physical proof or community verification.
5. **Reactive Governance**: Municipalities only fix failures after public outrage instead of predicting infrastructure degradation.

### 🟢 The Proposed Solution
**Awaaz AI** is a next-generation civic intelligence and redressal ecosystem:
- **Zero-Friction Multi-Lingual Intake**: Report complaints in under 30 seconds using **Multi-Lingual Voice (English, Hindi, Marathi)** or accessible web form with automatic GPS coordinate detection.
- **Global English <-> Hindi Translation (`🇬🇧 EN` | `🇮🇳 हिन्दी`)**: Full-site dynamic multi-lingual toggle with persistent state across all pages.
- **Explainable AI (XAI) Triage & Auto-Classification**: Natural NLP computes urgency, classifies departments, extracts severity keywords, and auto-routes "Other / Miscellaneous" tickets.
- **Department Bifurcation Dropdown**: Officer dashboard enables granular filtering across Roads, Water, Sanitation, Electrical, Parks, or Municipal Overview (`ALL`).
- **SMS OTP Citizen Phone Verification**: 6-digit verification code (`123456`) ensuring authenticated and verified citizen identities.
- **Officer Secret API Key Security**: Cryptographically validated secret key protecting municipal administrative portals.
- **Smart Privacy & Anonymization (DPDP Act 2023)**: Automated PII masking (Aadhaar & phone redaction) and YOLOv8 object anonymizer for uploaded evidence photos.
- **Field Officer Kanban & Resolution Copilot**: Live SLA countdown timers, dynamic contractor work order generator, and 3-citizen crowd consensus verification.
- **Predictive City Digital Twin**: Ward-level infrastructure heatmap forecasting road, water, sanitation, and lighting failures before citizens complain.
- **SHA-256 Cryptographic Audit Ledger**: Tamper-evident blockchain hash chain ensuring full provenance and eliminating silent ticket deletion.

---

## 🛠️ Technical Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Awaaz AI Tech Stack                           │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Layer             │ Technologies      │ Purpose & Highlights           │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🖥️ Frontend       │ React 18, Vite,   │ Light Green + Dark Slate Theme,│
│                   │ Tailwind CSS, Lucide│ Dual Language (EN/HI) Support  │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🗺️ Mapping & UI   │ Google Maps API,  │ Live Incident Geolocation,     │
│                   │ Chart.js, Canvas  │ Ward Heatmaps & SLA Visuals    │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ ⚙️ Backend API     │ Node.js, Express, │ Microservice Architecture,     │
│                   │ Vercel Serverless │ RESTful APIs & SMS OTP Engine  │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🧠 AI & Vision    │ Fast Natural NLP, │ Triage Urgency, Multi-Lingual  │
│                   │ YOLOv8, CLIP Proof│ Voice Input, Photo Anonymizer  │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🗄️ Database       │ MongoDB Mongoose, │ LocalStorage Sync & Fallback   │
│                   │ JSON Data Stores  │ for 100% Offline Demo Run      │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🔒 Security       │ SHA-256 Ledger,   │ DPDP Act 2023 Compliant PII,   │
│                   │ Regex PII Shield  │ Officer Secret API Key Auth    │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## ✨ 8 Core Differentiators

| # | Differentiator | Feature Description |
| :-: | :--- | :--- |
| 1 | **🧠 Explainable AI (XAI) Triage & Auto-Classification** | Transparent confidence scores, jurisdiction rules, and live NLP keyword classification for "Other / Miscellaneous" tickets. |
| 2 | **🌐 Complete English ↔ Hindi Translation Switch** | Global navigation bar toggle (`🇬🇧 EN` \| `🇮🇳 हिन्दी`) dynamically translating the entire portal into pure Hindi or English. |
| 3 | **🏛️ Officer Department Bifurcation Dropdown** | 5-stage Kanban board with instant filtering across Roads, Water, Sanitation, Electrical, Parks, and All Departments. |
| 4 | **📱 Citizen SMS OTP Phone Verification Flow** | Two-factor mobile registration with 6-digit SMS OTP verification (`123456`) and green verification badges. |
| 5 | **👥 3-Citizen Crowd Consensus Audit** | Repairs below 90% AI visual confidence require 3 neighbor citizen verifications before contractor payout release. |
| 6 | **🏙️ Predictive City Digital Twin** | IoT telemetry grid simulating Ward 12 infrastructure health (Roads 62%, Water 91%, Lighting 88%). |
| 7 | **🔒 Cryptographic SHA-256 Ledger & Secret Key** | Merkle tree audit logging preventing fraudulent ticket modifications or silent deletions, protected by Officer Secret API Keys. |
| 8 | **🤖 YOLOv8 Computer Vision Anonymizer** | Automated edge computer vision blurring human faces and vehicle license plates to preserve citizen privacy. |

---

## 👥 Team Members & Roles

| Avatar | Team Member | GitHub Profile | Primary Role & Contributions |
| :-: | :--- | :--- | :--- |
| 🏛️ | **Prathamesh Mowade** | [@prathameshmowade](https://github.com/prathameshmowade) | **Team Lead & Full-Stack Architect** — Backend Microservices, Google Maps API, Vercel Serverless Sync, and Department Bifurcation |
| 👩‍💻 | **Neha Musale** | [@NehaMusale11](https://github.com/NehaMusale11) | **UI/UX Lead** — React Component Hierarchy, Dual-Language Context (EN/HI), Dark/Light ThemeToggle Switch, and Responsive Design |
| 👨‍💻 | **Yash K** | [@Yash-k10](https://github.com/Yash-k10) | **AI/ML Lead** — NLP Triage Classifier, SMS OTP Verification Engine, SLA Countdown Mathematics, and Status Workflows |
| 👩‍💻 | **Kanchan** | [@kanchan874](https://github.com/kanchan874) | **Backend Engineer** — Resolution Analytics Dashboard, ErrorBoundary Resilience, Secret Key Validation, and Escalation Services |
| 👩‍💻 | **Dhanshree** | [@Dhanshree010](https://github.com/Dhanshree010) | **Frontend Engineer** — Multi-Lingual Voice Recognition, City Digital Twin Map, YOLOv8 Privacy Shield, and Telemetry Widgets |

---

## 🚀 Setup and Installation

Follow these instructions to run the project locally on your machine:

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
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awaaz_ai
NODE_ENV=development
OFFICER_SECRET_KEY=ADMIN_OFFICER_SECRET_2026
```

### 4. Start the development server
Open two terminal windows:

**Terminal 1 — Start Backend Server:**
```bash
cd server
npm start
# Backend API will run on http://localhost:5000
```

**Terminal 2 — Start Frontend Client:**
```bash
cd client
npm run dev
# Frontend Client will be live on http://localhost:3000
```

---

## 🌐 Live Platform Navigation Guide

| Page Route | Description | Live Vercel Link | Local Link |
| :--- | :--- | :--- | :--- |
| **`/`** | Overview Landing Page, KPIs, Ward Telemetry, 4 Pillars, and 7-Step Workflow | [https://code-rush-2-0-pragati-2-o-community.vercel.app/](https://code-rush-2-0-pragati-2-o-community.vercel.app/) | `http://localhost:3000/` |
| **`/officer`** | Kanban Operations Board, Department Filter Dropdown, SLA Timers, and Copilot | [https://code-rush-2-0-pragati-2-o-community.vercel.app/officer](https://code-rush-2-0-pragati-2-o-community.vercel.app/officer) | `http://localhost:3000/officer` |
| **`/citizen`** | Multi-lingual Speech, Glowing AI "Other" Banner, and YOLOv8 Anonymizer | [https://code-rush-2-0-pragati-2-o-community.vercel.app/citizen](https://code-rush-2-0-pragati-2-o-community.vercel.app/citizen) | `http://localhost:3000/citizen` |
| **`/login`** | Government SSO Portal with SMS OTP Verification & Officer Secret API Key | [https://code-rush-2-0-pragati-2-o-community.vercel.app/login](https://code-rush-2-0-pragati-2-o-community.vercel.app/login) | `http://localhost:3000/login` |
| **`/digital-twin`** | Predictive Ward Infrastructure Simulation & 3-Citizen Verification Stream | [https://code-rush-2-0-pragati-2-o-community.vercel.app/digital-twin](https://code-rush-2-0-pragati-2-o-community.vercel.app/digital-twin) | `http://localhost:3000/digital-twin` |
| **`/analytics`** | City-wide Resolution Metrics, Failure Hotspots, and SLA Trend Charts | [https://code-rush-2-0-pragati-2-o-community.vercel.app/analytics](https://code-rush-2-0-pragati-2-o-community.vercel.app/analytics) | `http://localhost:3000/analytics` |
| **`/complaint/:id`** | Public Complaint Tracking Timeline & Cryptographic Proof Ledger | [https://code-rush-2-0-pragati-2-o-community.vercel.app/complaint/CMP-2026-001](https://code-rush-2-0-pragati-2-o-community.vercel.app/complaint/CMP-2026-001) | `http://localhost:3000/complaint/CMP-2026-001` |

---

## 📜 License
This project is developed for the **CodeRush 2.0 (Pragati 2.O)** Hackathon under the **MIT License**.
