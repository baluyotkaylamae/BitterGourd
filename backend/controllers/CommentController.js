const Comment = require('../models/comment');

// Create a new comment on a specific post
exports.createCommentOnPost = async (req, res) => {
    try {
      const postId = req.params.postId; // Corrected to req.params.postId
      const { text, author } = req.body;
      const newComment = await Comment.create({ text, author, post: postId }); // Updated to pass postId as post
      res.status(201).json({ success: true, data: newComment });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  };
  
  // Get all comments for a specific post
  exports.getAllCommentsForPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.find({ post: postId }).populate('author', 'name'); // Populate author field with name 
      res.status(200).json({ success: true, data: comments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  