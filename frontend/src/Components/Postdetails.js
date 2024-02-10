import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './post.css'; // Import the CSS file for PostDetails component

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/api/posts/${postId}`);
                setPost(response.data.post);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <div className="container mt-4 post-details-container"> {/* Add className for styling */}
            <h1>{post.name}</h1>
            <img src={post.images[0].url} alt={post.name} className="post-image" />
            <p>{post.description}</p>
        </div>
    );
};

export default PostDetails;
