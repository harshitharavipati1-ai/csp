import React, { useState, useEffect } from 'react';
import { getCrops } from '../services/cropService';
import CropCard from '../components/CropCard';
import { Search, Filter, Sprout, X, Droplets, Calendar, Layers, ShieldCheck } from 'lucide-react';

const CropDatabase = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSeason, setSelectedSeason] = useState('All');
    const [selectedWater, setSelectedWater] = useState('All');
    const [activeCropModal, setActiveCropModal] = useState(null);

    const categories = ['All', 'Cereal', 'Legume', 'Pulse', 'Oilseed', 'Cash Crop', 'Vegetable'];
    const seasons = ['All', 'Kharif', 'Rabi', 'Zaid', 'All-Season'];
    const waterLevels = ['All', 'High', 'Medium', 'Low'];

    useEffect(() => {
        fetchCrops();
    }, [selectedCategory, selectedSeason, selectedWater]);

    const fetchCrops = async () => {
        setLoading(true);
        try {
            const params = {};
            if (selectedCategory !== 'All') params.category = selectedCategory;
            if (selectedSeason !== 'All') params.season = selectedSeason;
            if (selectedWater !== 'All') params.waterRequirement = selectedWater;
            if (search) params.search = search;

            const res = await getCrops(params);
            if (res.success) {
                setCrops(res.data);
            }
        } catch (error) {
            console.error('Error fetching crops:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchCrops();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    Agricultural Index
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Crop <span className="gradient-text-emerald">Database</span>
                </h1>
                <p className="text-slate-300 text-base">
                    Search and explore agricultural crops, their soil & nutrient requirements, and ideal rotation sequences.
                </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
                <form onSubmit={handleSearchSubmit} className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search crops by name, soil type, or characteristics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all"
                    >
                        Search
                    </button>
                </form>

                {/* Category Pills */}
                <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Filter by Category:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedCategory === cat
                                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                                        : 'glass-card text-slate-300 hover:bg-slate-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Season & Water dropdown filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Growing Season:
                        </label>
                        <select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                        >
                            {seasons.map((s) => (
                                <option key={s} value={s}>
                                    {s} Season
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Water Requirement:
                        </label>
                        <select
                            value={selectedWater}
                            onChange={(e) => setSelectedWater(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                        >
                            {waterLevels.map((w) => (
                                <option key={w} value={w}>
                                    {w} Water Requirement
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Crops Grid */}
            {loading ? (
                <div className="py-20 text-center space-y-3">
                    <Sprout className="w-10 h-10 text-emerald-400 animate-bounce mx-auto" />
                    <p className="text-slate-400 text-sm">Loading crop database...</p>
                </div>
            ) : crops.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4 max-w-md mx-auto">
                    <Sprout className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">No crops found</h3>
                    <p className="text-xs text-slate-400">
                        No crops matched your current filter criteria. Try adjusting search query or clearing filters.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedCategory('All');
                            setSelectedSeason('All');
                            setSelectedWater('All');
                            setSearch('');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-emerald-400 font-bold border border-slate-700"
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map((crop) => (
                        <CropCard key={crop._id} crop={crop} onSelect={(c) => setActiveCropModal(c)} />
                    ))}
                </div>
            )}

            {/* CROP DETAILS MODAL */}
            {activeCropModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 relative">
                        <button
                            onClick={() => setActiveCropModal(null)}
                            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col sm:flex-row items-start gap-4 border-b border-slate-800 pb-4">
                            <img
                                src={activeCropModal.image}
                                alt={activeCropModal.name}
                                className="w-24 h-24 rounded-2xl object-cover border border-slate-700 shrink-0"
                            />
                            <div className="space-y-1">
                                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    {activeCropModal.category}
                                </span>
                                <h2 className="text-2xl font-bold text-white">{activeCropModal.name}</h2>
                                <p className="text-xs text-slate-400">
                                    Growing Season: <strong className="text-slate-200">{activeCropModal.season}</strong> | Soil: <strong className="text-slate-200">{activeCropModal.soilType}</strong>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs text-slate-300">
                            <div>
                                <h4 className="font-bold text-white text-sm mb-1">Description</h4>
                                <p className="leading-relaxed">{activeCropModal.description}</p>
                            </div>

                            <div className="p-4 rounded-xl glass-card border-slate-800 space-y-2">
                                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                                    🧪 Nutrient Characteristics
                                </h4>
                                <p className="leading-relaxed">{activeCropModal.nutrientCharacteristics}</p>
                            </div>

                            <div className="p-4 rounded-xl glass-card border-slate-800 space-y-2">
                                <h4 className="font-bold text-teal-400 text-sm flex items-center gap-1.5">
                                    🌱 Crop Rotation Benefits
                                </h4>
                                <p className="leading-relaxed">{activeCropModal.rotationBenefits}</p>
                            </div>

                            {activeCropModal.suitableFollowingCrops && (
                                <div className="pt-2">
                                    <h4 className="font-bold text-white text-sm mb-2">Suitable Following Crops:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeCropModal.suitableFollowingCrops.map((fc, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold"
                                            >
                                                ✓ {fc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => setActiveCropModal(null)}
                                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropDatabase;
