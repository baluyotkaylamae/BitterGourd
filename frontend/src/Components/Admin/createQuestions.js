import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CreateQuestion = () => {
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    options: '',
  });

  const handleInputChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateQuestion = async () => {
    // Split the options string into an array using commas
    const optionsArray = newQuestion.options.split(',').map(option => option.trim());

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
