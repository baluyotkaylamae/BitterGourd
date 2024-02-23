import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material'
import axios from 'axios';
import { getToken } from '../../utils/helpers';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';


const CategoryTopics = ({ category, setValue, setTopic }) => {

    const [loading, setLoading] = useState();
    const [Topic, setForumTopics] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState({});

    const getAllTopics = async () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {
            const { data } = await axios.get(`http://localhost:4001/api/topics?categories=${category}`, config);

            setForumTopics(data.Topic);


        } catch (err) {
            console.log(err);
        }
    }

    const getCategory = async () => {
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {
            const { data } = await axios.get(`http://localhost:4001/api/categories/${category}`, config);
            setCategoryDetails(data);
            setLoading(false)


        } catch (err) {
            setLoading(false)
            alert("Error occured")
            console.log(err);
        }
    }

    useEffect(() => {
        getAllTopics();
        getCategory();
    }, []);

    const gotoSingleTopic = (id) => {
        console.log(id)
        setTopic(id)
        setValue('5')
    }


    return (
        <>
            <Container maxWidth='xl'>
                <Box mb={3} height={120} bgcolor={'#e6ffe6'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='h4' textAlign={'center'} width={'80%'} style={{ color: 'green' }}>{categoryDetails?.name}</Typography>
                    <Typography textAlign={'center'} width={'80%'} style={{ color: 'green' }}>{categoryDetails?.description}</Typography>
                </Box>
                <Box>
                    {Topic.map(topic => {
                        return <List key={topic._id}
                            onClick={() => gotoSingleTopic(topic._id)}
                            sx={{
                                width: '100%',
                                px: 1,
                                "&:hover": {
                                    backgroundColor: "#e6ffe6", 
                                    cursor: "pointer", 
                                    transition: "0.3s ease-in-out",
                                },
                            }}>
                            <ListItem sx={{ width: '100%' }}>
                                <ListItemText primary={
                                    <Typography variant='h5' sx={{ mb: 0.5, color: 'green' }}>{topic.title}</Typography>
                                } secondary={
                                    <Typography sx={{ px: 0.3, color: '#666666', fontWeight: 400, fontSize: 18 }}>
                                        {cutContent(topic?.content)}
                                    </Typography>
                                } />
                                <Box display={'flex'} alignItems={'center'} flex={'row'}>
                                    <Typography fontSize={'16px'} sx={{ mt: -0.6, mr: 1, color: '#666666' }}>Published Date: </Typography>
                                    <ListItemText sx={{ fontSize: 100 }}>
                                        <Typography fontSize={'16px'} sx={{ mt: -0.6, color: 'green' }}>{new Date(topic.createdAt).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric' })}</Typography>
                                    </ListItemText>
                                </Box>
                            </ListItem>
                            <Divider sx={{ width: '100%' }} />
                        </List>
                    })}
                </Box>
            </Container>
        </>
    )
}

// const getTotalComments = (comments) => {
//     let totalComments = 0;
//     if (Array.isArray(comments)) {
//         totalComments = comments.length;
//         comments.forEach(comment => {
//             if (Array.isArray(comment.replies)) {
//                 totalComments += comment.replies.length;
//             }
//         });
//     }
//     return totalComments;
// }


const cutContent = (value) => {
    if (value.length <= 50) {
        return value
    } else {
        return value.substring(0, 50) + '...';
    }
}

export default CategoryTopics;
