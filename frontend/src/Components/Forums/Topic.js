import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Divider, Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getToken, getUser } from '../../utils/helpers';



const SingleTopic = ({ topic, setValue, setTopic, setCategory }) => {

    const [loading, setLoading] = useState();
    // const [placement, setPlacement] = React.useState();
    const [Topic, setForumTopic] = useState({});
    const [TopicRelated, setRelatedTopics] = useState([]);
    const [comment, setComment] = useState('');

    const [isSticky, setIsSticky] = useState(false);
    const [isFloating, setIsFloating] = useState(false);
    const [trigger, setTrigger] = useState(null);
    const boxRef = useRef(null);
    const compRef = useRef()

    const [commentId, setCommentId] = useState(null);
    const [replyId, setReplyId] = useState(null)
    const [proccessType, setProcessType] = useState('');

    const getForumTopic = async (id = null) => {
        setLoading(true)
        if (id) {
            topic = id;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {

            const { data } = await axios.get(`http://localhost:4001/api/topic/${topic}`, config)
            setLoading(false)
            // console.log(data);
            setForumTopic(data.Topic)
            setRelatedTopics(data.TopicRelated)

        } catch (err) {
            console.log(err)
            alert("Error occured")
            setLoading(false)
        }
    }

    const handleProcess = async () => {
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {
            let response
            if (proccessType === 'reply') {

                response = await axios.post(`http://localhost:4001/api/ReplyComment`, {
                    comment,
                    forumTopicId: Topic._id,
                    commentId,
                }, config)

            } else if (proccessType === 'edit-comment') {

                response = await axios.put(`http://localhost:4001/api/CommentUpdate`, {
                    comment,
                    forumTopicId: Topic._id,
                    commentId,
                }, config)

            }

            else if (proccessType === 'edit-reply') {

                response = await axios.put(`http://localhost:4001/api/EditReply`, {
                    comment,
                    forumTopicId: Topic._id,
                    commentId,
                    replyId,
                }, config)

            }

            else {

                response = await axios.post(`http://localhost:4001/api/CreateComment/${Topic._id}`, { comment }, config)

            }
            setLoading(false)

            console.log(response.data)
            getForumTopic()
            setComment('')
            setReplyId(null)
            disSelect()
            setProcessType('')
            setCommentId(null)
        } catch (err) {
            setLoading(false)
            setComment('')
            setReplyId(null)
            disSelect()
            setProcessType('')
            setCommentId(null)
            console.log(err)
            alert("Error occured")
        }
    }

    const handleReply = (id) => {
        setProcessType('reply');
        const comments = document.querySelectorAll('.top-level-comment')
        comments.forEach(commentBox => {
            commentBox.style.backgroundColor = 'transparent'
        });
        const replyComment = document.getElementById(`${id}`)
        replyComment.style.backgroundColor = '#66666620'
        setCommentId(id)
    }

    const disSelect = () => {
        const comments = document.querySelectorAll('.top-level-comment')
        comments.forEach(commentBox => {
            commentBox.style.backgroundColor = 'transparent'
        });
        const repliedComments = document.querySelectorAll('.reply-level')
        repliedComments.forEach(commentBox => {
            commentBox.style.backgroundColor = 'transparent'
        });
        setCommentId(null)
        setProcessType('');
        setComment('')
        setReplyId('')
    }

    const handleEdit = (id) => {

        setProcessType('edit-comment');

        const comments = document.querySelectorAll('.top-level-comment')
        comments.forEach(commentBox => {
            commentBox.style.backgroundColor = 'transparent'
        });

        const replyComment = document.getElementById(`${id}`)
        replyComment.style.backgroundColor = '#66666620'

        const content = document.getElementById(`edit-${id}`)

        setComment(content.textContent)
        setCommentId(id)
    }

    const handleEditReply = (replyId, commentId) => {

        setProcessType('edit-reply');

        const comments = document.querySelectorAll('.reply-level')
        comments.forEach(commentBox => {
            commentBox.style.backgroundColor = 'transparent'
        });

        const replyComment = document.getElementById(`${replyId}`)
        replyComment.style.backgroundColor = '#66666620'

        const content = document.getElementById(`edit-${replyId}`)

        setComment(content.textContent)

        setReplyId(replyId)
        setCommentId(commentId)

    }

    useEffect(() => {
        getForumTopic()
    }, [topic])

    useEffect(() => {
        const handleScroll = () => {
            if (boxRef.current) {
                const { top } = boxRef.current.getBoundingClientRect();
                const refTop = compRef.current.getBoundingClientRect().top;
                setIsSticky(refTop <= 0);
                setIsFloating(refTop <= 0);
                setTrigger(trigger)
                console.log(top)
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [trigger]);

    const deleteTopLevelComment = async (id) => {

        if (window.confirm('Are you sure you want to delete this item?')) {
            setLoading(true)
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            try {

                const { data } = await axios.delete(`http://localhost:4001/api/DeleteComment?forumTopicId=${Topic._id}&commentId=${id}`, config)
                setLoading(false)
                console.log(data)
                getForumTopic()
                setComment('')
                setReplyId(null)
                disSelect()
                setProcessType('')
                setCommentId(null)

            } catch (err) {
                setLoading(false)
                setComment('')
                setComment('')
                setReplyId(null)
                disSelect()
                setProcessType('')
                setCommentId(null)
                console.log(err)
                alert("Error occured")
            }
        } else {

        }
    }

    const deleteReplyLevelComment = async (commentId, replyId) => {

        if (window.confirm('Are you sure you want to delete this item?')) {
            setLoading(true)
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            try {

                const { data } = await axios.delete(`http://localhost:4001/api/DeleteReply?forumTopicId=${Topic._id}&commentId=${commentId}&replyId=${replyId}`, config)
                setLoading(false)
                console.log(data)
                getForumTopic()
                setComment('')
                setReplyId(null)
                disSelect()
                setProcessType('')
                setCommentId(null)

            } catch (err) {
                setLoading(false)
                setComment('')
                setReplyId(null)
                disSelect()
                setProcessType('')
                setCommentId(null)
                setComment('')
                console.log(err)
                alert("Error occured")
            }
        } else {

        }
    }

    const gotoSingleTopic = (id) => {
        setTopic(id)
        getForumTopic(id)
    }

    const goToCategory = (id) => {
        setValue('4');
        setCategory(id);
    }

    return (
        <>
       
            <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Card sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <CardHeader
                      avatar={
                        <Avatar src={Topic?.users && Topic.users.avatar.url} />
                        }
                        title={<Typography fontSize={20}>{Topic?.users?.name}</Typography>}
                        subheader={<Typography fontSize={20}>{new Date(Topic.createdAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}</Typography>}
                    />
                    <CardContent sx={{ px: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {Topic.image && (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                }}
                            >
                                <img
                                    src={Topic.image.url}
                                    alt={Topic.title}
                                    style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'auto' }}
                                />
                            </Box>
                        )}
                        <Typography variant='h4' align='center'> {Topic.title} </Typography>
                        <Typography
                            onClick={() => goToCategory(Topic.category._id)}
                            variant='p' fontSize={20}
                            align='center'
                            sx={{
                                cursor: 'pointer',
                                "&:hover": {
                                    color: "#666666",
                                    cursor: "pointer",
                                },
                            }}
                        >
                            in {Topic.categories?.name}
                        </Typography>

                        <div ref={compRef}></div>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontSize={18}
                            mt={3}
                            align='center'
                            maxWidth={800}
                        >
                            {Topic.content}
                        </Typography>
                    </CardContent>

                    <Box ref={boxRef} position={isSticky ? 'fixed' : (isFloating ? 'absolute' : 'static')} top={isSticky ? '0' : (isFloating ? `${window.scrollY}px` : 'auto')} zIndex={isSticky ? '1100' : 'auto'} bgcolor={'#AAD8DC'} >
                        <Divider sx={{ mx: 2, mt: 3 }} />
                        <Box id='comment-box' sx={{ mx: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minWidth: 800 }}>
                            <Typography sx={{ my: 2 }} fontSize={20}>{Topic.Comments?.length} Comments</Typography>
                            <Box sx={{ border: 1, borderRadius: 2, width: '50%', display: 'flex', borderColor: '#83A6A9' }}>
                                <TextField
                                    onChange={e => setComment(e.target.value)}
                                    value={comment}
                                    placeholder='Add comment' fullWidth sx={{ border: 'none', mr: 'auto', pl: 2, pt: 0.5 }} variant='standard' multiline InputProps={{ disableUnderline: true }} />
                                <IconButton variant='contained'
                                    disabled={comment === ''}
                                    onClick={() => handleProcess()}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                            
                        </Box>
                        <Divider sx={{ mx: 2, }} />
                    </Box>
                    {Topic.Comments && Topic.Comments.map(comment => {
                        return (
                            <>
                                <Box px={2} my={4} display={'flex'} alignItems={'center'} id={comment._id} className='top-level-comment'>
                                    <img src={comment.user.avatar.url} width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                                    <Box ml={2}>
                                        <Typography fontSize={18} color="text.secondary" maxWidth={800}>{comment.user.name}</Typography>
                                        <Typography fontSize={20} maxWidth={800} id={`edit-${comment._id}`}>{comment.comment}</Typography>
                                    </Box>
                                    {comment.user._id === getUser()._id ?
                                        <div>
                                            {commentId && commentId === comment._id && proccessType === 'edit-comment' ?
                                                <IconButton sx={{ mt: 2, ml: 2 }} onClick={() => disSelect()} size='small'>
                                                    <CloseIcon fontSize='medium' />
                                                </IconButton>
                                                :
                                                <IconButton sx={{ mt: 2, ml: 2 }} onClick={() => handleEdit(comment._id)} size='small'>
                                                    <ModeEditIcon fontSize='medium' />
                                                </IconButton>
                                            }
                                        </div> : ""
                                    }
                                    {commentId && commentId === comment._id && proccessType === 'reply' ?
                                        <IconButton sx={{ mt: 2 }} onClick={() => disSelect()} size='small' >
                                            <CloseIcon fontSize='medium' />
                                        </IconButton>
                                        :
                                        <IconButton sx={{ mt: 2 }} onClick={() => handleReply(comment._id)} size='small'>
                                            <ReplyIcon fontSize='medium' />
                                        </IconButton>
                                    }
                                    {comment.user._id === getUser()._id ?
                                        <div>
                                            <IconButton sx={{ mt: 2 }} size='small' onClick={() => deleteTopLevelComment(comment._id)}>
                                                <DeleteIcon fontSize='medium' />
                                            </IconButton>
                                        </div> : ""
                                    }
                                </Box >
                                {comment && comment.replies.map(repliedComment => {
                                    return (
                                        <Box px={2} my={4} display={'flex'} alignItems={'center'} pl={10} className='reply-level' id={repliedComment._id}>
                                            <img src={repliedComment.user.avatar.url} width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                                            <Box ml={2}>
                                                <Typography fontSize={18} color="text.secondary" maxWidth={800}>{repliedComment.user?.name}</Typography>
                                                <Typography fontSize={20} maxWidth={800} id={`edit-${repliedComment._id}`}>{repliedComment.comment}</Typography>
                                            </Box>
                                            {repliedComment.user._id === getUser()._id ?
                                                <>
                                                    {commentId && commentId === comment._id && proccessType === 'edit-reply' && repliedComment._id === replyId ?
                                                        <IconButton sx={{ mt: 2, ml: 2 }} onClick={() => disSelect()} size='small'>
                                                            <CloseIcon fontSize='medium' />
                                                        </IconButton>
                                                        :
                                                        <IconButton sx={{ mt: 2, ml: 2 }} onClick={() => handleEditReply(repliedComment._id, comment._id)} size='small'>
                                                            <ModeEditIcon fontSize='medium' />
                                                        </IconButton>
                                                    }
                                                    <IconButton sx={{ mt: 2 }} onClick={() => deleteReplyLevelComment(comment._id, repliedComment._id)}>
                                                        <DeleteIcon fontSize='medium' />
                                                    </IconButton>
                                                </> : ""
                                            }
                                        </Box>
                                    )
                                })
                                }
                            </>
                        )
                    })}
                </Card>
                <Box p={2} position='sticky'>
                  
                    <Typography variant='h6'>Similar Topics</Typography>
                    <Divider />
                    {TopicRelated?.map(topic => {
                        return (
                            <>
                                <Typography
                                    onClick={() => gotoSingleTopic(topic._id)}
                                    sx={{
                                        my: 1, cursor: 'pointer',
                                        "&:hover": {
                                            color: "#666666",
                                            cursor: "pointer",
                                        },
                                    }}>{topic.title}</Typography>
                                <Divider />
                            </>
                        )
                    })}
                </Box>
            </Container >
        </>
    )
}

export default SingleTopic