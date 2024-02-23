import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, Button, Container, TextField } from '@mui/material';
import { getToken } from '../../utils/helpers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EditTopic = () => {
    const [loading, setLoading] = useState();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [editTopic, setEditTopic] = useState({
        title: '',
        categories: '',
        content: '',
        image: ''
    });
    const [imgPreview, setimgPreview] = useState('')
    const [seletedCategory, setSeletedCategory] = useState('')

    const { id } = useParams()

    const getAllCategories = async () => {
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {

            const { data } = await axios.get(`http://localhost:4001/api/categories`, config)

            setCategories(data.categories)

            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err);
            alert("Error occured")
        }
    }

    const getForumTopic = async () => {
        setLoading(true)
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {

            const { data } = await axios.get(`http://localhost:4001/api/topic/${id}`, config)
            setLoading(false)
            setEditTopic({
                title: data.Topic.title,
                categories: data.Topic.categories._id,
                content: data.Topic.content,
                image: ''
            });
            setSeletedCategory(data.Topic.categories)
            setimgPreview(data.Topic.image.url);

        } catch (err) {
            setLoading(false)
            console.log(err)
            alert("Error occured")
        }
    }

    const updateTopic = async () => {
        setLoading(true)
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {

            const { data } = await axios.put(`http://localhost:4001/api/topic/${id}`, editTopic, config)
            setLoading(false)
            alert('Succefully updated')
            navigate('/forums')

        } catch (err) {
            console.log(err);
            setLoading(false)
            alert('Error occured')
            navigate('/forums')
        }
    }

    const onChange = e => {
        if (e.target.name === 'image') {
            setLoading(true)
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setEditTopic({ ...editTopic, [e.target.name]: reader.result })
                    setimgPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0])
            setLoading(false)

        } else {
            setEditTopic({ ...editTopic, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        getForumTopic();
        getAllCategories();

    }, []);


    return (
        <>
            <Container sx={{ mt: 5, mb: 15 }}>
                <Card sx={{ maxWidth: 500, mx: 'auto', }}>
                    <CardHeader
                        title={
                            <Typography variant='h5'>Update Topic</Typography>
                        }
                    />
                    <CardContent>
                        <Autocomplete
                            fullWidth
                            sx={{ mt: 2 }}
                            options={categories}
                            value={seletedCategory}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            onChange={(e, value) => {
                                if (value == null) {
                                    value = { _id: '' }
                                }
                                onChange({ target: { value: value._id, name: 'categories' } })
                            }
                            }
                            renderInput={(params) => <TextField {...params} label="Category" name='categories'

                            />}
                        />
                        <TextField
                            autoFocus
                            sx={{ mt: 3 }}
                            margin="dense"
                            id="title"
                            name="title"
                            onChange={onChange}
                            value={editTopic.title}
                            label="Title"
                            type="text"
                            fullWidth
                            size='medium'
                            variant="outlined"
                        />
                        <TextField
                            sx={{ mt: 3 }}
                            autoFocus
                            margin="dense"
                            id="content"
                            name="content"
                            onChange={onChange}
                            value={editTopic.content}
                            label="Content/Question/Topic"
                            type="text"
                            size='medium'
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <Box sx={{ border: 1, mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={imgPreview} width={300} style={{ paddingTop: 30 }} />
                            <Button
                                sx={{ my: 3 }}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Browse
                                <VisuallyHiddenInput type="file" name='image' onChange={onChange} />
                            </Button>
                        </Box>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button onClick={() => navigate('/forums')}>Cancel</Button>
                        <Button type="submit" onClick={updateTopic}>Update Topic</Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
}

export default EditTopic