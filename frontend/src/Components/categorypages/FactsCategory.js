import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../post.css';

const FactsPostCard = ({ post }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card product-cart-text prodcard-JSON">
                <img
                    src={post.images[0].url}
                    alt={post.name}
                    className="card-img-top product-image"
                />
                <div className="card-body card-des">
                    <h6 className="card-title card-title-des">
                        {post.title}
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
    );
};

const FactsPosts = () => {
    const [loading, setLoading] = useState(true);
    const [tutorialPosts, setFactsPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFactsPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/posts', {
                    params: {
                        category: '65c6f51771c818fb13bcc60d'
                    }
                });
                setFactsPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        

        fetchFactsPosts();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>Facts</h1>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">Error: {error.message}</p>
                ) : tutorialPosts.length > 0 ? (
                    tutorialPosts.map(post => (
                        <FactsPostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p className="no-products-message">No tutorial posts found.</p>
                )}
            </div>
        </div>
    );
};

export default FactsPosts;
