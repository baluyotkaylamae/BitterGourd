import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './post.css'; // Import the CSS file for PostDetails component
import { getUser } from '../utils/helpers';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [data, setComments] = useState([]);
    const currentUser = getUser();

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

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/api/${postId}/allcomments`);
                console.log(response.data);
                setComments(response.data.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchPost();
        fetchComments(); // Call fetchComments here to load comments initially
    }, [postId]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            if (!currentUser) {
                alert('Please log in first.');
                return;
            }

            const newComment = {
                text: comment,
                author: currentUser._id,
                post: postId,
            };
            await axios.post(`http://localhost:4001/api/${postId}/comments`, newComment);
            setComment('');


        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

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
            timezone: 'UTC'
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

            {/* Comment Section */}

            <div className="comment-section">
                <h3>Comments</h3>
                <textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                    rows="4"
                    cols="50"
                ></textarea>
                <button onClick={handleCommentSubmit}>Submit</button>
            </div>


            <div className="comments-list">
                {data && data.map(comment => (
                    <div key={comment._id} className="comment">
                        <p className="comment-author">{comment.author.name}</p> {/* Access the name property of the author object */}
                        <p className="comment-text">{comment.text}</p>
                        <p className="comment-date">{formatDateTime(comment.dateCreated)}</p>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default PostDetails;