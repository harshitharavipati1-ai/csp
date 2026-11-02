import QuizQuestion from '../models/QuizQuestion.js';
import QuizResult from '../models/QuizResult.js';

// @desc    Get all quiz questions
// @route   GET /api/quiz/questions
// @access  Public
export const getQuizQuestions = async (req, res) => {
    try {
        const questions = await QuizQuestion.find({}).sort({ createdAt: 1 });
        res.json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Submit quiz answers and compute score
// @route   POST /api/quiz/submit
// @access  Private
export const submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body; // Array of { questionId, selectedOption }

        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ success: false, message: 'No answers submitted' });
        }

        const allQuestions = await QuizQuestion.find({});
        let score = 0;
        const results = [];

        allQuestions.forEach((q) => {
            const userAns = answers.find((a) => a.questionId.toString() === q._id.toString());
            const selectedOption = userAns ? userAns.selectedOption : null;
            const isCorrect = selectedOption === q.correctAnswer;

            if (isCorrect) score++;

            results.push({
                questionId: q._id,
                question: q.question,
                selectedOption,
                correctAnswer: q.correctAnswer,
                isCorrect,
                explanation: q.explanation,
            });
        });

        const totalQuestions = allQuestions.length;
        const percentage = Math.round((score / totalQuestions) * 100);

        // Save result if user logged in
        let savedResult = null;
        if (req.user) {
            savedResult = await QuizResult.create({
                userId: req.user._id,
                score,
                totalQuestions,
                percentage,
            });
        }

        res.json({
            success: true,
            data: {
                score,
                totalQuestions,
                percentage,
                results,
                resultId: savedResult ? savedResult._id : null,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Quiz Leaderboard (Safe public user stats)
// @route   GET /api/quiz/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
    try {
        // Get highest score per user using aggregation
        const leaderboard = await QuizResult.aggregate([
            {
                $sort: { percentage: -1, score: -1, completedAt: -1 },
            },
            {
                $group: {
                    _id: '$userId',
                    highestScore: { $max: '$score' },
                    totalQuestions: { $first: '$totalQuestions' },
                    percentage: { $max: '$percentage' },
                    lastAttempt: { $first: '$completedAt' },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userInfo',
                },
            },
            {
                $unwind: '$userInfo',
            },
            {
                $project: {
                    _id: 1,
                    name: '$userInfo.name',
                    userType: '$userInfo.userType',
                    score: '$highestScore',
                    totalQuestions: 1,
                    percentage: 1,
                    lastAttempt: 1,
                },
            },
            {
                $sort: { percentage: -1, score: -1 },
            },
            {
                $limit: 20,
            },
        ]);

        res.json({ success: true, count: leaderboard.length, data: leaderboard });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add quiz question (Admin)
// @route   POST /api/quiz/questions
// @access  Private/Admin
export const createQuestion = async (req, res) => {
    try {
        const question = new QuizQuestion(req.body);
        const saved = await question.save();
        res.status(201).json({ success: true, data: saved });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update quiz question (Admin)
// @route   PUT /api/quiz/questions/:id
// @access  Private/Admin
export const updateQuestion = async (req, res) => {
    try {
        const question = await QuizQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        Object.assign(question, req.body);
        const updated = await question.save();
        res.json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete quiz question (Admin)
// @route   DELETE /api/quiz/questions/:id
// @access  Private/Admin
export const deleteQuestion = async (req, res) => {
    try {
        const question = await QuizQuestion.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        await QuizQuestion.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
