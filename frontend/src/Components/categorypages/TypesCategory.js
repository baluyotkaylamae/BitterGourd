import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './category.css';

const TypesPostCard = ({ post }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card prodcard-Ampalaya">
                <div className="ampalaya-img-container" >
                    <img
                        src={post.images[0].url}
                        alt={post.name}
                        className="card-img-top product-image"
                    />
                </div>
                <div>
                    <div className="ampalaya-card-body ampalaya-body">
                        <h6 className="ampalya-title ampalaya-title-des">
                            {post.name}
                        </h6>
                        <p className="Ampalaya-card-text ampalaya-card-des">
                            {post.description.slice(0, 100) + '...'}
                        </p>
                        <Link to={`/posts/${post._id}`} className="btn Ampalaya-button text-black">
                            See More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TypesPosts = () => {
    const [loading, setLoading] = useState(true);
    const [typesPosts, setTypesPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTypesPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/posts', {
                    params: {
                        category: '65e72926353dda2fd2ae3a88'
                    }
                });
                setTypesPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTypesPosts();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>Types</h1>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">Error: {error.message}</p>
                ) : typesPosts.length > 0 ? (
                    typesPosts.map(post => (
                        <TypesPostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p className="no-products-message">No Types Posts Found.</p>
                )}
            </div>
        </div>
    );
};

export default TypesPosts;
