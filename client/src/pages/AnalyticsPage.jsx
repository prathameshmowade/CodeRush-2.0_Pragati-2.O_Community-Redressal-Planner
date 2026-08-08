import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import HeatMap from '../components/HeatMap';
import AnalyticsCharts from '../components/AnalyticsCharts';
import PredictiveAlert from '../components/PredictiveAlert';
import { BarChart3, MapPin, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AnalyticsPage() {
  const { isHindi } = useContext(LanguageContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header Banner */}
      <div className="bg-white dark:bg-emerald-950/70 p-6 md:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isHindi ? 'नगर निगम एनालिटिक्स' : 'CITY-WIDE ANALYTICS'}</span>
          <span className="text-emerald-300">•</span>
          <span>{isHindi ? 'पूर्वानुमानित नागरिक बुद्धिमत्ता' : 'PREDICTIVE CIVIC INTELLIGENCE'}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950 dark:text-white flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-emerald-600" />
          <span>{isHindi ? 'नागरिक संचालन व शहर जोन एनालिटिक्स' : 'Civic Operations & City Zone Analytics'}</span>
        </h1>
        <p className="text-emerald-800 dark:text-emerald-300 text-xs md:text-sm max-w-2xl leading-relaxed">
          {isHindi
            ? 'शिकायत निवारण दक्षता, विभागीय कार्यभार, बार-बार होने वाली खराबी के हॉटस्पॉट और भविष्यगामी रखरखाव अलर्ट पर वास्तविक समय की रिपोर्ट।'
            : 'Real-time intelligence on resolution efficiency, department workloads, recurring failure hotspots, and predictive maintenance alerts.'}
        </p>
      </div>

      {/* Section 1: Predictive Alert Banner */}
      <PredictiveAlert />

      {/* Section 2: City Infrastructure Heatmap Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-emerald-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>{isHindi ? 'शहरी बुनियादी ढांचा विफलता हॉटस्पॉट' : 'City Infrastructure Failure Hotspots'}</span>
        </h3>
        <HeatMap />
      </div>

      {/* Section 3: Monthly Trend Charts */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-emerald-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>{isHindi ? 'मासिक शिकायत समाधान व एसएलए रुझान' : 'Monthly Complaint Resolution & SLA Trends'}</span>
        </h3>
        <AnalyticsCharts />
      </div>
    </div>
  );
}
