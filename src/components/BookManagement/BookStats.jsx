import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  LibraryBooks as LibraryIcon,
  People as PeopleIcon,
  SwapHoriz as LoanIcon,
  Category as GenreIcon
} from '@mui/icons-material';

const BookStats = ({ books, users }) => {
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.disponible).length;
  const borrowedBooks = totalBooks - availableBooks;
  const totalUsers = users.length;
  
  // Estadísticas por género
  const genreStats = books.reduce((acc, book) => {
    acc[book.genero] = (acc[book.genero] || 0) + 1;
    return acc;
  }, {});

  // Libros más antiguos y más nuevos
  const years = books.map(book => book.anio);
  const oldestYear = Math.min(...years);
  const newestYear = Math.max(...years);
  const oldestBook = books.find(book => book.anio === oldestYear);
  const newestBook = books.find(book => book.anio === newestYear);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LibraryIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Libros</Typography>
          </Box>
          <Typography variant="h4">{totalBooks}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Disponibles: {availableBooks}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prestados: {borrowedBooks}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(availableBooks / totalBooks) * 100} 
            sx={{ mt: 1, height: 8 }} 
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PeopleIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Usuarios</Typography>
          </Box>
          <Typography variant="h4">{totalUsers}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {users.filter(u => u.librosPrestados.length > 0).length} usuarios con préstamos
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LoanIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Préstamos</Typography>
          </Box>
          <Typography variant="h4">{borrowedBooks}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {((borrowedBooks / totalBooks) * 100).toFixed(1)}% de libros prestados
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <GenreIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Géneros</Typography>
          </Box>
          <List dense>
            {Object.entries(genreStats).map(([genre, count]) => (
              <ListItem key={genre}>
                <ListItemText 
                  primary={genre} 
                  secondary={`${count} libros`} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Libro más antiguo
          </Typography>
          {oldestBook && (
            <Typography>
              "{oldestBook.titulo}" ({oldestBook.anio}) - {oldestBook.autor}
            </Typography>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Libro más nuevo
          </Typography>
          {newestBook && (
            <Typography>
              "{newestBook.titulo}" ({newestBook.anio}) - {newestBook.autor}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BookStats;