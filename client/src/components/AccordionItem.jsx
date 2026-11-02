import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const AccordionItem = ({ question, answer, isOpenDefault = false }) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);

    return (
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                        <HelpCircle size={18} />
                    </div>
                    <h4 className="font-semibold text-white text-base md:text-lg">{question}</h4>
                </div>
                <div className={`p-1.5 rounded-lg text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400 bg-emerald-500/10' : ''}`}>
                    <ChevronDown size={18} />
                </div>
            </button>

            {isOpen && (
                <div className="px-6 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-in fade-in duration-200">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
