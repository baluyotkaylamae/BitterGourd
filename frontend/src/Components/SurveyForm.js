import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './survey.css'; // Import the CSS file for styling

const AnswerForm = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/questions');
        setQuestions(response.data.questions);
        const initialFormData = response.data.questions.map(question => ({
          questionId: question._id,
          questionText: question.questionText,
          selectedOption: ''
        }));
        setFormData(initialFormData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (index, option) => {
    const updatedFormData = [...formData];
    updatedFormData[index].selectedOption = option;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataArray = questions.map((question, index) => ({
      questions: question._id, // or question.questionId depending on your backend expectation
      questionText: question.questionText,
      selectedOption: formData[index]?.selectedOption || '', // Ensure default value if no option selected
    }));
    console.log('Form Data:', formDataArray); // Log formDataArray
    try {
      // Send form data to the server
      await axios.post('http://localhost:4001/api/submit', formDataArray);

      console.log('Form submitted successfully');
      // You can also add code to handle success message or redirect after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can also add code to handle error message
    }
  };


  return (
    <div className="survey-container">
      <h1 className="form-title">Answer Form</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question._id} className="question-container">
            <p className="question-text">{question.questionText}</p>
            {question.options.map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={option}
                  checked={formData[index]?.selectedOption === option}
                  onChange={() => handleInputChange(index, option)}
                />
                {option}
              </label>
            ))}
            {index < questions.length - 1 && <div className="divider" />}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;
