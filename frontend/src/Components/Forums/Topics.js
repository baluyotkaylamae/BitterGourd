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
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = (topic) => {
        setSelectedTopic(topic);
        setIsModalOpen(true);
    };

    return (
        <div className="container mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <h1 className='prod-t'>Topics</h1> */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">Error: {error.message}</p>
            ) : topics.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {topics.map(topic => (
                        <div key={topic._id} style={{ marginBottom: '20px' }}>
                            <Card className="prodcard-Ampalaya" style={{ width: '800px', maxWidth: '800px', borderRadius: '20px', border: 'none' }}>
                                {topic.image && (
                                    <div className="ampalaya-img-container">
                                        <img src={topic.image.url} alt={topic.title} className="ampalaya-image" style={{ maxHeight: '400px', width: '100%'}} />
                                    </div>
                                )}
                                <CardContent className="ampalaya-body ampalaya-card-des" style={{ overflow: 'hidden' }}>
                                    <Typography className="ampalaya-title ampalaya-title-des" onClick={() => handleTopic(topic._id)} style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                                        {topic.title}
                                    </Typography>
                                    <Typography className="card-text" style={{ marginBottom: '1rem' }}>
                                        {topic.content.slice(0, 100) + '...'}
                                    </Typography>
                                    <Typography className="btn Ampalaya-button text-black" onClick={() => handleTopic(topic._id)}>
                                        See More
                                    </Typography>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                                        <Typography className="ampalaya-footer-timestamps" fontSize={'16px'} style={{ marginTop: '-0.6rem' }}>
                                            Published Date: {new Date(topic.createdAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}
                                        </Typography>
                                        <Typography className="ampalaya-footer-timestamps" fontSize={'16px'} style={{ marginTop: '-0.6rem' }}>
                                            Recent Activity: {new Date(topic.updatedAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} flex={'row'} mt={1}>
                                        <Typography fontSize={'20px'} style={{ marginTop: '-0.6rem' }}>
                                            {getTotalComments(topic?.Comments)}
                                        </Typography>
                                        <ChatBubbleOutlineIcon sx={{ marginLeft: '0.5rem', color: '#666666' }} fontSize='medium' />
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
