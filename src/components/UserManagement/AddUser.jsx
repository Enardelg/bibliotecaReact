import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  Snackbar,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddUser = ({ 
  open, 
  onClose, 
  onSubmit, 
  editingUser, 
  loading 
}) => {
  const [user, setUser] = useState({ nombre: '', email: '' });
  const [errors, setErrors] = useState({ nombre: '', email: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    if (editingUser) {
      setUser({ nombre: editingUser.nombre, email: editingUser.email });
    } else {
      setUser({ nombre: '', email: '' });
    }
    setErrors({ nombre: '', email: '' });
    setShowAlert(false);
  }, [editingUser, open]);

  const formatName = (name) => {
    return name.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return re.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'nombre') {
      if (value === '' || validateName(value)) {
        setUser(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, nombre: '' }));
      } else {
        setErrors(prev => ({ ...prev, nombre: 'Solo se permiten letras y espacios' }));
      }
    } else {
      setUser(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre' && value) {
      const formattedName = formatName(value.trim());
      setUser(prev => ({ ...prev, [name]: formattedName }));
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { nombre: '', email: '' };

    if (!user.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (!validateName(user.nombre)) {
      newErrors.nombre = 'Solo se permiten letras y espacios';
      isValid = false;
    }

    if (!user.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!validateEmail(user.email)) {
      newErrors.email = 'Ingrese un email válido';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setAlertMessage('Por favor corrija los errores en el formulario');
      setShowAlert(true);
      return;
    }

    const formattedUser = {
      ...user,
      nombre: formatName(user.nombre.trim())
    };

    const usuarioFinal = editingUser
      ? { ...editingUser, ...formattedUser }
      : { ...formattedUser, id: Date.now() };

    onSubmit(usuarioFinal);
    
    if (!editingUser) {
      setSuccessData(formattedUser);
      setShowSuccess(true);
      setUser({ nombre: '', email: '' });
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Collapse in={showAlert} sx={{ mb: 2 }}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowAlert(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alertMessage}
            </Alert>
          </Collapse>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre completo"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.nombre}
                helperText={errors.nombre}
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
                error={!!errors.email}
                helperText={errors.email}
                required
                disabled={loading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={loading}
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

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ width: '100%' }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Usuario agregado correctamente:
          </Typography>
          <Typography variant="body2">Nombre: {successData?.nombre}</Typography>
          <Typography variant="body2">Email: {successData?.email}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddUser;