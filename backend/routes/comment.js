const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

// Create a new comment on a specific post
router.post('/:postId/comments', commentController.createCommentOnPost);

// Get all comments for a specific post
router.get('/:postId/allcomments', commentController.getAllCommentsForPost);

router.post('/posts/:postId/comments/:commentId/replies', commentController.addReplyToComment);

// like
router.post('/comments/:commentId/like', commentController.likeComment)

router.post('/comments/:commentId/replies/:replyId/like', commentController.likeComment);

// // Get comment by ID
// router.get('/comments/:id', commentController.getCommentById);

// // Update comment
// router.put('/comments/:id', commentController.updateComment);

// // Delete comment
// router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
