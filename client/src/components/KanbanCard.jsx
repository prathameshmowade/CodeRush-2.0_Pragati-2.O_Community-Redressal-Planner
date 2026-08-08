import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { ThumbsUp, MapPin, Sparkles, Camera, CheckCircle2, Play } from 'lucide-react';

export default function KanbanCard({ complaint, onSelect, onStatusChange }) {
  const [upvotes, setUpvotes] = useState(complaint.upvotes || Math.floor(Math.random() * 20) + 5);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!hasUpvoted) {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  };

  const compId = complaint.complaintId || complaint._id;
  const verificationsCount = complaint.verificationsCount || (complaint.verifications ? complaint.verifications.length : 0);

  const handleStartWork = (e) => {
    e.stopPropagation();
    onStatusChange?.(compId, 'In Progress');
  };

  const handleMarkSolved = (e) => {
    e.stopPropagation();
    onStatusChange?.(compId, 'Resolved');
  };

  return (
    <div
      onClick={() => onSelect?.(complaint)}
      className="bg-white p-4 rounded-xl border border-emerald-100 hover:border-emerald-400 cursor-pointer space-y-3 shadow-xs transition hover:-translate-y-0.5"
    >
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {compId}
        </span>
        <StatusBadge status={complaint.status} />
      </div>

      {/* Title */}
      <h4 className="font-bold text-emerald-950 text-xs leading-snug">{complaint.title}</h4>

      {/* Description */}
      {complaint.description && (
        <p className="text-[11px] text-emerald-800 leading-relaxed line-clamp-2">{complaint.description}</p>
      )}

      {/* Resolution Photo Proof Badge & 7-Day Window Indicator */}
      {complaint.resolutionProof && (
        <div className="relative rounded-lg overflow-hidden border border-emerald-200 bg-emerald-50/50 p-1.5 flex items-center gap-2">
          <img src={complaint.resolutionProof} alt="Work Proof" className="w-10 h-10 object-cover rounded-md border border-emerald-200" />
          <div className="text-[10px] space-y-0.5 flex-1">
            <span className="font-bold text-emerald-950 flex items-center gap-1">
              <Camera className="w-3 h-3 text-emerald-600" />
              <span>Admin Proof Attached</span>
            </span>
            <span className="text-amber-800 font-bold block">
              Citizen Audit: {verificationsCount}/3 Verified
            </span>
          </div>
        </div>
      )}

      {/* 7-Day Verification Lock Banner */}
      {complaint.status === 'Pending Verification' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[10px] text-amber-950 font-semibold space-y-0.5">
          <span className="font-bold text-amber-900 block flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-amber-600" />
            <span>⏳ 7-Day Verification Window Active</span>
          </span>
          <span className="text-amber-800 text-[9.5px] block leading-tight">
            Locked in Pending Verification for 7 days until 3 citizens audit & verify photo proof.
          </span>
        </div>
      )}

      {/* Meta Row */}
      <div className="flex items-center justify-between pt-2 border-t border-emerald-100 text-[11px]">
        <span className="text-emerald-800 font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-emerald-600" />
          <span>{complaint.location?.address || complaint.location || 'Nagpur Central'}</span>
        </span>
        <span className="text-emerald-700 font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>{complaint.confidenceScore || 95}% AI</span>
        </span>
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between pt-1 gap-1.5">
        <button
          type="button"
          onClick={handleUpvote}
          className={`text-[10px] px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 shrink-0 ${
            hasUpvoted
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{upvotes}</span>
        </button>

        {onStatusChange && (
          <div className="flex flex-wrap gap-1.5 items-center">
            {complaint.status !== 'In Progress' && complaint.status !== 'Pending Verification' && complaint.status !== 'Resolved' && complaint.status !== 'Verified & Resolved' && (
              <button
                type="button"
                onClick={handleStartWork}
                className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg transition border border-emerald-200 whitespace-nowrap flex items-center gap-1"
              >
                <Play className="w-3 h-3 text-emerald-600" />
                <span>Start</span>
              </button>
            )}
            {complaint.status !== 'Pending Verification' && complaint.status !== 'Resolved' && complaint.status !== 'Verified & Resolved' && (
              <button
                type="button"
                onClick={handleMarkSolved}
                className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1 shadow-xs whitespace-nowrap"
              >
                <Camera className="w-3 h-3" />
                <span>Mark Solved</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
