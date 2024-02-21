import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get('/api/forum/getAllForumPosts');
        setTopics(res.data.Topic);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic._id}>
            <h3>{topic.title}</h3>
            <p>{topic.content}</p>
            <img src={topic.image.url} alt={topic.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
