// src/SurveyForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './survey.css'; // Import the CSS file for styling

const SurveyForm = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/questions');
        setQuestions(response.data.questions);
        const initialFormData = {};
        response.data.questions.forEach((question) => {
          initialFormData[question._id] = '';
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (questionId, option) => {
    setFormData({
      ...formData,
      [questionId]: option,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic for handling the form submission, e.g., sending answers to the server
  };

  return (
    <div className="survey-container">
    <h1 className="form-title">Survey Form</h1>
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={question._id} className="question-container">
          <p className="question-text">{question.questionText}</p>
          {question.options.map((option) => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name={question._id}
                value={option}
                checked={formData[question._id] === option}
                onChange={() => handleInputChange(question._id, option)}
              />
              {option}
            </label>
          ))}
          {index < questions.length - 1 && <div className="divider" />}
        </div>
      ))}
      <button type="submit" className="submit-button">
        Submit Survey
      </button>
    </form>
  </div>
);
};

export default SurveyForm;
