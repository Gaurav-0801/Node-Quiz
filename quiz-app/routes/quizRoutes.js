const express = require('express');
const router = express.Router();
const fs = require('fs'); // For reading JSON file

// Load quiz questions from JSON file
const questions = JSON.parse(fs.readFileSync('./data/questions.json', 'utf-8'));

// Endpoint to get a random question
router.get('/question', (req, res) => {
    // Logic to get a random question
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    
    res.json(randomQuestion);
});

// Endpoint to submit an answer
router.post('/submit', (req, res) => {
    const { questionId, selectedOption } = req.body; // Assuming form data is sent in request body
    
    // Find the question by id
    const question = questions.find(q => q.id === questionId);
    if (!question) {
        return res.status(404).json({ error: 'Question not found' });
    }

    // Check if the selected option is correct
    const isCorrect = question.correctOption === selectedOption;

    // Send response with correctness of answer and correct option
    res.json({ correct: isCorrect, correctOption: question.correctOption });
});

module.exports = router;
