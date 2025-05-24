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

const CheckoutBook = ({ open, onClose, book, users, onCheckout }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleCheckout = () => {
    if (selectedUser) {
      onCheckout(parseInt(selectedUser));
      setSelectedUser('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Prestar Libro</DialogTitle>
      <DialogContent>
        {book && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">{book.titulo}</Typography>
            <Typography variant="body2" color="text.secondary">
              {book.autor} ({book.anio})
            </Typography>
          </Box>
        )}
        
        <FormControl fullWidth>
          <InputLabel>Seleccionar Usuario </InputLabel>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            label="Seleccionar Usuario"
          >
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.nombre} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleCheckout} 
          color="primary" 
          variant="contained"
          disabled={!selectedUser}
        >
          Confirmar Préstamo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutBook;