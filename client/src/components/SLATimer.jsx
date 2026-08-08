import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Clock, AlertTriangle } from 'lucide-react';

export default function SLATimer({ hoursRemaining = 34, totalHours = 48 }) {
  const { t, isHindi } = useContext(LanguageContext);
  const pct = Math.max(0, (hoursRemaining / totalHours) * 100);
  const urgent = hoursRemaining <= 12;

  return (
    <div className="bg-white dark:bg-emerald-950/70 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-2 shadow-xs">
      <div className="flex justify-between items-center text-xs">
        <span className="text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('sla_timer_title')}</span>
        </span>
        <span className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] flex items-center gap-1 ${
          urgent
            ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 animate-pulse border border-red-200 dark:border-red-800'
            : 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
        }`}>
          {urgent && <AlertTriangle className="w-3 h-3 text-red-600" />}
          <span>{hoursRemaining}{isHindi ? ' घंटे शेष (48 घंटे SLA)' : `h remaining (${totalHours}h SLA)`}</span>
        </span>
      </div>

      <div className="w-full bg-emerald-100 dark:bg-emerald-900 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            urgent ? 'bg-red-500' : 'bg-emerald-600'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
