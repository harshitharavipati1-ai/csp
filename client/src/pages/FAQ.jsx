import React from 'react';
import AccordionItem from '../components/AccordionItem';
import { faqItems } from '../data/faqData';
import { HelpCircle, Sparkles } from 'lucide-react';
import AgriculturalDisclaimer from '../components/AgriculturalDisclaimer';

const FAQ = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header */}
            <div className="text-center space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <HelpCircle size={14} /> Knowledge Assistance
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Frequently Asked <span className="gradient-text-emerald">Questions</span>
                </h1>
                <p className="text-slate-300 text-sm max-w-xl mx-auto">
                    Find clear, agronomically sound answers to common questions about crop rotation, soil management, and crop selection.
                </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
                {faqItems.map((item, idx) => (
                    <AccordionItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        isOpenDefault={idx === 0}
                    />
                ))}
            </div>

            <AgriculturalDisclaimer />
        </div>
    );
};

export default FAQ;
