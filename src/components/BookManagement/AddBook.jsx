import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

const genres = [
  'Novela',
  'Ciencia Ficción',
  'Fantasía',
  'Distopía',
  'Realismo mágico',
  'Literatura infantil',
  'Novela romántica',
  'Novela psicológica'
];

const AddBook = ({ open, onClose, onSubmit, initialData }) => {
  const [book, setBook] = useState(initialData || {
    titulo: '',
    autor: '',
    anio: '',
    genero: '',
    disponible: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(book);
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
              name="anio"
              type="number"
              value={book.anio}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Género</InputLabel>
              <Select
                name="genero"
                value={book.genero}
                onChange={handleChange}
                label="Género"
                required
              >
                {genres.map(genre => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {initialData ? 'Actualizar' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBook;