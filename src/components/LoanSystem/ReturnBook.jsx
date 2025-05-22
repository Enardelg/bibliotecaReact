import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';

const ReturnBook = ({ open, onClose, books, users, onSubmit }) => {
  const [selectedBook, setSelectedBook] = useState('');
  
  // Filtrar solo libros que están prestados
  const borrowedBooks = books.filter(book => !book.disponible);
  
  // Obtener usuario que tiene prestado el libro seleccionado
  const getUserForBook = (bookId) => {
    if (!bookId) return null;
    const book = books.find(b => b.id === parseInt(bookId));
    if (!book || !book.prestadoA) return null;
    return users.find(user => user.id === book.prestadoA.id);
  };

  const selectedUser = getUserForBook(selectedBook);

  const handleReturn = () => {
    if (selectedBook) {
      onSubmit(parseInt(selectedBook));
      setSelectedBook('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Devolver Libro</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Seleccionar Libro</InputLabel>
            <Select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              label="Seleccionar Libro"
            >
              {borrowedBooks.map(book => (
                <MenuItem key={book.id} value={book.id}>
                  {book.titulo} ({book.autor}) - Prestado a: {book.prestadoA?.nombre || 'Usuario desconocido'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedUser && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Usuario que tiene el libro:
              </Typography>
              <Typography>
                {selectedUser.nombre} ({selectedUser.email})
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleReturn} 
          color="primary" 
          variant="contained"
          disabled={!selectedBook}
        >
          Confirmar Devolución
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnBook;