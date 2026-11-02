import React, { useState } from 'react';
import { suggestRotation, createPlan } from '../services/planService';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import AgriculturalDisclaimer from '../components/AgriculturalDisclaimer';
import {
    Sprout,
    Sparkles,
    MapPin,
    Calendar,
    Droplets,
    Layers,
    Save,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    RefreshCw,
} from 'lucide-react';

const RotationPlanner = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        location: 'Andhra Pradesh',
        season: 'Kharif',
        currentCrop: 'Rice',
        previousCrop: 'None / Fallow',
        waterAvailability: 'High',
        soilType: 'Loamy',
    });

    const [suggestionsResult, setSuggestionsResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');
    const [saving, setSaving] = useState(false);
    const [planTitle, setPlanTitle] = useState('');
    const [planNotes, setPlanNotes] = useState('');

    const locations = [
        'Andhra Pradesh',
        'Punjab',
        'Uttar Pradesh',
        'Maharashtra',
        'Karnataka',
        'Tamil Nadu',
        'Madhya Pradesh',
        'Gujarat',
        'West Bengal',
        'Bihar',
        'Haryana',
        'Rajasthan',
        'Telangana',
        'Odisha',
    ];

    const seasons = ['Kharif', 'Rabi', 'Zaid', 'Summer'];
    const currentCropsList = [
        'Rice',
        'Wheat',
        'Maize',
        'Groundnut',
        'Chickpea',
        'Green Gram',
        'Black Gram',
        'Soybean',
        'Cotton',
        'Sunflower',
        'Mustard',
        'Sugarcane',
        'Potato',
        'Tomato',
    ];

    const waterOptions = ['High', 'Medium', 'Low'];
    const soilOptions = ['Loamy', 'Clay / Clay Loam', 'Sandy Loam', 'Black Cotton Soil', 'Red Loamy'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuggestionsResult(null);
        setSaveSuccess('');

        try {
            const res = await suggestRotation(formData);
            if (res.success) {
                setSuggestionsResult(res);
                setPlanTitle(`${formData.currentCrop} Rotation Sequence (${formData.season})`);
            } else {
                setError(res.message || 'Failed to generate crop rotation suggestions');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error connecting to rotation engine');
        } finally {
            setLoading(false);
        }
    };

    const handleSavePlan = async () => {
        if (!user) {
            navigate('/login', { state: { from: { pathname: '/planner' } } });
            return;
        }

        setSaving(true);
        setSaveSuccess('');
        try {
            const cropSequenceList = [formData.currentCrop, ...suggestionsResult.suggestions.map((s) => s.crop)];

            const planPayload = {
                title: planTitle || `${formData.season} Rotation Plan`,
                location: formData.location,
                soilType: formData.soilType,
                season: formData.season,
                currentCrop: formData.currentCrop,
                previousCrop: formData.previousCrop,
                waterAvailability: formData.waterAvailability,
                crops: cropSequenceList,
                notes: planNotes,
            };

            const res = await createPlan(planPayload);
            if (res.success) {
                setSaveSuccess('Rotation plan successfully saved to your dashboard! 🌱');
                setTimeout(() => {
                    navigate('/my-plans');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save rotation plan');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Sparkles size={14} /> Interactive Decision Support
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    {t.planner.title}
                </h1>
                <p className="text-slate-300 text-base">
                    {t.planner.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Form Column */}
                <div className="lg:col-span-5">
                    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sprout className="text-emerald-400" size={22} />
                            Field Parameters
                        </h3>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            {/* Location */}
                            <div>
                                <label className="font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                                    <MapPin size={14} className="text-emerald-400" /> {t.planner.location}
                                </label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                >
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Season */}
                            <div>
                                <label className="font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                                    <Calendar size={14} className="text-emerald-400" /> {t.planner.season}
                                </label>
                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                >
                                    {seasons.map((s) => (
                                        <option key={s} value={s}>
                                            {s} Season
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Current Crop */}
                            <div>
                                <label className="font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                                    <Sprout size={14} className="text-emerald-400" /> {t.planner.currentCrop}
                                </label>
                                <select
                                    name="currentCrop"
                                    value={formData.currentCrop}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                >
                                    {currentCropsList.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Previous Crop */}
                            <div>
                                <label className="font-bold text-slate-300 block mb-1.5">{t.planner.previousCrop}</label>
                                <select
                                    name="previousCrop"
                                    value={formData.previousCrop}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                >
                                    <option value="None / Fallow">None / Fallow</option>
                                    {currentCropsList.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Water Availability */}
                            <div>
                                <label className="font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                                    <Droplets size={14} className="text-teal-400" /> {t.planner.water}
                                </label>
                                <select
                                    name="waterAvailability"
                                    value={formData.waterAvailability}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                >
                                    {waterOptions.map((w) => (
                                        <option key={w} value={w}>
                                            {w} Water Availability
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Soil Type */}
                            <div>
                                <label className="font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                                    <Layers size={14} className="text-amber-400" /> {t.planner.soil}
                                </label>
                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                >
                                    {soilOptions.map((so) => (
                                        <option key={so} value={so}>
                                            {so}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="animate-spin" size={18} />
                                        Analyzing Soil & Crop Sequence...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={18} />
                                        {t.planner.btnGenerate}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Output Column */}
                <div className="lg:col-span-7 space-y-6">
                    {suggestionsResult ? (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                            {t.planner.resultsTitle}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mt-1">
                                            Following Crops for {formData.currentCrop}
                                        </h3>
                                    </div>

                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                        {suggestionsResult.suggestions.length} Options Found
                                    </span>
                                </div>

                                {/* Suggestions Cards */}
                                <div className="space-y-4">
                                    {suggestionsResult.suggestions.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">
                                                        {idx + 1}
                                                    </span>
                                                    {item.crop}
                                                </h4>
                                                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-emerald-300">
                                                    {item.category || 'Recommended Crop'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-300 leading-relaxed pl-8">
                                                {item.reason}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Save Plan Form (for Authenticated Users) */}
                                <div className="pt-6 border-t border-slate-800 space-y-4">
                                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                        <Save size={18} className="text-emerald-400" /> Save Rotation Plan to Profile
                                    </h4>

                                    {saveSuccess && (
                                        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                                            <CheckCircle size={16} /> {saveSuccess}
                                        </div>
                                    )}

                                    {!user ? (
                                        <div className="p-4 rounded-xl glass-card border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-4">
                                            <span>Log in to save this plan to your dashboard and track progress.</span>
                                            <Link
                                                to="/login"
                                                state={{ from: { pathname: '/planner' } }}
                                                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold shrink-0 hover:bg-emerald-400"
                                            >
                                                Log In to Save
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 text-xs">
                                            <div>
                                                <label className="text-slate-400 block mb-1">Plan Title</label>
                                                <input
                                                    type="text"
                                                    value={planTitle}
                                                    onChange={(e) => setPlanTitle(e.target.value)}
                                                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                                    placeholder="e.g. 2026 Kharif Rice-Legume Rotation"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-slate-400 block mb-1">Field Notes / Remarks</label>
                                                <textarea
                                                    rows={2}
                                                    value={planNotes}
                                                    onChange={(e) => setPlanNotes(e.target.value)}
                                                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                                                    placeholder="Add custom notes about field area, expected sowing dates..."
                                                />
                                            </div>
                                            <button
                                                onClick={handleSavePlan}
                                                disabled={saving}
                                                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
                                            >
                                                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                                                {t.planner.savePlan}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* AGRICULTURAL DISCLAIMER */}
                            <AgriculturalDisclaimer />
                        </div>
                    ) : (
                        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                                <Sprout size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Select parameters & submit</h3>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                                Choose your field location, target season, soil type, and current crop on the left form to calculate agronomically optimal crop sequences.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RotationPlanner;
