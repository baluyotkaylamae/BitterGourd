import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { getUser, logout } from '../../utils/helpers';
import './FH.css';

const settings = ['Profile'];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = getUser();
  const userAuthenticated = !!user;
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <AppBar position="static" style={{ background: 'linear-gradient(to right, #93c570, #a5d582)' }}>
      <Toolbar>
        <Link to="/">
          <img src="/images/bitterguard-high-resolution-logo.png" alt="Bitter Gourd Logo" style={{ height: '40px' }} />
        </Link>


        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          className="text-ye text-black"
          style={{ textAlign: 'left' }}
          href="/"
        >
          BitterFloral Guard
        </Typography>


        <Link to="/tutorials">
        <Button className="text-black" color="inherit" sx={{ mr: 2 }}>
          Tutorials
        </Button>
      </Link>
      <Link to="/Tips">
        <Button className="text-black" color="inherit" sx={{ mr: 2 }}>
          Tips/Recommendations
        </Button>
      </Link>
      <Link to="/Facts">
        <Button className="text-black" color="inherit" sx={{ mr: 2 }}>
          Facts
        </Button>
      </Link>


        <Box>
          {userAuthenticated ? (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                {user.avatar ? (
                  <Avatar src={user.avatar.url} alt={user.name} />
                ) : null}
              </IconButton>
            </Tooltip>
          ) : (
            <Link to="/login" className="btn ml-4 Json-BTN" id="login_btn">
              <Button className='Json-BTN'>Login</Button>
            </Link>
          )}

          <Menu
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
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              </Link>
            )}
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center" color="red">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;