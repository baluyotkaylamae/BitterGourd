import React from 'react';
import Sidebar from './Sidebar';
import { Box, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';

const chartSetting = {
  width: 500,
  height: 300,
};

// Data for the bar chart
const barChartDataset = [
  {
    quarter: 'Q6. Does monitoring the gender of bitter gourd floral can increase the production of its fruit?',
    notEffective: 10,
    effective: 20,
    veryEffective: 20,
  },
  {
    quarter: 'Q7. Is manual pollination effective in increasing the yields of bitter gourd growers?',
    notEffective: 15,
    effective: 15,
    veryEffective: 20,
  },
  {
    quarter: 'Q8. Can manual pollination be the best substitute in the absence of natural pollinators in urban?',
    notEffective: 5,
    effective: 25,
    veryEffective: 20,
  },
  {
    quarter: 'Q9. Is pruning effective in increasing the production of bitter gourd?',
    notEffective: 20,
    effective: 10,
    veryEffective: 20,
  },
  {
    quarter: 'Q10. Is an online platform effective in giving information to the bitter gourd growers?',
    notEffective: 5,
    effective: 5,
    veryEffective: 40,
  },
];

// Abbreviate the quarter labels
const abbreviatedBarChartDataset = barChartDataset.map((data, index) => ({
  ...data,
  quarter: `Q${index + 1}`,
}));

const pieChartData = [
  { id: 0, value: 5, label: 'Never' },
  { id: 1, value: 10, label: 'Rarely' },
  { id: 2, value: 35, label: 'Always' },
];

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 3 }}>

      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar />

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
          {/* Pie Chart */}
          <Typography variant="h4" gutterBottom>
            Analytics
          </Typography>
          <Box sx={{ border: '2px solid green', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              How often do you monitor the Bitter Gourd Plant?
            </Typography>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
            />
          </Box>

          {/* Bar Chart */}
          <Box sx={{ border: '2px solid green', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Bitter Gourd Plant Monitoring
            </Typography>
            <BarChart
              dataset={abbreviatedBarChartDataset}
              xAxis={[{ scaleType: 'band', dataKey: 'quarter' }]}
              series={[
                { dataKey: 'notEffective', label: 'Not Effective' },
                { dataKey: 'effective', label: 'Effective' },
                { dataKey: 'veryEffective', label: 'Very Effective' },
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
