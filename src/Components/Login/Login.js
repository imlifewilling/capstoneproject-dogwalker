import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LoginwithGoogle from './LoginwithGoogle';
import LoginwithGithub from './LoginwithGithub';
import Loginwithcredentials from './Loginwithcredentials';


const Login = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" mb={3}>
          Returning User Sign in
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loginwithcredentials />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '-5%',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <LoginwithGithub />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <LoginwithGoogle />
            </div>
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default Login;