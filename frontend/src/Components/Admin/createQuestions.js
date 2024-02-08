import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Dashboard from './Dashboard';

const CreateQuestion = () => {
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    options: '', // Initialize options as an empty string
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateQuestion = async () => {
    // Ensure options is always a string
    const optionsArray = (typeof newQuestion.options === 'string' ? newQuestion.options.split(',').map(option => option.trim()) : []);

    try {
      await axios.post('http://localhost:4001/api/questions', {
        questionText: newQuestion.questionText,
        options: optionsArray,
      });
      // Show success toast
      toast.success('Question created successfully');
      // Optionally, you can redirect to another page or perform other actions.
      console.log('Question created successfully');
      // Reset the form after successful creation
      setNewQuestion({
        questionText: '',
        options: '',
      });
    } catch (error) {
      console.error('Error creating question:', error);
      // Handle error (e.g., show an error message to the user)
      toast.error('Failed to create question');
    }
  };

  return (
    <div>
      <Dashboard />
      <h2>Create Question</h2>
      <div>
        <label>Question Text:</label>
        <input
          type="text"
          name="questionText"
          value={newQuestion.questionText}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Options (comma-separated):</label>
        <input
          type="text"
          name="options"
          value={newQuestion.options}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={handleCreateQuestion}>Create Question</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateQuestion;
