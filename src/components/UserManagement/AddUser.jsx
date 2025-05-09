import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from '@mui/material';

const AddUser = ({ open, onClose, onSubmit }) => {
  const [user, setUser] = useState({
    nombre: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(user);
    onClose();
    setUser({ nombre: '', email: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre completo"
              name="nombre"
              value={user.nombre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;