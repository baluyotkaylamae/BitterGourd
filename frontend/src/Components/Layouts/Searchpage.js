import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';

const PostCard = ({ post }) => (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card prodcard-JSON">
            <div className="ampalaya-img-container">
                <img
                    src={post.images[0].url}
                    alt={post.name}
                    className="ampalaya-image"
                />
            </div>
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
);

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('q');

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:4001/api/search?q=${searchTerm}`); // Adjust the endpoint based on your backend setup
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSearchResults(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>Search Results</h1>
            <div className="row">
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography variant="body1" color="error">
                        Error: {error.message}
                    </Typography>
                ) : searchResults.length > 0 ? (
                    searchResults.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <Typography variant="body1">No results found.</Typography>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
