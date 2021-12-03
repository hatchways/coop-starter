import React from 'react';
import { Typography, CardContent, Card, CardMedia } from '@mui/material';

interface RandomFactProps {
  fact: string;
}

const RandomFactCard: React.FC<RandomFactProps> = ({ fact }) => {
  return (
    <Card sx={{ width: 300, height: 400 }}>
      <CardMedia
        component="img"
        height="150"
        image={`https://picsum.photos/300/200?${Date.now()}`}
        alt="A randomly generated image"
      />
      <CardContent sx={{ maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="h6" component="h6" color="text.secondary" sx={{ fontSize: '14' }}>
          Did you know that,
        </Typography>
        <Typography variant="body1">{fact}</Typography>
      </CardContent>
    </Card>
  );
};

export { RandomFactCard };
