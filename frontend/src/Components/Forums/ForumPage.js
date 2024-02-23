import React, { useEffect, useState } from 'react'
import { Container, Divider, ThemeProvider, Typography, Select, MenuItem, Button, Paper, Fab } from '@mui/material'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import AllTopics from './Topics';
import NewTopic from './createTopic';
import { getToken } from '../../utils/helpers';
import Categories from './categories';
import CategoryTopics from './CategoryTopic';
import SingleTopic from './Topic';
import MyTopics from './ownTopic';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const theme = createTheme({
    palette: {
        secondary: {
            light: '#ccffcc',
            main: '#66ff66',
            dark: ' #006600',
            contrastText: '#000',
        },
        success: {
            main: '#4caf50',
        },
    },
});
const ForumPage = () => {

    const [value, setValue] = useState('3');
    const [category, setCategory] = useState('asd');
    const [topic, setTopic] = useState('');
    const [allTopics, setAllTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [keyword, setKeyword] = useState('')
    const [filteredCategories, setFilteredCategies] = useState([])

    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = useState(false);
    const [newTopic, setNewTopic] = useState({
        title: '',
        category: '',
        content: '',
        image: '',
    })

    const [sortType, setSortType] = useState('ra')

    const getSearchableTopics = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        try {

            const { data } = await axios.get(`http://localhost:4001/api/topics`, config);
            console.log(data)
            setAllTopics(data.Topic)

        } catch (err) {
            console.log(err)
            alert("Error occured")
        }
    }

    useEffect(() => {
        getSearchableTopics();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setNewTopic({
            title: '',
            categories: '',
            content: '',
            image: ''
        })
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onChange = e => {
        if (e.target.name === 'image') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setNewTopic({ ...newTopic, [e.target.name]: reader.result })
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setNewTopic({ ...newTopic, [e.target.name]: e.target.value })
        }
    }

    const gotoSingleTopic = (id) => {
        document.getElementById('free-solo-demo').value = ''
        setTopic(id)
        setValue('5')
    }

    return (
        <>
            <NewTopic
                handleClose={handleClose}
                open={open}
                handleChange={onChange}
                newTopic={newTopic}
                setNewTopic={setNewTopic}
                setSuccess={setSuccess}
            />
            <ThemeProvider theme={theme}>
                <Container maxWidth='xl' sx={{ backgroundColor: 'FFFFFF', overflow: 'auto' }}>
                    <Box sx={{ width: '100%', typography: 'body1' }} mt={5} mb={20}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }} px={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: '#b3ffb3', height: 35, width: '30%' }} my={'auto'} pl={1.5}>
                                    <SearchIcon sx={{ color: 'action.active', mr: 0, my: 0.5 }} />
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={allTopics}
                                        getOptionLabel={(option) => option.title}
                                        renderInput={(params) => <TextField id="keyword"{...params} placeholder="Search" variant='standard' />}
                                        size='small'
                                        fullWidth
                                        sx={{ pr: 2 }}
                                        renderOption={(props, option) => {
                                            return <li {...props} onClick={() => gotoSingleTopic(option._id)}>
                                                <Typography>{option.title}</Typography>
                                            </li>
                                        }}
                                    />
                                </Box>

                                <TabList onChange={handleChange} indicatorColor='dark' textColor='secondary'>
                                    <Tab label="Own Topic" value="3" sx={{ fontWeight: 400, textTransform: 'capitalize', fontSize: 16 }} />
                                    <Tab label="Topics" value="2" sx={{ fontWeight: 400, textTransform: 'capitalize', fontSize: 16 }} />
                                    <Tab label="Categories" value="1" sx={{ fontWeight: 400, textTransform: 'capitalize', fontSize: 16 }} />


                                </TabList>

                            </Box>
                            {value !== '1' && value !== '4' && value !== '5' ?
                                <Container maxWidth='xl' sx={{ my: 3, mt: 5 }}>
                                    <Box component={'div'} sx={{ display: 'flex', px: 3 }}>
                                        <Button
                                            variant='contained'
                                            color='success'
                                            onClick={handleClickOpen}
                                            sx={{ ml: 'auto' }}
                                        >Create New Topic</Button>
                                    </Box>
                                </Container> : ''
                            }
                            <Divider />
                            <TabPanel value="1">
                                <Categories setValue={setValue} setCategory={setCategory} />
                            </TabPanel>
                            <TabPanel value="2" sx={{ pt: 1 }}>
                                <AllTopics key={success} setTopic={setTopic} setValue={setValue} sortType={sortType} setCategory={setCategory} />
                            </TabPanel>
                            <TabPanel value="3">
                                <MyTopics key={success} setValue={setValue} setTopic={setTopic} />
                            </TabPanel>
                            <TabPanel value="4">
                                <CategoryTopics category={category} setTopic={setTopic} setValue={setValue} />
                            </TabPanel>
                            <TabPanel value="5">
                                <SingleTopic topic={topic} setValue={setValue} setTopic={setTopic} setCategory={setCategory} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}

export default ForumPage
