import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const TRANSLATIONS = {
  en: {
    brand_slogan: 'Every Voice Heard. Every Issue Resolved.',
    nav_overview: 'Overview',
    nav_citizen: 'Resident Intake',
    nav_officer: 'Officer Dashboard',
    nav_digital_twin: 'Digital Twin',
    nav_analytics: 'Analytics',
    nav_login: 'Single Sign-On',
    nav_logout: 'Logout',
    nav_track: 'Track Status',
    
    // Citizen Portal
    citizen_title: 'Submit a Civic Grievance',
    citizen_desc: 'Report road damage, water leakages, sanitation, streetlights, or safety hazards using voice speech or text in your preferred language.',
    citizen_voice_step: 'Voice Speech-to-Text (EN / HI / MR)',
    citizen_form_step: 'Grievance Submission Form',
    citizen_submit_btn: 'Submit Grievance with AI Triage',
    citizen_submitting: 'Submitting...',
    
    // Form Fields
    form_title: 'Grievance Title',
    form_desc: 'Detailed Description',
    form_category: 'Category',
    form_location: 'Location / Address Entry',
    form_live_gps: 'Use Live GPS',
    form_impact_weight: 'AI Community Impact Weight',
    
    // Categories
    cat_road: 'Road Damage / Potholes',
    cat_water: 'Water Supply & Pipeline Leak',
    cat_sanitation: 'Sanitation & Garbage Accumulation',
    cat_electrical: 'Electrical & Streetlight Outage',
    cat_parks: 'Parks & Public Amenities',
    cat_other: 'Other / Miscellaneous',
    
    // Officer Dashboard
    officer_title: 'Officer Triage & Work Order Dashboard',
    officer_dept_filter: 'Department Bifurcation:',
    officer_all_depts: 'All Departments (Municipal Overview)',
    officer_start_btn: 'Start',
    officer_mark_solved: 'Mark Solved',
    officer_grievances_in_view: 'Grievances in View',
    
    // Theme & Lang
    lang_toggle_en: 'EN',
    lang_toggle_hi: 'हिन्दी'
  },
  hi: {
    brand_slogan: 'हर आवाज़ सुनी जाएगी। हर समस्या हल होगी।',
    nav_overview: 'अवलोकन',
    nav_citizen: 'नागरिक पोर्टल',
    nav_officer: 'अधिकारी डैशबोर्ड',
    nav_digital_twin: 'डिजिटल ट्विन',
    nav_analytics: 'एनालिटिक्स',
    nav_login: 'लॉगिन पोर्टल',
    nav_logout: 'लॉगआउट',
    nav_track: 'स्थिति ट्रैक करें',
    
    // Citizen Portal
    citizen_title: 'नागरिक शिकायत दर्ज करें',
    citizen_desc: 'सड़क गड्ढे, पानी लीकेज, कचरा, स्ट्रीटलाइट या सुरक्षा संबंधी समस्याओं को अपनी भाषा में बोलकर या लिखकर दर्ज करें।',
    citizen_voice_step: 'आवाज़ द्वारा बोलकर लिखें (हिंदी / मराठी / English)',
    citizen_form_step: 'नागरिक शिकायत प्रपत्र',
    citizen_submit_btn: 'एआई प्राथमिकता के साथ शिकायत दर्ज करें',
    citizen_submitting: 'दर्ज हो रहा है...',
    
    // Form Fields
    form_title: 'शिकायत का शीर्षक',
    form_desc: 'विस्तृत विवरण (आवाज़ से स्वतः भरा जाएगा)',
    form_category: 'समस्या की श्रेणी',
    form_location: 'स्थान / पता प्रविष्टि',
    form_live_gps: 'लाइव जीपीएस लें',
    form_impact_weight: 'एआई सामुदायिक प्रभाव स्कोर',
    
    // Categories
    cat_road: 'सड़क क्षति / गड्ढे',
    cat_water: 'जल आपूर्ति व पाइपलाइन लीकेज',
    cat_sanitation: 'सफाई व कचरा प्रबंधन',
    cat_electrical: 'बिजली व स्ट्रीटलाइट खराबी',
    cat_parks: 'उद्यान व सार्वजनिक सुविधाएं',
    cat_other: 'अन्य / विविध समस्याएं',
    
    // Officer Dashboard
    officer_title: 'अधिकारी ट्राइएज व वर्क ऑर्डर डैशबोर्ड',
    officer_dept_filter: 'विभाग विभाजन:',
    officer_all_depts: 'सभी विभाग (नगर पालिका विहंगावलोकन)',
    officer_start_btn: 'कार्य शुरू करें',
    officer_mark_solved: 'समाधान दर्ज करें',
    officer_grievances_in_view: 'सक्रिय शिकायतें',
    
    // Theme & Lang
    lang_toggle_en: 'EN',
    lang_toggle_hi: 'हिन्दी'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('civic_lang');
      return saved === 'hi' ? 'hi' : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    try {
      localStorage.setItem('civic_lang', nextLang);
      document.documentElement.lang = nextLang;
    } catch (e) {}
  };

  const setSpecificLanguage = (lang) => {
    if (lang === 'en' || lang === 'hi') {
      setLanguage(lang);
      try {
        localStorage.setItem('civic_lang', lang);
        document.documentElement.lang = lang;
      } catch (e) {}
    }
  };

  const t = (key) => {
    const currentDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return currentDict[key] || TRANSLATIONS.en[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setSpecificLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
