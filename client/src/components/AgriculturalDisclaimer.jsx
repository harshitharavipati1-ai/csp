import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const AgriculturalDisclaimer = ({ compact = false }) => {
    return (
        <div className={`p-4 rounded-xl glass-panel border-amber-500/30 bg-amber-950/20 text-amber-200/90 ${compact ? 'text-xs' : 'text-sm'} shadow-lg my-4`}>
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    {compact ? <Info size={16} /> : <AlertTriangle size={20} />}
                </div>
                <div>
                    <h4 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                        🌱 Important Agricultural Disclaimer
                    </h4>
                    <p className="leading-relaxed opacity-90">
                        “Crop rotation suggestions provided by this application are intended for educational awareness and should not be treated as professional agricultural advice. Crop selection depends on local climate, soil conditions, irrigation, season, market conditions, and other factors. Consult qualified agricultural experts or local agricultural extension services for location-specific decisions.”
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AgriculturalDisclaimer;
