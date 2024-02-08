import React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Dashboard = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
        </Box>
    );
}

export default Dashboard;
