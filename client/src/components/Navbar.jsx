import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import {
  ShieldCheck,
  Home,
  FileEdit,
  LayoutDashboard,
  Building2,
  BarChart3,
  LogIn,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Header Navbar */}
      <nav className="bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900 sticky top-0 z-50 px-4 lg:px-8 py-3 flex justify-between items-center shadow-xs transition-colors">
        {/* Brand Logo */}
        <Link to="/" className="text-lg lg:text-xl font-extrabold tracking-tight text-emerald-950 dark:text-white flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="awaaz.ai logo" className="h-10 w-auto object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-black text-emerald-950 dark:text-white text-xl tracking-tight">
              awaaz<span className="text-emerald-600 font-extrabold">.ai</span>
            </span>
            <span className="text-[10px] font-bold tracking-wide text-emerald-700 dark:text-emerald-400 mt-0.5">
              {t('brand_slogan')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-desktop items-center gap-1.5 lg:gap-2 text-xs font-semibold shrink-0">
          <Link
            to="/"
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              isActive('/')
                ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/50 dark:text-emerald-200 dark:hover:bg-emerald-900/30'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>{t('nav_overview')}</span>
          </Link>

          {(!user || user.role === 'citizen') && (
            <Link
              to="/citizen"
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                isActive('/citizen')
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700'
                  : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/50 dark:text-emerald-200 dark:hover:bg-emerald-900/30'
              }`}
            >
              <FileEdit className="w-4 h-4 text-emerald-600" />
              <span>{t('nav_citizen')}</span>
            </Link>
          )}

          {user && (user.role === 'officer' || user.role === 'admin') && (
            <Link
              to="/officer"
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                isActive('/officer')
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700'
                  : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/50 dark:text-emerald-200 dark:hover:bg-emerald-900/30'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>{t('nav_officer')}</span>
            </Link>
          )}

          <Link
            to="/digital-twin"
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              isActive('/digital-twin')
                ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/50 dark:text-emerald-200 dark:hover:bg-emerald-900/30'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>{t('nav_digital_twin')}</span>
          </Link>

          <Link
            to="/analytics"
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              isActive('/analytics')
                ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700'
                : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/50 dark:text-emerald-200 dark:hover:bg-emerald-900/30'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>{t('nav_analytics')}</span>
          </Link>

          {/* Right Controls Group (Language Toggle + Theme Toggle + Auth) */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-emerald-100 dark:border-emerald-800 ml-1.5">
            {/* English / Hindi Toggle Switch */}
            <LanguageToggle />

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{user.name}</span>
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-white dark:bg-emerald-950 hover:bg-red-50 text-emerald-800 hover:text-red-600 font-bold px-3 py-1.5 rounded-xl text-xs transition border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('nav_logout')}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-emerald text-xs py-2 px-4 shrink-0"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('nav_login')}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button Group */}
        <div className="navbar-mobile-toggle items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-toggle flex-col bg-white dark:bg-emerald-950 border-b border-emerald-100 dark:border-emerald-800 p-4 space-y-2 font-semibold text-sm shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100 hover:text-emerald-600 py-2 border-b border-emerald-50 dark:border-emerald-900"
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>{t('nav_overview')}</span>
          </Link>
          {(!user || user.role === 'citizen') && (
            <Link
              to="/citizen"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100 hover:text-emerald-600 py-2 border-b border-emerald-50 dark:border-emerald-900"
            >
              <FileEdit className="w-4 h-4 text-emerald-600" />
              <span>{t('nav_citizen')}</span>
            </Link>
          )}
          {user && (user.role === 'officer' || user.role === 'admin') && (
            <Link
              to="/officer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100 hover:text-emerald-600 py-2 border-b border-emerald-50 dark:border-emerald-900"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>{t('nav_officer')}</span>
            </Link>
          )}
          <Link
            to="/digital-twin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100 hover:text-emerald-600 py-2 border-b border-emerald-50 dark:border-emerald-900"
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>{t('nav_digital_twin')}</span>
          </Link>
          <Link
            to="/analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100 hover:text-emerald-600 py-2"
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>{t('nav_analytics')}</span>
          </Link>
        </div>
      )}
    </>
  );
}
