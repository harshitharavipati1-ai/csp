import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: [
            {
                type: String,
                required: true,
            },
        ],
        correctAnswer: {
            type: Number,
            required: true, // 0-based index of correct option
        },
        explanation: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium',
        },
    },
    {
        timestamps: true,
    }
);

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);
export default QuizQuestion;
