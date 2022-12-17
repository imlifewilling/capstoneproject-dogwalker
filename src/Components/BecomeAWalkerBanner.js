import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const StyledBanner = styled('div')`
  position: relative;
  width: 100%;
  height: 90%;
  margin-top: 2;
  margin-buttom: 40;
  padding: 30 2;
  background-image: url('../static/images/bulldogowner.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  transition: opacity 3s;
`;
const StyleContent = styled('div')`
  text-align: center;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const BecomeAWalkerBanner = () => {
  const {auth} = useSelector(state=>state)
  const navigate = useNavigate();
  return (
    <StyledBanner>
      <StyleContent>
        <Typography variant='h1' sx={{ my: 4 }} color = "white">
          BECOME A GOJI WALKER
        </Typography>
        {auth.id?
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate(`/users/${auth.id}`)}
        >
          Update Your Profile
        </Button>
        :
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate('/signup')}
        >
          Create a profile
        </Button>
        }
      </StyleContent>
    </StyledBanner>
  );
};

export default BecomeAWalkerBanner;
