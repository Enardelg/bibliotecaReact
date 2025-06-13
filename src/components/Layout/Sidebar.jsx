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
  SwapHoriz as LoanIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <List>
        <ListItem
          button
          selected={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Resumen" />
        </ListItem>

        <ListItem
          button
          selected={activeView === 'books'}
          onClick={() => setActiveView('books')}
        >
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Libros" />
        </ListItem>

        <ListItem
          button
          selected={activeView === 'users'}
          onClick={() => setActiveView('users')}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>

        <ListItem
          button
          selected={activeView === 'loans'}
          onClick={() => setActiveView('loans')}
        >
          <ListItemIcon>
            <LoanIcon />
          </ListItemIcon>
          <ListItemText primary="Préstamos" />
        </ListItem>

        <ListItem
          button
          selected={activeView === 'genres'}
          onClick={() => setActiveView('genres')}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Gestión de Géneros" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar
