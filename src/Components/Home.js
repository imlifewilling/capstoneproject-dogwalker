import React from 'react';
import HomeBanner from './HomeBanner';
import { Typography, Container, Box, Divider } from '@mui/material';


const Home = () => {
 
  return (
    <>
      <HomeBanner />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" mt={4} mb={6} align="center" 
          sx={{
            fontWeight: 'bold',
            margin: '48 0 0 0'
          }}
        >
          When you are busy, we are here to help
        </Typography>
        <Typography variant="h6" mt={4} mb={6} align="center" 
          sx={{
            width: '70%',
            margin: '20 0'
          }}
        >
        You must be worry about your dog when you have a super busy day at work. 
        Instead of worrying you dog all the tie, book a dog walker to give your dog a happy walk. 
        We can stop by as many times as you need—on whatever days you need them.
        </Typography>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" mt={4} mb={6} align="center" 
            sx={{
              fontWeight: 'bold',
              margin: '20 0 20 0'
            }}
          >
            3 steps to find a perfect dog walker
          </Typography>
          <div className = "steps">
              <div className = "stepline" />
              <div className='nums'>
                <div className = "stepnum"><div className='num'>1</div></div>
                <div className = "stepnum"><div className='num'>2</div></div>
                <div className = "stepnum"><div className='num'>3</div></div>
              </div>
          </div>
          <Box>
            image
          </Box>
      </Container>
    </>
  );
};

export default Home;