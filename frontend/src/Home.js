import React from 'react';
import './Banner.css';

const Home = () => {
  
  const CurvedBanner = () => {
    return (
      <div className="curved-banner" style={{ backgroundColor: '#93c570' }}>
        <div className="image-on-banner">
          <img src='/images/Bitterfloral Guard.png' className="image-on-banner" alt="Image-on-banner" />
        </div>
      </div>
    );
  };

  return (
    <div className="banner-container">
      <CurvedBanner />
    </div>
  );
};

export default Home;
