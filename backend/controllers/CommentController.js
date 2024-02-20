const Comment = require('../models/comment');

exports.createCommentOnPost = async (req, res) => {
    try {
      const postId = req.params.postId; 
      const { text, author } = req.body;
      const newComment = await Comment.create({ text, author, post: postId }); 
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
          select: 'name avatar'
        }
      }).populate('author', 'name avatar'); 
      res.status(200).json({ success: true, data: comments });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
};
  exports.addReplyToComment = async (req, res) => {
    try {
        const { text, author } = req.body;
        const commentId = req.params.commentId; 
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
exports.likeComment = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const { userId } = req.body;

    let updatedComment;

    if (replyId) {
      updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, 'replies._id': replyId }, 
        { $addToSet: { 'replies.$.likes': userId } }, 
        { new: true }
      );
    } else {
      updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }

    res.status(200).json({ success: true, data: updatedComment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

