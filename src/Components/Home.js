import React from 'react';
import { useSelector } from 'react-redux';
import HomeBanner from './HomeBanner';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Container, Box, Grid } from '@mui/material';


const Home = () => {
 
  return (
    <>
      <HomeBanner />
      <Container>
        <Typography variant="h6" mt={4} mb={6} align="center">
          some nice description here.
        </Typography>
      </Container>
    </>
  );
};

export default Home;