import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { CheckCircle2, Wrench, Bot, ShieldCheck, Play } from 'lucide-react';

export default function ResolutionCopilot() {
  const { t, isHindi } = useContext(LanguageContext);
  const [agentStep, setAgentStep] = useState(0);
  const [agentRunning, setAgentRunning] = useState(false);

  const AGENT_STEPS_EN = [
    "Searching Municipal Contractor Directory (Nagpur Central)...",
    "Generating Automated Work Order #WO-2026-889...",
    "Sending Dispatch Notification to Apex Infra Ltd...",
    "Booking Field Inspection Slot (Today 4:00 PM)...",
    "Polling Contractor Telemetry & GPS Tracker...",
    "Polling CLIP Structural Photo Verification Proof...",
    "Work Order Complete! Recommending Final Officer Sign-Off."
  ];

  const AGENT_STEPS_HI = [
    "नगर निगम ठेकेदार निर्देशिका (नागपुर सेंट्रल) खोजी जा रही है...",
    "स्वचालित वर्क ऑर्डर #WO-2026-889 जनरेट हो रहा है...",
    "अपैक्स इंफ्रा लिमिटेड को प्रेषण सूचना भेजी गई...",
    "फील्ड निरीक्षण समय (आज शाम 4:00 बजे) बुक किया गया...",
    "ठेकेदार टेलीमेट्री व जीपीएस ट्रैकर से लाइव समन्वय...",
    "क्लिप (CLIP) स्ट्रक्चरल फोटो सत्यापन प्रमाण प्राप्त हुआ...",
    "वर्क ऑर्डर पूर्ण! अंतिम अधिकारी स्वीकृति की अनुशंसा।"
  ];

  const AGENT_STEPS = isHindi ? AGENT_STEPS_HI : AGENT_STEPS_EN;

  const runAgentLoop = () => {
    setAgentRunning(true);
    setAgentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= AGENT_STEPS.length) {
        clearInterval(interval);
        setAgentRunning(false);
      } else {
        setAgentStep(step);
      }
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-emerald-950/70 p-6 md:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900 space-y-6 shadow-xs">
      {/* Title Header */}
      <div className="flex justify-between items-center pb-3 border-b border-emerald-100 dark:border-emerald-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isHindi ? 'एआई प्रेषण कोपायलट' : 'AGENTIC DISPATCH COPILOT'}</span>
          </div>
          <h3 className="text-lg font-extrabold text-emerald-950 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <span>{t('copilot_title')}</span>
          </h3>
        </div>
        <span className="bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold px-3 py-1 rounded-full">
          Autonomous Tier 1
        </span>
      </div>

      {/* Feature Grid: Repair Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 space-y-1">
          <span className="text-emerald-700 dark:text-emerald-400 block font-medium">
            {isHindi ? 'अनुशंसित मरम्मत विधि' : 'Recommended Repair Method'}
          </span>
          <span className="font-extrabold text-emerald-950 dark:text-white text-sm">
            {isHindi ? 'हॉट-मिक्स डामर सड़क पुनर्सतहकरण' : 'Hot-Mix Asphalt Resurfacing'}
          </span>
        </div>
        <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 space-y-1">
          <span className="text-emerald-700 dark:text-emerald-400 block font-medium">
            {isHindi ? 'अनुमानित बजट व समय' : 'Estimated Budget & SLA ETA'}
          </span>
          <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm">
            ₹18,500 | {isHindi ? '6 घंटे' : '6 Hours'}
          </span>
        </div>
      </div>

      {/* Autonomous Dispatch Button */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={runAgentLoop}
          disabled={agentRunning}
          className="w-full btn-emerald text-xs py-3.5 justify-center shadow-md font-bold"
        >
          <Play className={`w-4 h-4 ${agentRunning ? 'animate-spin' : ''}`} />
          <span>{agentRunning ? (isHindi ? 'एआई कोपायलट कार्य कर रहा है...' : 'Running Autonomous Dispatch...') : t('copilot_btn')}</span>
        </button>

        {/* Live Step Progression */}
        {agentRunning && (
          <div className="bg-emerald-50/80 dark:bg-emerald-900/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-white">
              <Bot className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>{AGENT_STEPS[agentStep]}</span>
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((agentStep + 1) / AGENT_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
