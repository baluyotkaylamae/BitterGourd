import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CreateTopic = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category.value); // Use formData.category.value for the selected category ID
    data.append('content', formData.content);
    data.append('image', formData.image);

    try {
      const res = await axios.post('http://localhost:4001/api/create-topic', data);
      console.log('Topic created:', res.data);
      // You can redirect or perform any other actions after successful topic creation
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/categories');
        setCategories(response.data.categories.map((category) => ({ value: category._id, label: category.name })));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="create-topic-container">
      <h2>Create New Topic</h2>
      <form onSubmit={handleSubmit} className="topic-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="input-field" />
        <Select options={categories} onChange={handleCategoryChange} placeholder="Select Category" className="select-field" />
        <textarea name="content" placeholder="Content" onChange={handleChange} className="textarea-field"></textarea>
        <input type="file" name="image" onChange={handleImageChange} className="file-input" />
        <button type="submit" className="submit-button">Create Topic</button>
      </form>
    </div>
  );
};

export default CreateTopic;
