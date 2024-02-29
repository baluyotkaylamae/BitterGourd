import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThumbUp as ThumbUpIcon, ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import './post2.css';
import { getUser } from '../utils/helpers';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Post = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [likeCounts, setLikeCounts] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    const currentUser = getUser();
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

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

    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            setPage(prevPage => prevPage + 1);
        }

        // Show the scroll button when the user scrolls down a certain distance
        setShowScrollButton(window.pageYOffset > 100);
    };

    const scrollToTop = () => {
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older browsers
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get(`http://localhost:4001/api/posts?page=${page}`);
                const postsWithCommentsCount = await Promise.all(postsResponse.data.posts.map(async (post) => {
                    const commentsResponse = await axios.get(`http://localhost:4001/api/${post._id}/allcomments`);
                    return {
                        ...post,
                        commentsCount: commentsResponse.data.data.length
                    };
                }));
                const reversedPosts = postsWithCommentsCount.reverse();
                setPosts(prevPosts => [...prevPosts, ...reversedPosts]);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [page]);

    function getTimeElapsedString(dateCreated) {
        const currentTime = new Date();
        const createdTime = new Date(dateCreated);
        const timeDifference = Math.abs(currentTime - createdTime);
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else {
            return `${days}d`;
        }
    }


    return (
        <div className="container mt-4">
            {/* <Typography variant="h4" component="h1" className='prod-t'>
                BitterFloral Timeline
            </Typography> */}

            <div className="post-container" onScroll={handleScroll} ref={containerRef}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                <div className="post-scroll">
                    {posts.map((post) => (
                        <div key={post._id} className="post">
                            <div className="card product-cart-text prodcard-JSON">
                                <br/>
                                <div>
                                    <h6 style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', color: '#333' }} className="card-title card-title-des">
                                        {post.name}
                                    </h6>
                                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '15px' }}>
                                        {getTimeElapsedString(post.dateCreated)}&nbsp;<AccessTimeIcon style={{ color: 'green' }} />
                                    </p>

                                </div>
                                <img
                                    src={post.images[0].url}
                                    alt={post.name}
                                    className="card-img-top product-image"
                                />
                                <div className="card-body card-des">
                                    <p style={{ fontFamily: 'Arial', fontSize: '20px', color: '#333' }} className="card-text">
                                        {post.description.slice(0, 100) + '...'}
                                        <Link to={`/posts/${post._id}`} className="see-more-link" style={{ color: 'green' }}>
                                            See More
                                        </Link>
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '20px', fontWeight: 'normal', color: '#333' }}><ThumbUpIcon style={{ color: 'green' }} /> {likeCounts[post._id] || 0}</div>
                                        <div style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'normal', color: '#333' }}><ChatBubbleOutlineIcon style={{ color: 'green' }} />{post.commentsCount}</div>
                                    </div>


                                    <hr />
                                    {/* Display like count */}

                                    <div className="reaction-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'transparent', color: 'gray' }}
                                            onClick={() => handleReaction(post._id)}
                                            startIcon={<ThumbUpIcon style={{ color: post.likes && post.likes.includes(currentUser._id) ? 'blue' : 'inherit' }} />}
                                            className="like-button"
                                        >
                                            Like
                                        </Button>
                                        <IconButton component={Link} to={`/posts/${post._id}`}>
                                            <ChatBubbleOutlineIcon style={{ color: 'green' }}/>
                                            <span className="comment-text">Comment</span>
                                        </IconButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <IconButton
                className="scroll-to-top-button"
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: 35,
                    right: 50,
                    zIndex: 1000,
                    width: 48, // Adjust width to make it larger
                    height: 48, // Adjust height to make it larger
                }}
            >
                <ArrowUpwardIcon style={{ fontSize: 36 }} /> {/* Adjust the icon size */}
            </IconButton>

        </div>
    );
};

export default Post;
