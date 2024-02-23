import { Container, Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { getToken } from '../../utils/helpers';
import TopicIcon from '@mui/icons-material/Topic';
import axios from 'axios';

const Categories = ({ setValue, setCategory }) => {
    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        setLoading(true);
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        try {
            const { data } = await axios.get(`http://localhost:4001/api/forums/categorize/`, config);
            setLoading(false);
            setCategories(data.categorizeForums);
        } catch (err) {
            setLoading(false);
            alert("Error occurred");
            console.log(err);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const goToCategory = (id) => {
        setValue('4');
        setCategory(id);
    };

    return (
        <>
            
            <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'start', justifyContent: 'start' }}>
                <List sx={{ width: '95%' }}>
                    {categories && categories.map((category) => (
                        <Card key={category.categoryId} onClick={() => goToCategory(category.categoryId)}
                            sx={{
                                mb: 3, cursor: 'pointer', "&:hover": {
                                    backgroundColor: "#e6ffe6", 
                                    cursor: "pointer", 
                                    transition: "0.3s ease-in-out",
                                },
                            }}>
                            <CardContent>
                                <Typography variant='h5' sx={{ mb: 0.5, color: '#00b300' }}>
                                    {category.name}
                                </Typography>
                                <Typography sx={{ px: 0.3, color: '#666666', fontWeight: 400 }}>
                                    {category.description}
                                </Typography>
                                <IconButton sx={{ float: 'left' }}>
                                    <TopicIcon fontSize='large' />
                                </IconButton>
                                <Typography variant='body1' sx={{ float: 'left', mt: -1 }}>
                                    {category?.forums.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default Categories;
