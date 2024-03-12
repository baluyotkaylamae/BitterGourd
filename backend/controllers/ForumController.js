const Forum = require('../models/forum');
const cloudinary = require('cloudinary');

exports.createForumPost = async (req, res) => {
    try {
        if (req.body.image) {
            const imagePath = req.body.image
            const result = await cloudinary.v2.uploader.upload(`${imagePath}`, {
                folder: 'BitterForum',
                width: 1000,
                crop: "auto",
            });
            req.body.image = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }

        req.body.users = req.user.id;

        const Topic = await Forum.create(req.body);

        if (!Topic) {
            return res.status(400).json({
                success: false,
                message: 'Create topic failed!'
            })
        }
        return res.status(200).json({
            success: true,
            Topic: Topic,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error something went wrong'
        })
    }

}
exports.getAllForum = async (req, res) => {
    try {
        const forum = await Forum.find();
        res.json({ forum });
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve forum' });
    }
};

exports.deleteForum = async (req, res) => {
    try {
        const forum = await Forum.findByIdAndDelete(req.params.id);
        if (!forum) {
            return res.status(404).json({ error: 'Forum not found' });
        }
        res.json({ message: 'Forum deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete forum' });
    }
};

exports.getAllForumPosts = async (req, res) => {
    try {
        let filters = {};
        if (req.query.categories) {
            filters.categories = req.query.categories
        }
        if (req.query.users) {
            filters.users = req.query.users
        }
        let sortOptions = {}
        if (req.query.sortType) {
            if (req.query.sortType === 'RA') {
                sortOptions.updatedAt = -1;
            } else if (req.query.sortType === 'NtO') {
                sortOptions.createdAt = -1;
            } else if (req.query.sortType === 'OtN') {
                sortOptions.createdAt = 1;
            }
        }
        console.log(sortOptions)

        const Topic = await Forum.find(filters)
            .populate('categories')
            .populate({
                path: 'user', // Assuming the field referencing the user in your Forum model is called 'user'
                select: 'name avatar', // Select only necessary fields from the user document
            })
            .sort(sortOptions)

        if (!Topic?.length > 0) {
            return res.status(400).json({
                succes: false,
                message: 'No Topics available'
            })
        }

        res.status(200).json({
            success: true,
            count: Topic.length,
            Topic: Topic,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error something went wrong'
        })
    }
};

exports.getForumPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const Topic = await Forum.findById(id)
            .populate('categories')
            .populate('users')
            // .populate({
            //     path: 'users',
            //     select: 'avatar', // Include profile image in selection
            // })
            .populate({
                path: 'Comments.user',
                ref: 'User'
            })
            .populate({
                path: 'Comments.replies.user',
                ref: 'User',
            })

        const TopicRelated = await Forum.find({
            categories: Topic.categories._id
        }).where({
            _id: {
                $ne: id
            }
        })
        if (!Topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not Found'
            })
        }
        res.status(200).json({
            success: true,
            Topic: Topic,
            TopicRelated: TopicRelated,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error something went wrong'

        })
    }
};

exports.updateForumPostById = async (req, res) => {
    try {
        let Topic = await Forum.findById(req.params.id);
        if (!Topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            })
        }
        if (req.body.image !== '') {
            console.log('retrieve')
            if (Topic.image.public_id) {
                await cloudinary.uploader.destroy(Topic.image.public_id);
            }
            const imagePath = req.body.image

            const result = await cloudinary.v2.uploader.upload(`${imagePath}`, {
                folder: 'BitterForum',
                width: 1000,
                crop: "auto",
            });
            req.body.image = {
                public_id: result.public_id,
                url: result.secure_url
            }
        } else {
            delete req.body.image
        }
        Topic = await Forum.findByIdAndUpdate(req.params.id, req.body);

        res.status(201).json({
            success: true,
            message: 'Topic Updated',
            Topic: Topic,

        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error something went wrong'
        })
    }
};

