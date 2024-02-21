import React, { useState } from 'react';
import axios from 'axios';

const UpdateTopic = ({ topicId }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('content', formData.content);
    data.append('image', formData.image);

    try {
      const res = await axios.put(`/api/forum/updateForumPostById/${topicId}`, data);
      console.log('Topic updated:', res.data);
      // You can redirect or perform any other actions after successful topic update
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  return (
    <div>
      <h2>Update Topic</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <textarea name="content" placeholder="Content" onChange={handleChange}></textarea>
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Update Topic</button>
      </form>
    </div>
  );
};

export default UpdateTopic;
