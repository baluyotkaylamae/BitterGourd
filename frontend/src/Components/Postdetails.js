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

    // Function to format date in ISO 8601 format to a readable date and time format
    const formatDateTime = (dateTimeString) => {
      

        const options = {
            weekday: 'long', // Display the full name of the weekday
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit', // Display hours in 2-digit format
            minute: '2-digit', // Display minutes in 2-digit format
            hour12: true, // Use 12-hour clock format
            // timeZone: 'Asia/Manila' // Adjust timezone to Philippines
            timezone:'UTC'
        };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    return (
        <div className="container mt-4 post-details-container">
            <h1 style={{ textAlign: 'center' }}>{post.name}</h1>
            <img
                src={post.images[0].url}
                alt={post.name}
                className="post-image"
                style={{ width: '750px', height: '500px' }}
            />
            <p style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'italic', marginTop: '10px' }}>
                Date Created: {formatDateTime(post.dateCreated)}
            </p>
            <p style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'italic' }}>
                Last Updated: {formatDateTime(post.dateUpdated)}
            </p>
            {post.description.split(/\n/).map((part, index) => {
                // If the part contains a number followed by a period
                if (/^\d+\.\s*/.test(part)) {
                    return (
                        <p key={index} style={{ textAlign: 'justify', fontSize: '20px' }}>
                            {part}
                        </p>
                    );
                } else {
                    return (
                        <p key={index} style={{ textAlign: 'justify', textIndent: '1em', fontSize: '20px' }}>
                            {part.trim()}
                        </p>
                    );
                }
            })}
        </div>
    );
};

export default PostDetails;
