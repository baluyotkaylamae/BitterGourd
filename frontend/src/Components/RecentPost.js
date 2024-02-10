import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './post.css';

const RecentPost = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postsResponse = await axios.get('http://localhost:4001/api/posts');
                const latestPost = postsResponse.data.posts[0]; // Get the latest post from the response
                setPost(latestPost);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPost();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>Recent Post</h1>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">Error: {error.message}</p>
                ) : post ? (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
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
                                </p>
                                <Link to={`/posts/${post._id}`} className="btn json-button text-black">
                                    See More
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="no-products-message">No recent posts found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentPost;
