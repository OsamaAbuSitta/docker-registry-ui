import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      p={3}
    >
      <CircularProgress size={40} thickness={4} />
      <Typography
        variant="body1"
        color="textSecondary"
        style={{ marginTop: 16 }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingState;