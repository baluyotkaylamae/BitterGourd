
const Answer = require('../models/Answer'); 
const { validationResult } = require('express-validator');


const answersController = {

  submitAnswer: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    
      const newAnswer = new Answer({
        questionId: req.body.questionId,
        userId: req.user.id, 
        answer: req.body.answer,
      });

      
      await newAnswer.save();

      res.status(201).json({ message: 'Answer submitted successfully' });
    } catch (error) {
      console.error('Error submitting answer:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

};

module.exports = answersController;
