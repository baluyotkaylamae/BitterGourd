import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { getToken } from '../../utils/helpers';

const defaultImg = '/images/upload.png'

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

const NewTopic = ({ handleClose, open, handleChange, newTopic, setNewTopic, setSuccess }) => {

    const [categories, setCategories] = useState([]);
    const [imgPreview, setimgPreview] = useState(defaultImg)

    const getAllCategories = async () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {

            const { data } = await axios.get(`http://localhost:4001/api/categories`, config)

            setCategories(data.categories)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        getAllCategories();

    }, []);

    useEffect(() => {
        if (newTopic.image) {
            setimgPreview(newTopic.image)
        }
    }, [newTopic])

    const createNewTopic = async () => {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            }
        }

        try {

            const { data } = await axios.post(`http://localhost:4001/api/create-topic`, newTopic, config)
            setNewTopic({
                title: '',
                categories: '',
                content: '',
                image: '',
            })
            setSuccess(true);
            setimgPreview(defaultImg)
            handleClose();
            alert('Succefully created')
            setSuccess(false);

        } catch (err) {
            console.log(err);
            alert('Error occured')
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        createNewTopic();
                    },
                    sx: {
                        background: 'linear-gradient(to right, #e3eaa7, #b5e7a0)',
                        color: 'white', 
                        padding: '20px', 
                        minWidth: '500px',
                    },
                }}
            >
               
                <DialogContent sx={{ minWidth: '500px' }}>
                    <Autocomplete
                        fullWidth
                        sx={{ mt: 2 }}
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        getOptionKey={(option) => option._id}
                        onChange={(e, value) => {
                            if (value == null) {
                                value = { _id: '' }
                            }
                            handleChange({ target: { value: value._id, name: 'categories' } })
                        }
                        }
                        renderInput={(params) => <TextField {...params} label="Category" name='category'

                        />}
                    />
                    <TextField
                        autoFocus
                        sx={{ mt: 3 }}
                        margin="dense"
                        id="title"
                        name="title"
                        onChange={handleChange}
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
                        onChange={handleChange}
                        label="Content/Question/Topic"
                        type="text"
                        size='medium'
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                    <Box sx={{ border: 1, mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={imgPreview} width={100} style={{ paddingTop: 10 }} />
                        <Button
                            sx={{ my: 3 }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Browse
                            <VisuallyHiddenInput type="file" name='image' onChange={handleChange} />
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'red' }}>Cancel</Button>
                    <Button type="submit" sx={{ color: 'blue' }}>Add Topic</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NewTopic