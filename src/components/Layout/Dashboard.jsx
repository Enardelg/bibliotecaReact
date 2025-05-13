import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import BookList from '../BookManagement/BookList';
import AddBook from '../BookManagement/AddBook';
import BookStats from '../BookManagement/BookStats';
import UserList from '../UserManagement/UserList';
import AddUser from '../UserManagement/AddUser';
import CheckoutBook from '../LoanSystem/CheckoutBook';
import ReturnBook from '../LoanSystem/ReturnBook';

const Dashboard = ({ activeView, books, users, setBooks, setUsers }) => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBook = (newBook) => {
    if (newBook.id) {
      setBooks(books.map(b => b.id === newBook.id ? newBook : b));
    } else {
      const id = Math.max(...books.map(b => b.id), 0) + 1;
      setBooks([...books, { ...newBook, id }]);
    }
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setAddBookOpen(true);
  };

  const handleCheckout = (bookId) => {
    setSelectedBook(books.find(b => b.id === bookId));
    setCheckoutOpen(true);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Container maxWidth="xl">
        {activeView === 'dashboard' && (
          <>
            <Typography variant="h4" gutterBottom>
              Resumen de la Biblioteca
            </Typography>
            <BookStats books={books} users={users} />
          </>
        )}

        {activeView === 'books' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                Gestión de Libros
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedBook(null);
                  setAddBookOpen(true);
                }}
              >
                Agregar Libro
              </Button>
            </Box>
            <BookList 
              books={books} 
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              onCheckout={handleCheckout}
            />
          </>
        )}

        {activeView === 'users' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                Gestión de Usuarios
              </Typography>
              {/* <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAddUserOpen(true)}
              >
                Agregar Usuario
              </Button> */}
            </Box>
            <UserList users={users} books={books} />
          </>
        )}

        {activeView === 'loans' && (
          <>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              Sistema de Préstamos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                onClick={() => setCheckoutOpen(true)}
              >
                Prestar Libro
              </Button>
              <Button
                variant="contained"
                onClick={() => setReturnOpen(true)}
              >
                Devolver Libro
              </Button>
            </Box>
          </>
        )}

        <AddBook
          open={addBookOpen}
          onClose={() => setAddBookOpen(false)}
          onSubmit={handleAddBook}
          initialData={selectedBook}
        />

        <AddUser
          open={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          onSubmit={(newUser) => {
            const id = Math.max(...users.map(u => u.id), 0) + 1;
            setUsers([...users, { ...newUser, id, librosPrestados: [] }]);
          }}
        />

        <CheckoutBook
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          book={selectedBook}
          users={users}
          onCheckout={(userId) => {
            setBooks(books.map(b => 
              b.id === selectedBook.id ? { ...b, disponible: false } : b
            ));
            setUsers(users.map(u => 
              u.id === userId 
                ? { ...u, librosPrestados: [...u.librosPrestados, selectedBook.id] } 
                : u
            ));
          }}
        />

        <ReturnBook
          open={returnOpen}
          onClose={() => setReturnOpen(false)}
          books={books.filter(b => !b.disponible)}
          users={users}
          onReturn={(bookId, userId) => {
            setBooks(books.map(b => 
              b.id === bookId ? { ...b, disponible: true } : b
            ));
            setUsers(users.map(u => 
              u.id === userId 
                ? { ...u, librosPrestados: u.librosPrestados.filter(id => id !== bookId) } 
                : u
            ));
          }}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;