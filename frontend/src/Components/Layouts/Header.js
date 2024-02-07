// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import './FH.css';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { getUser, logout } from '../../utils/helpers';




const settings = ['Profile'];
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(getUser()); 
  const userAuthenticated = !!user; 
  const navigate = useNavigate();
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

  const handleLogout = () => {
    // Call the logout function to clear user data
    logout();
    setUser(null);
  
    window.location.href = '/';};

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ color: '#74E291' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Arial', color: 'white' }}>
          Bitter Gourd Pollination
        </Typography>

        <Button
          color="inherit"
          onClick={handleClick}
          aria-controls="tutorials-menu"
          aria-haspopup="true"
          sx={{ color: 'white' }}
        >
          Tutorials
        </Button>
        <Menu
          id="tutorials-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* Add your dropdown menu items related to Tutorials here */}
          <MenuItem onClick={handleClose}>Tutorial 1</MenuItem>
          <MenuItem onClick={handleClose}>Tutorial 2</MenuItem>
          <MenuItem onClick={handleClose}>Tutorial 3</MenuItem>
        </Menu>
        <Button color="inherit" sx={{ color: 'white' }}>
          Tips/Recommendations
        </Button>

        {/* <Button color="inherit">Menu Item 3</Button> */}
        {/* <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="profile"
          sx={{ color: '#74E291' }}
        >
          <AccountCircleIcon />
        </IconButton> */}
{/* profile */}

<Box sx={{ flexGrow: 0 }}>
        {userAuthenticated ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user.avatar ? (
                <Avatar
                  src={user.avatar.url}
                  alt={user.name}
                  sx={{ borderRadius: '50%' }} // Apply circular border-radius
                />
              ) : null}
            </IconButton>
          </Tooltip>
        ) : (
          <Link to="/login" className="btn ml-4 Json-BTN" id="login_btn">
            <Button className='Json-BTN'>Login</Button>
          </Link>
        )}
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

          {settings.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
             
                <Link to="/me" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{setting}</Typography>
                </Link>
              
            </MenuItem>
          ))}

          {user && user.role === 'admin' && (
                <Link to="/dashboard" style={{ textDecoration: 'none' , color: 'inherit' }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </Link>
                )}

          <MenuItem key={4} onClick={handleLogout}>
            <Typography textAlign="center" color="red">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>





      </Toolbar>
    </AppBar>
  );
};

export default Header;