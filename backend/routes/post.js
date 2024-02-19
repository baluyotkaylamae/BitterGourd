const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Post = require('../models/Post');

const {
  newPost,
  updatePost,
  deletePost,
  getPosts,
  getAdminPost,
  getSinglePost,
  getPostById,
  getRecentPosts,
  likePost,
  unlikePost
} = require('../controllers/PostController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/posts', getPosts);
// router.get('/recent-posts', getRecentPosts);


router.get('/posts/:id', getSinglePost);
router.get('/post/:id', getPostById);
// Route for liking a post
router.post('/posts/:postId/like', likePost);

// Route for unliking a post
router.post('/posts/:postId/unlike',unlikePost);

//admin
router.put('/admin/update/post/:id', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'),updatePost);
router.delete('/admin/delete/post/:id',  deletePost);
router.post('/admin/post/new', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'), newPost);
router.get('/admin/post', isAuthenticatedUser, authorizeRoles("admin"), getAdminPost);

module.exports = router;