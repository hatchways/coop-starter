import React from 'react';
import { Typography, CardContent, Card, CardMedia, Button, CardActions } from '@mui/material';

interface RandomFactProps {
  fact: string;
}

const RandomFactCard: React.FC<RandomFactProps> = ({ fact }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 300, height: 400 }}>
      <CardMedia
        component="img"
        height="150"
        /* NOTE: The url is appended with a unique query string to
                 circumvent caching. Since the url is the same 
                 otherwise, browsers would only generate 1 image. */
        image={`https://picsum.photos/300/200?${Date.now()}`}
        alt="A randomly generated image"
      />
      <CardContent sx={{ maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="h6" component="h6" color="text.secondary" sx={{ fontSize: '14' }}>
          Did you know that,
        </Typography>
        <Typography variant="body1">{fact}</Typography>
      </CardContent>
      <CardActions sx={{ flex: '1 0 auto', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Nice!
        </Button>
        <Button variant="contained" color="error">
          Meh.
        </Button>
      </CardActions>
    </Card>
  );
};

export { RandomFactCard };
