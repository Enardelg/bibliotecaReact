import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

const BookList = ({ books, onEdit, onDelete, onCheckout, users }) => {
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getBorrowerInfo = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.nombre} (${user.email})` : 'Usuario desconocido';
  };

  const handleCheckoutClick = (bookId) => {
    setSelectedBookId(bookId);
    setCheckoutDialogOpen(true);
    setSelectedUserId('');
  };

  const handleCheckoutConfirm = async () => {
    if (selectedBookId && selectedUserId) {
      setLoading(true);
      try {
        await onCheckout(selectedBookId, parseInt(selectedUserId));
        setSnackbarMessage('Libro prestado exitosamente');
        setSnackbarOpen(true);
        setCheckoutDialogOpen(false);
      } catch (error) {
        setSnackbarMessage('Error al prestar el libro');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  <BookIcon />
                </Avatar>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.titulo}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.autor}
                </Typography>
                <Typography variant="body2" paragraph>
                  Año: {book.año} | Género: {book.genero}
                </Typography>
                <Chip 
                  label={book.disponible ? 'Disponible' : `Prestado a: ${getBorrowerInfo(book.userId)}`} 
                  color={book.disponible ? 'success' : 'error'} 
                  size="small" 
                />
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => onEdit(book)}
                >
                  Editar
                </Button>
                <Button 
                  size="small" 
                  color="error"
                  onClick={() => {
                    setBookToDelete(book);
                    setDeleteDialogOpen(true);
                  }}
                >
                  Eliminar
                </Button>
                {book.disponible && (
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={() => handleCheckoutClick(book.id)}
                  >
                    Prestar
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo para seleccionar usuario al prestar */}
      <Dialog open={checkoutDialogOpen} onClose={() => !loading && setCheckoutDialogOpen(false)}>
        <DialogTitle>Prestar libro</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Seleccionar usuario"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            <MenuItem value="">
              <em>Seleccione un usuario</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.nombre} ({user.email})
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutDialogOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleCheckoutConfirm} 
            color="primary"
            disabled={!selectedUserId || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar préstamo'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar libro */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>¿Eliminar libro?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que deseas eliminar <strong>{bookToDelete?.titulo}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete(bookToDelete.id);
              setDeleteDialogOpen(false);
            }}
          >
            Confirmar eliminación
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default BookList;