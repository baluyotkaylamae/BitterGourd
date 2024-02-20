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
            .populate('users')
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
  try{
    const {id} = req.params;

    const Topic = await Forum.findById(id)
    .populate('categories')
    .populate('users')
    .populate({
        path:'Comments.user',
        ref: 'User'
    })
    .populate({
        path: 'Comments.replies.user',
        ref: 'User',
    })

    const TopicRelated = await Forum.find({
        categories: forumTopic.categories._id
    }).where({
        _id:{
            $ne: id
        }
    })
    if (!Topic){
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
  }catch (err){
    console.log(err)
    return res.status(500).json({
        success: false,
        message: 'Error something went wrong'

    })
  }
};

exports.updateForumPostById = async (req, res) => {
   try{
    let Topic = await Forum.findById(req.params.id);
    if(!Topic){
        return res.status(404).json({
            success: false,
            message: 'Topic not found'
        })
    }
    if (req.body.image!== ''){
        console.log('retrieve')
        if (Topic.image.public_id){
            await cloudinary.uploader.destroy(Topic.image.public_id);
        }
        const imagePath = req.body.image

        const result = await cloudinary.v2.uploader.upload(`${imagePath}`,{
            folder:'BitterForum',
            width: 1000,
            crop: "auto",
        });
        req.body.image ={
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
        res.status(200).json ({
            success: true,
            message: 'Topic Deleted Successfully'
        })
    }catch (err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error something went wrong'
        })
    }

};
