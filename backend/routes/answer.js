const express = require('express');
const router = express.Router();
const answersController = require('../controllers/answersController');

// Route to submit an answer
router.post('/submit', answersController.submitAnswer);

// Other routes can be defined here

module.exports = router;
