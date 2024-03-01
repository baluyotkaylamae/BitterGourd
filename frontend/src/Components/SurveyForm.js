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

  const handleInputChange = (index, e) => {
    const option = e.target.value;
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
      // Reload the page after successful submission
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can also add code to handle error message
    }
  };

  // Divide questions into three parts: first 5, next 5, and remaining
  const part1Questions = questions.slice(0, 5);
  const part2Questions = questions.slice(5, 10);
  const part3Questions = questions.slice(10);

  return (
    <div className="survey-container">
      <h1 className="form-title">ANALYTICS QUESTIONS</h1>

      <div className="parts-container">
        {/* Part 1 */}
        <div className="part-container-horizontal">
          <h2 className="part-title">A. Experience about Bitter Gourd</h2>
          <form onSubmit={handleSubmit}>
            {part1Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text">{question.questionText}</p>
                <select
                  value={formData[index]?.selectedOption}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>
        </div>

        {/* Part 2 */}
        <div className="part-container-horizontal">
          <h2 className="part-title">B. Bitter Gourd Cultivation Practices</h2>
          <form onSubmit={handleSubmit}>
            {part2Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text">{question.questionText}</p>
                <select
                  value={formData[index + 5]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 5, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>
        </div>

        {/* Part 3 */}
        <div className="part-container-horizontal">
          <h2 className="part-title">C. BitterFloral Guard Platform Expectation</h2>
          <form onSubmit={handleSubmit}>
            {part3Questions.map((question, index) => (
              <div key={question._id} className="question-container">
                <p className="question-text">{question.questionText}</p>
                <select
                  value={formData[index + 10]?.selectedOption}
                  onChange={(e) => handleInputChange(index + 10, e)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </form>
        </div>
      </div>

      {/* Submit button */}
      <div className="submit-button-container">
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default AnswerForm;
