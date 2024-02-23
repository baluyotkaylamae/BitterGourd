import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import { getToken, getUser } from '../../utils/helpers';
import axios from 'axios';
import { Delete, Message, Visibility } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

const OwnTopics = memo(({ setTopic, setValue }) => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getMyTopics = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:4001/api/topics?users=${getUser()._id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            setLoading(false);
            if (data.Topic.length > 0) {
                const tableData = data.Topic.map(topic => ({
                    image: topic.image,
                    title: topic.title,
                    content: topic.content,
                    categories: topic.categories,
                    Comments: topic.Comments,
                    actions: topic._id,
                }));
                setTopics(tableData);
            } else {
              
                setTopics([]);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        getMyTopics();
    }, []);

    const deleteTopic = async (id) => {
        if (window.confirm("Do you want to delete this item? ")) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            try {
                await axios.delete(`http://localhost:4001/api/topic/${id}`, config);
                getMyTopics();
            } catch (err) {
                console.log(err);
                alert("Error occurred")
            }
        }
    };

    const gotoSingleTopic = (id) => {
        setTopic(id);
        setValue('5');
    };

    const data = {
        columns: [
            {
                label: 'Image',
                field: 'image',
                width: 75,
            },
            {
                label: 'Title',
                field: 'title',
                width: 150,
            },
            {
                label: 'Content',
                field: 'content',
                width: 150,
            },
            {
                label: 'Category',
                field: 'categories',
                width: 100,
            },
            {
                label: 'Comments',
                field: 'Comments',
                width: 100,
            },
            {
                label: 'Actions',
                field: 'actions',
                width: 100,
            },
        ],
        rows: topics.map(topic => ({
            image: <img src={topic.image?.url} alt={topic.title} style={{ width: '30px' }} />,
            title: topic.title,
            content: topic.content,
            categories: topic.categories.name,
            Comments: topic.Comments.length,
            actions: (
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button size='large' onClick={() => gotoSingleTopic(topic.actions)} color="primary"> <Visibility fontSize='small' /></Button>
                    <Button size='large' onClick={() => navigate(`/edit/topic/${topic.actions}`)} color="secondary"><EditIcon fontSize='small' /></Button>
                    <Button size='large' onClick={() => deleteTopic(topic.actions)} color="error"><Delete fontSize='small' /></Button>
                </ButtonGroup>
            ),
        })),
    };

    return (
        <>
            <Container maxWidth='xl'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {topics.length > 0 ? (
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={data}
                            />
                        ) : (
                            <Typography variant="h5">No topics available</Typography>
                        )}
                    </div>
                )}
            </Container>
        </>
    )
});

export default OwnTopics;
