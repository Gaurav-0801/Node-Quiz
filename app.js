// Import required modules
const express = require('express');
const quizRoutes = require('./routes/quizRoutes');

// Create an Express application
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' folder

// Define routes
app.use('/quiz', quizRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
