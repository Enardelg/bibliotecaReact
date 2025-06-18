import React, { useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  LinearProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import {
  LibraryBooks as LibraryIcon,
  People as PeopleIcon,
  SwapHoriz as LoanIcon,
  Category as GenreIcon
} from '@mui/icons-material';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57'];

const BookStats = ({ books, users }) => {
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.disponible).length;
  const borrowedBooks = totalBooks - availableBooks;
  const totalUsers = users.length;

  const genreStats = books.reduce((acc, book) => {
    acc[book.genero] = (acc[book.genero] || 0) + 1;
    return acc;
  }, {});

  const genreData = Object.entries(genreStats).map(([genre, count]) => ({
    name: genre,
    value: count
  }));

  const [chartType, setChartType] = useState('pie');

  const years = books.map(book => book.anio);
  const oldestYear = Math.min(...years);
  const newestYear = Math.max(...years);
  const oldestBook = books.find(book => book.anio === oldestYear);
  const newestBook = books.find(book => book.anio === newestYear);

  return (
    <Grid container spacing={3}>

      {/* Tarjetas de resumen centradas */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 3, boxShadow: 6, width: 250, minWidth: 220 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LibraryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Libros</Typography>
            </Box>
            <Typography variant="h4">{totalBooks}</Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Disponibles:</Box> {availableBooks}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Prestados:</Box> {borrowedBooks}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(availableBooks / totalBooks) * 100} 
              sx={{ mt: 1, height: 8 }} 
            />
          </Paper>

          <Paper sx={{ p: 3, boxShadow: 6, width: 250, minWidth: 220 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PeopleIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Usuarios</Typography>
            </Box>
            <Typography variant="h4">{totalUsers}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {users.filter(u => u.librosPrestados.length > 0).length} usuarios con préstamos
              </Box>
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, boxShadow: 6, width: 250, minWidth: 220 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LoanIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Préstamos</Typography>
            </Box>
            <Typography variant="h4">{borrowedBooks}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {((borrowedBooks / totalBooks) * 100).toFixed(1)}% de libros prestados
              </Box>
            </Typography>
          </Paper>
        </Box>
      </Grid>

      {/* Gráfico de géneros */}
      <Grid item xs={12} md={6} lg={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ 
            p: 3, 
            boxShadow: 6, 
            minHeight: 520, 
            width: '100%', 
            minWidth: 450, 
            maxWidth: 800 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GenreIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Géneros</Typography>
            </Box>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel id="chart-select-label">Visualización</InputLabel>
              <Select
                labelId="chart-select-label"
                value={chartType}
                label="Visualización"
                onChange={(e) => setChartType(e.target.value)}
              >
                <MenuItem value="pie">Torta</MenuItem>
                <MenuItem value="bar">Barras</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={genreData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      fill="#8884d8"
                      label
                    >
                      {genreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart data={genreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Grid>

      {/* Libros más antiguo y más nuevo */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, boxShadow: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
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
        <Paper sx={{ p: 2, boxShadow: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
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
