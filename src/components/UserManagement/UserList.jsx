import React, { useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Container,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import AddUser from './AddUser';

const UserList = () => {
  // Cargar usuarios desde localStorage al iniciar
  const [users, setUsers] = React.useState(() => {
    try {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [
        { id: 1, nombre: 'Maria Garcia', email: 'maria@example.com' },
        { id: 2, nombre: 'Juan Perez', email: 'juan@example.com' }
      ];
    } catch {
      return [];
    }
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Persistir datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmitUser = (userData) => {
    setLoading(true);
    setError(null);

    // Simular tiempo de espera para operación
    setTimeout(() => {
      try {
        setUsers(prevUsers => {
          const updatedUsers = editingUser
            ? prevUsers.map(user => 
                user.id === editingUser.id ? userData : user
              )
            : [...prevUsers, { ...userData, id: Date.now() }];
          
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

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setOpenDialog(false);
      } catch (err) {
        setError('Error al eliminar el usuario');
      } finally {
        setLoading(false);
      }
    }, 500);
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
          onClick={() => handleOpenDialog()}
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
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {user.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {user.email}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleOpenDialog(user)}
                      disabled={loading}
                    >
                      EDITAR
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
        onDelete={handleDeleteUser}
        editingUser={editingUser}
        loading={loading}
      />
    </Container>
  );
};

export default UserList;