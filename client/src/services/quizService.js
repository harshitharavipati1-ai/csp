import API from './api';

export const getQuizQuestions = async () => {
    const response = await API.get('/quiz/questions');
    return response.data;
};

export const submitQuiz = async (submissionData) => {
    const response = await API.post('/quiz/submit', submissionData);
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await API.get('/quiz/leaderboard');
    return response.data;
};

export const createQuizQuestion = async (questionData) => {
    const response = await API.post('/quiz/questions', questionData);
    return response.data;
};

export const updateQuizQuestion = async (id, questionData) => {
    const response = await API.put(`/quiz/questions/${id}`, questionData);
    return response.data;
};

export const deleteQuizQuestion = async (id) => {
    const response = await API.delete(`/quiz/questions/${id}`);
    return response.data;
};

export const getQuizResults = async () => {
    const response = await API.get('/quiz/results');
    return response.data;
};

