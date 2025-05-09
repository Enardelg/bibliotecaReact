import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Chip,
  Avatar
} from '@mui/material';
import { Book as BookIcon } from '@mui/icons-material';

const BookCard = ({ book, onEdit, onDelete, onCheckout }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
          <BookIcon />
        </Avatar>
        <Typography gutterBottom variant="h5" component="h2">
          {book.titulo}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.autor}
        </Typography>
        <Typography variant="body2" paragraph>
          Año: {book.anio} | Género: {book.genero}
        </Typography>
        <Chip 
          label={book.disponible ? 'Disponible' : 'Prestado'} 
          color={book.disponible ? 'success' : 'error'} 
          size="small" 
        />
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => onEdit(book)}
        >
          Editar
        </Button>
        <Button 
          size="small" 
          color="error"
          onClick={() => onDelete(book.id)}
        >
          Eliminar
        </Button>
        {book.disponible && (
          <Button 
            size="small" 
            color="secondary"
            onClick={() => onCheckout(book.id)}
          >
            Prestar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;