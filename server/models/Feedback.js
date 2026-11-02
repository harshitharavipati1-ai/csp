import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        userType: {
            type: String,
            required: [true, 'User type is required'],
            enum: ['Farmer', 'Student', 'Teacher', 'Agriculture Enthusiast'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
