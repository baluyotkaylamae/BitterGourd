import React, { useState } from 'react';
import '../Layouts/FH.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';

const drawerWidth = 240;

const Sidebar = () => {
  const [isQuestionOpen, setQuestionOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleQuestionToggle = () => {
    setQuestionOpen(!isQuestionOpen);
  };

  const ListItemLink = ({ to, primary, icon, onClick }) => (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      />
      <img src="/bitterguard-high-resolution-logo.png" alt="Bitterguard Logo" style={{ width: '100%' }} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <List>
            <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
            <ListItem disablePadding onClick={handleQuestionToggle}>
              <ListItemButton>
                <ListItemIcon><QuestionMarkIcon /></ListItemIcon>
                <ListItemText primary="Questions" />
                {isQuestionOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={isQuestionOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemLink to="/questions/create" primary="Create question" icon={<AddIcon />} />
                <ListItemLink to="/questions" primary="Questions List" icon={<FormatListBulleted />} />
              </List>
            </Collapse>
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          <List>
            <ListItem disablePadding>
              <img src="images/bitterguard-high-resolution-logo.png" alt="Bitterguard Logo" style={{ width: '100%' }} />
            </ListItem>
            <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
            <ListItem disablePadding onClick={handleQuestionToggle}>
              <ListItemButton>
                <ListItemIcon><QuestionMarkIcon /></ListItemIcon>
                <ListItemText primary="Questions" />
                {isQuestionOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={isQuestionOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemLink to="/questions/create" primary="Create question" icon={<AddIcon />} />
                <ListItemLink to="/questions" primary="Questions List" icon={<FormatListBulleted />} />
              </List>
            </Collapse>
          </List>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
