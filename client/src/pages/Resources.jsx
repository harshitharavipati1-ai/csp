import React, { useEffect, useState } from 'react';
import { getResources } from '../services/resourceService';
import { BookOpen, Search, Clock, ArrowRight, X, Sparkles, Sprout } from 'lucide-react';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [activeResource, setActiveResource] = useState(null);

    const categories = [
        'All',
        'Crop Rotation Basics',
        'Soil Health',
        'Nutrient Management',
        'Pest Management',
        'Sustainable Agriculture',
        'Crop Diversity',
    ];

    useEffect(() => {
        fetchResources();
    }, [selectedCategory]);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const params = {};
            if (selectedCategory !== 'All') params.category = selectedCategory;
            if (search) params.search = search;

            const res = await getResources(params);
            if (res.success) {
                setResources(res.data);
            }
        } catch (err) {
            console.error('Error fetching resources:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchResources();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    Learning Hub
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Educational <span className="gradient-text-emerald">Resources</span>
                </h1>
                <p className="text-slate-300 text-base">
                    In-depth guides, agronomical research summaries, and best practices for sustainable soil stewardship.
                </p>
            </div>

            {/* Category Pills & Search */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <form onSubmit={handleSearchSubmit} className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search guides by title or topic..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm"
                    >
                        Search
                    </button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                                    : 'glass-card text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resource Cards */}
            {loading ? (
                <div className="py-20 text-center space-y-3">
                    <BookOpen className="w-10 h-10 text-emerald-400 animate-bounce mx-auto" />
                    <p className="text-slate-400 text-sm">Loading educational resources...</p>
                </div>
            ) : resources.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3 max-w-md mx-auto">
                    <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">No resources found</h3>
                    <p className="text-xs text-slate-400">Try adjusting your category or search query.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((item) => (
                        <div
                            key={item._id}
                            className="glass-card rounded-2xl overflow-hidden glass-card-hover flex flex-col justify-between border border-slate-800"
                        >
                            <div>
                                <div className="relative h-48 overflow-hidden bg-slate-800">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Clock size={14} className="text-emerald-400" />
                                        <span>{item.readTime || '5 min read'}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white line-clamp-2">{item.title}</h3>
                                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 pt-0">
                                <button
                                    onClick={() => setActiveResource(item)}
                                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                                >
                                    Read Full Article <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ARTICLE READER MODAL */}
            {activeResource && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/80 p-6 sm:p-8 space-y-6 relative shadow-2xl">
                        <button
                            onClick={() => setActiveResource(null)}
                            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {activeResource.category}
                            </span>
                            <h2 className="text-3xl font-bold text-white">{activeResource.title}</h2>
                            <div className="flex items-center gap-3 text-xs text-slate-400 border-b border-slate-800 pb-4">
                                <span>⏱️ {activeResource.readTime || '5 min read'}</span>
                                <span>•</span>
                                <span>Published on CropCycle Learning Platform</span>
                            </div>
                        </div>

                        <img
                            src={activeResource.image}
                            alt={activeResource.title}
                            className="w-full h-64 object-cover rounded-2xl border border-slate-800"
                        />

                        <div className="text-slate-200 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                            {activeResource.content}
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => setActiveResource(null)}
                                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                            >
                                Done Reading
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
