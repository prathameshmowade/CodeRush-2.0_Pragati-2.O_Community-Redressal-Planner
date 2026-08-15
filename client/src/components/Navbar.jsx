import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import {
  Home,
  FileEdit,
  LayoutDashboard,
  Building2,
  BarChart3,
  LogIn,
  LogOut,
  User,
  Menu,
  X,
  MessageSquare,
  Phone,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { t, isHindi } = useContext(LanguageContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [channelsDropdownOpen, setChannelsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isChannelActive = isActive('/sms-complaint') || isActive('/call-complaint');

  // Close menus on outside click or route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setChannelsDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setChannelsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Header Navbar */}
      <nav className="bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900 sticky top-0 z-40 px-3 sm:px-4 lg:px-6 py-2 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Left Area on Mobile / Desktop */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 3-Line Hamburger Button (Visible only on mobile/tablet < 1200px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="navbar-mobile-toggle p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-all shrink-0 active:scale-95"
              aria-label="Open mobile navigation menu"
              title="Open Menu"
            >
              <Menu className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <img src="/logo.png" alt="awaaz.ai logo" className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="flex flex-col leading-none">
                <span className="font-black text-emerald-950 dark:text-white text-base sm:text-lg tracking-tight flex items-center gap-0.5">
                  <span>awaaz</span>
                  <span className="text-emerald-600 font-extrabold">.ai</span>
                </span>
                {/* Slogan visible on sm+ screens */}
                <span className="hidden sm:block text-[9.5px] font-bold tracking-wide text-emerald-700 dark:text-emerald-400 mt-0.5 truncate max-w-[140px] md:max-w-none">
                  {t('brand_slogan')}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (>= 1200px) */}
          <div className="navbar-desktop items-center gap-1 xl:gap-1.5 text-xs font-semibold shrink-0">
            {/* Overview Link */}
            <Link
              to="/"
              className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700 shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-emerald-200 dark:hover:bg-emerald-900/40'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t('nav_overview')}</span>
            </Link>

            {/* Resident Citizen Portal */}
            {(!user || user.role === 'citizen' || user.role === 'resident') && (
              <Link
                to="/citizen"
                className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/citizen')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700 shadow-xs'
                    : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-emerald-200 dark:hover:bg-emerald-900/40'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('nav_citizen')}</span>
              </Link>
            )}

            {/* Officer Dashboard */}
            {user && (user.role === 'officer' || user.role === 'admin') && (
              <Link
                to="/officer"
                className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/officer')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700 shadow-xs'
                    : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-emerald-200 dark:hover:bg-emerald-900/40'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('nav_officer')}</span>
              </Link>
            )}

            {/* Digital Twin */}
            <Link
              to="/digital-twin"
              className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                isActive('/digital-twin')
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700 shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-emerald-200 dark:hover:bg-emerald-900/40'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t('nav_digital_twin')}</span>
            </Link>

            {/* Analytics */}
            <Link
              to="/analytics"
              className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                isActive('/analytics')
                  ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700 shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-emerald-200 dark:hover:bg-emerald-900/40'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t('nav_analytics')}</span>
            </Link>

            {/* Direct Intake Channels Dropdown (SMS & Call) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setChannelsDropdownOpen(!channelsDropdownOpen)}
                className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isChannelActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-700 shadow-xs'
                    : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-emerald-200 dark:hover:bg-emerald-900/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{isHindi ? 'हेल्पलाइन चैनल' : 'Helpline Channels'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${channelsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {channelsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl shadow-xl p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/sms-complaint"
                    onClick={() => setChannelsDropdownOpen(false)}
                    className={`flex items-start gap-2.5 p-2 rounded-xl transition ${
                      isActive('/sms-complaint')
                        ? 'bg-emerald-50 dark:bg-emerald-900/70 text-emerald-900 dark:text-white font-bold'
                        : 'hover:bg-emerald-50/60 dark:hover:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{t('nav_sms_complaint')}</span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-normal block leading-tight">
                        {isHindi ? 'बिना इंटरनेट SMS से शिकायत' : 'Zero-app text SMS reporting'}
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/call-complaint"
                    onClick={() => setChannelsDropdownOpen(false)}
                    className={`flex items-start gap-2.5 p-2 rounded-xl transition ${
                      isActive('/call-complaint')
                        ? 'bg-emerald-50 dark:bg-emerald-900/70 text-emerald-900 dark:text-white font-bold'
                        : 'hover:bg-emerald-50/60 dark:hover:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 shrink-0 mt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{t('nav_call_complaint')}</span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-normal block leading-tight">
                        {isHindi ? '24/7 वॉयस IVR हेल्पलाइन' : '24/7 Voice IVR helpline'}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Controls (Language + Theme + User/Login) */}
            <div className="flex items-center gap-2 pl-2.5 border-l border-emerald-100 dark:border-emerald-800 ml-1">
              <LanguageToggle />
              <ThemeToggle />

              {user ? (
                <div className="flex items-center gap-1.5">
                  <div className="bg-emerald-50 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 max-w-[140px] truncate" title={user.name}>
                    <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{user.name.split(' ')[0]}</span>
                    <span className="text-[9px] bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-1 py-0.2 rounded font-mono uppercase">
                      {user.role === 'officer' || user.role === 'admin' ? 'OFF' : 'CIT'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="p-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:bg-red-50 hover:border-red-200 text-emerald-800 hover:text-red-600 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-emerald text-xs py-1.5 px-3 shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('nav_login')}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Header Controls on Mobile (< 1200px) */}
          <div className="navbar-mobile-toggle items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
          </div>

        </div>
      </nav>

      {/* Left-Side Off-Canvas Mobile Drawer (< 1200px) */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-toggle fixed inset-0 z-50">
          {/* Dimmed Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel Sliding from LEFT */}
          <div className="fixed inset-y-0 left-0 w-[290px] sm:w-[320px] max-w-[85vw] bg-white dark:bg-emerald-950 border-r border-emerald-200 dark:border-emerald-800 p-5 flex flex-col justify-between shadow-2xl z-50 animate-in slide-in-from-left duration-250 overflow-y-auto">
            
            {/* Drawer Content Top */}
            <div className="space-y-4">
              {/* Drawer Header: Logo + Close X Button */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 dark:border-emerald-900">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <img src="/logo.png" alt="awaaz.ai logo" className="h-8 w-auto object-contain" />
                  <span className="font-black text-emerald-950 dark:text-white text-lg tracking-tight">
                    awaaz<span className="text-emerald-600 font-extrabold">.ai</span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Card if logged in */}
              {user ? (
                <div className="bg-emerald-50/90 dark:bg-emerald-900/60 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-emerald-950 dark:text-white block truncate">{user.name}</span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono capitalize block truncate">
                        {user.role} {user.department ? `• ${user.department}` : ''}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full bg-white dark:bg-emerald-950 text-red-600 border border-red-200 dark:border-red-900/50 hover:bg-red-50 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('nav_logout')}</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-emerald text-xs py-2.5 justify-center shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t('nav_login')}</span>
                </Link>
              )}

              {/* Section 1: Main Portals */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider px-1 block">
                  {isHindi ? 'नगर पालिका सेवाएं' : 'Municipal Services'}
                </span>

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive('/')
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4" />
                    <span>{t('nav_overview')}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {(!user || user.role === 'citizen' || user.role === 'resident') && (
                  <Link
                    to="/citizen"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/citizen')
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileEdit className="w-4 h-4" />
                      <span>{t('nav_citizen')}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                )}

                {user && (user.role === 'officer' || user.role === 'admin') && (
                  <Link
                    to="/officer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive('/officer')
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>{t('nav_officer')}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                )}

                <Link
                  to="/digital-twin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive('/digital-twin')
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4" />
                    <span>{t('nav_digital_twin')}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </Link>

                <Link
                  to="/analytics"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive('/analytics')
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>{t('nav_analytics')}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>

              {/* Section 2: Direct Citizen Intake Channels */}
              <div className="space-y-1 pt-2 border-t border-emerald-100 dark:border-emerald-900">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider px-1 block">
                  {isHindi ? 'प्रत्यक्ष शिकायत चैनल' : 'Direct Intake Channels'}
                </span>

                <Link
                  to="/sms-complaint"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive('/sms-complaint')
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="block leading-tight">{t('nav_sms_complaint')}</span>
                      <span className="text-[9.5px] opacity-75 font-normal block">
                        {isHindi ? 'SMS टेक्स्ट शिकायत' : 'Text SMS Reporting'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">
                    SMS
                  </span>
                </Link>

                <Link
                  to="/call-complaint"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive('/call-complaint')
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <div>
                      <span className="block leading-tight">{t('nav_call_complaint')}</span>
                      <span className="text-[9.5px] opacity-75 font-normal block">
                        {isHindi ? 'वॉयस हेल्पलाइन' : '24/7 Voice IVR'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 px-1.5 py-0.5 rounded font-mono font-bold">
                    IVR
                  </span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer Info */}
            <div className="pt-3 border-t border-emerald-100 dark:border-emerald-900 text-center space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 block">
                🏛️ Nagpur Municipal Redressal
              </span>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-500 font-mono block">
                Pragati 2.0 • CodeRush 2.0
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
