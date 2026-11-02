import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/quizService';
import { Trophy, Award, User, RefreshCw, Sparkles, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const res = await getLeaderboard();
            if (res.success) {
                setLeaderboard(res.data);
            }
        } catch (err) {
            console.error('Error loading leaderboard:', err);
        } finally {
            setLoading(false);
        }
    };

    const getRankBadge = (rank) => {
        switch (rank) {
            case 1:
                return 'bg-amber-500/20 text-amber-300 border-amber-500/40 text-lg';
            case 2:
                return 'bg-slate-300/20 text-slate-200 border-slate-400/40 text-base';
            case 3:
                return 'bg-amber-700/20 text-amber-400 border-amber-700/40 text-sm';
            default:
                return 'bg-slate-800 text-slate-400 text-xs';
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Trophy size={14} /> Global Top Scorers
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Quiz <span className="gradient-text-amber">Leaderboard</span>
                </h1>
                <p className="text-slate-300 text-sm">
                    Top scoring farmers, students, and agricultural enthusiasts demonstrating crop rotation mastery.
                </p>
            </div>

            {loading ? (
                <div className="py-20 text-center space-y-3">
                    <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
                    <p className="text-slate-400 text-sm">Loading quiz leaderboard...</p>
                </div>
            ) : leaderboard.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4 max-w-md mx-auto">
                    <Trophy className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">No Quiz Results Yet</h3>
                    <p className="text-xs text-slate-400">
                        Be the first to complete the Crop Rotation Quiz and claim top rank!
                    </p>
                    <Link
                        to="/quiz"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                        Take Quiz Now
                    </Link>
                </div>
            ) : (
                <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-bold">Rank</th>
                                    <th className="py-4 px-6 font-bold">Participant</th>
                                    <th className="py-4 px-6 font-bold">User Category</th>
                                    <th className="py-4 px-6 font-bold">Quiz Score</th>
                                    <th className="py-4 px-6 font-bold text-right">Accuracy %</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-xs">
                                {leaderboard.map((item, index) => {
                                    const rank = index + 1;
                                    return (
                                        <tr
                                            key={item._id}
                                            className={`hover:bg-slate-800/40 transition-colors ${rank <= 3 ? 'bg-slate-900/60' : ''
                                                }`}
                                        >
                                            <td className="py-4 px-6 font-bold">
                                                <span
                                                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold border ${getRankBadge(
                                                        rank
                                                    )}`}
                                                >
                                                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                                                        {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <span className="font-bold text-white text-sm">{item.name}</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 text-emerald-300 border border-slate-700">
                                                    {item.userType || 'Farmer'}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 font-bold text-slate-200">
                                                {item.score} / {item.totalQuestions}
                                            </td>

                                            <td className="py-4 px-6 font-extrabold text-right text-emerald-400 text-sm">
                                                {item.percentage}%
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
