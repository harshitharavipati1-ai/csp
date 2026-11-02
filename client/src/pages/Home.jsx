import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import CropCard from '../components/CropCard';
import AgriculturalDisclaimer from '../components/AgriculturalDisclaimer';
import { getCrops } from '../services/cropService';
import {
    Sprout,
    ArrowRight,
    ShieldCheck,
    Award,
    Layers,
    Sparkles,
    Sun,
    Droplet,
    Compass,
} from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();
    const [featuredCrops, setFeaturedCrops] = useState([]);
    const [loadingCrops, setLoadingCrops] = useState(true);

    useEffect(() => {
        fetchFeaturedCrops();
    }, []);

    const fetchFeaturedCrops = async () => {
        try {
            const res = await getCrops();
            if (res.success && res.data) {
                setFeaturedCrops(res.data.slice(0, 3));
            }
        } catch (err) {
            console.error('Error loading featured crops:', err);
        } finally {
            setLoadingCrops(false);
        }
    };

    return (
        <div className="space-y-16 py-8">
            {/* HERO SECTION */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-12">
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-green-500/10 to-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
                </div>

                <div className="text-center space-y-6 max-w-4xl mx-auto">
                    {/* Nature Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full nature-badge text-xs font-bold uppercase tracking-wider animate-leaf-glow">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>{t.hero.badge}</span>
                    </div>

                    {/* Main Title with Nature Gradients */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none">
                        {t.hero.title1}{' '}
                        <span className="gradient-text-emerald block sm:inline">{t.hero.title2}</span>{' '}
                        <span className="gradient-text-gold block">{t.hero.title3}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        {t.hero.subtitle}
                    </p>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            to="/planner"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                        >
                            <Sprout size={20} />
                            {t.hero.btnPlan}
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            to="/about"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800/80 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
                        >
                            <Compass size={18} className="text-emerald-400" />
                            {t.hero.btnLearn}
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto pt-6 text-left">
                        <div className="relative col-span-2 h-48 sm:h-64 md:h-80 overflow-hidden rounded-3xl border border-emerald-300/20 shadow-2xl shadow-emerald-950/40">
                            <img
                                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85"
                                alt="Lush green farm fields stretching toward the horizon"
                                className="h-full w-full object-cover"
                                fetchPriority="high"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                                <span className="mb-2 inline-flex rounded-full border border-white/20 bg-slate-950/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200 backdrop-blur-md">
                                    Rooted in nature
                                </span>
                                <p className="text-lg font-extrabold text-white sm:text-2xl">Healthier soil. Better harvests.</p>
                            </div>
                        </div>
                        <div className="relative h-32 sm:h-40 md:h-[9.625rem] overflow-hidden rounded-3xl border border-emerald-300/20">
                            <img
                                src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80"
                                alt="Rows of crops growing in a sunlit field"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                            <span className="absolute bottom-3 left-4 text-xs font-bold text-white sm:text-sm">Plan with the seasons</span>
                        </div>
                        <div className="relative h-32 sm:h-40 md:h-[9.625rem] overflow-hidden rounded-3xl border border-emerald-300/20">
                            <img
                                src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=700&q=80"
                                alt="Fresh green leaves thriving in a crop field"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                            <span className="absolute bottom-3 left-4 text-xs font-bold text-white sm:text-sm">Grow a resilient farm</span>
                        </div>
                    </div>

                    {/* Key Value Feature Pills */}
                    <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
                        <div className="glass-card p-3 rounded-2xl flex items-center justify-center gap-2 text-emerald-300">
                            <ShieldCheck size={16} />
                            <span>{t.hero.freeAccess}</span>
                        </div>
                        <div className="glass-card p-3 rounded-2xl flex items-center justify-center gap-2 text-teal-300">
                            <Layers size={16} />
                            <span>{t.hero.smartPlanner}</span>
                        </div>
                        <div className="glass-card p-3 rounded-2xl flex items-center justify-center gap-2 text-amber-300">
                            <Award size={16} />
                            <span>{t.hero.quizAccess}</span>
                        </div>
                        <div className="glass-card p-3 rounded-2xl flex items-center justify-center gap-2 text-lime-300">
                            <Sun size={16} />
                            <span>Seasonal N-P-K Rules</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE PILLARS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                            <Sprout size={24} />
                        </div>
                        <h3 className="text-xl font-extrabold text-white">1. Soil Nutrient Enrichment</h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Alternating leguminous pulse crops with heavy cereal feeders replenishes natural soil nitrogen, reducing reliance on synthetic chemical fertilizers.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-teal-500/40 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-extrabold text-white">2. Pest & Weed Break Cycle</h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Disrupting host plant species starves soil-borne pathogens, root-knot nematodes, and weed seed banks without aggressive chemical sprays.
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                            <Droplet size={24} />
                        </div>
                        <h3 className="text-xl font-extrabold text-white">3. Water & Root Management</h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Deep taproot crops break through hardpan layers to improve subsoil aeration, moisture holding capacity, and rainwater infiltration.
                        </p>
                    </div>
                </div>
            </section>

            {/* FEATURED CROPS PREVIEW */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Crop Library</span>
                        <h2 className="text-3xl font-black text-white">Featured Agricultural Crops</h2>
                    </div>
                    <Link
                        to="/crops"
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                        Explore All Crops <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredCrops.map((crop) => (
                        <CropCard key={crop._id} crop={crop} />
                    ))}
                </div>
            </section>

            {/* DISCLAIMER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AgriculturalDisclaimer />
            </div>
        </div>
    );
};

export default Home;
