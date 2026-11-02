import React, { useState } from 'react';
import { ArrowDown, Sprout, ShieldAlert, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const timelineSteps = [
    {
        year: 'Year 1',
        crop: 'Rice',
        category: 'Cereal (Heavy Feeder)',
        season: 'Kharif',
        description: 'Consumes high soil nitrogen and phosphorus. Leaves wet soil condition perfect for short pulse legumes.',
        role: 'Primary Grain Harvest',
        color: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
        badge: 'bg-emerald-500/20 text-emerald-300',
        icon: '🌾',
    },
    {
        year: 'Year 2',
        crop: 'Pulses (Green Gram / Chickpea)',
        category: 'Legume (Nitrogen Fixer)',
        season: 'Rabi / Zaid',
        description: 'Fixes atmospheric nitrogen into root nodules. Restores organic nitrogen depleted by Year 1 Rice.',
        role: 'Soil Nutrient Restoration',
        color: 'border-teal-500 text-teal-400 bg-teal-950/40',
        badge: 'bg-teal-500/20 text-teal-300',
        icon: '🌱',
    },
    {
        year: 'Year 3',
        crop: 'Maize',
        category: 'Cereal (High Biomass)',
        season: 'Kharif',
        description: 'Thrives on biological nitrogen left by Pulses. Deep fibrous root system opens soil horizons.',
        role: 'Soil Structure Enhancement',
        color: 'border-amber-500 text-amber-400 bg-amber-950/40',
        badge: 'bg-amber-500/20 text-amber-300',
        icon: '🌽',
    },
    {
        year: 'Year 4',
        crop: 'Groundnut',
        category: 'Oilseed Legume',
        season: 'Kharif / Summer',
        description: 'Conditions upper soil layer, provides rich foliage green manure, and diversifies farm economic returns.',
        role: 'Economic & Organic Conditioning',
        color: 'border-green-500 text-green-400 bg-green-950/40',
        badge: 'bg-green-500/20 text-green-300',
        icon: '🥜',
    },
];

const TimelineSequence = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="py-8">
            <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Interactive Rotation Sequence
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Example 4-Year Sustainable Crop Cycle</h3>
                <p className="text-slate-400 text-sm max-w-xl mx-auto mt-1">
                    Click on any year to inspect how soil nutrients, root depths, and crop yields stay balanced over time.
                </p>
            </div>

            {/* Desktop Horizontal Stepper */}
            <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
                {timelineSteps.map((step, index) => (
                    <button
                        key={step.year}
                        onClick={() => setActiveStep(index)}
                        className={`p-5 rounded-2xl text-left transition-all relative glass-panel ${activeStep === index
                                ? `border-2 ${step.color} shadow-xl scale-[1.02]`
                                : 'hover:border-slate-700 opacity-75 hover:opacity-100'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${step.badge}`}>
                                {step.year}
                            </span>
                            <span className="text-2xl">{step.icon}</span>
                        </div>
                        <h4 className="font-bold text-lg text-white mb-1">{step.crop}</h4>
                        <p className="text-xs text-slate-400 font-medium">{step.category}</p>
                    </button>
                ))}
            </div>

            {/* Selected Step Detail Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 bg-slate-900/90 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                            {timelineSteps[activeStep].icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                    {timelineSteps[activeStep].year} Phase
                                </span>
                                <span className="text-xs text-slate-500">• {timelineSteps[activeStep].season}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">{timelineSteps[activeStep].crop}</h4>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${timelineSteps[activeStep].badge}`}>
                        {timelineSteps[activeStep].role}
                    </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {timelineSteps[activeStep].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl glass-card border-slate-800">
                        <span className="text-slate-400 block mb-1">Impact on Soil</span>
                        <span className="font-semibold text-emerald-300 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Nitrogen & Carbon Balance
                        </span>
                    </div>
                    <div className="p-3 rounded-xl glass-card border-slate-800">
                        <span className="text-slate-400 block mb-1">Pest Management</span>
                        <span className="font-semibold text-teal-300 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Interrupts Host Cycles
                        </span>
                    </div>
                    <div className="p-3 rounded-xl glass-card border-slate-800">
                        <span className="text-slate-400 block mb-1">Next Following Crop</span>
                        <span className="font-semibold text-amber-300 flex items-center gap-1">
                            <ChevronRight size={14} /> Ready for Next Season
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Vertical Stepper */}
            <div className="md:hidden mt-8 space-y-4">
                {timelineSteps.map((step, idx) => (
                    <div key={step.year} className="relative">
                        <div className="glass-panel p-4 rounded-xl border border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-emerald-400">{step.year}</span>
                                <span className="text-lg">{step.icon}</span>
                            </div>
                            <h5 className="font-bold text-white text-base">{step.crop}</h5>
                            <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                        </div>
                        {idx < timelineSteps.length - 1 && (
                            <div className="flex justify-center my-1">
                                <ArrowDown size={16} className="text-emerald-500 animate-pulse" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineSequence;
