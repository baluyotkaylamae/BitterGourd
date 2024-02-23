import React, { memo, useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import { getToken } from '../../utils/helpers';

const AllTopics = memo(({ setTopic, setValue, sortType, setCategory }) => {
    const [loading, setLoading] = useState();

    const config = {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    }

    const [Topic, setForumTopics] = useState([]);

    const getAllTopics = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:4001/api/topics?sortType=${sortType}`, config);
            setLoading(false);
            setForumTopics(data.Topic);
        } catch (err) {
            setLoading(false);
            alert("Error occurred");
            console.log(err);
        }
    }

    useEffect(() => {
        getAllTopics();
    }, [sortType]);

    const handleTopic = (id) => {
        setTopic(id);
        setValue('5');
    }

    const gotoCategory = (id) => {
        setCategory(id);
        setValue('4');
    }

    return (
        <>
            {Topic.map(topic => (
                <Card key={topic._id} sx={{
                    my: 1, cursor: 'pointer',
                    "&:hover": {
                        backgroundColor: "#e6ffe6"
                     
                    },
                }}
                >

                    <CardContent>
                        <Typography
                            onClick={() => handleTopic(topic._id)}
                            variant='h5'
                            sx={{
                                mb: 0.5,
                                cursor: 'pointer',
                                "&:hover": {
                                    color: '#80ff80'
                                },
                                fontWeight: 'bold'
                            }}>
                            {topic.title}
                        </Typography>
                        <Typography sx={{ px: 0.3, fontWeight: 300 }}>
                            {topic.users.name} · <Typography variant='span' onClick={() => gotoCategory(topic.categories._id)} sx={{
                                cursor: 'pointer',
                                "&:hover": {
                                    color: '#666666'

                                },
                            }}>{topic.categories.name}</Typography>
                        </Typography>
                        <Box display={'flex'} alignItems={'center'} flex={'row'} justifyContent={'space-between'}>
                            <Box>
                                <Typography fontSize={'16px'} sx={{ mt: -0.6 }}>Published Date: {new Date(topic.createdAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}</Typography>
                            </Box>
                            <Box>
                                <Typography fontSize={'16px'} sx={{ mt: -0.6 }}>Recent Activity: {new Date(topic.updatedAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}</Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} flex={'row'} mt={1}>
                            <ChatBubbleOutlineIcon sx={{ mr: 1.5, color: '#666666' }} fontSize='medium' />
                            <Typography fontSize={'20px'} sx={{ mt: -0.6 }}>{getTotalComments(topic?.Comments)}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </>
    )
})

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
