import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  FileText,
  CreditCard,
  Building2,
  Receipt,
  ShieldCheck,
  Globe,
  UserCheck,
  X,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

type Language = 'en' | 'ml' | 'hi';

export const Kiosk: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [idleSeconds, setIdleSeconds] = useState(60);
  const [activeTile, setActiveTile] = useState<any | null>(null);
  const [assistedStep, setAssistedStep] = useState(1);

  // Idle timer countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleSeconds((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const translations = {
    en: {
      title: 'Digital GST & Business Seva Kendra',
      subtitle: 'Fast, government-compliant assisted services for local traders & shops',
      operator: 'Assisted by Operator: Suresh, Ernakulam Centre #12',
      idle: 'Reset in',
      exit: 'Exit Kiosk View',
      tiles: [
        { id: 't1', title: 'GST Registration', desc: 'New GSTIN registration & REG-06 download', icon: Sparkles },
        { id: 't2', title: 'GST Return Filing', desc: 'File GSTR-1 & GSTR-3B with instant OTP', icon: FileText },
        { id: 't3', title: 'PAN Services', desc: 'Entity & individual PAN verification or card request', icon: CreditCard },
        { id: 't4', title: 'Business Registration', desc: 'Udyam, MSME & Partnership registration', icon: Building2 },
        { id: 't5', title: 'Invoice Services', desc: 'Print bill books & generate GST compliant e-Invoices', icon: Receipt },
        { id: 't6', title: 'Compliance Check', desc: 'Instant 2B vs books check & compliance score review', icon: ShieldCheck },
      ],
    },
    ml: {
      title: 'ഡിജിറ്റൽ ജിഎസ്ടി & ബിസിനസ്സ് സേവാ കേന്ദ്രം',
      subtitle: 'വ്യാപാരികൾക്കും ചെറുകിട സ്ഥാപനങ്ങൾക്കും വേഗത്തിലുള്ള സർക്കാർ സേവനങ്ങൾ',
      operator: 'സഹായത്തിന് ഓപ്പറേറ്റർ: സുരേഷ്, എറണാകുളം സെന്റർ #12',
      idle: 'റീസെറ്റ് സമയം:',
      exit: 'കിയോസ്‌ക് എക്സിറ്റ്',
      tiles: [
        { id: 't1', title: 'ജിഎസ്ടി രജിസ്ട്രേഷൻ', desc: 'പുതിയ ജിഎസ്ടി നമ്പറും സർട്ടിഫിക്കറ്റും', icon: Sparkles },
        { id: 't2', title: 'ജിഎസ്ടി റിട്ടേൺ ഫയലിംഗ്', desc: 'GSTR-1, GSTR-3B ഒറ്റ ക്ലിക്കിൽ ഫയൽ ചെയ്യുക', icon: FileText },
        { id: 't3', title: 'പാൻ കാർഡ് സേവനങ്ങൾ', desc: 'സ്ഥാപനത്തിന്റെയും വ്യക്തിയുടെയും പാൻ കാർഡ്', icon: CreditCard },
        { id: 't4', title: 'ബിസിനസ്സ് രജിസ്ട്രേഷൻ', desc: 'ഉദ്യം, എംഎസ്എംഇ രജിസ്ട്രേഷൻ സഹായം', icon: Building2 },
        { id: 't5', title: 'ഇൻവോയ്സ് പ്രിന്റിംഗ്', desc: 'ജിഎസ്ടി ബില്ലുകൾ തയ്യാറാക്കലും പ്രിന്റും', icon: Receipt },
        { id: 't6', title: 'കംപ്ലയൻസ് പരിശോധന', desc: 'നികുതി ബാധ്യതയും സ്കോറും അറിയുക', icon: ShieldCheck },
      ],
    },
    hi: {
      title: 'डिजिटल जीएसटी एवं व्यापार सेवा केंद्र',
      subtitle: 'स्थानीय व्यापारियों और दुकानदारों के लिए त्वरित सरकारी सहायता',
      operator: 'सहायक ऑपरेटर: सुरेश, एर्नाकुलम केंद्र #12',
      idle: 'स्वतः रीसेट:',
      exit: 'कियोस्क बंद करें',
      tiles: [
        { id: 't1', title: 'जीएसटी पंजीकरण', desc: 'नया जीएसटी नंबर एवं प्रमाण पत्र', icon: Sparkles },
        { id: 't2', title: 'जीएसटी रिटर्न दाखिल', desc: 'GSTR-1 और GSTR-3B त्वरित ओटीपी द्वारा', icon: FileText },
        { id: 't3', title: 'पैन सेवाएं', desc: 'संस्था और व्यक्तिगत पैन सत्यापन', icon: CreditCard },
        { id: 't4', title: 'व्यापार पंजीकरण', desc: 'उद्यम और एमएसएमई सरकारी पंजीकरण', icon: Building2 },
        { id: 't5', title: 'बिलिंग एवं इनवॉइस', desc: 'जीएसटी मान्य इनवॉइस तैयार करना', icon: Receipt },
        { id: 't6', title: 'अनुपालन जांच', desc: 'जीएसटी स्थिति और इनपुट टैक्स क्रेडिट जांच', icon: ShieldCheck },
      ],
    },
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Top Kiosk Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm">
              GST
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Kiosk Touch Operator Terminal
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">{t.subtitle}</p>
        </div>

        {/* Language Switcher & Exit */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white/10 rounded-chip p-1 border border-white/20">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-chip text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ml')}
              className={`px-3 py-1.5 rounded-chip text-xs font-bold transition-all ${
                lang === 'ml' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-white'
              }`}
            >
              മലയാളം
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-3 py-1.5 rounded-chip text-xs font-bold transition-all ${
                lang === 'hi' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          <Link
            to="/app"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-btn text-xs font-semibold text-white border border-white/20"
          >
            {t.exit}
          </Link>
        </div>
      </div>

      {/* Operator Status & Idle Reset Banner */}
      <div className="py-3 px-5 my-4 rounded-card bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-between text-xs sm:text-sm text-emerald-200">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{t.operator}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>
            {t.idle}: <strong>{idleSeconds}s</strong>
          </span>
        </div>
      </div>

      {/* 6 High-Contrast Big Tiles (Min 20px font) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-auto py-4">
        {t.tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <button
              key={tile.id}
              onClick={() => {
                setActiveTile(tile);
                setAssistedStep(1);
              }}
              className="p-8 rounded-card bg-slate-800 hover:bg-slate-700/80 border-2 border-slate-700 hover:border-emerald-500 text-left transition-all shadow-dark flex flex-col justify-between min-h-[180px] group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>

              <div className="mt-4">
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-emerald-300">
                  {tile.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-400 mt-1 leading-snug">
                  {tile.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/10 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>GST Seva Kiosk Terminal · Ministry of Finance & GSTN Integrated</span>
        <span>Touch or ask operator Suresh for voice-assisted filing</span>
      </div>

      {/* 3-Step Assisted Flow Modal */}
      {activeTile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-emerald-500 rounded-card p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  {assistedStep}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {activeTile.title} — Step {assistedStep} of 3
                  </h3>
                  <p className="text-xs text-slate-400">Assisted Operator Workflow</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTile(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {assistedStep === 1 && (
              <div className="space-y-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Enter Aadhaar / Phone Number of Business Owner:</p>
                <input
                  type="text"
                  defaultValue="98470 12345"
                  className="w-full p-4 rounded-btn bg-slate-800 border border-slate-700 text-xl font-mono text-white text-center font-bold tracking-widest"
                />
                <p className="text-xs text-slate-400 text-center">
                  Operator Suresh will verify biometric fingerprint or Aadhaar OTP.
                </p>
                <button
                  onClick={() => setAssistedStep(2)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-btn text-base font-bold shadow-soft"
                >
                  Verify Biometric & Fetch Records →
                </button>
              </div>
            )}

            {assistedStep === 2 && (
              <div className="space-y-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Records Found for Malabar Spice Traders:</p>
                <div className="p-4 rounded-card bg-slate-800 border border-slate-700 text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span>GSTIN:</span>
                    <span className="text-emerald-400 font-bold">32ABCDE1234F1Z5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Action:</span>
                    <span className="text-white">GSTR-3B October 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Tax Due:</span>
                    <span className="text-emerald-400 font-bold">₹1,04,800</span>
                  </div>
                </div>
                <button
                  onClick={() => setAssistedStep(3)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-btn text-base font-bold shadow-soft"
                >
                  Print Challan & Authorize Filing →
                </button>
              </div>
            )}

            {assistedStep === 3 && (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-heading font-extrabold text-white">
                  Kiosk Service Request Completed!
                </h4>
                <p className="text-xs text-slate-400">
                  Thermal physical receipt printed at Counter #12. Confirmation SMS sent to owner.
                </p>
                <button
                  onClick={() => setActiveTile(null)}
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-btn text-sm font-bold"
                >
                  Done (Return to Kiosk Main)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

