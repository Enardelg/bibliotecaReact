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

const ReturnBook = ({ open, onClose, books, users, onReturn }) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleReturn = () => {
    if (selectedBook && selectedUser) {
      onReturn(parseInt(selectedBook), parseInt(selectedUser));
      setSelectedBook('');
      setSelectedUser('');
      onClose();
    }
  };

  const availableUsers = selectedBook 
    ? users.filter(user => user.librosPrestados.includes(parseInt(selectedBook)))
    : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Devolver Libro</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Seleccionar Libro</InputLabel>
            <Select
              value={selectedBook}
              onChange={(e) => {
                setSelectedBook(e.target.value);
                setSelectedUser('');
              }}
              label="Seleccionar Libro"
            >
              {books.map(book => (
                <MenuItem key={book.id} value={book.id}>
                  {book.titulo} ({book.autor})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Seleccionar Usuario</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="Seleccionar Usuario"
              disabled={!selectedBook || availableUsers.length === 0}
            >
              {availableUsers.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.nombre} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleReturn} 
          color="primary" 
          variant="contained"
          disabled={!selectedBook || !selectedUser}
        >
          Confirmar Devolución
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnBook;