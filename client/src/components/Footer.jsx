import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { ShieldCheck, Globe, Code, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { t, isHindi } = useContext(LanguageContext);

  return (
    <footer className="relative bg-emerald-50/50 dark:bg-emerald-950/80 pt-10 pb-8 text-emerald-950 dark:text-emerald-100 border-t border-emerald-100 dark:border-emerald-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap text-left lg:text-left">
          {/* Left Side: Brand & Social Links */}
          <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="awaaz.ai logo" className="h-9 w-auto object-contain" />
              <div>
                <h4 className="text-xl font-black text-emerald-950 dark:text-white tracking-tight">
                  awaaz<span className="text-emerald-600 font-extrabold">.ai</span>
                </h4>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">
                  {t('brand_slogan')}
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner"
                target="_blank"
                rel="noreferrer"
                className="bg-white dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 border border-emerald-200 dark:border-emerald-800 h-9 w-9 flex items-center justify-center rounded-xl transition shadow-xs"
                title="GitHub Repository"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="bg-white dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 border border-emerald-200 dark:border-emerald-800 h-9 w-9 flex items-center justify-center rounded-xl transition shadow-xs"
                title="Portal Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@awaaz.ai"
                className="bg-white dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 border border-emerald-200 dark:border-emerald-800 h-9 w-9 flex items-center justify-center rounded-xl transition shadow-xs"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:1800112233"
                className="bg-white dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 border border-emerald-200 dark:border-emerald-800 h-9 w-9 flex items-center justify-center rounded-xl transition shadow-xs"
                title="Toll-Free Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Quick Links Columns */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full md:w-6/12 px-4 ml-auto space-y-3">
                <span className="block uppercase text-emerald-950 dark:text-white text-xs font-black tracking-wider border-b border-emerald-200 dark:border-emerald-800 pb-1">
                  {t('footer_nav')}
                </span>
                <ul className="list-unstyled space-y-2 text-xs font-semibold">
                  <li>
                    <Link to="/" className="text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white transition block">
                      {isHindi ? 'विहंगावलोकन व आर्किटेक्चर' : 'Overview & Architecture'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/citizen" className="text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white transition block">
                      {isHindi ? 'नागरिक आवाज़ पोर्टल' : 'Citizen Voice Portal'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/officer" className="text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white transition block">
                      {isHindi ? 'अधिकारी वर्क ऑर्डर बोर्ड' : 'Officer Work Order Board'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/digital-twin" className="text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white transition block">
                      {isHindi ? 'पूर्वानुमानित डिजिटल ट्विन' : 'Predictive Digital Twin'}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-6/12 px-4 space-y-3">
                <span className="block uppercase text-emerald-950 dark:text-white text-xs font-black tracking-wider border-b border-emerald-200 dark:border-emerald-800 pb-1">
                  {t('footer_transparency')}
                </span>
                <ul className="list-unstyled space-y-2 text-xs font-semibold">
                  <li>
                    <a
                      href="https://github.com/prathameshmowade/CodeRush-2.0_Pragati-2.O_Community-Redressal-Planner"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white transition block"
                    >
                      {isHindi ? 'ओपन सोर्स कोडबेस (GitHub)' : 'Open Source GitHub'}
                    </a>
                  </li>
                  <li>
                    <Link to="/analytics" className="text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white transition block">
                      {isHindi ? 'नागपुर जोन 12 मेट्रिक्स' : 'Nagpur Zone 12 Metrics'}
                    </Link>
                  </li>
                  <li>
                    <span className="text-emerald-800 dark:text-emerald-300 block">
                      {isHindi ? 'संवैधानिक एआई सुरक्षा' : 'Constitutional AI Safety'}
                    </span>
                  </li>
                  <li>
                    <span className="text-emerald-800 dark:text-emerald-300 block">
                      {isHindi ? 'SHA-256 ब्लॉकचेन सत्यापन' : 'SHA-256 Block Ledger'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Notice */}
        <hr className="my-6 border-emerald-200 dark:border-emerald-800" />
        <div className="flex flex-wrap items-center md:justify-between justify-center text-xs">
          <div className="w-full md:w-6/12 px-4 mx-auto text-center md:text-left">
            <span className="text-emerald-800 dark:text-emerald-400 font-medium">
              Copyright © {new Date().getFullYear()} Pragati 2.0 Hackathon •{' '}
              <strong className="text-emerald-950 dark:text-white font-bold">CodeRush 2.0</strong>
            </span>
          </div>
          <div className="w-full md:w-6/12 px-4 mx-auto text-center md:text-right mt-2 md:mt-0">
            <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-mono">
              {t('footer_rights')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
