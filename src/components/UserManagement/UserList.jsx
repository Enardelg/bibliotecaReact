import React, { useState } from 'react';
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
  DialogActions,
  Avatar,
  Chip,
  Divider,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import AddUser from './AddUser';

const UserList = ({ users, onUserSubmit, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            Gestión de Usuarios
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingUser(null);
            setOpenDialog(true);
          }}
          disabled={loading}
          sx={{ height: 48 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Nuevo Usuario'}
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
          elevation={3}
        >
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
        <TextField
          fullWidth
          label="Buscar usuario por nombre o email"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {users.length === 0 && !loading ? (
        <Paper elevation={3} sx={{
          p: 4,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <PersonIcon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No hay usuarios registrados
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Comienza agregando tu primer usuario
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingUser(null);
              setOpenDialog(true);
            }}
            sx={{ width: 'fit-content' }}
          >
            Agregar Usuario
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {users
            .filter(user =>
              user.nombre.toLowerCase().includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm)
            )
            .map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Paper elevation={3} sx={{ height: '100%' }}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'none'
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{
                          bgcolor: 'primary.main',
                          width: 48,
                          height: 48,
                          mr: 2,
                          fontSize: '1.1rem',
                          fontWeight: 500
                        }}>
                          {user.nombre.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {user.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2
                      }}>
                        <Chip
                          label={`ID: ${user.id}`}
                          size="small"
                          variant="outlined"
                          color="default"
                          sx={{
                            mr: 1,
                            px: 1,
                            height: 28,
                            '& .MuiChip-label': {
                              px: 0.8,
                              fontSize: '0.8rem'
                            }
                          }}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            startIcon={<EditIcon fontSize="small" />}
                            variant="outlined"
                            onClick={() => {
                              setEditingUser(user);
                              setOpenDialog(true);
                            }}
                            disabled={loading}
                            sx={{ minWidth: 90 }}
                          >
                            Editar
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon fontSize="small" />}
                            color="error"
                            variant="contained"
                            onClick={() => handleConfirmDelete(user)}
                            disabled={loading}
                            sx={{ minWidth: 90 }}
                          >
                            Eliminar
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Paper>
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
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{
          bgcolor: 'error.main',
          color: 'error.contrastText',
          py: 2
        }}>
          Confirmar eliminación
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonIcon color="error" sx={{ mr: 2 }} />
            <Typography variant="body1">
              ¿Estás seguro que deseas eliminar al usuario <strong>{userToDelete?.nombre}</strong>?
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Esta acción no se puede deshacer y afectará cualquier préstamo asociado.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            disabled={loading}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="error"
            variant="contained"
            disabled={loading}
            sx={{ ml: 1 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
