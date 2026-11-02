import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../context/LanguageContext';
import {
    Sprout,
    Menu,
    X,
    Globe,
    User,
    LogOut,
    Shield,
    LayoutDashboard,
    ChevronDown,
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { language, setLanguage, t, availableLanguages } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const langRef = useRef(null);
    const userRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setLangDropdownOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: t.nav.home, path: '/' },
        { name: t.nav.about, path: '/about' },
        { name: t.nav.benefits, path: '/benefits' },
        { name: t.nav.crops, path: '/crops' },
        { name: t.nav.planner, path: '/planner' },
        { name: t.nav.quiz, path: '/quiz' },
        { name: t.nav.resources, path: '/resources' },
        { name: t.nav.faq, path: '/faq' },
        { name: t.nav.feedback, path: '/feedback' },
    ];

    const languageLabels = {
        en: { flag: '🇬🇧', label: 'English' },
        hi: { flag: '🇮🇳', label: 'हिंदी' },
        te: { flag: '🇮🇳', label: 'తెలుగు' },
        ta: { flag: '🇮🇳', label: 'தமிழ்' },
        kn: { flag: '🇮🇳', label: 'ಕನ್ನಡ' },
    };

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-emerald-500/20 bg-slate-950/90 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-green-500 to-lime-400 p-0.5 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                                <Sprout className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                                Crop<span className="gradient-text-emerald">Cycle</span>
                            </span>
                            <span className="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                                {t.tagline}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Action Tools: Language Selector + Auth */}
                    <div className="hidden sm:flex items-center gap-3">

                        {/* Multi-Language Selector Dropdown */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800 text-xs font-bold transition-all shadow-sm"
                            >
                                <Globe size={15} className="text-emerald-400 animate-pulse" />
                                <span>{languageLabels[language]?.flag} {languageLabels[language]?.label}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {langDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 space-y-1">
                                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                                        Select Language / भाषा चुनें
                                    </div>
                                    {Object.keys(languageLabels).map((langKey) => (
                                        <button
                                            key={langKey}
                                            onClick={() => {
                                                setLanguage(langKey);
                                                setLangDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${language === langKey
                                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                                    : 'text-slate-200 hover:bg-slate-800'
                                                }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span>{languageLabels[langKey].flag}</span>
                                                <span>{languageLabels[langKey].label}</span>
                                            </span>
                                            {language === langKey && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Auth Dropdown / Buttons */}
                        {user ? (
                            <div className="relative" ref={userRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left text-xs">
                                        <span className="block font-bold text-white leading-none">{user.name}</span>
                                        <span className="text-[10px] text-emerald-400 font-medium capitalize">{user.role}</span>
                                    </div>
                                    <ChevronDown size={14} className="text-slate-400" />
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 space-y-1">
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setUserDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800"
                                        >
                                            <LayoutDashboard size={16} className="text-emerald-400" />
                                            {t.nav.dashboard}
                                        </Link>

                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setUserDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-purple-300 hover:bg-purple-950/40"
                                            >
                                                <Shield size={16} className="text-purple-400" />
                                                {t.nav.admin} Panel
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => {
                                                setUserDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/30 text-left"
                                        >
                                            <LogOut size={16} />
                                            {t.nav.logout}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-all"
                                >
                                    {t.nav.login}
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
                                >
                                    {t.nav.register}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex sm:hidden items-center gap-2">
                        <button
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="p-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
                        >
                            {languageLabels[language]?.flag}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === item.path
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'text-slate-300 hover:bg-slate-900'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Mobile Language Selector */}
                    <div className="pt-2 border-t border-slate-800">
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Select Language</p>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.keys(languageLabels).map((langKey) => (
                                <button
                                    key={langKey}
                                    onClick={() => {
                                        setLanguage(langKey);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${language === langKey ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                                        }`}
                                >
                                    <span>{languageLabels[langKey].flag}</span>
                                    <span>{languageLabels[langKey].label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-2.5 rounded-xl bg-slate-900 text-center text-xs font-bold text-emerald-400"
                                >
                                    {t.nav.dashboard}
                                </Link>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full py-2.5 rounded-xl bg-red-950/40 text-center text-xs font-bold text-red-400"
                                >
                                    {t.nav.logout}
                                </button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2.5 text-center rounded-xl bg-slate-900 text-xs font-bold text-white"
                                >
                                    {t.nav.login}
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2.5 text-center rounded-xl bg-emerald-500 text-xs font-bold text-slate-950"
                                >
                                    {t.nav.register}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
