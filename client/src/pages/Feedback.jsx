import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import { useAuth } from '../hooks/useAuth';
import { MessageSquare, Star, Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const Feedback = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        userType: user?.userType || 'Farmer',
        message: '',
        rating: 5,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (stars) => {
        setFormData({ ...formData, rating: stars });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required feedback fields.');
            setLoading(false);
            return;
        }

        try {
            const res = await submitFeedback(formData);
            if (res.success) {
                setSuccess('Thank you for your valuable feedback! 🌱');
                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    userType: user?.userType || 'Farmer',
                    message: '',
                    rating: 5,
                });
            } else {
                setError(res.message || 'Failed to submit feedback');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <MessageSquare size={14} /> Community Feedback
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    User <span className="gradient-text-emerald">Feedback</span>
                </h1>
                <p className="text-slate-300 text-sm">
                    We value your suggestions! Let us know how CropCycle can better serve farmers, students, and researchers.
                </p>
            </div>

            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
                {success && (
                    <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
                        <CheckCircle size={20} />
                        {success}
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="font-bold text-slate-300 block mb-1.5">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="font-bold text-slate-300 block mb-1.5">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">I am a *</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                        >
                            <option value="Farmer">Farmer</option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher / Researcher</option>
                            <option value="Agriculture Enthusiast">Agriculture Enthusiast</option>
                        </select>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="font-bold text-slate-300 block mb-2">Platform Rating *</label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => handleRatingChange(star)}
                                    className={`p-2 rounded-xl transition-all ${formData.rating >= star
                                            ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                                            : 'text-slate-600 bg-slate-900 border border-slate-800'
                                        }`}
                                >
                                    <Star size={24} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                                </button>
                            ))}
                            <span className="text-xs font-bold text-amber-300 ml-2">
                                {formData.rating} / 5 Stars
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">Feedback Message *</label>
                        <textarea
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Share your thoughts, suggestions, or crop rotation experiences..."
                            required
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <RefreshCw className="animate-spin" size={18} />
                        ) : (
                            <>
                                <Send size={18} />
                                Submit Feedback
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
