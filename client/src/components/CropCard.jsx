import React from 'react';
import { Droplets, Calendar, ArrowRight, Layers, Sprout } from 'lucide-react';

const cropImages = {
    rice: '/images/wheat.png',
    wheat: '/images/rice.png',
    maize: '/images/maize.png',
    'green gram': '/images/green_gram.png',
    chickpea: '/images/groundnut.png',
    groundnut: '/images/chickpea.png',
    soybean: '/images/soybean.png',
    cotton: '/images/cotton.png',
    sunflower: '/images/sunflower.png',
    mustard: '/images/mustard.png',
    tomato: '/images/tomato.jpg',
    tomatoes: '/images/tomato.jpg',
    carrot: '/images/carrot.jpg',
    carrots: '/images/carrot.jpg',
    potato: '/images/potato.jpg',
    potatoes: '/images/potato.jpg',
};

const CropCard = ({ crop, onSelect }) => {
    const defaultImage = crop.category === 'Vegetable' ? '/images/vegetables.jpg' : '/images/rice.png';
    const cropImage = cropImages[crop.name?.trim().toLowerCase()] || crop.image || defaultImage;

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Cereal':
                return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            case 'Legume':
            case 'Pulse':
                return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
            case 'Oilseed':
                return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
            case 'Cash Crop':
            case 'Fiber':
                return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            default:
                return 'bg-slate-700/40 text-slate-300 border-slate-600/30';
        }
    };

    return (
        <div className="glass-card rounded-2xl overflow-hidden glass-card-hover flex flex-col justify-between border border-slate-800">
            <div>
                {/* Crop Image Header */}
                <div className="relative h-44 overflow-hidden bg-slate-800">
                    <img
                        src={cropImage}
                        alt={`${crop.name} growing in a field`}
                        loading="lazy"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = defaultImage;
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md ${getCategoryColor(crop.category)}`}>
                            {crop.category}
                        </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-xl font-bold text-white shadow-sm flex items-center gap-1.5">
                            <Sprout size={18} className="text-emerald-400" />
                            {crop.name}
                        </h3>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                            <Calendar size={14} className="text-emerald-400 shrink-0" />
                            <span className="truncate">Season: {crop.season}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                            <Droplets size={14} className="text-teal-400 shrink-0" />
                            <span className="truncate">Water: {crop.waterRequirement}</span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {crop.description}
                    </p>

                    {/* Suitable Following Crops Preview */}
                    {crop.suitableFollowingCrops && crop.suitableFollowingCrops.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/80">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                                Recommended Following Crops:
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {crop.suitableFollowingCrops.slice(0, 3).map((fc, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 text-[11px] border border-emerald-800/40"
                                    >
                                        + {fc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Card Action */}
            <div className="p-4 pt-0">
                <button
                    onClick={() => onSelect && onSelect(crop)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all group"
                >
                    View Rotation Details
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default CropCard;
