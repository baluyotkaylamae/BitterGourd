import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThumbUp as ThumbUpIcon, ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import './post2.css';
import { getUser } from '../utils/helpers';

const Post = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [likeCounts, setLikeCounts] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    const currentUser = getUser();

    


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get('http://localhost:4001/api/posts');
                const postsWithCommentsCount = await Promise.all(postsResponse.data.posts.map(async (post) => {
                    const commentsResponse = await axios.get(`http://localhost:4001/api/${post._id}/allcomments`);
                    return {
                        ...post,
                        commentsCount: commentsResponse.data.data.length
                    };
                }));
                const reversedPosts = postsWithCommentsCount.reverse();
                setPosts(reversedPosts);
                setLoading(false);
                window.scroll({ top: 0, behavior: 'smooth' });
            } catch (error) {
                setError(error);
                setLoading(false);
            }

            const countLikes = () => {
                const likes = {};
                posts.forEach(post => {
                    // Initialize like count for each post to 0
                    likes[post._id] = post.likes ? post.likes.length : 0;
                });
                setLikeCounts(likes);
            };
            countLikes();
        };
        fetchPosts();
    }, [posts]);

    useEffect(() => {
        // Count likes for each post
        const countLikes = () => {
            const likes = {};
            posts.forEach(post => {
                // Initialize like count for each post to 0
                likes[post._id] = post.likes ? post.likes.length : 0;
            });
            setLikeCounts(likes);
        };
        countLikes();
    }, [posts]);

    const handleReaction = async (postId) => {
        try {
            const currentUser = getUser();
            if (!currentUser) {
                alert('Please log in to like the post.');
                return;
            }
            // Perform like operation
            await axios.post(`http://localhost:4001/api/posts/${postId}/like`, { userId: currentUser._id });
            // Fetch updated posts
            const updatedPostsResponse = await axios.get('http://localhost:4001/api/posts');
            const updatedPosts = updatedPostsResponse.data.posts.map(post => ({
                ...post,
                likes: post._id === postId ? (post.likes || []).concat(currentUser._id) : post.likes || []
            }));
            setPosts(updatedPosts);
            // alert('Post liked successfully.');
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>BitterFloral Timeline</h1>
            <div className="post-container">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {posts.length > 0 && (
                    <div className="post-scroll">
                        {posts.map((post) => (
                            <div key={post._id} className="post">
                                <div className="card product-cart-text prodcard-JSON">
                                    <img
                                        src={post.images[0].url}
                                        alt={post.name}
                                        className="card-img-top product-image"
                                    />
                                    <div className="card-body card-des">
                                        <h6 className="card-title card-title-des">
                                            {post.name}
                                        </h6>
                                        <p className="card-text">
                                            {post.description.slice(0, 100) + '...'}
                                            <Link to={`/posts/${post._id}`} className="see-more-link">
                                                See More
                                            </Link>
                                        </p>
                                        <hr />
                                        <div>Comments: {post.commentsCount}</div>
                                        <div>Likes: {likeCounts[post._id] || 0}</div> {/* Display like count */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleReaction(post._id)}
                                            startIcon={<ThumbUpIcon style={{ color: post.likes && post.likes.includes(currentUser._id) ? 'blue' : 'inherit' }} />}
                                        >
                                            Like
                                        </Button>
                                        <IconButton component={Link} to={`/posts/${post._id}`}>
                                            <ChatBubbleOutlineIcon />
                                            <span className="comment-text">Comment</span>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
