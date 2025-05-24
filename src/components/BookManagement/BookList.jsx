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
  CircularProgress,
  Divider,
  Paper,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { Book as BookIcon, Edit, Delete, Send } from '@mui/icons-material';

const BookList = ({ books, onEdit, onDelete, onCheckout, users }) => {
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckoutClick = (bookId) => {
    setSelectedBookId(bookId);
    setCheckoutDialogOpen(true);
  };

  const handleCheckoutConfirm = async () => {
    if (selectedBookId && selectedUserId) {
      setLoading(true);
      try {
        const selectedUser = users.find(u => u.id === parseInt(selectedUserId));
        if (selectedUser) {
          await onCheckout(selectedBookId, parseInt(selectedUserId), selectedUser);
          setSnackbarMessage(`Libro prestado a: ${selectedUser.nombre}`);
          setSnackbarOpen(true);
          setCheckoutDialogOpen(false);
          setSelectedUserId('');
        }
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
            <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'none' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: book.disponible ? 'success.main' : 'error.main', 
                      mr: 2,
                      width: 48,
                      height: 48
                    }}>
                      <BookIcon fontSize="medium" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {book.titulo}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {book.autor}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <List dense disablePadding>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Año de publicación"
                        secondary={book.año}
                        secondaryTypographyProps={{ color: 'text.primary' }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Género"
                        secondary={book.genero}
                        secondaryTypographyProps={{ color: 'text.primary' }}
                      />
                    </ListItem>
                  </List>

                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={book.disponible ? 'Disponible' : `Prestado a: ${book.prestadoA?.nombre || 'Usuario desconocido'}`} 
                      color={book.disponible ? 'success' : 'error'} 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500,
                        borderWidth: 2,
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ 
                  p: 2, 
                  justifyContent: 'flex-end',
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Button
                    size="small"
                    startIcon={<Edit fontSize="small" />}
                    onClick={() => onEdit(book)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete fontSize="small" />}
                    color="error"
                    onClick={() => {
                      setBookToDelete(book);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Eliminar
                  </Button>
                  {book.disponible && (
                    <Button
                      size="small"
                      startIcon={<Send fontSize="small" />}
                      color="secondary"
                      variant="contained"
                      onClick={() => handleCheckoutClick(book.id)}
                    >
                      Prestar
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo para seleccionar usuario al prestar */}
      <Dialog open={checkoutDialogOpen} onClose={() => !loading && setCheckoutDialogOpen(false)}>
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 2
        }}>
          Prestar libro
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            select
            fullWidth
            label="Seleccionar usuario"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            sx={{ mt: 2 }}
            disabled={loading}
            variant="outlined"
            size="small"
          >
            <MenuItem value="">
              <em>Seleccione un usuario</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    width: 24, 
                    height: 24, 
                    mr: 2,
                    bgcolor: 'primary.main',
                    fontSize: '0.8rem'
                  }}>
                    {user.nombre.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1">{user.nombre}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setCheckoutDialogOpen(false)} 
            disabled={loading}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleCheckoutConfirm} 
            color="primary"
            variant="contained"
            disabled={!selectedUserId || loading}
            sx={{ ml: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar préstamo'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar libro */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ 
          bgcolor: 'error.main', 
          color: 'error.contrastText',
          py: 2
        }}>
          ¿Eliminar libro?
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BookIcon color="error" sx={{ mr: 2 }} />
            <Typography variant="body1">
              ¿Estás seguro que deseas eliminar <strong>{bookToDelete?.titulo}</strong>?
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete(bookToDelete.id);
              setDeleteDialogOpen(false);
            }}
            sx={{ ml: 1 }}
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
          elevation={6}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookList;