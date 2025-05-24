import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { blue, deepOrange } from '@mui/material/colors';

import AppBar from './components/Layout/AppBar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Layout/Dashboard';

const BOOKS_STORAGE_KEY = 'library-books-v2';
const USERS_STORAGE_KEY = 'library-users-v2';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadInitialData = () => {
      try {
        const savedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
        const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

        if (savedBooks) {
          setBooks(JSON.parse(savedBooks));
        } else {
          const initialBooks = [
            { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", año: 1967, genero: "Realismo mágico", disponible: true },
            { id: 2, titulo: "1984", autor: "George Orwell", año: 1949, genero: "Distopía", disponible: true },
            { id: 3, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", año: 1954, genero: "Fantasía", disponible: true }
          ];
          setBooks(initialBooks);
          localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
        }

        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        } else {
          const initialUsers = [
            { id: 1, nombre: "Ana García", email: "ana@email.com", librosPrestados: [] },
            { id: 2, nombre: "Carlos Rodríguez", email: "carlos@email.com", librosPrestados: [] }
          ];
          setUsers(initialUsers);
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    }
  }, [books, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, isInitialized]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: blue,
      secondary: deepOrange,
      background: {
        default: darkMode ? '#121212' : '#e5e5e5', // Cambio solicitado aquí
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? '#121212' : '#e5e5e5', // Fondo para el body
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleBookSubmit = (bookData) => {
    setBooks(prevBooks => {
      if (bookData.id) {
        return prevBooks.map(b => b.id === bookData.id ? bookData : b);
      } else {
        const newId = Math.max(...prevBooks.map(b => b.id), 0) + 1;
        return [...prevBooks, { ...bookData, id: newId }];
      }
    });
  };

  const handleUserSubmit = (userData) => {
    setUsers(prevUsers => {
      const exists = prevUsers.some(u => u.id === userData.id);
      if (exists) {
        return prevUsers.map(u => (u.id === userData.id ? userData : u));
      } else {
        const newId = Math.max(...prevUsers.map(u => u.id), 0) + 1;
        return [...prevUsers, { ...userData, id: newId, librosPrestados: [] }];
      }
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  };

  const handleDeleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const handleCheckout = (bookId, userId) => {
    setBooks(prevBooks =>
      prevBooks.map(b =>
        b.id === bookId ? { ...b, disponible: false, prestadoA: users.find(u => u.id === userId) } : b
      )
    );
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === userId
          ? { ...u, librosPrestados: [...u.librosPrestados, bookId] }
          : u
      )
    );
  };

  const handleReturn = (bookId) => {
    setBooks(prevBooks =>
      prevBooks.map(b =>
        b.id === bookId ? { ...b, disponible: true, prestadoA: null } : b
      )
    );
    setUsers(prevUsers =>
      prevUsers.map(u => ({
        ...u,
        librosPrestados: u.librosPrestados.filter(id => id !== bookId)
      }))
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
      }}>
        <AppBar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        {isInitialized && (
          <Dashboard 
            activeView={activeView}
            books={books}
            users={users}
            onBookSubmit={handleBookSubmit}
            onDeleteBook={handleDeleteBook}
            onCheckoutBook={handleCheckout}
            onReturnBook={handleReturn}
            onUserSubmit={handleUserSubmit}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;