exports.deleteForumPostById = async (req, res) => {
    try {
        const { id } = req.params

        const Topic = await Forum.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Topic Deleted Successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error something went wrong'
        })
    }

};


exports.CreateComment = async (req, res, next) => {

    try {

        const topicId = req.params.id;
        const userId = req.user._id;

        const Topic = await Forum.findById(topicId);

        if (!Topic) {
            return res.status(404).json({
                success: false,
                message: 'Forum topic not found'
            })
        }

        const newComment = {
            user: userId,
            comment: req.body.comment,
        }

        Topic.Comments.push(newComment);
        Topic.save();

        res.status(201).json({
            success: true,
            message: 'Comment posted',
            Topic: Topic,
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error occured'
        })

    }
}

exports.CommentUpdate = async (req, res, next) => {

    try {

        const { commentId, forumTopicId, comment } = req.body;

        const Topic = await Forum.findById(forumTopicId);

        // finding nemo, joke, finding comment and updating
        Topic.Comments
            .find(comment => comment._id.toString() == commentId)
            .comment = comment;

        Topic.save();

        res.status(200).json({
            success: true,
            Topic: Topic
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error occured'
        })

    }
}

exports.deleteComment = async (req, res, next) => {

    try {

        const { commentId, forumTopicId } = req.query;

        const Topic = await Forum.findById(forumTopicId)

        const updatedComments = Topic
            .Comments.filter(comment => comment._id.toString() !== commentId);

        Topic.Comments = updatedComments;

        Topic.save();

        res.status(200).json({
            success: true,
            message: 'Comment deleted',
            Topic: Topic,
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error occured'
        })

    }

}

exports.ReplyCreate = async (req, res, next) => {

    try {

        const { commentId, forumTopicId, comment } = req.body;

        const Topic = await Forum.findById(forumTopicId); // 1. forum topic

        Topic.Comments
            .find(comment => comment._id.toString() == commentId) // 2. find comment in forum topic
            .replies.push({ // 3. push new comment in replies 
                comment,
                user: req.user._id
            })

        Topic.save(); // 4. saving changes

        res.status(200).json({
            success: true,
            Topic: Topic
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error occured'
        })

    }
}

exports.editRepliedComment = async (req, res, next) => {

    try {

        const { commentId, forumTopicId, comment, replyId } = req.body;

        const Topic = await Forum.findById(forumTopicId);

        if (!Topic) {
            return res.status(404).json({
                success: false,
                message: 'Forum topic not found'
            })
        }

        Topic.Comments
            .find(comment => comment._id.toString() == commentId) // find comment in forum topic
            .replies.find(replyComment => replyComment._id.toString() == replyId) // find reply comment in userComments array
            .comment = comment; // change the replied comment

        Topic.save();

        res.status(200).json({
            success: true,
            Topic: Topic
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error something went wrong'
        })

    }

}

exports.deleteRepliedComment = async (req, res, next) => {

    try {

        const { commentId, forumTopicId, replyId } = req.query;

        const Topic = await Forum.findById(forumTopicId)

        const updatedRepliedComments = Topic
            .Comments.find(comment => comment._id.toString() == commentId)
            .replies.filter(comment => comment._id.toString() !== replyId)

        Topic
            .Comments.find(comment => comment._id.toString() == commentId)
            .replies = updatedRepliedComments;

        Topic.save()

        res.status(200).json({
            success: true,
            message: 'Reply deleted',
            Topic: Topic,
        })

    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Error occured'
        })

    }
}

exports.categorizeTopics = async (req, res, next) => {
    const categorizeForums = await Forum.aggregate([
        {
            $lookup: {
                from: 'categories', // Use the actual name of your categories collection
                localField: 'categories',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $group: {
                _id: '$category._id',
                name: { $first: '$category.name' },
                description: { $first: '$category.description' },
                forums: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                _id: 0,
                categoryId: '$_id',
                name: 1,
                description: 1,
                forums: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        categorizeForums: categorizeForums
    })

}
