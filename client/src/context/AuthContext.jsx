import React, { createContext, useState, useEffect } from 'react';
import { loginUser as loginApi, registerUser as registerApi, getMe } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('cropcycle_token');
            if (token) {
                try {
                    const res = await getMe();
                    if (res.success) {
                        setUser(res.data);
                        if (res.data.preferredLanguage) {
                            localStorage.setItem('cropcycle_lang', res.data.preferredLanguage);
                        }
                    }
                } catch (error) {
                    console.error('Failed to verify stored token:', error);
                    localStorage.removeItem('cropcycle_token');
                    localStorage.removeItem('cropcycle_user');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        const res = await loginApi(credentials);
        if (res.success && res.data.token) {
            localStorage.setItem('cropcycle_token', res.data.token);
            localStorage.setItem('cropcycle_user', JSON.stringify(res.data));
            if (res.data.preferredLanguage) {
                localStorage.setItem('cropcycle_lang', res.data.preferredLanguage);
            }
            setUser(res.data);
        }
        return res;
    };

    const register = async (userData) => {
        const res = await registerApi(userData);
        if (res.success && res.data.token) {
            localStorage.setItem('cropcycle_token', res.data.token);
            localStorage.setItem('cropcycle_user', JSON.stringify(res.data));
            if (res.data.preferredLanguage) {
                localStorage.setItem('cropcycle_lang', res.data.preferredLanguage);
            }
            setUser(res.data);
        }
        return res;
    };

    const logout = () => {
        localStorage.removeItem('cropcycle_token');
        localStorage.removeItem('cropcycle_user');
        setUser(null);
    };

    const updateUserState = (updatedUser) => {
        setUser((prev) => ({ ...prev, ...updatedUser }));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                updateUserState,
                isAdmin: user?.role === 'admin',
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
