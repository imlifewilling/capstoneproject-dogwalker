import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const StyledBanner = styled('div')`
  position: relative;
  width: 100%;
  height: 80%;
  margin-top: 2;
  margin-buttom: 40;
  padding: 30 0;
  background-image: url('../static/images/homebanner.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  transition: opacity 3s;
`;
const StyleContent = styled('div')`
  text-align: center;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Banner = () => {
  const navigate = useNavigate();
  return (
    <StyledBanner>
      <StyleContent>
        <Typography variant='h1' sx={{ my: 4 }} color = "#2E86C1">
          Walk with Our Friends
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate('/services')}
        >
          Book a Walk
        </Button>
      </StyleContent>
    </StyledBanner>
  );
};

export default Banner;