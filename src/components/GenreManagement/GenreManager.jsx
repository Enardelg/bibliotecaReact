import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  TextField,
  Button,
  Grid
} from '@mui/material';

const GenreManager = ({ genres, onAddGenre, onDeleteGenre }) => {
  const [nuevoGenero, setNuevoGenero] = useState('');

  const handleAdd = () => {
    const trimmed = nuevoGenero.trim();
    if (trimmed && !genres.includes(trimmed)) {
      onAddGenre(trimmed);
      setNuevoGenero('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Géneros
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Nuevo género"
            value={nuevoGenero}
            onChange={(e) => setNuevoGenero(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Ej: Aventura, Filosofía..."
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={!nuevoGenero.trim()}
            sx={{ height: '100%' }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {genres.map((genero) => (
          <Chip
            key={genero}
            label={genero}
            onDelete={() => onDeleteGenre(genero)}
            color="secondary"
            variant="outlined"
          />
        ))}
      </Box>
    </Paper>
  );
};

export default GenreManager;