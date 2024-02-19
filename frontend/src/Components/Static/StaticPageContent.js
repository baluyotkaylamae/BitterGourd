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

    return (
        <div className="static-page-content">
            <br />
            <Grid container spacing={4}>
                <Grid item xs={9}>
                    <div className="video-container" style={{ display: 'inline-block', textAlign: 'left' }}>
                        <h1>{video.title}</h1>
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
                        <CardContent>
                            <Typography variant="body1">Source: <a href={video.sourceLink}>{video.source}</a></Typography>
                            <Typography variant="body1">Video Link: <a href={video.videoLink}>{video.videoUrl}</a></Typography>
                        </CardContent>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{ p: 4, bgcolor: 'background.paper', maxWidth: '95%' }}>
                        <div className="related-videos">
                            <Typography variant="h6">Related Videos</Typography>
                            {relatedVideos.map(relatedVideo => (
                                <Link to={`/staticvidcontent/${relatedVideo.id}`} className="video-link" key={relatedVideo.id}>
                                    <Card className="video-card" style={{ marginBottom: '20px', borderRadius: '15px' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={relatedVideo.imageUrl}
                                            alt={relatedVideo.title}
                                            style={{ borderRadius: '15px 15px 0 0' }}
                                        />
                                        <CardContent>
                                            <Typography variant="body2">{relatedVideo.title}</Typography>
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
