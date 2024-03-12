import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './post.css'; // Import the CSS file for PostDetails component
import { getUser } from '../utils/helpers';
import ReplyIcon from '@mui/icons-material/Reply';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { filterComment } from './Filter';

// import { Dialog } from '@mui/material';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [data, setComments] = useState([]);
    const currentUser = getUser();
    const [showAllComments, setShowAllComments] = useState(false);
    const [replyModalVisible, setReplyModalVisible] = useState(false); // State to track modal visibility
    const [replyText, setReplyText] = useState(''); // State to track reply text
    const [selectedCommentId, setSelectedCommentId] = useState(null); // State to track the selected comment for replying
    const [replyTextAreaVisible, setReplyTextAreaVisible] = useState(false); // State to track reply textarea visibility
    const [visibleReplies, setVisibleReplies] = useState({}); // State to track visibility of replies
    const [commentLikes, setCommentLikes] = useState({}); // State to track likes for each comment
    const [likedComments, setLikedComments] = useState({});
    const [likedReplies, setLikedReplies] = useState({});
    const [replyLikes, setReplyLikes] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const initialCommentsToShow = showAllComments ? data : data.slice(0, 3);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/api/posts/${postId}`);
                setPost(response.data.post);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
        fetchComments(); // Call fetchComments here to load comments initially
    }, [postId]);

    // fetch comment
    // const fetchComments = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:4001/api/${postId}/allcomments`);
    //         setComments(response.data.data);

    //         const commentsWithLikes = response.data.data.map(comment => ({
    //             ...comment,
    //             likesCount: comment.likes.length // Assuming 'likes' is an array of user IDs who liked the comment
    //         }));
    //         setComments(commentsWithLikes);

    //         const initialLikedComments = response.data.data.reduce((acc, comment) => {
    //             const currentUserLiked = comment.likes.some(like => like === currentUser._id);
    //             return {
    //                 ...acc,
    //                 [comment._id]: currentUserLiked
    //             };
    //         }, {});
    //         setLikedComments(initialLikedComments);

    //         const initialLikedReplies = response.data.data.reduce((acc, comment) => {
    //             const likedReplies = comment.replies.reduce((liked, reply) => {
    //                 liked[reply._id] = reply.likes.includes(currentUser._id);
    //                 return liked;
    //             }, {});
    //             return {
    //                 ...acc,
    //                 ...likedReplies
    //             };
    //         }, {});
    //         setLikedReplies(initialLikedReplies);

    //         const updatedComments = response.data.data.map(comment => ({
    //             ...comment,
    //             replies: comment.replies.map(reply => ({
    //                 ...reply,
    //                 likesCount: reply.likes.length
    //             }))
    //         }));
    //         setComments(updatedComments);

    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //     }
    // };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/api/${postId}/allcomments`);
            const updatedComments = response.data.data.map(comment => ({
                ...comment,
                likesCount: comment.likes.length, // Update likes count for comments
                replies: comment.replies.map(reply => ({
                    ...reply,
                    likesCount: reply.likes.length // Update likes count for replies
                }))
            }));
            setComments(updatedComments);

            const initialLikedComments = updatedComments.reduce((acc, comment) => {
                const currentUserLiked = comment.likes.some(like => like === currentUser._id);
                return {
                    ...acc,
                    [comment._id]: currentUserLiked
                };
            }, {});
            setLikedComments(initialLikedComments);

            const initialLikedReplies = updatedComments.reduce((acc, comment) => {
                const likedReplies = comment.replies.reduce((liked, reply) => {
                    liked[reply._id] = reply.likes.includes(currentUser._id);
                    return liked;
                }, {});
                return {
                    ...acc,
                    ...likedReplies
                };
            }, {});
            setLikedReplies(initialLikedReplies);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            if (!currentUser) {
                alert('Please log in first.');
                return;
            }

            const filteredComment = filterComment(comment); // Filter the comment
            if (!filteredComment) {
                alert('Comment contains prohibited words.');
                return;
            }

            const newComment = {
                text: filteredComment, // Use the filtered comment
                author: currentUser._id,
                post: postId,
            };
            await axios.post(`http://localhost:4001/api/${postId}/comments`, newComment);
            setComment('');
            fetchComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleReplySubmit = async () => {
        try {
            if (!currentUser) {
                alert('Please log in first.');
                return;
            }

            const filteredReply = filterComment(replyText); // Filter the reply
            if (!filteredReply) {
                alert('Reply contains prohibited words.');
                return;
            }

            const newReply = {
                text: filteredReply, // Use the filtered reply
                author: currentUser._id,
            };
            await axios.post(`http://localhost:4001/api/posts/${postId}/comments/${selectedCommentId}/replies`, newReply);

            setReplyModalVisible(false); // Hide modal after reply submission
            setReplyTextAreaVisible(false); // Hide reply textarea after submission
            fetchComments();
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
        handleMenuClose();
        setReplyTextAreaVisible(false);
    };
    // const handleLike = async (commentId) => {
    //     try {
    //         if (!currentUser) {
    //             alert('Please log in first.');
    //             return;
    //         }

    //         const response = await axios.post(`http://localhost:4001/api/comments/${commentId}/like`, { userId: currentUser._id });
    //         // Update the likes for the specific comment only
    //         setCommentLikes(prevLikes => ({
    //             ...prevLikes,
    //             [commentId]: response.data.data.likes.length
    //         }));
    //     } catch (error) {
    //         console.error('Error liking comment:', error);
    //     }
    // };
    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                alert('Please log in first.');
                return;
            }

            const response = await axios.post(`http://localhost:4001/api/comments/${commentId}/like`, { userId: currentUser._id });

            // Update the likes for the specific comment only
            const updatedLikesCount = response.data.data.likes.length;
            setCommentLikes(prevLikes => ({
                ...prevLikes,
                [commentId]: updatedLikesCount
            }));

            // Check if the current user's ID exists in the list of users who liked the comment
            const currentUserLiked = response.data.data.likes.some(like => like === currentUser._id);

            // Update the liked state for the comment based on whether the current user liked it or not
            setLikedComments(prevLikedComments => ({
                ...prevLikedComments,
                [commentId]: currentUserLiked // Set liked state based on whether the current user liked the comment
            }));

            // Log the updated likedComments state to the console
            console.log('likedComments:', likedComments);

            fetchComments();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleReplyLike = async (commentId, replyId) => {
        try {
            if (!currentUser) {
                alert('Please log in first.');
                return;
            }

            const response = await axios.post(`http://localhost:4001/api/comments/${commentId}/replies/${replyId}/like`, { userId: currentUser._id });

            // Check if the response data contains the updated likes count
            if (response.data.success) {
                const updatedLikesCount = response.data.data.likes.length;

                // Update the likes count for the specific reply
                setReplyLikes(prevLikes => ({
                    ...prevLikes,
                    [replyId]: updatedLikesCount
                }));

                // Check if the current user has liked the reply
                const currentUserLiked = response.data.data.likes.includes(currentUser._id);

                // Update the liked state for the reply
                setLikedReplies(prevLikedReplies => {
                    console.log('Liked replies:', {
                        ...prevLikedReplies,
                        [replyId]: currentUserLiked
                    });
                    return {
                        ...prevLikedReplies,
                        [replyId]: currentUserLiked
                    };
                });
                fetchComments();
                console.log('Liked reply:', likedReplies);
            } else {
                console.error('Failed to like reply:', response.data.error);
            }
        } catch (error) {
            console.error('Error liking reply:', error);
        }
    };


    const openReplyModal = (commentId) => {
        setSelectedCommentId(commentId);
        setReplyModalVisible(true);
        setReplyTextAreaVisible(true); // Show reply textarea when opening modal
    };

    const handleReplyCancel = () => {
        setReplyModalVisible(false); // Hide modal
        // Hide reply textarea
        handleMenuClose();
        setReplyTextAreaVisible(false);
    };

    const toggleRepliesVisibility = (commentId) => {
        setVisibleReplies(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };

    const areRepliesVisible = (commentId) => {
        return visibleReplies[commentId];
    };

    const handleSeeMore = () => {
        setShowAllComments(prevState => !prevState);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    // Function to format date in ISO 8601 format to a readable date and time format
    const formatDateTime = (dateTimeString) => {
        const options = {
            weekday: 'long', // Display the full name of the weekday
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit', // Display hours in 2-digit format
            minute: '2-digit', // Display minutes in 2-digit format
            hour12: true, // Use 12-hour clock format
            timezone: 'UTC'
        };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    const handleDeleteComment = async (commentId) => {
        try {
            console.log('Deleting comment with ID:', commentId); // Log the comment ID
            // Implement deletion logic here, for example:
            await axios.delete(`http://localhost:4001/api/delete/comment/${commentId}`);

            // After deletion, you might want to fetch the updated comments list
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const startEditingComment = (commentId, initialText) => {
        setEditingCommentId(commentId);
        setEditedCommentText(initialText);
    };

    // Function to cancel editing a comment
    const cancelEditingComment = () => {
        setEditingCommentId(null);
        setEditedCommentText('');
    };

    // Function to save edited comment
    const saveEditedComment = async (commentId) => {
        try {
            // Implement logic to update the comment on the backend
            await axios.put(`http://localhost:4001/api/update/comment/${commentId}`, { text: editedCommentText });

            // Fetch updated comments after saving edit
            fetchComments();

            // Reset editing state
            setEditingCommentId(null);
            setEditedCommentText('');
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const toggleOptions = () => {
        setShowOptions(prevState => !prevState);
    };

    const handleMenuOpen = (event, commentId) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedCommentId(commentId);
    };

    // Function to close the menu
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedCommentId(null);
    };


    return (
        <div className="container mt-4 post-details-container">
            <h1 style={{ textAlign: 'center' }}>{post.name}</h1>
            <img
                src={post.images[0].url}
                alt={post.name}
                className="post-image"
                style={{ width: '750px', height: '500px' }}
            />
            <p style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'italic', marginTop: '10px' }}>
                Date Created: {formatDateTime(post.dateCreated)}
            </p>
            <p style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'italic' }}>
                Last Updated: {formatDateTime(post.dateUpdated)}
            </p>
            {post.description.split(/\n/).map((part, index) => {
                // If the part contains a number followed by a period
                if (/^\d+\.\s*/.test(part)) {
                    return (
                        <p key={index} style={{ textAlign: 'justify', fontSize: '20px' }}>
                            {part}
                        </p>
                    );
                } else {
                    return (
                        <p key={index} style={{ textAlign: 'justify', textIndent: '1em', fontSize: '20px' }}>
                            {part.trim()}
                        </p>
                    );
                }
            })}

            {/* Comment Section */}
            <div className="comment-section" style={{ textAlign: 'center' }}>
                <h3>Comments</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleCommentChange}
                        rows="4"
                        cols="50"
                        style={{
                            marginRight: '10px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            resize: 'vertical',
                            fontSize: '16px'
                        }}
                    ></textarea>
                    <button onClick={handleCommentSubmit}>Submit</button>
                </div>
            </div>

            <section >
                <div className="container my-4 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                            <div className="card">
                                <div className="card-body p-9">
                                    <h4 className="text-center mb-4 pb-2">Comment Section</h4>
                                    <div className="comments-list">
                                        {initialCommentsToShow.map(comment => (
                                            <div key={comment._id} className="comment">
                                                <div className="d-flex flex-start">
                                                    <img src={comment.author.avatar.url} alt="Avatar" className="rounded-circle shadow-1-strong me-3" width="65" height="65" />
                                                    <div className="flex-grow-1 flex-shrink-1">
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p className="mb-1">{comment.author.name} <span className="small">- {formatDateTime(comment.dateCreated)}</span></p>
                                                                <a href="#!" onClick={() => openReplyModal(comment._id)}>
                                                                    <ReplyIcon fontSize="smallrep" />
                                                                </a>
                                                                {currentUser && comment.author._id === currentUser._id && !replyTextAreaVisible && (
                                                                    <div>
                                                                        <IconButton onClick={(event) => handleMenuOpen(event, comment._id)}>
                                                                            <MoreHorizIcon />
                                                                        </IconButton>
                                                                        <Menu
                                                                            anchorEl={menuAnchorEl}
                                                                            open={selectedCommentId === comment._id}
                                                                            onClose={handleMenuClose}
                                                                        >
                                                                            <MenuItem onClick={() => { handleMenuClose(); startEditingComment(comment._id, comment.text); }}>
                                                                                <EditIcon /> Edit
                                                                            </MenuItem>
                                                                            <MenuItem onClick={() => { handleMenuClose(); handleDeleteComment(comment._id); }}>
                                                                                <DeleteIcon /> Delete
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="mb-3">
                                                                {/* Render edit form if the comment is being edited */}
                                                                {editingCommentId === comment._id ? (
                                                                    <div>
                                                                        <textarea
                                                                            value={editedCommentText}
                                                                            onChange={(e) => setEditedCommentText(e.target.value)}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100px',
                                                                                padding: '10px',
                                                                                marginBottom: '10px',
                                                                                borderRadius: '5px',
                                                                                border: '1px solid #ccc'
                                                                            }}
                                                                        />
                                                                        <button className="save-button" onClick={() => saveEditedComment(comment._id)}>Save</button>
                                                                        <button className="cancel-button" onClick={cancelEditingComment}>Cancel</button>
                                                                    </div>

                                                                ) : (
                                                                    // Render comment text
                                                                    <p>{comment.text}</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="d-flex   justify-content-between align-items-center">
                                                            <div>
                                                                <p className="small">{comment.likesCount || 0} Likes</p>
                                                            </div>
                                                            <div>
                                                                <IconButton onClick={() => handleLike(comment._id)}>
                                                                    <ThumbUpIcon style={{ color: likedComments[comment._id] ? 'blue' : 'inherit' }} />
                                                                </IconButton>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                {replyTextAreaVisible && selectedCommentId === comment._id && (
                                                    <div className="reply-textarea">
                                                        <textarea
                                                            placeholder="Write a reply..."
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            rows="4"
                                                            cols="50"
                                                            style={{
                                                                marginRight: '10px',
                                                                padding: '8px',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '8px',
                                                                resize: 'vertical',
                                                                fontSize: '16px'
                                                            }}
                                                        ></textarea>
                                                        <button onClick={handleReplyCancel} className="btn btn-danger">Cancel</button>
                                                        <button onClick={handleReplySubmit} className="btn btn-primary" >Submit</button>
                                                    </div>
                                                )}

                                                <div
                                                    className="small"
                                                    style={{
                                                        cursor: 'pointer',
                                                        textDecoration: 'underline',
                                                        color: 'blue',
                                                        marginBottom: '3px',
                                                    }}
                                                    onClick={() => toggleRepliesVisibility(comment._id)}
                                                >
                                                    <p className="mb-3">  {comment.replies.length} {areRepliesVisible(comment._id) ? 'Replies' : 'Replies'}</p>
                                                </div>
                                                {areRepliesVisible(comment._id) && comment.replies.map(reply => (
                                                    <div key={reply._id} className="reply">
                                                        <div className="d-flex flex-start">
                                                            <img src={reply.author.avatar.url} alt="Avatar" className="rounded-circle shadow-1-strong me-3" width="65" height="65" />
                                                            <div className="flex-grow-1 flex-shrink-1">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="mb-1">{reply.author.name} <span className="small">- {formatDateTime(reply.dateCreated)}</span></p>
                                                                </div>
                                                                <p className="mb-3"><p className="small">Replied:</p>{reply.text}</p>
                                                            </div>

                                                            <div className="d-flex   justify-content-between align-items-center">
                                                                <div>
                                                                    <p className="small">{reply.likesCount || 0} Likes</p>
                                                                </div>
                                                                <div>
                                                                    <IconButton onClick={() => handleReplyLike(comment._id, reply._id)}>
                                                                        <ThumbUpIcon style={{ color: likedReplies[reply._id] ? 'blue' : 'inherit' }} />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        {data.length > 3 && (
                                            <p onClick={handleSeeMore}>
                                                {showAllComments ? 'See Less' : 'See More'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PostDetails;
