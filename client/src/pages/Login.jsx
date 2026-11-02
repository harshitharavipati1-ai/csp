import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../context/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LogIn, Lock, Mail, Globe, AlertCircle, RefreshCw } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const { language, setLanguage, t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        preferredLanguage: language || 'en',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const languageOptions = [
        { code: 'en', flag: '🇬🇧', name: 'English' },
        { code: 'hi', flag: '🇮🇳', name: 'हिंदी (Hindi)' },
        { code: 'te', flag: '🇮🇳', name: 'తెలుగు (Telugu)' },
        { code: 'ta', flag: '🇮🇳', name: 'தமிழ் (Tamil)' },
        { code: 'kn', flag: '🇮🇳', name: 'ಕನ್ನಡ (Kannada)' },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'preferredLanguage') {
            setLanguage(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await login(formData);
            if (res.success) {
                if (formData.preferredLanguage) {
                    setLanguage(formData.preferredLanguage);
                }
                navigate(from, { replace: true });
            } else {
                setError(res.message || 'Invalid email or password');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error signing in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                        <Sprout size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-xs text-slate-400">Sign in to access saved rotation plans and quiz scores</p>
                </div>

                {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    {/* Preferred Language Choice */}
                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                            <Globe size={16} className="text-emerald-400" />
                            <span>Select Preferred Language / भाषा चुनें *</span>
                        </label>
                        <select
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-semibold focus:outline-none focus:border-emerald-500"
                        >
                            {languageOptions.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.flag} {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">Email Address *</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="farmer@cropcycle.org"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">Password *</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <LogIn size={18} />}
                        Sign In
                    </button>
                </form>

                {/* Demo Credentials quick hint */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                    <p className="font-bold text-emerald-400">🌱 Quick Demo Logins:</p>
                    <p>Farmer: <code className="text-white">farmer@cropcycle.org</code> / <code className="text-white">Farmer@123456</code></p>
                    <p>Admin: <code className="text-white">admin@cropcycle.org</code> / <code className="text-white">Admin@123456</code></p>
                </div>

                <p className="text-center text-xs text-slate-400 pt-2">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-400 font-bold hover:underline">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
