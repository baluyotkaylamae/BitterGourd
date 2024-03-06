import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box, InputBase, Tooltip, Avatar, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ForumIcon from '@mui/icons-material/Forum';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GrassIcon from '@mui/icons-material/Grass';
import { getUser, logout } from '../../utils/helpers';
import './FH.css';

const settings = ['Profile'];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const user = getUser();
  const userAuthenticated = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleSearch = () => {
    // Redirect to search page with the search term as a query parameter
    navigate(`/search?q=${searchTerm}`);
  };

  useEffect(() => {
    // Clear search term when the location changes
    setSearchTerm('');
  }, [location]);

  return (
    <AppBar position="static" style={{ background: '#9cc255' }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Link to="/">
              <img src="/images/bitterguard-high-resolution-logo.png" alt="Bitter Gourd Logo" style={{ height: '60px', width: '80px' }} />
            </Link>
          </Grid>
          <Grid item flexGrow={1}>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '300px' }}> {/* Increase marginLeft value */}
              <IconButton style={{ color: 'black' }} onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                style={{ width: '600px', backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}
                onChange={handleChange}
                value={searchTerm}
              />
            </div>
          </Grid>

          <Grid item>
            <Link to="/statichome">
              <IconButton style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                <OndemandVideoIcon />
                Info Vid.
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/Tutorials">
              <IconButton style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                <LibraryBooksIcon />
                Tutorials
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/Tips">
              <IconButton style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                <FavoriteIcon />
                Tips/Recom.
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/Facts">
              <IconButton style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                <EmojiObjectsIcon />
                Facts
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/Types">
              <IconButton style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                <GrassIcon />
                Types
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            {userAuthenticated ? (
              <Link to="/forums">
                <IconButton style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                  <ForumIcon />
                  Forums
                </IconButton>
              </Link>
            ) : (
              <Tooltip title="Login required">
                <span>
                  <IconButton disabled style={{ color: 'black', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '18px' }}>
                    <ForumIcon />
                    Forums
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
