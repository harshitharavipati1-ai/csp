import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, Shield, BookOpen, ExternalLink, Leaf, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Col */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                                <Sprout size={20} />
                            </div>
                            <span className="font-bold text-xl text-white">
                                Crop<span className="gradient-text-emerald">Cycle</span>
                            </span>
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Promoting agricultural awareness, soil organic conservation, and intelligent crop rotation planning for farmers, students, and agricultural enthusiasts.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                            <Leaf size={14} />
                            <span>Protecting Soil • Enhancing Yields</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                                    About Crop Rotation
                                </Link>
                            </li>
                            <li>
                                <Link to="/benefits" className="hover:text-emerald-400 transition-colors">
                                    Key Agronomical Benefits
                                </Link>
                            </li>
                            <li>
                                <Link to="/crops" className="hover:text-emerald-400 transition-colors">
                                    Crop Database
                                </Link>
                            </li>
                            <li>
                                <Link to="/planner" className="hover:text-emerald-400 transition-colors">
                                    Interactive Planner
                                </Link>
                            </li>
                            <li>
                                <Link to="/resources" className="hover:text-emerald-400 transition-colors">
                                    Educational Resources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Interactive Tools */}
                    <div>
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Interactive Tools</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link to="/quiz" className="hover:text-emerald-400 transition-colors">
                                    Awareness Quiz
                                </Link>
                            </li>
                            <li>
                                <Link to="/leaderboard" className="hover:text-emerald-400 transition-colors">
                                    Leaderboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-emerald-400 transition-colors">
                                    FAQ & Knowledge Base
                                </Link>
                            </li>
                            <li>
                                <Link to="/feedback" className="hover:text-emerald-400 transition-colors">
                                    Submit Feedback
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Educational Disclaimer */}
                    <div>
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Notice</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                            Educational project designed for agricultural awareness. Recommendations are heuristic guides based on agronomical sequences.
                        </p>
                        <div className="p-2.5 rounded-lg glass-card text-[11px] text-amber-300/90 border-amber-500/20">
                            Consult local agricultural extension officers for region-specific farming decisions.
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} CropCycle. All Rights Reserved.</p>
                    <p className="flex items-center gap-1 text-slate-400">
                        Full-Stack Web Application • Built with React & Node.js
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
