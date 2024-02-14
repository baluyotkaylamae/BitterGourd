// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './post.css';

// const RecentPost = () => {
//     const [loading, setLoading] = useState(true);
//     const [post, setPost] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const postsResponse = await axios.get('http://localhost:4001/api/recent-posts');
//                 const recentPosts = postsResponse.data.posts;
//                 setPost(recentPosts);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };
//         fetchPost();
//     }, []);


//     return (
//         <div className="container mt-4">
//             <h1 className='prod-t'>Recent Post</h1>
//             <div className="row">
//                 {post && post.length > 0 ? (
//                     post.map((recentPost) => (
//                         <div key={recentPost._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//                             <div className="card product-cart-text prodcard-JSON">
//                                 <img
//                                     src={recentPost.images[0].url}
//                                     alt={recentPost.name}
//                                     className="card-img-top product-image"
//                                 />
//                                 <div className="card-body card-des">
//                                     <h6 className="card-title card-title-des">
//                                         {recentPost.name}
//                                     </h6>
//                                     <p className="card-text">
//                                         {recentPost.description.slice(0, 100) + '...'}
//                                     </p>
//                                     <Link to={`/posts/${recentPost._id}`} className="btn json-button text-black">
//                                         See More
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="no-products-message">No recent posts found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RecentPost;


// RecentPost.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ThumbUp as ThumbUpIcon, ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material'; // Import MUI icons
// import { Button, IconButton } from '@mui/material'; // Import MUI button components
// import './recentpost.css';

// const RecentPost = () => {
//     const [loading, setLoading] = useState(true);
//     const [post, setPost] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const postsResponse = await axios.get('http://localhost:4001/api/posts');
//                 const recentPosts = postsResponse.data.posts;
//                 setPost(recentPosts);
//                 setLoading(false);
//                 window.scroll({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };
//         fetchPost();
//     }, []);

//     const handleReaction = () => {
//         // Add logic to handle reaction
//     };

//     return (
//         <div className="container mt-4">
//         <h1 className='prod-t'>Recent Post</h1>
//         <div className="post-container">
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error.message}</p>}
//             {post && (
//                 <div className="post-scroll">
//                     {post.map((recentPost) => (
//                         <div key={recentPost._id} className="post">
//                             <div className="card product-cart-text prodcard-JSON">
//                                 <img
//                                     src={recentPost.images[0].url}
//                                     alt={recentPost.name}
//                                     className="card-img-top product-image"
//                                 />
//                                 <div className="card-body card-des">
//                                     <h6 className="card-title card-title-des">
//                                         {recentPost.name}
//                                     </h6>
//                                     <p className="card-text">
//                                         {recentPost.description.slice(0, 100) + '...'}
                                        
//                                         <Link to={`/posts/${recentPost._id}`} className="see-more-link">
//                                         See More
//                                     </Link>
//                                     </p>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={handleReaction}
//                                         startIcon={<ThumbUpIcon />}
//                                     >
//                                         Like
//                                     </Button>
//                                     <IconButton component={Link} to={`/posts/${recentPost._id}`}>
//                                         <ChatBubbleOutlineIcon />
//                                         <span className="comment-text">Comment</span>
//                                     </IconButton>
                                   
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     </div>
//     );
// };

// export default RecentPost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThumbUp as ThumbUpIcon, ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material'; // Import MUI icons
import { Button, IconButton } from '@mui/material'; // Import MUI button components
import './recentpost.css';

const RecentPost = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get('http://localhost:4001/api/posts');
                const reversedPosts = postsResponse.data.posts.reverse(); // Reverse the order of posts array
                setPosts(reversedPosts);
                setLoading(false);
                window.scroll({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
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
            <h1 className='prod-t'>Recent Post</h1>
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

export default RecentPost;
