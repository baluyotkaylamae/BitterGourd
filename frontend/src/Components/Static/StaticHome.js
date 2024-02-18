import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './static.css'; // Import your CSS file for additional styling

const StaticHome = () => {
  return (
    <div>
      <br/>
      <h1>Information Videos</h1>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid1" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static1.jpg"
                alt="Save Female Flower"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Save Female Flower</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid2" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static2.jpg"
                alt="Identify Flower Gender"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Identify Flower Gender</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid3" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static3.jpg"
                alt="Hand Pollinate Bitter Gourd"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Hand Pollinate Bitter Gourd</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid4" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static4.jpg"
                alt="Remove Bitterness of Ampalaya"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Remove Bitterness of Ampalaya</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid5" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static5.jpg"
                alt="Save Female Flower"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Pruning Bitter Gourd</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid6" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static6.jpg"
                alt="Identify Flower Gender"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Types of Bitter Gourd</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid7" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static7.jpg"
                alt="Hand Pollinate Bitter Gourd"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">Health Benefits of Bitter Gourd</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to="/staticvid8" className="video-link">
            <Card className="video-card">
              <CardMedia
                component="img"
                height="250"
                image="/images/static8.jpg"
                alt="Remove Bitterness of Ampalaya"
              />
              <CardContent>
                <Typography variant="body1" className="video-title">What's the Bitter Melon Good For</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default StaticHome;