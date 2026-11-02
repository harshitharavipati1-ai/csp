import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getPlans } from '../services/planService';
import { getQuizResults } from '../services/quizService';
import { Link } from 'react-router-dom';
import {
    Sprout,
    Calendar,
    Award,
    BookOpen,
    ArrowRight,
    User,
    Plus,
    Trophy,
    Sparkles,
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [plansCount, setPlansCount] = useState(0);
    const [latestPlan, setLatestPlan] = useState(null);
    const [userQuizResults, setUserQuizResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [plansRes, quizRes] = await Promise.all([getPlans(), getQuizResults()]);
            if (plansRes.success) {
                setPlansCount(plansRes.data.length);
                if (plansRes.data.length > 0) {
                    setLatestPlan(plansRes.data[0]);
                }
            }
            if (quizRes.success) {
                setUserQuizResults(quizRes.data);
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const bestScore = userQuizResults.reduce((max, r) => (r.score > max ? r.score : max), 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Welcome Banner */}
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                        <Sparkles size={14} /> Welcome back to CropCycle
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Hello, {user?.name} 🌱
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300">
                        Account Type: <span className="text-emerald-400 font-bold">{user?.userType || 'Farmer'}</span> • Email: {user?.email}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/planner"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                        <Plus size={16} /> New Rotation Plan
                    </Link>
                    {user?.role === 'admin' && (
                        <Link
                            to="/admin"
                            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                </div>
            </div>

            {/* Overview Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat 1: Saved Plans */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Calendar size={24} />
                        </div>
                        <span className="text-2xl font-extrabold text-white">{plansCount}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-base">Saved Rotation Plans</h3>
                        <p className="text-xs text-slate-400 mt-1">Active crop schedules for your field plots</p>
                    </div>
                    <Link
                        to="/my-plans"
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 pt-2 border-t border-slate-800"
                    >
                        Manage Plans <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Stat 2: Quiz Best Score */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                            <Trophy size={24} />
                        </div>
                        <span className="text-2xl font-extrabold text-white">{bestScore}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-base">Best Quiz Score</h3>
                        <p className="text-xs text-slate-400 mt-1">Highest points earned on awareness quiz</p>
                    </div>
                    <Link
                        to="/quiz"
                        className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 pt-2 border-t border-slate-800"
                    >
                        Take Quiz <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Stat 3: Learning Progress */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
                            <BookOpen size={24} />
                        </div>
                        <span className="text-2xl font-extrabold text-white">Active</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-base">Crop Database Access</h3>
                        <p className="text-xs text-slate-400 mt-1">Explore N-P-K & rotation guidelines</p>
                    </div>
                    <Link
                        to="/crops"
                        className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 pt-2 border-t border-slate-800"
                    >
                        Browse Crops <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Latest Saved Plan Preview */}
            {latestPlan && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                            <Sprout className="text-emerald-400" size={20} /> Latest Rotation Schedule
                        </h3>
                        <Link to="/my-plans" className="text-xs font-bold text-emerald-400 hover:underline">
                            View All
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="font-bold text-white text-base">{latestPlan.title}</h4>
                            <p className="text-xs text-slate-400">
                                Location: {latestPlan.location} • Season: {latestPlan.season} • Soil: {latestPlan.soilType}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            {latestPlan.crops.map((c, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 font-bold text-xs"
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
