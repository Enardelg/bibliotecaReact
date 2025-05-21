import React from 'react';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Switch,
  Box
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const AppBar = ({ darkMode, toggleDarkMode, activeView, setActiveView }) => {
  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Biblioteca Digital
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
          </Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} color="secondary" />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;