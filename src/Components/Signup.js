import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../store';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    password_confirm: '',
  });

  const onChange = (ev) => {
    setInputs({ ...inputs, [ev.target.name]: ev.target.value });
  };

  //control the hiden of pswd
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };

  const onsubmit = (ev) => {
    ev.preventDefault();
    if (inputs.password === inputs.password_confirm) {
      const userinput = {
        password: inputs.password,
        email: inputs.email,
      };
      dispatch(signupUser(userinput, navigate));
    } else {
      alert("The password confirmation doesn't match");
    }
  };
  return (
    <Box className='signup'>
      <Typography 
        className='signupTitle'
        variant="h2" mb={3}
      >
        New User Sign up
      </Typography>
      <div className = 'wrapper'>
            <div className = 'left'>
                <Typography variant="h5">Create an Account</Typography>
                <form
                  onSubmit={onsubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                        margin: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                  >
                    <FormControl sx={{ m: 1, width: '25ch'}} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password" >Email</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        value={inputs.email}
                        onChange={onChange}
                        name="email"
                        label="Email"
                      />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={inputs.password}
                        onChange={onChange}
                        name="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={inputs.password_confirm}
                        onChange={onChange}
                        name="password_confirm"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                    </FormControl>
                  </div>
                  
                  <Button variant="contained" onClick={onsubmit} >
                    Sign up
                  </Button>
                </form>
            </div>

            <div className = "center">
                <div className = "line" />
                <div className = "or">OR</div>
            </div>

            <div className = "right">
                <Typography variant="h5" mb={3}>
                    Already have an Account?
                </Typography>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained"> Sign in</Button>
                </Link>
            </div>
      </div>
    </Box>
  );
};

export default Signup;