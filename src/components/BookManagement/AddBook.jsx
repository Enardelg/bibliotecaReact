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

const AddBook = ({ open, onClose, onSubmit, initialData, genres = [], onAddGenre }) => {
  const [book, setBook] = useState({
    titulo: '',
    autor: '',
    año: '',
    genero: '',
    disponible: true
  });

  const [nuevoGenero, setNuevoGenero] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setBook(initialData || {
        titulo: '',
        autor: '',
        año: '',
        genero: '',
        disponible: true
      });
      setNuevoGenero('');
      setError('');
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
    if (name === 'genero' && error) setError('');
  };

  const handleSubmit = () => {
    const nuevo = nuevoGenero.trim();
    const seleccion = book.genero;

    // Validar conflicto: selección + texto nuevo
    if (seleccion && nuevo) {
      setError('Seleccionaste un género y también escribiste uno nuevo. Por favor, elegí solo uno.');
      return;
    }

    let finalBook = { ...book };

    if (nuevo) {
      if (!genres.includes(nuevo)) {
        onAddGenre(nuevo);
      }
      finalBook.genero = nuevo;
    }

    if (!finalBook.titulo || !finalBook.autor || !finalBook.año || !finalBook.genero) return;

    onSubmit(finalBook);

    if (!initialData) {
      setBook({
        titulo: '',
        autor: '',
        año: '',
        genero: '',
        disponible: true
      });
    }

    setNuevoGenero('');
    setError('');
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
              displayEmpty
            >
              <MenuItem value="">
                <em>Seleccioná un género</em>
              </MenuItem>
              {genres.map((genero) => (
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
              onChange={(e) => {
                setNuevoGenero(e.target.value);
                if (error) setError('');
              }}
              placeholder="Escribí un nuevo género si no encontrás uno"
              error={Boolean(error)}
              helperText={error}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={
            !book.titulo ||
            !book.autor ||
            !book.año ||
            (!book.genero && !nuevoGenero.trim())
          }
        >
          {initialData ? 'Guardar Cambios' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBook;
