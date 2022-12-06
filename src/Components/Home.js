import React from 'react';
import HomeBanner from './HomeBanner';
import { Typography, Container, Box } from '@mui/material';


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
        Instead of worrying you dog all the time, book a dog walker to give your dog a happy walk. 
        We are always ready here for our friends.
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
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src = '../static/images/findicon.png' width="90" height="90"/>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold', margin: '20 0 5 0'}}>Search walkers</Typography>
                <Typography variant="h6" align="center">Search to find dog walkers around you</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src = '../static/images/messageicon.webp' width="90" height="90"/>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold', margin: '20 0 5 0'}}>Interview walkers</Typography>
                <Typography variant="h6" align="center">Interview walkers to find the best one</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src = '../static/images/payment.jpg' width="90" height="90"/>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" align="center" sx={{fontWeight: 'bold', margin: '20 0 5 0'}}>Book and pay</Typography>
                <Typography variant="h6" align="center">Book the walking time and pay for the service</Typography>
              </Box>
            </Box>
          </Container>
      </Container>
    </>
  );
};

export default Home;