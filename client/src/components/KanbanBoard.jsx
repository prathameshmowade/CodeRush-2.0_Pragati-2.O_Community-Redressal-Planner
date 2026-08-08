import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import KanbanCard from './KanbanCard';
import { Users, Award } from 'lucide-react';

const COLS = ['New', 'Assigned', 'In Progress', 'Pending Verification', 'Resolved'];

const COL_NAMES_HI = {
  'New': 'नई शिकायतें',
  'Assigned': 'अधिकारी आवंटित',
  'In Progress': 'कार्य प्रगति पर',
  'Pending Verification': 'सत्यापन लंबित',
  'Resolved': 'सत्यापित व समाधानित'
};

const COL_STYLES = {
  'New': 'border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/40 dark:border-emerald-900',
  'Assigned': 'border-amber-200 bg-amber-50/20 dark:bg-amber-950/30 dark:border-amber-900',
  'In Progress': 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/60 dark:border-emerald-800',
  'Pending Verification': 'border-amber-300 bg-amber-50/40 dark:bg-amber-950/40 dark:border-amber-800',
  'Resolved': 'border-teal-200 bg-teal-50/30 dark:bg-teal-950/30 dark:border-teal-900'
};

export default function KanbanBoard({ complaints = [], onSelect, onStatusChange }) {
  const { isHindi } = useContext(LanguageContext);

  return (
    <div className="space-y-6">
      {/* Top Differentiators Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Community Coalition */}
        <div className="bg-white dark:bg-emerald-950/70 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold block text-[11px]">
                {isHindi ? 'सामुदायिक समूह क्लस्टरिंग' : 'Community Coalition Clustering'}
              </span>
              <span className="text-emerald-950 dark:text-white font-bold">
                {isHindi ? '247 नागरिक प्रभावित • 12 रिपोर्ट स्वतः एकत्रित' : '247 Citizens Affected • 12 Reports Auto-Clustered'}
              </span>
            </div>
          </div>
          <span className="bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px]">
            {isHindi ? 'याचिका सत्यापित 🔥' : 'Petition Verified 🔥'}
          </span>
        </div>

        {/* Citizen Trust Index */}
        <div className="bg-white dark:bg-emerald-950/70 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold block text-[11px]">
                {isHindi ? 'नागरिक विश्वास सूचकांक' : 'Citizen Trust Index Score'}
              </span>
              <span className="text-emerald-950 dark:text-white font-bold">
                {isHindi ? 'नागपुर सेंट्रल सड़क विभाग • 92 / 100 रेटिंग' : 'Nagpur Central Roads Dept • 92 / 100 Rating'}
              </span>
            </div>
          </div>
          <span className="bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px]">
            {isHindi ? 'शीर्ष SLA अनुपालन ✓' : 'Top Tier SLA Compliance ✓'}
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

          const columnDisplayName = isHindi ? (COL_NAMES_HI[col] || col) : col;

          return (
            <div
              key={col}
              className={`p-4 rounded-2xl border ${COL_STYLES[col] || 'border-emerald-100 bg-white'} min-h-[340px] space-y-3 shadow-xs`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100 dark:border-emerald-900">
                <h3 className="font-extrabold text-emerald-950 dark:text-white text-xs uppercase tracking-wider">
                  {columnDisplayName}
                </h3>
                <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  {colComplaints.length}
                </span>
              </div>
              <div className="space-y-3">
                {colComplaints.map((c) => (
                  <KanbanCard
                    key={c.complaintId || c._id}
                    complaint={c}
                    onSelect={() => onSelect?.(c)}
                    onStatusChange={(targetId, newStatus) => {
                      onStatusChange?.(targetId || c.complaintId || c._id, newStatus);
                    }}
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
