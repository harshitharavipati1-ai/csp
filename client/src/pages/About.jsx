import React from 'react';
import { Sprout, CheckCircle2, ShieldAlert, Sparkles, BookOpen, Layers } from 'lucide-react';
import TimelineSequence from '../components/TimelineSequence';
import AgriculturalDisclaimer from '../components/AgriculturalDisclaimer';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    Educational Overview
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Understanding <span className="gradient-text-emerald">Crop Rotation</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    Crop rotation is the planned sequence of different crops grown on the same land over different seasons or years.
                </p>
            </div>

            {/* Main What is Crop Rotation Section */}
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <BookOpen size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">What is Crop Rotation?</h2>
                </div>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    In natural ecosystems, plants thrive in mixed communities. Conventional monoculture—planting the exact same crop on the same plot season after season—drains specific soil minerals, leaves soil vulnerable to wind erosion, and fosters host-specific pest outbreaks.
                </p>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Crop rotation mimics ecological diversity by systematically alternating plants with different root depths, nutrient requirements, and growth habits. For instance, replacing a heavy nitrogen-consuming cereal (like Rice or Wheat) with a leguminous pulse (like Chickpea or Green Gram) naturally fixes nitrogen back into the soil.
                </p>
            </div>

            {/* Why Farmers Rotate Crops & Core Pillar Cards */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white text-center">Why Farmers Rotate Crops</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Pillar 1 */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <CheckCircle2 size={20} /> Soil Nutrient Management
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Different crops require distinct ratios of N-P-K. Rotating heavy feeders with nitrogen fixers prevents single-nutrient exhaustion and minimizes synthetic fertilizer purchases.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <CheckCircle2 size={20} /> Pest & Disease Management
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Many soil pathogens and crop insects rely on continuous host plants. Introducing non-host crops breaks their life cycle naturally.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <CheckCircle2 size={20} /> Weed Suppression
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Varying sowing schedules, tillage practices, and crop canopy cover densities smothers aggressive weed populations without chemical herbicide overuse.
                        </p>
                    </div>

                    {/* Pillar 4 */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <CheckCircle2 size={20} /> Crop & Revenue Diversity
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Diversifying harvests buffers farmers against sudden price crashes for a single commodity, ensuring year-round economic security.
                        </p>
                    </div>

                    {/* Pillar 5 */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <CheckCircle2 size={20} /> Soil Structure & Filtration
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Alternating taproots (deep) and fibrous roots (shallow) aerates subsoil, breaks hardpans, and boosts groundwater recharge during monsoons.
                        </p>
                    </div>

                    {/* Pillar 6 */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                            <CheckCircle2 size={20} /> Sustainable Agriculture
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Improves long-term farm resilience, sequesters soil organic carbon, and safeguards agricultural land for future generations.
                        </p>
                    </div>
                </div>
            </div>

            {/* INTERACTIVE TIMELINE COMPONENT */}
            <div className="pt-4">
                <TimelineSequence />
            </div>

            {/* Disclaimer */}
            <AgriculturalDisclaimer />
        </div>
    );
};

export default About;
