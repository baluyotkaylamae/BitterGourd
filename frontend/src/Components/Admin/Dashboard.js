import React from 'react';
import Sidebar from './Sidebar';
import { Box, Typography } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';

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

// const pieChartData = [
//   { id: 0, value: 5, label: 'Never' },
//   { id: 1, value: 10, label: 'Rarely' },
//   { id: 2, value: 35, label: 'Always' },
// ];
const lineChartData = [
  {
    quarter: 'Q1.How often Do you Monitor Your BitterGourd?',
    Never: 5,
    Rarely: 4,
    Always: 7,

  },
  {
    quarter: 'Q2. How often do you see pollinators?',
    Never: 7,
    Rarely: 10,
    Always: 9,

  },
  {
    quarter: 'Q3. How often do you prune your bittergourd?',
    Never: 20,
    Rarely: 2,
    Always: 8,

  },
  {
    quarter: 'Q4. How often do you experience having many flowers but no fruit in bittergourd plant?',
    Never: 10,
    Rarely: 2,
    Always: 18,

  },
  {
    quarter: 'Q5.How often do you use manual pollination?',
    Never: 3,
    Rarely: 12,
    Always: 18,

  }
];

const abbreviatedLineChartDataset = lineChartData.map((data, index) => ({
  ...data,
  quarter: `Q${index + 1}`,
}));
const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 3 }}>

      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <Sidebar />

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
          {/* Line Chart */}
          <Typography variant="h4" gutterBottom>
            Analytics
          </Typography>
          <Box sx={{ border: '2px solid green', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
             Personal experience
            </Typography>
            <LineChart
              dataset={abbreviatedLineChartDataset}
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
