import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import videoData from './videoData.json'; // Adjust the path accordingly

const StaticHome = () => {
  return (
    <div>
      <br />
      <h1>Information Videos</h1>
      <br />
      <Grid container spacing={2}>
        {videoData.map((video) => (
          <Grid item xs={12} md={3} key={video.id}>
            <Link to={`/staticvidcontent/${video.id}`} className="video-link">
              <Card className="video-card">
                <CardMedia
                  component="img"
                  height="250"
                  image={video.imageUrl}
                  alt={video.title}
                  style={{ borderRadius: '15px 15px 0 0' }}
                />
                <CardContent>
                  <Typography variant="body1" className="video-title">{video.title}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StaticHome;
