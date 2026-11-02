import React, { useState, useEffect } from 'react';
import { getQuizQuestions, submitQuiz } from '../services/quizService';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
    Award,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Trophy,
    ArrowRight,
    RefreshCw,
    Sparkles,
    BookOpen,
} from 'lucide-react';

const Quiz = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: selectedIndex }
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const res = await getQuizQuestions();
            if (res.success) {
                setQuestions(res.data);
            }
        } catch (err) {
            console.error('Error fetching quiz questions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectOption = (questionId, optionIdx) => {
        if (quizSubmitted) return;
        setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIdx });
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
    };

    const handlePrev = () => {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!user) {
            alert('Please log in to submit your quiz and record your score on the Leaderboard!');
            navigate('/login', { state: { from: { pathname: '/quiz' } } });
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const formattedAnswers = Object.entries(selectedAnswers).map(([qId, optIdx]) => ({
                questionId: qId,
                selectedOption: optIdx,
            }));

            const res = await submitQuiz({ answers: formattedAnswers });
            if (res.success) {
                setResultData(res.data);
                setQuizSubmitted(true);
            } else {
                setError(res.message || 'Failed to calculate score');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting quiz');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRestart = () => {
        setSelectedAnswers({});
        setQuizSubmitted(false);
        setResultData(null);
        setCurrentIdx(0);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
                    <Award size={14} /> Agronomical Knowledge Assessment
                </span>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                    Crop Rotation <span className="gradient-text-emerald">Quiz</span>
                </h1>
                <p className="text-slate-300 text-sm">
                    Test your understanding of crop rotation, nitrogen fixation, root depth dynamics, and pest cycles.
                </p>
            </div>

            {loading ? (
                <div className="py-20 text-center space-y-3">
                    <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
                    <p className="text-slate-400 text-sm">Loading quiz questions...</p>
                </div>
            ) : quizSubmitted && resultData ? (
                /* QUIZ RESULTS SCREEN */
                <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 space-y-8 animate-in fade-in duration-300">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 text-4xl shadow-xl shadow-emerald-500/10">
                            🏆
                        </div>
                        <h2 className="text-3xl font-extrabold text-white">Quiz Completed</h2>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
                            <div className="p-4 rounded-2xl glass-card border-slate-800">
                                <span className="text-xs text-slate-400 block">Score</span>
                                <span className="text-2xl font-extrabold text-emerald-400">
                                    {resultData.score} / {resultData.totalQuestions}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl glass-card border-slate-800">
                                <span className="text-xs text-slate-400 block">Percentage</span>
                                <span className="text-2xl font-extrabold text-teal-400">
                                    {resultData.percentage}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Question Review */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                        <h3 className="font-bold text-white text-lg">Answer Explanations</h3>
                        {resultData.results.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-5 rounded-2xl glass-card border ${item.isCorrect ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-red-500/30 bg-red-950/20'
                                    } space-y-2`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h4 className="font-bold text-white text-sm">
                                        {idx + 1}. {item.question}
                                    </h4>
                                    {item.isCorrect ? (
                                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">
                                            ✓ Correct
                                        </span>
                                    ) : (
                                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/20 text-red-300 shrink-0">
                                            ✗ Incorrect
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed italic pt-1">
                                    💡 <strong>Explanation:</strong> {item.explanation}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={handleRestart}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                        >
                            Retake Quiz
                        </button>
                        <Link
                            to="/leaderboard"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2"
                        >
                            <Trophy size={16} /> View Leaderboard
                        </Link>
                    </div>
                </div>
            ) : questions.length === 0 ? (
                <div className="glass-panel p-8 text-center rounded-3xl border border-slate-800 space-y-3">
                    <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="font-bold text-white">No Quiz Questions Available</h3>
                </div>
            ) : (
                /* ACTIVE QUESTION CARD */
                <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
                    {/* Question Progress Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <span className="text-xs font-bold text-emerald-400">
                            Question {currentIdx + 1} of {questions.length}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300">
                            Difficulty: {questions[currentIdx].difficulty || 'Medium'}
                        </span>
                    </div>

                    {/* Question Text */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {questions[currentIdx].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                        {questions[currentIdx].options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[questions[currentIdx]._id] === optIdx;
                            return (
                                <button
                                    key={optIdx}
                                    onClick={() => handleSelectOption(questions[currentIdx]._id, optIdx)}
                                    className={`w-full p-4 rounded-2xl text-left font-medium text-sm transition-all flex items-center justify-between border ${isSelected
                                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-md'
                                            : 'border-slate-800 glass-card text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                                }`}
                                        >
                                            {String.fromCharCode(65 + optIdx)}
                                        </span>
                                        {opt}
                                    </span>
                                    {isSelected && <CheckCircle2 size={18} className="text-emerald-400" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <button
                            onClick={handlePrev}
                            disabled={currentIdx === 0}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {currentIdx < questions.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                            >
                                Next Question
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmitQuiz}
                                disabled={submitting}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg flex items-center gap-2"
                            >
                                {submitting && <RefreshCw size={14} className="animate-spin" />}
                                Submit Quiz Answers
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
