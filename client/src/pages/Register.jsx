import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, Mail, Lock, UserCheck, AlertCircle, RefreshCw } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'Farmer',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userTypes = ['Farmer', 'Student', 'Teacher', 'Agriculture Enthusiast'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const res = await register(formData);
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.message || 'Registration failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                        <Sprout size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-xs text-slate-400">Join CropCycle Awareness Platform</p>
                </div>

                {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">Full Name *</label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ramesh Patel"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">Email Address *</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">User Type *</label>
                        <div className="relative">
                            <UserCheck className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                            <select
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            >
                                {userTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="font-bold text-slate-300 block mb-1.5">Password *</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="At least 6 characters"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sprout size={18} />}
                        Create Free Account
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400 pt-2">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-400 font-bold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
