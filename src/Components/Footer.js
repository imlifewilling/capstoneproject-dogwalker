import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';
const StyledFooter = styled('div')`
  position: relative,
  bottom: 0,
  left:0,
  width: 100%;
  background-color: #303030;
  text-align: center;
  margin-top: 0;
  padding: 5 0 20 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" color="#d3d3d3" sx={{ my: 1 }}>
        Contributers:
      </Typography>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item>
          <a
            href="https://github.com/imlifewilling"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Max Li
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://github.com/liulc006"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Luca Liu
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://github.com/lh257796"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Han Lu
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://github.com/kendalenz"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Kendal Enz
          </a>
        </Grid>
      </Grid>
    </StyledFooter>
  );
};

export default Footer;