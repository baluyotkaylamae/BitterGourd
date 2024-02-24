import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../post.css';

const TutorialPostCard = ({ post }) => {
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

const TutorialPosts = () => {
    const [loading, setLoading] = useState(true);
    const [tutorialPosts, setTutorialPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTutorialPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/posts', {
                    params: {
                        category: '65c6f4e671c818fb13bcc605'
                    }
                });
                setTutorialPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        

        fetchTutorialPosts();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>Tutorial Posts</h1>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">Error: {error.message}</p>
                ) : tutorialPosts.length > 0 ? (
                    tutorialPosts.map(post => (
                        <TutorialPostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p className="no-products-message">No Tutorial Posts Found.</p>
                )}
            </div>
        </div>
    );
};

export default TutorialPosts;
