import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldAlert, Sprout } from 'lucide-react';

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Sprout className="w-10 h-10 text-emerald-400 animate-bounce" />
                <p className="text-slate-400 text-sm animate-pulse">Verifying Admin privileges...</p>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return (
            <div className="max-w-xl mx-auto my-16 p-8 glass-panel border-red-500/30 text-center rounded-2xl">
                <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldAlert size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
                <p className="text-slate-400 mb-6">
                    This panel is reserved exclusively for system administrators. Please sign in with administrator credentials.
                </p>
                <Navigate to="/dashboard" replace />
            </div>
        );
    }

    return children;
};

export default AdminRoute;
