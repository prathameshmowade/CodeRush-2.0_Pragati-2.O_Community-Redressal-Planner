import React from 'react';
import KanbanCard from './KanbanCard';
import { Users, Award } from 'lucide-react';

const COLS = ['New', 'Assigned', 'In Progress', 'Pending Verification', 'Resolved'];

const COL_STYLES = {
  'New': 'border-emerald-200 bg-emerald-50/30',
  'Assigned': 'border-amber-200 bg-amber-50/20',
  'In Progress': 'border-emerald-300 bg-emerald-50/50',
  'Pending Verification': 'border-amber-300 bg-amber-50/40',
  'Resolved': 'border-teal-200 bg-teal-50/30'
};

export default function KanbanBoard({ complaints = [], onSelect, onStatusChange }) {
  return (
    <div className="space-y-6">
      {/* Top Differentiators Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Innovation 6: Community Coalition */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-emerald-700 font-semibold block text-[11px]">Community Coalition Clustering</span>
              <span className="text-emerald-950 font-bold">247 Citizens Affected • 12 Reports Auto-Clustered</span>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full font-bold text-[10px]">
            Petition Verified 🔥
          </span>
        </div>

        {/* Innovation 12: Citizen Trust Index */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-emerald-700 font-semibold block text-[11px]">Citizen Trust Index Score</span>
              <span className="text-emerald-950 font-bold">Nagpur Central Roads Dept • 92 / 100 Rating</span>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full font-bold text-[10px]">
            Top Tier SLA Compliance ✓
          </span>
        </div>
      </div>

      {/* Kanban Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {COLS.map((col) => {
          const colComplaints = complaints.filter((c) => {
            const count = c.verificationsCount || (c.verifications ? c.verifications.length : 0);
            const status = (c.status || 'New').trim();

            if (col === 'Resolved') {
              return status === 'Resolved' || status === 'Verified & Resolved' || status === 'Completed' || count >= 3;
            }
            if (col === 'Pending Verification') {
              return status === 'Pending Verification' && count < 3;
            }
            if (col === 'In Progress') {
              return status === 'In Progress' || status === 'In-Progress';
            }
            if (col === 'Assigned') {
              return status === 'Assigned';
            }
            if (col === 'New') {
              return status === 'New' || status === 'new' || (!['Assigned', 'In Progress', 'In-Progress', 'Pending Verification', 'Resolved', 'Verified & Resolved', 'Completed'].includes(status) && count < 3);
            }
            return false;
          });

          return (
            <div
              key={col}
              className={`p-4 rounded-2xl border ${COL_STYLES[col] || 'border-emerald-100 bg-white'} min-h-[340px] space-y-3 shadow-xs`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <h3 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider">{col}</h3>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                  {colComplaints.length}
                </span>
              </div>
              <div className="space-y-3">
                {colComplaints.map((c) => (
                  <KanbanCard
                    key={c.complaintId || c._id}
                    complaint={c}
                    onClick={() => onSelect?.(c)}
                    onStatusChange={(newStatus) => onStatusChange?.(c.complaintId || c._id, newStatus)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
