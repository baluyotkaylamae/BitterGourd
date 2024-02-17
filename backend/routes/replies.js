const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');


// Define route for adding replies to comments
router.post('/posts/:postId/comments/:commentId/replies', commentController.addReplyToComment);

module.exports = router;