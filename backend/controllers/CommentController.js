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
// exports.likeComment = async (req, res) => {
//   try {
//     const { commentId } = req.params; // Remove the extra commentId here
//     const { userId } = req.body;
//     const updatedComment = await Comment.findByIdAndUpdate(
//       commentId,
//       { $addToSet: { likes: userId } }, // Add userId to likes array if not already present
//       { new: true }
//     );
//     res.status(200).json({ success: true, data: updatedComment });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };
exports.likeComment = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const { userId } = req.body;

    let updatedComment;

    if (replyId) {
      // If replyId is provided, update the specified reply's likes
      updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, 'replies._id': replyId }, // Find the comment with the given commentId and matching replyId
        { $addToSet: { 'replies.$.likes': userId } }, // Add userId to likes array of the matching reply
        { new: true }
      );
    } else {
      // If no replyId is provided, update the likes of the main comment
      updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } }, // Add userId to likes array if not already present
        { new: true }
      );
    }

    res.status(200).json({ success: true, data: updatedComment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    // Log the commentId being deleted
    console.log('Deleting comment with ID:', commentId);

    // Find the comment by its ID and delete it
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // Log the deleted comment
    console.log('Deleted comment:', deletedComment);

    if (!deletedComment) {
      // If the comment with the given ID doesn't exist, return a 404 Not Found response
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, message: 'Comment deleted successfully', data: deletedComment });
  } catch (error) {
    // If an error occurs during the deletion process, return a 400 Bad Request response
    res.status(400).json({ success: false, message: 'Failed to delete comment', error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  
  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, comment: updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};