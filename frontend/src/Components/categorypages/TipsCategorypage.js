import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../post.css';

const TipsPostCard = ({ post }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card product-cart-text prodcard-JSON" >
                <img
                    src={post.images[0].url}
                    alt={post.name}
                    className="card-img-top product-image"
                />
              <div className="ampalaya-card-body ampalaya-body">
                    <h6 className="ampalya-title ampalaya-title-des" >
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
    );
};

const TipsPosts = () => {
    const [loading, setLoading] = useState(true);
    const [tutorialPosts, setTipsPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTipsPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/posts', {
                    params: {
                        category: '65c6f50871c818fb13bcc609'
                    }
                });
                setTipsPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        

        fetchTipsPosts();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className='prod-t'style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '40px', fontWeight: 'bold', color: '#333' }}>Tips/Recommendations</h1>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">Error: {error.message}</p>
                ) : tutorialPosts.length > 0 ? (
                    tutorialPosts.map(post => (
                        <TipsPostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p className="no-products-message">No Tips/Recommendations Posts Found.</p>
                )}
            </div>
        </div>
    );
};

export default TipsPosts;
