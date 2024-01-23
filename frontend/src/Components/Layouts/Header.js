// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your Logo
        </Typography>
        <Button color="inherit">Menu Item 1</Button>
        <Button color="inherit">Menu Item 2</Button>
        <Button color="inherit">Menu Item 3</Button>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="profile"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
