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
  
  exports.getAllCommentsForPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.find({ post: postId }).populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name avatar' // Assuming you want to populate author's name and avatar for replies
        }
      }).populate('author', 'name avatar'); // Populate author field with name and avatar for comments
      res.status(200).json({ success: true, data: comments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
};

  exports.addReplyToComment = async (req, res) => {
    try {
        const { text, author } = req.body;
        const commentId = req.params.commentId; // Assuming you pass the commentId in the URL
        const newReply = { text, author };
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: newReply } },
            { new: true }
        );
        res.status(201).json({ success: true, data: updatedComment });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};