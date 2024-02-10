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
} = require('../controllers/PostController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/posts', async (req, res) => {
    const { category } = req.query;
    console.log('Category:', category); // Add this line for debugging
    try {
      let posts;
      if (category) {
        posts = await Post.find({ category }); // Filter posts by category
      } else {
        posts = await Post.find(); 
      }
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.get('/posts/:id', getSinglePost);
router.get('/post/:id', getPostById);


//admin
router.put('/admin/update/post/:id', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'),updatePost);
router.delete('/admin/delete/post/:id',  deletePost);
router.post('/admin/post/new', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'), newPost);
router.get('/admin/post', isAuthenticatedUser, authorizeRoles("admin"), getAdminPost);

module.exports = router;