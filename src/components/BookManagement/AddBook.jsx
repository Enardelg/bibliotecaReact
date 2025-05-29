import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';

const AddBook = ({ open, onClose, onSubmit, initialData }) => {
  const [book, setBook] = useState({
    titulo: '',
    autor: '',
    año: '',
    genero: '',
    disponible: true
  });

  const [generos, setGeneros] = useState([
    'Ficción',
    'No ficción',
    'Ciencia ficción',
    'Fantasía',
    'Misterio',
    'Romance',
    'Terror',
    'Biografía',
    'Historia',
    'Autoayuda'
  ]);

  const [nuevoGenero, setNuevoGenero] = useState('');

  const agregarGenero = () => {
    const trimmed = nuevoGenero.trim();
    if (trimmed && !generos.includes(trimmed)) {
      setGeneros(prev => [...prev, trimmed]);
      setNuevoGenero('');
    }
  };

  useEffect(() => {
    if (open) {
      setBook(initialData || {
        titulo: '',
        autor: '',
        año: '',
        genero: '',
        disponible: true
      });
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!book.titulo || !book.autor || !book.año || !book.genero) return;

    onSubmit(book);

    if (!initialData) {
      setBook({
        titulo: '',
        autor: '',
        año: '',
        genero: '',
        disponible: true
      });
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Editar Libro' : 'Agregar Nuevo Libro'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              name="titulo"
              value={book.titulo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Autor"
              name="autor"
              value={book.autor}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Año de publicación"
              name="año"
              type="number"
              value={book.año}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Género"
              name="genero"
              value={book.genero}
              onChange={handleChange}
              variant="outlined"
              sx={{ 
                minWidth: '150px',
                '& .MuiInputBase-root': {
                  height: '56px'
                }
              }}
              required
            >
              {generos.map((genero) => (
                <MenuItem key={genero} value={genero}>
                  {genero}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Agregar nuevo género"
              value={nuevoGenero}
              onChange={(e) => setNuevoGenero(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && agregarGenero()}
              placeholder="Escribe un nuevo género y presiona Enter"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={!book.titulo || !book.autor || !book.año || !book.genero}
        >
          {initialData ? 'Guardar Cambios' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBook;
