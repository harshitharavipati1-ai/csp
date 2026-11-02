import React from 'react';
import { Sprout, TestTube, Bug, Leaf, Droplets, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgriculturalDisclaimer from '../components/AgriculturalDisclaimer';

const Benefits = () => {
    const benefitCards = [
        {
            icon: <Sprout className="w-8 h-8 text-emerald-400" />,
            title: '🌱 Soil Health',
            subtitle: 'Enhancing Soil Organic Matter & Biodiversity',
            color: 'border-emerald-500/30 bg-emerald-950/20',
            description:
                'Crop diversity supports soil health by feeding varied microbial communities. Rotating crops adds different types of organic residues, improving soil aggregation, moisture retention, and resilience against erosion.',
        },
        {
            icon: <TestTube className="w-8 h-8 text-amber-400" />,
            title: '🧪 Nutrient Management',
            subtitle: 'Optimizing N-P-K Utilization Naturally',
            color: 'border-amber-500/30 bg-amber-950/20',
            description:
                'Different crops have different nutrient requirements. Leguminous plants fix atmospheric nitrogen into the soil, while deep-rooted plants pull up nutrients from lower subsoil horizons that shallow feeders cannot reach.',
        },
        {
            icon: <Bug className="w-8 h-8 text-teal-400" />,
            title: '🐛 Pest Management',
            subtitle: 'Interrupting Pathogen & Insect Life Cycles',
            color: 'border-teal-500/30 bg-teal-950/20',
            description:
                'Changing crops interrupts host-specific pest and disease cycles. When non-host plants replace host crops, soil-borne fungi, nematodes, and insect larvae perish from lack of food.',
        },
        {
            icon: <Leaf className="w-8 h-8 text-green-400" />,
            title: '🌿 Weed Management',
            subtitle: 'Smothering Weeds Through Diverse Canopy Cover',
            color: 'border-green-500/30 bg-green-950/20',
            description:
                'Different crops and management practices influence weed pressure. Alternating summer and winter crops or fast-growing cover crops naturally smothers aggressive weed seeds before they mature.',
        },
        {
            icon: <Droplets className="w-8 h-8 text-blue-400" />,
            title: '💧 Water Management',
            subtitle: 'Improving Soil Moisture & Infiltration',
            color: 'border-blue-500/30 bg-blue-950/20',
            description:
                'Different root systems affect soil structure and water use. Alternating taproot and fibrous root crops breaks hard subsoil pans, improving rain infiltration and groundwater recharge.',
        },
        {
            icon: <Globe className="w-8 h-8 text-purple-400" />,
            title: '🌍 Sustainability',
            subtitle: 'Building Climate-Resilient Agricultural Systems',
            color: 'border-purple-500/30 bg-purple-950/20',
            description:
                'Crop rotation is an essential practice in modern sustainable farming. It lowers synthetic fertilizer runoff, cuts greenhouse emissions, and ensures farmland remains productive for future generations.',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    Agronomical Advantage
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Benefits of <span className="gradient-text-emerald">Crop Rotation</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg">
                    Discover how systematic crop sequencing delivers multi-fold ecological and economic rewards.
                </p>
            </div>

            {/* Grid of Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefitCards.map((card, idx) => (
                    <div
                        key={idx}
                        className={`glass-panel p-8 rounded-3xl border ${card.color} glass-card-hover flex flex-col justify-between space-y-6`}
                    >
                        <div className="space-y-4">
                            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit">
                                {card.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                                <p className="text-xs text-emerald-400 font-medium">{card.subtitle}</p>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-800/60">
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                ✓ Proven Agronomical Practice
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Banner */}
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 text-center max-w-3xl mx-auto space-y-4">
                <h3 className="text-2xl font-bold text-white">Ready to design your rotation sequence?</h3>
                <p className="text-slate-300 text-sm">
                    Use our Crop Rotation Planner tool to explore matching suggestions for your specific soil and seasonal parameters.
                </p>
                <Link
                    to="/planner"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20"
                >
                    Open Rotation Planner <ArrowRight size={16} />
                </Link>
            </div>

            <AgriculturalDisclaimer />
        </div>
    );
};

export default Benefits;
