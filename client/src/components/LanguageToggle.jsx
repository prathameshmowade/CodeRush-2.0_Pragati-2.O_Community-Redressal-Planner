import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, toggleLanguage, setSpecificLanguage } = useContext(LanguageContext);
  const isHindi = language === 'hi';

  return (
    <div className="flex items-center gap-1.5 bg-emerald-50/90 border border-emerald-300 dark:border-emerald-700 p-1 rounded-2xl shadow-xs">
      <button
        type="button"
        onClick={() => setSpecificLanguage('en')}
        className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
          !isHindi
            ? 'bg-emerald-600 text-white shadow-xs scale-105'
            : 'text-emerald-800 hover:text-emerald-950 dark:text-emerald-300'
        }`}
        title="Switch to English"
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setSpecificLanguage('hi')}
        className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
          isHindi
            ? 'bg-emerald-600 text-white shadow-xs scale-105'
            : 'text-emerald-800 hover:text-emerald-950 dark:text-emerald-300'
        }`}
        title="हिन्दी में बदलें (Switch to Hindi)"
      >
        <span>🇮🇳</span>
        <span>हिन्दी</span>
      </button>
    </div>
  );
}
