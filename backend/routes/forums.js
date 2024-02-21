const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const forumController = require('../controllers/ForumController');
const {isAuthenticatedUser} = require('../middlewares/auth')

router.post('/create-topic', upload.single('image'), isAuthenticatedUser, forumController.createForumPost);
router.get('/topics', isAuthenticatedUser, forumController.getAllForumPosts);
router.get('/topic/:id', isAuthenticatedUser,forumController.getForumPostById);
router.put('/topic/:id', isAuthenticatedUser, upload.single('image'), forumController.updateForumPostById);
router.delete('/topic/:id', isAuthenticatedUser, forumController.deleteForumPostById);

module.exports = router;
