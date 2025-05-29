import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

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

  const handleCheckoutSubmit = (bookId, userId, user) => {
    onCheckoutBook(bookId, userId, user);
    setSnackbarMessage(`Libro prestado a: ${user.nombre}`);
    setSnackbarOpen(true);
  };

  const handleReturnSubmit = (bookId) => {
    const returnedBook = books.find(book => book.id === bookId);
    const user = returnedBook?.prestadoA ?
      users.find(u => u.id === returnedBook.prestadoA.id) : null;

    onReturnBook(bookId);
    setSnackbarMessage(
      user
        ? `Libro devuelto por: ${user.nombre}`
        : 'Libro devuelto exitosamente'
    );
    setSnackbarOpen(true);
    setReturnOpen(false);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Container maxWidth="xl">
        {activeView === 'dashboard' && (
          <>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LibraryBooksIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="h1">
                  Resumen de la Biblioteca
                </Typography>
              </Box>
              <BookStats books={books} users={users} />
            </Paper>
          </>
        )}

        {activeView === 'books' && (
          <>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BookIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h4" component="h1">
                    Gestión de Libros
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setSelectedBook(null);
                    setAddBookOpen(true);
                  }}
                  sx={{ height: 48 }}
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
            </Paper>
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
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SwapHorizIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="h1">
                  Sistema de Préstamos
                </Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setAddUserOpen(true)}
                    startIcon={<PeopleAltIcon />}
                    sx={{ py: 2, height: '100%' }}
                  >
                    Agregar Usuario
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => setReturnOpen(true)}
                    disabled={books.filter(b => !b.disponible).length === 0}
                    startIcon={<BookIcon />}
                    sx={{ py: 2, height: '100%' }}
                  >
                    Devolver Libro
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={3} sx={{ mb: 4, p: 0 }}>
              <CardHeader
                title={
                  <Typography variant="h6" component="div">
                    Libros Prestados Actualmente
                  </Typography>
                }
                avatar={
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <BookIcon />
                  </Avatar>
                }
                action={
                  <Chip
                    label={`${books.filter(b => !b.disponible).length} prestados`}
                    color="secondary"
                    sx={{ mr: 2 }}
                  />
                }
                sx={{
                  backgroundColor: (theme) => theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[800],
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              />

              <CardContent sx={{ p: 0 }}>
                {books.filter(b => !b.disponible).length === 0 ? (
                  <Box sx={{
                    textAlign: 'center',
                    py: 4,
                    backgroundColor: (theme) => theme.palette.mode === 'light'
                      ? theme.palette.grey[50]
                      : theme.palette.grey[900]
                  }}>
                    <BookIcon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      gutterBottom
                    >
                      No hay libros prestados actualmente
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Los libros prestados aparecerán aquí
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    {books
                      .filter(book => !book.disponible)
                      .map(book => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                          <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                              <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2
                              }}>
                                <BookIcon color="action" sx={{ mr: 1 }} />
                                <Typography
                                  variant="subtitle1"
                                  component="div"
                                  sx={{ fontWeight: 500 }}
                                >
                                  {book.titulo}
                                </Typography>
                              </Box>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                {book.autor}
                              </Typography>

                              <Divider sx={{ my: 1.5 }} />

                              <List dense disablePadding>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemAvatar>
                                    <Avatar sx={{
                                      width: 32,
                                      height: 32,
                                      bgcolor: 'primary.main'
                                    }}>
                                      <PersonIcon fontSize="small" />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body1">
                                        {book.prestadoA?.nombre || 'Usuario desconocido'}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography variant="body2" color="text.secondary">
                                        {book.prestadoA?.email || 'Sin email registrado'}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>

                              <Box sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <Chip
                                  label="Prestado"
                                  color="error"
                                  size="small"
                                  variant="outlined"
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  ID: {book.id}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                )}
              </CardContent>
            </Paper>
          </>
        )}

        <AddBook
          open={addBookOpen}
          onClose={() => setAddBookOpen(false)}
          onSubmit={(bookData) => {
            onBookSubmit(bookData);
            setSnackbarMessage(
              bookData.id
                ? 'Libro actualizado exitosamente'
                : 'Libro agregado exitosamente'
            );
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
          books={books}
          users={users}
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
