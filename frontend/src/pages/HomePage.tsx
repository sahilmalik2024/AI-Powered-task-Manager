import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to the AI Task Manager
      </Typography>
      <Typography variant="body1">
        Manage your tasks efficiently with AI-driven prioritization.
      </Typography>
    </Container>
  );
};

export default HomePage;
