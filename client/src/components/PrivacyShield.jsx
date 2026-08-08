import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { ShieldCheck, Lock, Camera, CheckCircle2 } from 'lucide-react';

export default function PrivacyShield() {
  const { t, isHindi } = useContext(LanguageContext);

  return (
    <div className="bg-white dark:bg-emerald-950/70 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-emerald-100 dark:border-emerald-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <span>{t('privacy_badge')}</span>
            </div>
            <h4 className="font-extrabold text-emerald-950 dark:text-white text-base">{t('privacy_title')}</h4>
          </div>
        </div>

        <span className="text-xs bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full font-bold shrink-0">
          100% {isHindi ? 'अनुपालन ✓' : 'Compliant ✓'}
        </span>
      </div>

      {/* Safety Specs Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800 space-y-1">
          <span className="text-emerald-800 dark:text-emerald-300 font-bold block flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('privacy_pii')}</span>
          </span>
          <span className="text-emerald-900 dark:text-emerald-200 text-[11px]">{t('privacy_pii_sub')}</span>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800 space-y-1">
          <span className="text-emerald-800 dark:text-emerald-300 font-bold block flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('privacy_yolo')}</span>
          </span>
          <span className="text-emerald-900 dark:text-emerald-200 text-[11px]">{t('privacy_yolo_sub')}</span>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800 space-y-1">
          <span className="text-emerald-800 dark:text-emerald-300 font-bold block flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('privacy_doxxing')}</span>
          </span>
          <span className="text-emerald-900 dark:text-emerald-200 text-[11px]">{t('privacy_doxxing_sub')}</span>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800 space-y-1">
          <span className="text-emerald-800 dark:text-emerald-300 font-bold block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('privacy_dpdp')}</span>
          </span>
          <span className="text-emerald-900 dark:text-emerald-200 text-[11px]">{t('privacy_dpdp_sub')}</span>
        </div>
      </div>

      {/* YOLO Object Blur Explanation Banner */}
      <div className="bg-emerald-50/30 dark:bg-emerald-900/20 p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 text-xs space-y-1 text-emerald-900 dark:text-emerald-200">
        <span className="font-bold flex items-center gap-1.5 text-emerald-950 dark:text-white">
          <Camera className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isHindi ? '🤖 YOLOv8 स्वचालित कंप्यूटर विजन फोटो अनामीकरण' : '🤖 YOLOv8 Automatic Computer Vision Anonymization'}</span>
        </span>
        <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
          {isHindi
            ? 'नागरिकों या अधिकारियों द्वारा अपलोड किए गए प्रत्येक साक्ष्य फोटो को YOLO ऑब्जेक्ट डिटेक्शन मॉडल द्वारा स्कैन किया जाता है। फोटो में दिखाई देने वाले मानव चेहरे और वाहन नंबर प्लेटों को सार्वजनिक प्रदर्शन से पहले स्वतः धुंधला कर दिया जाता है।'
            : 'Every evidence image uploaded by citizens or officers is scanned in real-time by a YOLO object detection model. All detected human faces and vehicle license plates are automatically covered with a pixelated privacy blur mask prior to public display.'}
        </p>
      </div>
    </div>
  );
}
