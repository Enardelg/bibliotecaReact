import React, { useState } from 'react';
import {
  Button, Card, CardContent, Typography, Grid,
  Container, Box, Alert, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import AddUser from './AddUser';

const UserList = ({ users, onUserSubmit, onDeleteUser }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitUser = (userData) => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        onUserSubmit(userData);
        setOpenDialog(false);
      } catch {
        setError('Error al guardar el usuario');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleDeleteUser = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        onDeleteUser(userToDelete.id);
        setOpenDeleteDialog(false);
      } catch {
        setError('Error al eliminar el usuario');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleConfirmDelete = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Lista de Usuarios ({users.length})</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingUser(null);
            setOpenDialog(true);
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'AGREGAR USUARIO'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {users.length === 0 && !loading ? (
        <Alert severity="info">
          No hay usuarios registrados. Agrega tu primer usuario.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{user.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setEditingUser(user);
                      setOpenDialog(true);
                    }}
                    disabled={loading}
                  >
                    EDITAR
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleConfirmDelete(user)}
                    disabled={loading}
                  >
                    ELIMINAR
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <AddUser
        open={openDialog}
        onClose={() => !loading && setOpenDialog(false)}
        onSubmit={handleSubmitUser}
        editingUser={editingUser}
        loading={loading}
      />

      <Dialog open={openDeleteDialog} onClose={() => !loading && setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar al usuario <strong>{userToDelete?.nombre}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
