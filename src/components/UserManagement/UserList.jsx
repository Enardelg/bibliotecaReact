import React from 'react';
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
  const [users, setUsers] = React.useState([
    { id: 1, nombre: 'Maria Garcia', email: 'maria@example.com' },
    { id: 2, nombre: 'Juan Perez', email: 'juan@example.com' }
  ]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [newUserData, setNewUserData] = React.useState({ nombre: '', email: '' });

  // Función unificada para guardar usuarios (nuevos o editados)
  const handleSubmitUser = (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulamos una llamada API asíncrona
      setTimeout(() => {
        if (editingUser) {
          setUsers(users.map(user => 
            user.id === editingUser.id ? userData : user
          ));
        } else {
          setUsers([...users, { ...userData, id: Date.now() }]);
        }
        setOpenDialog(false);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Error al guardar el usuario');
      setLoading(false);
    }
  };

  // Abrir diálogo para agregar o editar
  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setNewUserData(user ? { ...user } : { nombre: '', email: '' });
    setOpenDialog(true);
  };

  // Eliminar usuario
  const handleDeleteUser = (userId) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setUsers(users.filter(user => user.id !== userId));
        setOpenDialog(false);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Error al eliminar el usuario');
      setLoading(false);
    }
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
          Lista de Usuarios
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenDialog()}
          startIcon={<span>+</span>}
          disabled={loading}
        >
          AGREGAR USUARIO
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
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
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmitUser}
        onDelete={handleDeleteUser}
        editingUser={editingUser}
        newUserData={newUserData}
        setNewUserData={setNewUserData}
        loading={loading}
      />
    </Container>
  );
};

export default UserList;