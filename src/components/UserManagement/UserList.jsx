import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Container,
  Box,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import AddUser from './AddUser';

const UserList = () => {
  const [users, setUsers] = useState(() => {
    const defaultUsers = [
      { id: 1, nombre: 'Maria Garcia', email: 'maria@example.com' },
      { id: 2, nombre: 'Juan Perez', email: 'juan@example.com' }
    ];
    try {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
    } catch {
      return defaultUsers;
    }
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmitUser = (userData) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        setUsers(prevUsers => {
          const updatedUsers = editingUser
            ? prevUsers.map(user => 
                user.id === editingUser.id ? userData : user
              )
            : [...prevUsers, userData];
          
          return updatedUsers;
        });
        setOpenDialog(false);
      } catch (err) {
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
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
        setOpenDeleteDialog(false);
      } catch (err) {
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" component="h1">
          Lista de Usuarios ({users.length})
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setEditingUser(null);
            setOpenDialog(true);
          }}
          startIcon={!loading && <span>+</span>}
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
          {users
            .filter(user => user?.nombre && user?.email)
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': { boxShadow: 3 }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {user.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {user.email}
                    </Typography>
                  </CardContent>
                  <Box sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 1,
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
                  }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setEditingUser(user);
                        setOpenDialog(true);
                      }}
                      disabled={loading}
                      sx={{ flex: 1 }}
                    >
                      EDITAR
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={() => handleConfirmDelete(user)}
                      disabled={loading}
                      sx={{ flex: 1 }}
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

      <Dialog
        open={openDeleteDialog}
        onClose={() => !loading && setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar permanentemente al usuario <strong>{userToDelete?.nombre}</strong> ({userToDelete?.email})?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)} 
            disabled={loading}
            color="primary"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteUser} 
            color="error" 
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar Eliminación'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;