import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import videoData from './videoData.json';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const StaticPageContent = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
        // Find the video in the videoData array based on its ID
        const selectedVideo = videoData.find(item => item.id === parseInt(videoId));
        setVideo(selectedVideo);

        // Filter out the current video from the list of related videos
        const filteredVideos = videoData.filter(item => item.id !== parseInt(videoId));
        setRelatedVideos(filteredVideos);
    }, [videoId]);

    if (!video) {
        return <div>Loading...</div>; // Placeholder while data is being fetched
    }

    // Shuffle the related videos array
    const shuffledRelatedVideos = relatedVideos.sort(() => Math.random() - 0.5);
    // Take only the first 3 videos
    const displayedRelatedVideos = shuffledRelatedVideos.slice(0, 3);

    return (
        <div className="static-page-content" style={{ background: '#f0f0f0' }}>
            <br />
            <Grid container spacing={4}>
                <Grid item xs={9} style={{ marginTop: '25px' }}>
                    <div className="video-container" style={{ display: 'inline-block', textAlign: 'left', borderRadius: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <iframe
                            width="1000"
                            height="600"
                            src={video.videoUrl}
                            title="YouTube video player"
                            style={{ borderRadius: '15px 15px 0 0' }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <CardContent style={{ background: 'white', borderRadius: '0px 0px 30px 30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <h2>{video.title}</h2>
                            <Typography variant="body1">Source: <a href={video.sourceLink}>{video.source}</a></Typography>
                            <Typography variant="body1">Video Link: <a href={video.videoLink}>{video.videoUrl}</a></Typography>
                        </CardContent>

                    </div>
                </Grid>
                <Grid item xs={3} style={{ marginTop: '-20px' }} container alignItems="flex-start">
                    <Box sx={{ p: 3, bgcolor: 'background.paper', maxWidth: '95%' }} style={{ background: '#f0f0f0' }}>
                        <div className="related-videos">
                            <Typography variant="h6">Related Videos</Typography>
                            {displayedRelatedVideos.map(relatedVideo => (
                                <Link to={`/staticvidcontent/${relatedVideo.id}`} className="video-link" key={relatedVideo.id}>
                                    <Card className="video-card" style={{ marginBottom: '20px', borderRadius: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' ,  height: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            height="140" // Set a fixed height for CardMedia
                                            image={relatedVideo.imageUrl}
                                            alt={relatedVideo.title}
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Maintain aspect ratio without stretching
                                        />
                                        <CardContent>
                                            <Typography variant="body2" sx={{ fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold' }}>{relatedVideo.title}</Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default StaticPageContent;
