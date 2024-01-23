import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerForm = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch surveys when the component mounts
    axios.get('http://localhost:4001/api/surveys').then((res) => {
      setSurveys(res.data.surveys);
    });
  }, []);

  useEffect(() => {
    // Fetch questions based on the selected survey
    if (selectedSurvey) {
      axios.get(`http://localhost:4001/api/surveys/${selectedSurvey}/questions`)
        .then((res) => {
          setQuestions(res.data.questions);
        });
    }
  }, [selectedSurvey]);

  const handleSurveyChange = (e) => {
    setSelectedSurvey(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setSelectedQuestion(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    // Submit the answer to the backend
    axios.post('http://localhost:4001/api/surveys', {
      surveyId: selectedSurvey,
      questionId: selectedQuestion,
      selectedOption,
    })
    .then(() => {
      // Handle success or redirect to another page
      console.log('Answer submitted successfully');
    })
    .catch((error) => {
      // Handle error
      console.error('Error submitting answer:', error);
    });
  };

  return (
    <div>
      <div>
        <label>Select Survey:</label>
        <select onChange={handleSurveyChange} value={selectedSurvey}>
          <option value="" disabled>Select Survey</option>
          {surveys.map((survey) => (
            <option key={survey._id} value={survey._id}>{survey.title}</option>
          ))}
        </select>
      </div>

      {selectedSurvey && (
        <div>
          <label>Select Question:</label>
          <select onChange={handleQuestionChange} value={selectedQuestion}>
            <option value="" disabled>Select Question</option>
            {questions.map((question) => (
              <option key={question._id} value={question._id}>{question.questionText}</option>
            ))}
          </select>
        </div>
      )}

      {selectedQuestion && (
        <div>
          <label>Select Option:</label>
          {questions
            .find((question) => question._id === selectedQuestion)
            .options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name="selectedOption"
                  value={option}
                  onChange={handleOptionChange}
                  checked={selectedOption === option}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
        </div>
      )}

      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
};

export default AnswerForm;
