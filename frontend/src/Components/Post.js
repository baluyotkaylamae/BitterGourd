import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThumbUp as ThumbUpIcon, ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material'; // Import MUI icons
import { Button, IconButton } from '@mui/material'; // Import MUI button components
import './post2.css';

const Post = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

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
        };
        fetchPosts();
    }, []);
    
    const handleReaction = () => {
        // Add logic to handle reaction
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
                                        <div>Comments: {post.commentsCount}</div> {/* Display comments count */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleReaction}
                                            startIcon={<ThumbUpIcon />}
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
