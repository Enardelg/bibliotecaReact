import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { blue, deepOrange } from '@mui/material/colors';

import AppBar from './components/Layout/AppBar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Layout/Dashboard';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initialBooks = [
      { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", anio: 1967, genero: "Realismo mágico", disponible: true },
      { id: 2, titulo: "1984", autor: "George Orwell", anio: 1949, genero: "Distopía", disponible: true },
      { id: 3, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", anio: 1954, genero: "Fantasía", disponible: true },
      { id: 4, titulo: "Orgullo y prejuicio", autor: "Jane Austen", anio: 1813, genero: "Novela romántica", disponible: true },
      { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", anio: 1605, genero: "Novela", disponible: true },
    ];
    setBooks(initialBooks);

    const initialUsers = [
      { id: 1, nombre: "Ana García", email: "ana.garcia@email.com", librosPrestados: [] },
      { id: 2, nombre: "Carlos Rodríguez", email: "carlos.rodriguez@email.com", librosPrestados: [] },
      { id: 3, nombre: "María López", email: "maria.lopez@email.com", librosPrestados: [] },
    ];
    setUsers(initialUsers);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: blue,
      secondary: deepOrange,
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <Dashboard 
          activeView={activeView} 
          books={books} 
          users={users} 
          setBooks={setBooks} 
          setUsers={setUsers} 
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;