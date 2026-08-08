import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../context/LanguageContext';
import { Building2, Activity, ShieldCheck, Camera, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import DigitalTwinMap from '../components/DigitalTwinMap';
import CitizenVerificationPanel from '../components/CitizenVerificationPanel';

const CITY_ZONES = [
  { id: 12, name: 'Laxmi Nagar Zone', nameHi: 'लक्ष्मी नगर जोन', healthScore: 91, riskLevel: 'Low Risk', riskLevelHi: 'कम जोखिम', activeComplaints: 14, riskColor: 'border-emerald-200 text-emerald-800 bg-emerald-50' },
  { id: 5, name: 'Dharampeth Zone', nameHi: 'धरमपेठ जोन', healthScore: 62, riskLevel: 'High Risk (Sewer Overflow)', riskLevelHi: 'उच्च जोखिम (सीवर ओवरफ्लो)', activeComplaints: 42, riskColor: 'border-red-200 text-red-800 bg-red-50' },
  { id: 7, name: 'Sadar Zone', nameHi: 'सदर जोन', healthScore: 74, riskLevel: 'Medium Risk (Streetlights)', riskLevelHi: 'मध्यम जोखिम (स्ट्रीटलाइट)', activeComplaints: 28, riskColor: 'border-amber-200 text-amber-800 bg-amber-50' },
  { id: 1, name: 'Sitabuldi Zone', nameHi: 'सीताबर्डी जोन', healthScore: 85, riskLevel: 'Low Risk', riskLevelHi: 'कम जोखिम', activeComplaints: 18, riskColor: 'border-teal-200 text-teal-800 bg-teal-50' }
];

export default function DigitalTwinPage() {
  const { isHindi } = useContext(LanguageContext);
  const [selectedZone, setSelectedZone] = useState(CITY_ZONES[1]); // Default Dharampeth
  const [pendingVerificationComplaints, setPendingVerificationComplaints] = useState([]);

  const loadVerificationFeed = async () => {
    let allComplaints = [];

    // Load from local storage cache first
    try {
      const saved = localStorage.getItem('civic_officer_complaints');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) allComplaints = parsed;
      }
    } catch (e) {}

    // Also fetch from API
    try {
      const res = await axios.get('/api/complaints');
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        const apiData = res.data.data;
        const map = new Map(allComplaints.map((c) => [c.complaintId, c]));
        apiData.forEach((c) => map.set(c.complaintId, { ...c, ...map.get(c.complaintId) }));
        allComplaints = Array.from(map.values());
      }
    } catch (err) {}

    // Filter complaints in Pending Verification or recently needing verification
    const pendingList = allComplaints.filter(
      (c) => c.status === 'Pending Verification' || (c.resolutionProof && c.verificationsCount < 3)
    );

    // If none found, provide sample ticket so verification stream is never empty
    if (pendingList.length === 0) {
      pendingList.push({
        complaintId: 'CMP-2026-004',
        title: 'Streetlight Junction Box Repair & Rewiring on Dharampeth Main Road',
        category: 'Electrical',
        zoneId: selectedZone.id,
        status: 'Pending Verification',
        resolutionProof: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80',
        resolutionNotes: 'Replaced burnt junction box transformer & tested high-voltage circuit. Site cleared.',
        aiSimilarityScore: 84,
        verifications: [
          { citizenName: 'Aarav Patel', comment: 'Inspected location, streetlights functioning fine!', verifiedAt: new Date().toISOString() },
          { citizenName: 'Priya Sharma', comment: 'Confirmed site work completed cleanly.', verifiedAt: new Date().toISOString() }
        ],
        verificationsCount: 2,
        requiredVerifications: 3,
        verificationWindowDays: 7,
        pendingVerificationStartedAt: new Date(Date.now() - 2 * 86400000).toISOString()
      });
    }

    setPendingVerificationComplaints(pendingList);
  };

  useEffect(() => {
    loadVerificationFeed();
    const interval = setInterval(loadVerificationFeed, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Container */}
      <div className="bg-white dark:bg-emerald-950/70 p-6 md:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isHindi ? 'नगर पालिका डिजिटल ट्विन सिमुलेशन' : 'MUNICIPAL DIGITAL TWIN SIMULATION'}</span>
          <span className="text-emerald-300">•</span>
          <span>{isHindi ? 'लाइव स्थानिक टेलीमेट्री' : 'LIVE SPATIAL TELEMETRY'}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950 dark:text-white flex items-center gap-2.5">
          <Building2 className="w-7 h-7 text-emerald-600" />
          <span>{isHindi ? 'नागपुर शहर एआई डिजिटल ट्विन व नागरिक सत्यापन' : 'Nagpur Smart City AI Digital Twin & Citizen Verification Stream'}</span>
        </h1>
        <p className="text-emerald-800 dark:text-emerald-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          {isHindi
            ? 'शहरी बुनियादी ढांचा स्वास्थ्य स्कोर, गड्ढों का पूर्वानुमान और 3-नागरिक सामुदायिक फोटो सत्यापन कार्यप्रवाह।'
            : 'Predictive infrastructure failure models, municipal structural health indices, and live 3-citizen photographic resolution verification workflows.'}
        </p>
      </div>

      {/* Ward Health Index Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CITY_ZONES.map((zone) => (
          <button
            key={zone.id}
            type="button"
            onClick={() => setSelectedZone(zone)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedZone.id === zone.id
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-900/60 shadow-xs ring-2 ring-emerald-500/20'
                : 'border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950/70 hover:bg-emerald-50/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-emerald-950 dark:text-white">
                {isHindi ? zone.nameHi : zone.name}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${zone.riskColor}`}>
                {isHindi ? zone.riskLevelHi : zone.riskLevel}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-300">
                  {isHindi ? 'स्वास्थ्य सूचकांक:' : 'Health Index:'}
                </span>
                <span className="font-bold font-mono text-emerald-950 dark:text-white">{zone.healthScore}/100</span>
              </div>
              <div className="w-full bg-emerald-100 dark:bg-emerald-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${zone.healthScore < 70 ? 'bg-red-500' : 'bg-emerald-600'}`}
                  style={{ width: `${zone.healthScore}%` }}
                />
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block pt-1">
                {zone.activeComplaints} {isHindi ? 'सक्रिय शिकायतें' : 'Active Grievances'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Digital Twin 3D / Spatial Map */}
      <div className="bg-white dark:bg-emerald-950/70 p-4 md:p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900 space-y-4 shadow-xs">
        <div className="flex justify-between items-center pb-2 border-b border-emerald-100 dark:border-emerald-900">
          <h3 className="font-bold text-emerald-950 dark:text-white text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>
              {isHindi ? 'लाइव स्थानिक टेलीमेट्री ग्रिड — ' : 'Live Spatial Telemetry Grid — '}
              {isHindi ? selectedZone.nameHi : selectedZone.name}
            </span>
          </h3>
          <span className="text-xs bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full font-bold">
            {isHindi ? 'सिमुलेशन सक्रिय ✓' : 'Real-Time Simulation Active ✓'}
          </span>
        </div>
        <DigitalTwinMap />
      </div>

      {/* 3-Citizen Verification Stream */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-emerald-950/70 p-6 md:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>{isHindi ? 'नागरिक सत्यापन स्ट्रीम' : 'CITIZEN VERIFICATION STREAM'}</span>
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950 dark:text-white">
            {isHindi ? '3-नागरिक फोटो सत्यापन व कार्य स्वीकृति' : '3-Citizen Photo Audit & Contractor Payment Release'}
          </h3>
          <p className="text-xs text-emerald-800 dark:text-emerald-300">
            {isHindi
              ? 'नगर निगम ठेकेदारों द्वारा अपलोड की गई मरम्मत की तस्वीरों का 3 स्थानीय नागरिकों द्वारा सत्यापन आवश्यक है।'
              : 'Before public funds and contractor invoices are approved, 3 independent local citizens must inspect and authenticate repair photographic evidence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingVerificationComplaints.map((comp) => (
            <CitizenVerificationPanel
              key={comp.complaintId || comp._id}
              complaint={comp}
              onVerified={(updatedComp) => {
                setPendingVerificationComplaints((prev) =>
                  prev.map((c) => (c.complaintId === updatedComp.complaintId ? updatedComp : c))
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
