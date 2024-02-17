const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter Comment Text."]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: [true, "Please provide the author of the comment."]
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', 
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Assuming you have a User model
    }
  ],
  replies: [
    {
      text: {
        type: String,
        required: [true, "Please enter Reply Text."]
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: [true, "Please provide the author of the reply."]
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User' // Assuming you have a User model
        }
      ],
      dateCreated: {
        type: Date,
        default: Date.now
      }
    }
  ],

  
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
