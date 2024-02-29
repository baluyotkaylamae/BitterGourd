import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Box, Typography } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';

const chartSetting = {
  width: 500,
  height: 300,
};

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchSurveyAnswers = async () => {
      try {
        // Fetch submitted answers from the survey
        const response = await axios.get('http://localhost:4001/api/answers');
        const answers = response.data;

        // Process the answers to format them for charts
        // Assuming your backend returns data in a format suitable for charts

        // Extract data for line chart
        const lineChartData = answers.map(answer => ({
          quarter: answer.questionText,
          Never: answer.selectedOption === 'Never' ? 1 : 0,
          Rarely: answer.selectedOption === 'Rarely' ? 1 : 0,
          Always: answer.selectedOption === 'Always' ? 1 : 0
        }));

        // Extract data for bar chart
        const barChartData = answers.map(answer => ({
          quarter: answer.questionText,
          notEffective: answer.selectedOption === 'Not Effective' ? 1 : 0,
          effective: answer.selectedOption === 'Effective' ? 1 : 0,
          veryEffective: answer.selectedOption === 'Very Effective' ? 1 : 0
        }));

        setLineChartData(lineChartData);
        setBarChartData(barChartData);
      } catch (error) {
        console.error('Error fetching survey answers:', error);
      }
    };

    fetchSurveyAnswers();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Analytics
          </Typography>
          {/* Line Chart */}
          <Box sx={{ border: '2px solid green', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Personal Experience
            </Typography>
            <LineChart
              dataset={lineChartData}
              xAxis={[{ scaleType: 'band', dataKey: 'quarter' }]}
              series={[
                { dataKey: 'Never', label: 'Never' },
                { dataKey: 'Rarely', label: 'Rarely' },
                { dataKey: 'Always', label: 'Always' }
              ]}
              {...chartSetting}
            />
          </Box>
          {/* Bar Chart */}
          <Box sx={{ border: '2px solid green', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Bitter Gourd Plant Monitoring
            </Typography>
            <BarChart
              dataset={barChartData}
              xAxis={[{ scaleType: 'band', dataKey: 'quarter' }]}
              series={[
                { dataKey: 'notEffective', label: 'Not Effective' },
                { dataKey: 'effective', label: 'Effective' },
                { dataKey: 'veryEffective', label: 'Very Effective' }
              ]}
              {...chartSetting}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
