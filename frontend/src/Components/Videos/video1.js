import React from 'react';
import '../post.css'; // Import the CSS file for VideoDetails component

const VideoDetails = () => {
    return (
        <div className="container mt-3 video-details-container">
            <h1 style={{ textAlign: 'justify' }}>How to Cultivate Ampalaya?</h1>
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BBuTWmSIpnY"
                title="Ampalaya Cultivation Video"
                frameBorder="0"
                allowFullScreen
                className="post-video"
            ></iframe>
        </div>
    );
};

export default VideoDetails;
