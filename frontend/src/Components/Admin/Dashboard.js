import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AnswerForm from '../SurveyForm'; // Import the AnswerForm component
import { Box, Typography } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import './dashboard.css'


const chartSetting = {
  width: 500,
  height: 300,
};

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);


  useEffect(() => {
    const fetchSurveyAnswers = async () => {
      try {
        // Fetch submitted answers from the survey
        const response = await axios.get('http://localhost:4001/api/answer');
        const { answers } = response.data;

        // Process the answers to format them for charts
        const lineChartDataMap = new Map();
        const barChartDataMap = new Map();

        answers.forEach(answer => {
          answer.answers.forEach(individualAnswer => {
            const { questions, selectedOption } = individualAnswer;

            // Convert question IDs to labels and filter out unwanted questions
            const questionLabel = mapQuestionIdToLabel(questions);
            if (!questionLabel) return;

            // For LineChart
            const lineData = lineChartDataMap.get(questionLabel) || { questionId: questionLabel, Never: 0, Rarely: 0, Always: 0 };
            lineData[selectedOption]++;
            lineChartDataMap.set(questionLabel, lineData);

            // For BarChart
            const barData = barChartDataMap.get(questionLabel) || { questionId: questionLabel, Not_effective: 0, Effective: 0, Very_Effective: 0 };

            // Validate and handle NaN values
            if (!isNaN(barData[selectedOption])) {
              barData[selectedOption]++;
              barChartDataMap.set(questionLabel, barData);
            }
          });
        });

        const newLineChartData = Array.from(lineChartDataMap.values());
        const newBarChartData = Array.from(barChartDataMap.values());

        console.log('Line Chart Data:', newLineChartData);
        console.log('Bar Chart Data:', newBarChartData);

        setLineChartData(newLineChartData);
        setBarChartData(newBarChartData);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error('Error fetching survey answers:', error);
        setError('Error fetching survey answers. Please try again later.');
        setLoading(false); // Set loading state to false in case of error
      }
    };


    const mapQuestionIdToLabel = (questionId) => {
      switch (questionId) {
        case "65daeb3ba218afb9f795c99c":
          return "Q1";
        case "65daeb55a218afb9f795c99e":
          return "Q2";
        case "65daeb6ba218afb9f795c9a0":
          return "Q3";
        case "65daebb0a218afb9f795c9a2":
          return "Q4";
        case "65daebcea218afb9f795c9a4":
          return "Q5";
        case "65daec4ea218afb9f795c9a7":
          return "Q6";
        case "65daece6a218afb9f795c9ad":
          return "Q7";
        case "65daecfca218afb9f795c9af":
          return "Q8";
        case "65daed1ea218afb9f795c9b3":
          return "Q9";
        case "65daed2fa218afb9f795c9b5":
          return "Q10";
        case "65daed45a218afb9f795c9b7":
          return "Q11";
        case "65daed5ba218afb9f795c9b9":
          return "Q12";
        case "65daed6ca218afb9f795c9bb":
          return "Q13";
        case "65daed82a218afb9f795c9bd":
          return "Q14";
        case "65daed92a218afb9f795c9bf":
          return "Q15";
        default:
          return null;
      }
    };

    fetchSurveyAnswers();
  }, []);

  const handleDownload = () => {
    const pdf = new jsPDF();
    if (chartContainerRef.current) {
      const chartElement = chartContainerRef.current;
      html2canvas(chartElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 150; // Adjusted width of the image in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const marginLeft = 20; // Adjusted left margin in mm
        const marginTop = 20; // Adjusted top margin in mm
        pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
        pdf.save('analytics.pdf');
      });
    } else {
      console.error('chartContainerRef.current is not defined or null');
    }
  };


  const handleConvertToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Flatten barChartData array
    const flattenedBarChartData = barChartData.map(data => {
      return {
        questionId: data.questionId,
        Not_effective: data.Not_effective,
        Effective: data.Effective,
        Very_Effective: data.Very_Effective
      };
    });

    // Filter lineChartData to exclude Q6 to Q15
    const filteredLineChartData = lineChartData.filter(data => {
      const questionNumber = parseInt(data.questionId.substr(1)); // Extract the question number
      return questionNumber <= 5; // Include questions 1 to 5
    });

    // Convert filteredLineChartData to Excel format
    const lineDataWS = XLSX.utils.json_to_sheet(filteredLineChartData);
    XLSX.utils.book_append_sheet(wb, lineDataWS, 'Line Chart Data');

    // Convert flattenedBarChartData to Excel format
    const barDataWS = XLSX.utils.json_to_sheet(flattenedBarChartData);
    XLSX.utils.book_append_sheet(wb, barDataWS, 'Bar Chart Data');

    // Save the workbook as an Excel file
    const excelFileName = 'analytics.xlsx';
    XLSX.writeFile(wb, excelFileName);
  };



  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  // Filter lineChartData to exclude Q6 to Q10
  const fLineChartData = lineChartData.filter(data => !data.questionId.startsWith('Q6') && !data.questionId.startsWith('Q7') && !data.questionId.startsWith('Q8') && !data.questionId.startsWith('Q9') && !data.questionId.startsWith('Q10') && !data.questionId.startsWith('Q11') && !data.questionId.startsWith('Q12') && !data.questionId.startsWith('Q13') && !data.questionId.startsWith('Q14') && !data.questionId.startsWith('Q15'));


  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px' }}>
      {/* Sidebar and Analytics */}
      <Box sx={{ gridColumn: 'span 2' }}/>

      {/* Graph */}
      <Box sx={{ gridColumn: 'span 5', marginTop: '0.5in' }}>
        <Sidebar />
        <Box ref={chartContainerRef} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Analytics
          </Typography>

          {/* Line Chart */}
          <Box ref={chartContainerRef} className="chart-container" sx={{ marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              A. Experience about Bitter Gourd
            </Typography>
            <LineChart
              dataset={fLineChartData}
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Never', label: 'Never' },
                { dataKey: 'Rarely', label: 'Rarely' },
                { dataKey: 'Always', label: 'Always' }
              ]}
              {...chartSetting}
              ref={chartRef}
            />
          </Box>

          {/* Bar Chart */}
          <Box ref={chartContainerRef} className="chart-container" sx={{ marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              B. Bitter Gourd Cultivation Practices
            </Typography>
            <BarChart
              dataset={barChartData.filter(data => data.questionId.startsWith('Q6') || data.questionId.startsWith('Q7') || data.questionId.startsWith('Q8') || data.questionId.startsWith('Q9') || data.questionId.startsWith('Q10'))}
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Not_effective', label: 'Not_effective' },
                { dataKey: 'Effective', label: 'Effective' },
                { dataKey: 'Very_Effective', label: 'Very_Effective' }
              ]}
              {...chartSetting}
              ref={chartRef}
            />
          </Box>

          <Box ref={chartContainerRef} className="chart-container" sx={{ marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              C. BitterFloral Guard Platform Expectation
            </Typography>
            <BarChart
              dataset={barChartData.filter(data => data.questionId.startsWith('Q11') || data.questionId.startsWith('Q12') || data.questionId.startsWith('Q13') || data.questionId.startsWith('Q14') || data.questionId.startsWith('Q15'))}
              xAxis={[{ scaleType: 'band', dataKey: 'questionId' }]}
              series={[
                { dataKey: 'Not_effective', label: 'Not_effective' },
                { dataKey: 'Effective', label: 'Effective' },
                { dataKey: 'Very_Effective', label: 'Very_Effective' }
              ]}
              horizontal
              {...chartSetting}
              ref={chartRef}
            />
          </Box>

        </Box>

        <div className="submit-button-container">
          <button className="submit-button" onClick={handleDownload}>Download PDF</button>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleConvertToExcel}>Convert to Excel</button>
        </div>
      </Box>

      {/* Survey */}
      <Box sx={{ gridColumn: 'span 5' }}>
        <AnswerForm />
      </Box>
    </Box>
  );

}
export default Dashboard;
