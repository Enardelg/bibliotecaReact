import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  Avatar,
  Chip,
  Box
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const UserList = ({ users, books }) => {
  return (
    <Grid container spacing={3}>
      {users.map((user) => {
        const borrowedBooks = user.librosPrestados.map(bookId => 
          books.find(book => book.id === bookId)
        ).filter(book => book);

        return (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{user.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Libros prestados: {borrowedBooks.length}
                </Typography>

                {borrowedBooks.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Libros actuales:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {borrowedBooks.map(book => (
                        <Chip 
                          key={book.id}
                          label={book.titulo}
                          size="small"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="error">
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserList;