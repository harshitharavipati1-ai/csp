import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../services/adminService';
import { getAllFeedback } from '../services/feedbackService';
import { getCrops, createCrop as addCrop, deleteCrop } from '../services/cropService';
import { getResources, createResource as addResource, deleteResource } from '../services/resourceService';
import { getQuizQuestions, createQuizQuestion as addQuizQuestion, deleteQuizQuestion } from '../services/quizService';
import {
    ShieldAlert,
    Users,
    Sprout,
    Calendar,
    Award,
    MessageSquare,
    Plus,
    Trash2,
    RefreshCw,
    X,
    BookOpen,
    HelpCircle,
    BarChart2,
    CheckCircle,
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    // Management Lists State
    const [crops, setCrops] = useState([]);
    const [resources, setResources] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    // Modals state
    const [showCropModal, setShowCropModal] = useState(false);
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    // Form states
    const [newCrop, setNewCrop] = useState({
        name: '',
        category: 'Cereal',
        season: 'Kharif',
        waterRequirement: 'Medium',
        soilType: 'Loamy',
        description: '',
        nutrientCharacteristics: '',
        rotationBenefits: '',
        suitableFollowingCrops: '',
        image: '',
    });

    const [newResource, setNewResource] = useState({
        title: '',
        category: 'Crop Rotation Basics',
        description: '',
        content: '',
        readTime: '5 min read',
        image: '',
    });

    const [newQuestion, setNewQuestion] = useState({
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: '',
        difficulty: 'Medium',
    });

    const [msgSuccess, setMsgSuccess] = useState('');
    const [msgError, setMsgError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (activeTab === 'crops') fetchCropsList();
        if (activeTab === 'resources') fetchResourcesList();
        if (activeTab === 'quiz') fetchQuestionsList();
        if (activeTab === 'feedback') fetchFeedbacksList();
    }, [activeTab]);

    const fetchStats = async () => {
        setLoadingStats(true);
        try {
            const res = await getAdminStats();
            if (res.success) {
                setStats(res.data);
            }
        } catch (err) {
            console.error('Error fetching admin stats:', err);
        } finally {
            setLoadingStats(false);
        }
    };

    const fetchCropsList = async () => {
        setLoadingData(true);
        try {
            const res = await getCrops();
            if (res.success) setCrops(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingData(false);
        }
    };

    const fetchResourcesList = async () => {
        setLoadingData(true);
        try {
            const res = await getResources();
            if (res.success) setResources(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingData(false);
        }
    };

    const fetchQuestionsList = async () => {
        setLoadingData(true);
        try {
            const res = await getQuizQuestions();
            if (res.success) setQuestions(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingData(false);
        }
    };

    const fetchFeedbacksList = async () => {
        setLoadingData(true);
        try {
            const res = await getAllFeedback();
            if (res.success) setFeedbacks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingData(false);
        }
    };

    // Add Handlers
    const handleAddCropSubmit = async (e) => {
        e.preventDefault();
        setMsgSuccess('');
        setMsgError('');
        try {
            const payload = {
                ...newCrop,
                suitableFollowingCrops: newCrop.suitableFollowingCrops
                    ? newCrop.suitableFollowingCrops.split(',').map((s) => s.trim())
                    : [],
            };
            const res = await addCrop(payload);
            if (res.success) {
                setMsgSuccess('Crop successfully added!');
                setShowCropModal(false);
                fetchCropsList();
                fetchStats();
            }
        } catch (err) {
            setMsgError(err.response?.data?.message || 'Error adding crop');
        }
    };

    const handleDeleteCrop = async (id) => {
        if (!window.confirm('Delete this crop?')) return;
        try {
            const res = await deleteCrop(id);
            if (res.success) {
                setCrops(crops.filter((c) => c._id !== id));
                fetchStats();
            }
        } catch (err) {
            alert('Failed to delete crop');
        }
    };

    const handleAddResourceSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addResource(newResource);
            if (res.success) {
                setMsgSuccess('Resource successfully added!');
                setShowResourceModal(false);
                fetchResourcesList();
                fetchStats();
            }
        } catch (err) {
            setMsgError(err.response?.data?.message || 'Error adding resource');
        }
    };

    const handleDeleteResource = async (id) => {
        if (!window.confirm('Delete resource?')) return;
        try {
            const res = await deleteResource(id);
            if (res.success) {
                setResources(resources.filter((r) => r._id !== id));
                fetchStats();
            }
        } catch (err) {
            alert('Failed to delete resource');
        }
    };

    const handleAddQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addQuizQuestion(newQuestion);
            if (res.success) {
                setMsgSuccess('Question added!');
                setShowQuestionModal(false);
                fetchQuestionsList();
                fetchStats();
            }
        } catch (err) {
            setMsgError(err.response?.data?.message || 'Error adding question');
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm('Delete question?')) return;
        try {
            const res = await deleteQuizQuestion(id);
            if (res.success) {
                setQuestions(questions.filter((q) => q._id !== id));
                fetchStats();
            }
        } catch (err) {
            alert('Failed to delete question');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                        <ShieldAlert size={14} /> Role-Based Access Control
                    </span>
                    <h1 className="text-3xl font-extrabold text-white mt-1">Admin Dashboard Panel</h1>
                    <p className="text-slate-400 text-xs mt-1">
                        Manage Crop Database, Educational Resources, Quiz Question Bank, and User Feedbacks.
                    </p>
                </div>
            </div>

            {msgSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle size={16} /> {msgSuccess}
                </div>
            )}

            {/* Admin Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'stats' ? 'bg-purple-600 text-white shadow-lg' : 'slate-card text-slate-300 hover:bg-slate-800'
                        }`}
                >
                    <BarChart2 size={16} /> Overview Stats
                </button>

                <button
                    onClick={() => setActiveTab('crops')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'crops' ? 'bg-emerald-600 text-white shadow-lg' : 'slate-card text-slate-300 hover:bg-slate-800'
                        }`}
                >
                    <Sprout size={16} /> Manage Crops
                </button>

                <button
                    onClick={() => setActiveTab('resources')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'resources' ? 'bg-teal-600 text-white shadow-lg' : 'slate-card text-slate-300 hover:bg-slate-800'
                        }`}
                >
                    <BookOpen size={16} /> Educational Resources
                </button>

                <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'quiz' ? 'bg-amber-600 text-white shadow-lg' : 'slate-card text-slate-300 hover:bg-slate-800'
                        }`}
                >
                    <HelpCircle size={16} /> Quiz Questions
                </button>

                <button
                    onClick={() => setActiveTab('feedback')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'feedback' ? 'bg-blue-600 text-white shadow-lg' : 'slate-card text-slate-300 hover:bg-slate-800'
                        }`}
                >
                    <MessageSquare size={16} /> User Feedback
                </button>
            </div>

            {/* TAB 1: OVERVIEW STATS */}
            {activeTab === 'stats' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
                                <Users size={24} />
                            </div>
                            <span className="text-3xl font-extrabold text-white">{stats?.totalUsers || 0}</span>
                            <p className="text-xs text-slate-400 font-medium">Registered Platform Users</p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                                <Sprout size={24} />
                            </div>
                            <span className="text-3xl font-extrabold text-white">{stats?.totalCrops || 0}</span>
                            <p className="text-xs text-slate-400 font-medium">Crops in Database</p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 w-fit">
                                <Calendar size={24} />
                            </div>
                            <span className="text-3xl font-extrabold text-white">{stats?.totalPlans || 0}</span>
                            <p className="text-xs text-slate-400 font-medium">User Rotation Plans</p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
                            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                                <Award size={24} />
                            </div>
                            <span className="text-3xl font-extrabold text-white">{stats?.totalQuizAttempts || 0}</span>
                            <p className="text-xs text-slate-400 font-medium">Quiz Submissions</p>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: CROPS MANAGEMENT */}
            {activeTab === 'crops' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">Crop Database Records ({crops.length})</h3>
                        <button
                            onClick={() => setShowCropModal(true)}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                        >
                            <Plus size={16} /> Add New Crop
                        </button>
                    </div>

                    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase">
                                <tr>
                                    <th className="p-4">Crop Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Season</th>
                                    <th className="p-4">Water</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {crops.map((c) => (
                                    <tr key={c._id} className="hover:bg-slate-900/60">
                                        <td className="p-4 font-bold text-white flex items-center gap-2">
                                            <img src={c.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                            {c.name}
                                        </td>
                                        <td className="p-4 text-slate-300">{c.category}</td>
                                        <td className="p-4 text-slate-300">{c.season}</td>
                                        <td className="p-4 text-slate-300">{c.waterRequirement}</td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDeleteCrop(c._id)}
                                                className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/20"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 3: RESOURCES MANAGEMENT */}
            {activeTab === 'resources' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">Educational Resources ({resources.length})</h3>
                        <button
                            onClick={() => setShowResourceModal(true)}
                            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                        >
                            <Plus size={16} /> Add Article Resource
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.map((r) => (
                            <div key={r._id} className="glass-card p-4 rounded-2xl border border-slate-800 flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-teal-400 uppercase">{r.category}</span>
                                    <h4 className="font-bold text-white text-sm">{r.title}</h4>
                                    <p className="text-xs text-slate-400 line-clamp-2">{r.description}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteResource(r._id)}
                                    className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/20 shrink-0"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 4: QUIZ QUESTIONS MANAGEMENT */}
            {activeTab === 'quiz' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">Question Bank ({questions.length})</h3>
                        <button
                            onClick={() => setShowQuestionModal(true)}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                        >
                            <Plus size={16} /> Add Quiz Question
                        </button>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, i) => (
                            <div key={q._id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 relative">
                                <div className="flex items-start justify-between">
                                    <h4 className="font-bold text-white text-sm">
                                        {i + 1}. {q.question}
                                    </h4>
                                    <button
                                        onClick={() => handleDeleteQuestion(q._id)}
                                        className="p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                                    {q.options.map((opt, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-2 rounded-lg ${idx === q.correctOption ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'bg-slate-900'
                                                }`}
                                        >
                                            {String.fromCharCode(65 + idx)}. {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 5: USER FEEDBACKS */}
            {activeTab === 'feedback' && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Community Feedback ({feedbacks.length})</h3>
                    <div className="space-y-4">
                        {feedbacks.map((f) => (
                            <div key={f._id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{f.name}</h4>
                                        <span className="text-xs text-slate-400">{f.email} • Category: {f.userType}</span>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                                        ★ {f.rating} / 5
                                    </span>
                                </div>
                                <p className="text-xs text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                                    "{f.message}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ADD CROP MODAL */}
            {showCropModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="glass-panel max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 p-6 space-y-4 relative">
                        <button onClick={() => setShowCropModal(false)} className="absolute top-4 right-4 text-slate-400">
                            <X size={20} />
                        </button>
                        <h3 className="font-bold text-white text-lg">Add New Crop Record</h3>
                        <form onSubmit={handleAddCropSubmit} className="space-y-3 text-xs">
                            <input
                                type="text"
                                placeholder="Crop Name (e.g. Mustard)"
                                value={newCrop.name}
                                onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                                required
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={newCrop.category}
                                    onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
                                    className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                                >
                                    <option value="Cereal">Cereal</option>
                                    <option value="Legume">Legume</option>
                                    <option value="Pulse">Pulse</option>
                                    <option value="Oilseed">Oilseed</option>
                                    <option value="Cash Crop">Cash Crop</option>
                                    <option value="Vegetable">Vegetable</option>
                                </select>
                                <select
                                    value={newCrop.season}
                                    onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
                                    className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                                >
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                    <option value="Zaid">Zaid</option>
                                    <option value="All-Season">All-Season</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Crop Description..."
                                value={newCrop.description}
                                onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                            />
                            <textarea
                                placeholder="Nutrient Characteristics (e.g. High Nitrogen Fixer)..."
                                value={newCrop.nutrientCharacteristics}
                                onChange={(e) => setNewCrop({ ...newCrop, nutrientCharacteristics: e.target.value })}
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Suitable Following Crops (comma separated, e.g. Wheat, Barley)"
                                value={newCrop.suitableFollowingCrops}
                                onChange={(e) => setNewCrop({ ...newCrop, suitableFollowingCrops: e.target.value })}
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                            />
                            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                                Save Crop to Database
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
