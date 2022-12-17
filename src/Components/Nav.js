import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard'];


const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(state=>state);

    const pages = [{name: 'Find a Walker', link: '/services'}, {name: 'Become a Walker', link: '/BecomeAWalker'}, {name: 'Find an owner', link: '/owners'}];
    const settings = [{name: 'Profile', link: `/users/${auth.id}`}];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const loggingout = () => {
      dispatch(logout());
      navigate('/');
    };

    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Box component="a" href="/" sx={{display: { xs: 'none', md: 'flex' }, mr: 1}}>
              <img src="/static/images/GOJI_LOGO.png" style={{width: '200', height: '50', objectFit:'contain'}}/>
            </Box>

            {/* MOBILE */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.link}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* MOBILE */}
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Box sx={{display: { xs: 'flex', md: 'none' }, mr: 1}}>
              <img src="/static/images/dog-icon.jpg" style={{width: '50', height: '50', borderRadius:'50%'}}/>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MOBILE LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link} to={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {!!auth.id ?
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={ auth.firstname } src={ auth.avatar } />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" component={Link} to={setting.link}
                      >{setting.name}</Typography>
                    </MenuItem>
                  ))}
                    {auth?.isWalker ?
                    <MenuItem key={'myService'} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" component={Link} to={`/walkers/${auth?.id}/services`}>My Services</Typography>
                    </MenuItem>:''}
                    <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={loggingout}>Logout</Typography>
                    </MenuItem>
                </Menu>
              </Box>
            :
              <Typography textAlign="center" component={Link} to='/login'
              sx={{color:'white', textDecoration:'none'}}>
                Login | Sign Up
              </Typography>
          }
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default Nav;
