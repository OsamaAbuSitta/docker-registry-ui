import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center',
          py: 4,
        }}
      >
        <WarningIcon
          sx={{
            fontSize: 64,
            color: 'error.main',
            mb: 2,
          }}
        />
        <Typography variant="h5" gutterBottom color="error">
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: '80%' }}
        >
          {message}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            color="primary"
            onClick={onRetry}
            sx={{
              mt: 2,
              px: 4,
              py: 1,
              borderRadius: 2,
            }}
          >
            Try Again
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ErrorPage;