import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from '@mui/material';

const AddUser = ({ open, onClose, onSubmit, onDelete, editingUser }) => {
  const [user, setUser] = useState({
    nombre: '',
    email: ''
  });

  // Cargar datos del usuario a editar cuando editingUser cambia
  useEffect(() => {
    if (editingUser) {
      setUser({
        nombre: editingUser.nombre,
        email: editingUser.email
      });
    } else {
      setUser({ nombre: '', email: '' }); // Si no hay usuario, limpiar el form
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const usuarioFinal = editingUser
      ? { ...editingUser, ...user } // conservar el id si está editando
      : { ...user, id: Date.now() }; // crear id único si es nuevo

    onSubmit(usuarioFinal);
    onClose();
    setUser({ nombre: '', email: '' });
  };

  const handleDelete = () => {
    if (editingUser && editingUser.id) {
      onDelete(editingUser.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</DialogTitle>
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
        {editingUser && (
          <Button onClick={handleDelete} color="error" sx={{ mr: 'auto' }}>
            Eliminar
          </Button>
        )}
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {editingUser ? 'Guardar cambios' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;