const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

// Create a new comment on a specific post
router.post('/:postId/comments', commentController.createCommentOnPost);

// Get all comments for a specific post
router.get('/:postId/allcomments', commentController.getAllCommentsForPost);

// // Get comment by ID
// router.get('/comments/:id', commentController.getCommentById);

// // Update comment
// router.put('/comments/:id', commentController.updateComment);

// // Delete comment
// router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
