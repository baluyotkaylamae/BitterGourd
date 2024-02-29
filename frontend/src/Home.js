import React, { useEffect, useState } from 'react';
import './Banner.css';
import Posts from './Components/Post'; // Import the Posts component

const Home = () => {
  // Function to generate random position for fireflies
  const getRandomPosition = () => {
    return {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`
    };
  };

  // Function to generate random angle for fireflies
  const getRandomAngle = () => {
    return Math.random() * 360; // Random angle from 0 to 360 degrees
  };

  // State for fireflies
  const [fireflies, setFireflies] = useState([]);

  // useEffect hook for generating fireflies
  useEffect(() => {
    // Function to create a firefly
    const createFirefly = () => {
      const position = getRandomPosition();
      const angle = getRandomAngle();
      return {
        top: position.top,
        left: position.left,
        angle: angle,
        speed: Math.random() * 0.2 + 0.1, // Random speed from 0.1 to 0.3
        blinkDelay: Math.random() * 2 // Random delay for blinking animation
      };
    };

    // Function to update positions of fireflies
    const updateFireflies = () => {
      setFireflies(prevFireflies => {
        return prevFireflies.map(firefly => {
          // Calculate new position based on angle and speed
          const newTop = parseFloat(firefly.top) - firefly.speed * Math.sin(firefly.angle * Math.PI / 180);
          const newLeft = parseFloat(firefly.left) + firefly.speed * Math.cos(firefly.angle * Math.PI / 180);

          // Wrap around the viewport
          const wrappedTop = newTop < 0 ? '100vh' : (newTop > 100 ? '0' : newTop + 'vh');
          const wrappedLeft = newLeft < 0 ? '100vw' : (newLeft > 100 ? '0' : newLeft + 'vw');

          return { ...firefly, top: wrappedTop, left: wrappedLeft };
        });
      });
    };

    // Timer for updating positions of fireflies
    const timer = setInterval(updateFireflies, 100);

    // Create initial fireflies
    const initialFireflies = Array.from({ length: 50 }, createFirefly);
    setFireflies(initialFireflies);

    // Clear timer on component unmount
    return () => clearInterval(timer);
  }, []); // This is only triggered once when the component mounts

  return (
    <div className="home-container" style={{ background: 'linear-gradient(to bottom, #f8fca4, #ccfca4)' }}>
      <div className="banner-container">
        {/* Render fireflies */}
        {fireflies.map((firefly, index) => (
          <div key={index} className="firefly" style={{ top: firefly.top, left: firefly.left, animationDelay: `${firefly.blinkDelay}s` }}></div>
        ))}
        <div className="curved-banner">
          <div className="image-on-banner">
            <img src='/images/Bitterfloral Guard.png' className="image-on-banner" alt="Image-on-banner" />
          </div>
        </div>
      </div>
      <Posts /> {/* Render the Posts component here */}
    </div>
  );
};

export default Home;
