import React, { useEffect, useState } from 'react';
import { getPlans, deletePlan, updatePlan } from '../services/planService';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
    Calendar,
    Trash2,
    Edit2,
    MapPin,
    Layers,
    Droplets,
    Sprout,
    Plus,
    ArrowRight,
    RefreshCw,
    CheckCircle,
    X,
} from 'lucide-react';
import AgriculturalDisclaimer from '../components/AgriculturalDisclaimer';

const MyPlans = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPlan, setEditingPlan] = useState(null);
    const [editNotes, setEditNotes] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchUserPlans();
    }, []);

    const fetchUserPlans = async () => {
        setLoading(true);
        try {
            const res = await getPlans();
            if (res.success) {
                setPlans(res.data);
            }
        } catch (err) {
            console.error('Error fetching user plans:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this rotation plan?')) return;
        try {
            const res = await deletePlan(id);
            if (res.success) {
                setPlans(plans.filter((p) => p._id !== id));
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete plan');
        }
    };

    const handleOpenEdit = (plan) => {
        setEditingPlan(plan);
        setEditTitle(plan.title);
        setEditNotes(plan.notes || '');
    };

    const handleSaveEdit = async () => {
        if (!editingPlan) return;
        setUpdating(true);
        try {
            const res = await updatePlan(editingPlan._id, {
                title: editTitle,
                notes: editNotes,
            });
            if (res.success) {
                setPlans(plans.map((p) => (p._id === editingPlan._id ? res.data : p)));
                setEditingPlan(null);
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update plan');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                        Dashboard
                    </span>
                    <h1 className="text-3xl font-extrabold text-white mt-1">My Saved Rotation Plans</h1>
                    <p className="text-slate-400 text-xs mt-1">
                        Manage your personal farm crop rotation schedules and field notes.
                    </p>
                </div>

                <Link
                    to="/planner"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                    <Plus size={16} /> Create New Plan
                </Link>
            </div>

            {loading ? (
                <div className="py-20 text-center space-y-3">
                    <Sprout className="w-10 h-10 text-emerald-400 animate-bounce mx-auto" />
                    <p className="text-slate-400 text-sm">Loading your rotation plans...</p>
                </div>
            ) : plans.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4 max-w-md mx-auto">
                    <Calendar className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">No rotation plans found.</h3>
                    <p className="text-xs text-slate-400">
                        Create your first rotation plan using our interactive planner 🌱
                    </p>
                    <Link
                        to="/planner"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                    >
                        Go to Planner <ArrowRight size={14} />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 relative flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{plan.title}</h3>
                                        <p className="text-[11px] text-slate-400">
                                            Created: {new Date(plan.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenEdit(plan)}
                                            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                                            title="Edit Plan"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(plan._id)}
                                            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                                            title="Delete Plan"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                                    <div className="p-2 rounded-xl glass-card border-slate-800 flex items-center gap-1.5">
                                        <MapPin size={12} className="text-emerald-400" />
                                        <span className="truncate">{plan.location}</span>
                                    </div>
                                    <div className="p-2 rounded-xl glass-card border-slate-800 flex items-center gap-1.5">
                                        <Calendar size={12} className="text-teal-400" />
                                        <span className="truncate">{plan.season}</span>
                                    </div>
                                    <div className="p-2 rounded-xl glass-card border-slate-800 flex items-center gap-1.5">
                                        <Layers size={12} className="text-amber-400" />
                                        <span className="truncate">{plan.soilType}</span>
                                    </div>
                                </div>

                                {/* Crop Sequence Flow */}
                                <div className="p-4 rounded-2xl glass-card border-slate-800/80 space-y-2">
                                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                                        Cropping Sequence:
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                        {plan.crops.map((crop, idx) => (
                                            <React.Fragment key={idx}>
                                                <span className="px-3 py-1 rounded-xl bg-slate-900 border border-emerald-500/30 text-white font-bold text-xs">
                                                    {crop}
                                                </span>
                                                {idx < plan.crops.length - 1 && (
                                                    <ArrowRight size={14} className="text-emerald-500 shrink-0" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>

                                {plan.notes && (
                                    <p className="text-xs text-slate-300 italic bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                                        "{plan.notes}"
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* EDIT MODAL */}
            {editingPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="glass-panel max-w-lg w-full rounded-3xl border border-slate-700 p-6 space-y-4 relative">
                        <button
                            onClick={() => setEditingPlan(null)}
                            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="font-bold text-white text-lg">Edit Rotation Plan</h3>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="text-slate-400 block mb-1">Plan Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="text-slate-400 block mb-1">Field Notes</label>
                                <textarea
                                    rows={3}
                                    value={editNotes}
                                    onChange={(e) => setEditNotes(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setEditingPlan(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={updating}
                                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 flex items-center gap-1.5"
                            >
                                {updating && <RefreshCw size={14} className="animate-spin" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AgriculturalDisclaimer />
        </div>
    );
};

export default MyPlans;
