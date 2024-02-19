// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter Post Title."]
//   },
//   description: {
//     type: String,
//     required: [true, "Enter enter Description."]
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: [true, "Please select a category."]
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//         required: true,
//       },
//       url: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   dateCreated: {
//     type: Date,
//     // default: Date.now
//   },
//   dateUpdated: {
//     type: Date,
//     // default: Date.now
//   }
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Post Title."]
  },
  description: {
    type: String,
    required: [true, "Enter enter Description."]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "Please select a category."]
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model for storing user details
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
