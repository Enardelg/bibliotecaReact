import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  CircularProgress
} from '@mui/material';

const AddUser = ({ 
  open, 
  onClose, 
  onSubmit, 
  onDelete, 
  editingUser, 
  loading 
}) => {
  const [user, setUser] = useState({
    nombre: '',
    email: ''
  });

  // Cargar datos del usuario a editar
  useEffect(() => {
    if (editingUser) {
      setUser({
        nombre: editingUser.nombre,
        email: editingUser.email
      });
    } else {
      setUser({ nombre: '', email: '' });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!user.nombre || !user.email) return;
    
    const usuarioFinal = editingUser
      ? { ...editingUser, ...user }
      : { ...user, id: Date.now() };

    onSubmit(usuarioFinal);
  };

  const handleDelete = () => {
    if (editingUser?.id) {
      onDelete(editingUser.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
      </DialogTitle>
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
              disabled={loading}
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
              disabled={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {editingUser && (
          <Button 
            onClick={handleDelete} 
            color="error" 
            sx={{ mr: 'auto' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Eliminar'}
          </Button>
        )}
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={loading || !user.nombre || !user.email}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : editingUser ? (
            'Guardar cambios'
          ) : (
            'Agregar'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;