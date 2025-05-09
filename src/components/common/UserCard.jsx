import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {user.nombre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Libros Prestados: {user.librosPrestados.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;