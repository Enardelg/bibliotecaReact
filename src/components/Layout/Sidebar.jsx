import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Toolbar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Book as BookIcon,
  People as PeopleIcon,
  SwapHoriz as LoanIcon
} from '@mui/icons-material';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, view: 'dashboard' },
    { text: 'Libros', icon: <BookIcon />, view: 'books' },
    { text: 'Usuarios', icon: <PeopleIcon />, view: 'users' },
    { text: 'Préstamos', icon: <LoanIcon />, view: 'loans' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            selected={activeView === item.view}
            onClick={() => setActiveView(item.view)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;