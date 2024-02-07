// Import necessary modules
const Answer = require('../models/Answer'); // Import your Answer model
const { validationResult } = require('express-validator');

// Controller methods
const answersController = {
  // Controller method to handle answer submission
  submitAnswer: async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new answer document
      const newAnswer = new Answer({
        questionId: req.body.questionId,
        userId: req.user.id, // Assuming user is authenticated and user ID is available in the request
        answer: req.body.answer,
      });

      // Save the answer to the database
      await newAnswer.save();

      // Return success response
      res.status(201).json({ message: 'Answer submitted successfully' });
    } catch (error) {
      console.error('Error submitting answer:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

};

// Export the controller
module.exports = answersController;
