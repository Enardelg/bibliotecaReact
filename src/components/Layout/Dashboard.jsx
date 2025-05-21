import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Snackbar,
  Alert 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import BookList from '../BookManagement/BookList';
import AddBook from '../BookManagement/AddBook';
import BookStats from '../BookManagement/BookStats';
import UserList from '../UserManagement/UserList';
import AddUser from '../UserManagement/AddUser';
import ReturnBook from '../LoanSystem/ReturnBook';

const Dashboard = ({ 
  activeView, 
  books, 
  users,
  onBookSubmit,
  onUserSubmit,
  onDeleteBook,
  onCheckoutBook,
  onReturnBook,
  onDeleteUser
}) => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddUser = (newUser) => {
    onUserSubmit(newUser);
    setSnackbarMessage('Usuario agregado exitosamente');
    setSnackbarOpen(true);
    setAddUserOpen(false);
  };

  const handleDeleteUser = (userId) => {
    onDeleteUser(userId);
    setSnackbarMessage('Usuario eliminado exitosamente');
    setSnackbarOpen(true);
  };

  const handleCheckoutSubmit = (bookId, userId) => {
    const user = users.find(u => u.id === userId);
    onCheckoutBook(bookId, userId);
    setSnackbarMessage(`Libro prestado a: ${user.nombre}`);
    setSnackbarOpen(true);
  };

  const handleReturnSubmit = (bookId) => {
    onReturnBook(bookId);
    setSnackbarMessage('Libro devuelto exitosamente');
    setSnackbarOpen(true);
    setReturnOpen(false);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Container maxWidth="xl">
        {activeView === 'dashboard' && (
          <>
            <Typography variant="h4" gutterBottom>
              Resumen de la Biblioteca
            </Typography>
            <BookStats books={books} users={users} />
          </>
        )}

        {activeView === 'books' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                Gestión de Libros
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedBook(null);
                  setAddBookOpen(true);
                }}
              >
                Agregar Libro
              </Button>
            </Box>
            <BookList 
              books={books} 
              users={users}
              onEdit={(book) => {
                setSelectedBook(book);
                setAddBookOpen(true);
              }}
              onDelete={onDeleteBook}
              onCheckout={handleCheckoutSubmit}
            />
          </>
        )}

        {activeView === 'users' && (
          <UserList 
            users={users} 
            onUserSubmit={handleAddUser} 
            onDeleteUser={handleDeleteUser}
          />
        )}

        {activeView === 'loans' && (
          <>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              Sistema de Préstamos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button variant="contained" onClick={() => setAddUserOpen(true)}>
                Agregar Usuario
              </Button>
              <Button
                variant="contained"
                onClick={() => setReturnOpen(true)}
                disabled={books.filter(b => !b.disponible).length === 0}
              >
                Devolver Libro
              </Button>
            </Box>
          </>
        )}

        <AddBook
          open={addBookOpen}
          onClose={() => setAddBookOpen(false)}
          onSubmit={(bookData) => {
            onBookSubmit(bookData);
            setSnackbarMessage(bookData.id ? 'Libro actualizado exitosamente' : 'Libro agregado exitosamente');
            setSnackbarOpen(true);
            setAddBookOpen(false);
          }}
          initialData={selectedBook}
        />

        <AddUser
          open={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          onSubmit={handleAddUser}
        />

        <ReturnBook
          open={returnOpen}
          onClose={() => setReturnOpen(false)}
          books={books.filter(b => !b.disponible)}
          onSubmit={handleReturnSubmit}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard;


