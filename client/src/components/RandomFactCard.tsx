import React from 'react';
import { Typography, CardContent, Card, CardMedia, Button, CardActions } from '@mui/material';

interface RandomFactProps {
  fact: string;
  cover: string;
}

const RandomFactCard: React.FC<RandomFactProps> = ({ fact, cover }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 300, height: 400 }}>
      <CardMedia component="img" height="150" image={cover} alt="A randomly generated cover image" />
      <CardContent sx={{ maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="h5" component="h6" color="text.secondary">
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
