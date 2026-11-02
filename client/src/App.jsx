import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import About from './pages/About';
import Benefits from './pages/Benefits';
import CropDatabase from './pages/CropDatabase';
import RotationPlanner from './pages/RotationPlanner';
import MyPlans from './pages/MyPlans';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <LanguageProvider>
                <AuthProvider>
                    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
                        <Navbar />
                        <main className="flex-1">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/benefits" element={<Benefits />} />
                                <Route path="/crops" element={<CropDatabase />} />
                                <Route path="/planner" element={<RotationPlanner />} />
                                <Route path="/quiz" element={<Quiz />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="/resources" element={<Resources />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/feedback" element={<Feedback />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Protected User Routes */}
                                <Route
                                    path="/my-plans"
                                    element={
                                        <ProtectedRoute>
                                            <MyPlans />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Admin Only Routes */}
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminRoute>
                                            <AdminDashboard />
                                        </AdminRoute>
                                    }
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </AuthProvider>
            </LanguageProvider>
        </Router>
    );
}

export default App;
