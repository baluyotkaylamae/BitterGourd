import React, { memo, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import { getToken } from '../../utils/helpers';
import './forum.css'

const AllTopics = memo(({ setTopic, setValue, sortType, setCategory }) => {
    const [loading, setLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllTopics = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:4001/api/topics?sortType=${sortType}`, {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                });
                setTopics(data.Topic);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err);
            }
        };
        getAllTopics();
    }, [sortType]);

    const handleTopic = (id) => {
        setTopic(id);
        setValue('5');
    };

    const gotoCategory = (id) => {
        setCategory(id);
        setValue('4');
    };

    return (
        <div className="container mt-4">
            <h1 className='prod-t'>All Topics</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">Error: {error.message}</p>
            ) : topics.length > 0 ? (
                <div className="row">
                    {topics.map(topic => (
                        <div key={topic._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <Card className="prodcard-Ampalaya">
                                {topic.image && (
                                    <div className="ampalaya-img-container"> {/* Add a container for the card image */}
                                        <img src={topic.image.url} alt={topic.title} className="ampalaya-image" />
                                    </div>
                                )}
                                <CardContent className="ampalaya-body ampalaya-card-des">
                                    <Typography className="ampalaya-title ampalaya-title-des" onClick={() => handleTopic(topic._id)}  style={{ fontWeight: 'bold' }}>
                                        {topic.title}
                                    </Typography>
                                    <Typography className="card-text">
                                        {topic.content.slice(0, 100) + '...'}
                                    </Typography>
                                    <Typography className="btn Ampalaya-button text-black" onClick={() => handleTopic(topic._id)}>
                                        See More
                                    </Typography>
                                    <Box display={'flex'} alignItems={'center'} flex={'row'} justifyContent={'space-between'}>
                                        <Typography className="ampalaya-footer-timestamps" fontSize={'16px'} sx={{ mt: -0.6 }}>
                                            Published Date:
                                            <Box display={'flex'} alignItems={'center'} flex={'row'} justifyContent={'space-between'}>
                                                {new Date(topic.createdAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}

                                            </Box>
                                        </Typography>

                                        <Typography className="ampalaya-footer-timestamps" fontSize={'16px'} sx={{ mt: -0.6 }}>
                                            Recent Activity:
                                            <Box display={'flex'} alignItems={'center'} flex={'row'} justifyContent={'space-between'}>
                                                {new Date(topic.updatedAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}
                                            </Box>
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} flex={'row'} mt={1}>
                                        <Typography fontSize={'20px'} sx={{ mt: -0.6 }}>
                                            {getTotalComments(topic?.Comments)}
                                        </Typography>
                                        <ChatBubbleOutlineIcon sx={{ ml: 1.5, color: '#666666' }} fontSize='medium' />
                                    </Box>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-products-message">No topics found.</p>
            )}
        </div>
    );
});

const getTotalComments = (comments) => {
    let totalComments = 0;
    if (Array.isArray(comments)) {
        totalComments = comments.length;
        comments.forEach(comment => {
            if (Array.isArray(comment.replies)) {
                totalComments += comment.replies.length;
            }
        });
    }
    return totalComments;
}

export default AllTopics;