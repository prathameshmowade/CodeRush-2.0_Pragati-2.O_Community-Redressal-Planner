import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from '../components/KanbanBoard';
import SLATimer from '../components/SLATimer';
import ResolutionCopilot from '../components/ResolutionCopilot';
import XAIPanel from '../components/XAIPanel';
import ResolutionProofModal from '../components/ResolutionProofModal';
import { ShieldCheck, LayoutDashboard, Clock, AlertCircle } from 'lucide-react';

const FALLBACK_MOCK = [
  {
    complaintId: 'CMP-2026-001',
    title: 'Severe road pothole near ABC School causing traffic hazards',
    description: 'Deep pothole on main school road. Multiple vehicles damaged over the weekend.',
    category: 'Road Damage',
    urgency: 'High Priority',
    status: 'In Progress',
    confidenceScore: 96,
    xaiData: {
      confidence: 96,
      reasoning: ['Matched road hazard keywords in Laxmi Nagar', 'School Zone Safety Priority Rule Applied'],
      rulesApplied: ['Emergency School Zone Priority Rule']
    }
  },
  {
    complaintId: 'CMP-2026-002',
    title: 'Major water pipe leakage on Dharampeth Main Road',
    description: 'Water gushing out of broken 12-inch mainline.',
    category: 'Water Supply',
    urgency: 'Critical Priority',
    status: 'Assigned',
    confidenceScore: 94,
    xaiData: {
      confidence: 94,
      reasoning: ['Matched water leakage keywords in Dharampeth'],
      rulesApplied: ['Water Supply Mainline Escalation Rule']
    }
  },
  {
    complaintId: 'CMP-2026-003',
    title: 'Uncollected garbage accumulation near public park',
    description: 'Waste dump not cleared for 4 days.',
    category: 'Sanitation',
    urgency: 'Medium Priority',
    status: 'New',
    confidenceScore: 91,
    xaiData: {
      confidence: 91,
      reasoning: ['Sanitation dump keywords matched'],
      rulesApplied: ['Park Cleanliness Rule']
    }
  }
];

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('civic_officer_complaints');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return FALLBACK_MOCK;
  });

  const [selected, setSelected] = useState(() => complaints[0] || FALLBACK_MOCK[0]);
  const [resolvingComplaint, setResolvingComplaint] = useState(null);

  const saveComplaintsLocally = (newComplaints) => {
    setComplaints(newComplaints);
    try {
      localStorage.setItem('civic_officer_complaints', JSON.stringify(newComplaints));
    } catch (e) {}
  };

  const loadComplaints = async () => {
    let localSaved = [];
    try {
      const saved = localStorage.getItem('civic_officer_complaints');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) localSaved = parsed;
      }
    } catch (e) {}

    try {
      const res = await axios.get('/api/complaints');
      let serverData = [];
      if (Array.isArray(res.data)) {
        serverData = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        serverData = res.data.data;
      }

      if (serverData.length > 0) {
        setComplaints((prevLocal) => {
          const baseList = prevLocal.length > 0 ? prevLocal : localSaved.length > 0 ? localSaved : FALLBACK_MOCK;
          const localMap = new Map(baseList.map((c) => [c.complaintId || c._id, c]));

          const merged = serverData.map((serverComp) => {
            const id = serverComp.complaintId || serverComp._id;
            const localComp = localMap.get(id);
            if (localComp && localComp.status === 'Pending Verification' && serverComp.status !== 'Verified & Resolved') {
              return { ...serverComp, ...localComp, status: 'Pending Verification' };
            }
            return localComp ? { ...serverComp, ...localComp } : serverComp;
          });

          // Ensure all local new complaints are retained at top
          baseList.forEach((lComp) => {
            const id = lComp.complaintId || lComp._id;
            if (!merged.find((m) => (m.complaintId || m._id) === id)) {
              merged.unshift(lComp);
            }
          });

          try {
            localStorage.setItem('civic_officer_complaints', JSON.stringify(merged));
          } catch (e) {}

          return merged;
        });
      } else if (localSaved.length > 0) {
        setComplaints(localSaved);
      }
    } catch (err) {
      if (localSaved.length > 0) {
        setComplaints(localSaved);
      }
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    if (newStatus === 'Resolved') {
      const target = complaints.find((c) => (c.complaintId || c._id) === complaintId);
      if (target) {
        setResolvingComplaint(target);
        return;
      }
    }

    try {
      await axios.patch(`/api/complaints/${complaintId}/status`, { status: newStatus });
    } catch (err) {}

    const updated = complaints.map((c) =>
      (c.complaintId || c._id) === complaintId ? { ...c, status: newStatus } : c
    );
    saveComplaintsLocally(updated);
  };

  const handleResolutionSubmit = async (resolutionPayload) => {
    const startedAt = new Date().toISOString();
    const finalStatus =
      resolutionPayload.status ||
      (resolutionPayload.aiSimilarityScore >= 90 ? 'Verified & Resolved' : 'Pending Verification');

    try {
      await axios.patch(`/api/complaints/${resolutionPayload.complaintId}/status`, {
        status: finalStatus,
        resolutionProof: resolutionPayload.resolutionProof,
        resolutionNotes: resolutionPayload.resolutionNotes,
        aiSimilarityScore: resolutionPayload.aiSimilarityScore,
        pendingVerificationStartedAt: startedAt,
        verificationWindowDays: 7
      });
    } catch (err) {}

    const updated = complaints.map((c) => {
      const id = c.complaintId || c._id;
      if (id === resolutionPayload.complaintId) {
        return {
          ...c,
          status: finalStatus,
          resolutionProof: resolutionPayload.resolutionProof,
          resolutionNotes: resolutionPayload.resolutionNotes,
          aiSimilarityScore: resolutionPayload.aiSimilarityScore,
          verifications:
            finalStatus === 'Verified & Resolved'
              ? c.verifications?.length >= 3
                ? c.verifications
                : [
                    {
                      citizenName: 'AI Vision Match (≥90%)',
                      comment: `Auto-verified via AI image similarity (${resolutionPayload.aiSimilarityScore}% match)`,
                      verifiedAt: startedAt
                    },
                    { citizenName: 'System Audit', comment: 'Direct AI Verification Passed', verifiedAt: startedAt },
                    {
                      citizenName: 'Automated Certification',
                      comment: 'Quality threshold met',
                      verifiedAt: startedAt
                    }
                  ]
              : c.verifications || [],
          verificationsCount: finalStatus === 'Verified & Resolved' ? 3 : c.verificationsCount || 0,
          requiredVerifications: 3,
          pendingVerificationStartedAt: c.pendingVerificationStartedAt || startedAt,
          verificationWindowDays: 7
        };
      }
      return c;
    });

    saveComplaintsLocally(updated);
    setResolvingComplaint(null);
  };

  useEffect(() => {
    loadComplaints();
    const interval = setInterval(loadComplaints, 3000);

    const handleStorageChange = () => {
      const saved = localStorage.getItem('civic_officer_complaints');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setComplaints(parsed);
          }
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Officer Header Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NAGPUR MUNICIPAL CORPORATION • ZONE 12</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950 flex items-center gap-2.5">
              <LayoutDashboard className="w-7 h-7 text-emerald-600" />
              <span>Officer Triage & Work Order Dashboard</span>
            </h1>
            <p className="text-emerald-800 text-xs md:text-sm">
              Logged in as <strong className="text-emerald-950">Er. Rajesh Sharma</strong> (Superintending Engineer, Roads & Drainage)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-emerald-900">{complaints.length} Total Grievances Active</span>
          </div>
        </div>
      </div>

      {/* SLA Countdown Timer Bar */}
      <SLATimer targetTime={new Date(Date.now() + 18 * 3600 * 1000).toISOString()} />

      {/* Main 5-Stage Kanban Board */}
      <KanbanBoard
        complaints={complaints}
        onSelect={(c) => setSelected(c)}
        onStatusChange={handleStatusChange}
      />

      {/* Agentic Dispatch Copilot */}
      <ResolutionCopilot />

      {/* Selected Complaint Explainable AI View */}
      {selected && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-emerald-600" />
            <span>Detailed AI Triage Rationale for Selected Ticket ({selected.complaintId || selected._id}):</span>
          </div>
          <XAIPanel xaiData={selected.xaiData} />
        </div>
      )}

      {/* Photo Proof Upload Modal */}
      {resolvingComplaint && (
        <ResolutionProofModal
          complaint={resolvingComplaint}
          onClose={() => setResolvingComplaint(null)}
          onSubmit={handleResolutionSubmit}
        />
      )}
    </div>
  );
}
