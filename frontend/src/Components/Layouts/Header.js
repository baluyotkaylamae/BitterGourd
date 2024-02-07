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
    <AppBar position="static">
      <Toolbar>
        <Box>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Arial', color: 'white' }}>
              BitterFloral Guard
            </Typography>
          </Link>
        </Box>


        <Box sx={{ flexGrow: 1 }} >
          <Button color="inherit" onClick={handleClick} sx={{ color: 'white' }}>
            Tutorials
          </Button>
          <Menu
            id="tutorials-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Tutorial 1</MenuItem>
            <MenuItem onClick={handleClose}>Tutorial 2</MenuItem>
            <MenuItem onClick={handleClose}>Tutorial 3</MenuItem>
          </Menu>

          <Button color="inherit" sx={{ color: 'white' }}>
            Tips/Recommendations
          </Button>

          <Link to="/form">
            <Button color="inherit" sx={{ color: 'white' }}>
              SURVEY
            </Button>
          </Link>

        </Box>

        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {userAuthenticated ? (
                user.avatar ? (
                  <Avatar
                    src={user.avatar.url}
                    alt={user.name}
                    sx={{ borderRadius: '50%' }}
                  />
                ) : null
              ) : (
                <Link to="/login" className="btn ml-4 Json-BTN" id="login_btn">
                  <Button className='Json-BTN'>Login</Button>
                </Link>
              )}
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
            {settings.map((setting, index) => (
              <MenuItem key={index} onClick={handleCloseUserMenu}>
                <Link to="/me" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{setting}</Typography>
                </Link>
              </MenuItem>
            ))}

            {user && user.role === 'admin' && (
              <MenuItem>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </Link>
              </MenuItem>
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
