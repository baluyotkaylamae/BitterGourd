const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const forumController = require('../controllers/ForumController');
const {isAuthenticatedUser} = require('../middlewares/auth')


router.get('/forum', forumController.getAllForum);
router.delete('/forum/:id', forumController.deleteForum);
router.post('/create-topic', upload.single('image'), isAuthenticatedUser, forumController.createForumPost);
router.get('/topics', isAuthenticatedUser, forumController.getAllForumPosts);
router.get('/topic/:id', isAuthenticatedUser,forumController.getForumPostById);
router.put('/topic/:id', isAuthenticatedUser, upload.single('image'), forumController.updateForumPostById);
router.delete('/topic/:id', isAuthenticatedUser, forumController.deleteForumPostById);
router.get('/forums/categorize/', isAuthenticatedUser, forumController.categorizeTopics)

router.post('/CreateComment/:id', isAuthenticatedUser, forumController.CreateComment)
router.put('/CommentUpdate', isAuthenticatedUser, forumController.CommentUpdate)
router.delete('/DeleteComment', isAuthenticatedUser, forumController.deleteComment)

router.post('/ReplyComment', isAuthenticatedUser, forumController.ReplyCreate)
router.put('/EditReply', isAuthenticatedUser, forumController.editRepliedComment)
router.delete('/DeleteReply', isAuthenticatedUser, forumController.deleteRepliedComment)

module.exports = router;
