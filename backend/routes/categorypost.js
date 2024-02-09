
const express = require('express');
const router = express.Router();
const CategorypostController = require('../controllers/CategorypostController');

// Create a new category
router.post('/categories/new', CategorypostController.createCategory);

// Get all categories
router.get('/categories', CategorypostController.getAllCategories);

// Get a category by ID
router.get('/categories/:id', CategorypostController.getCategoryById);

// Update a category by ID
router.put('/categories/:id', CategorypostController.updateCategory);

// Delete a category by ID
router.delete('/categories/:id', CategorypostController.deleteCategory);

module.exports = router;