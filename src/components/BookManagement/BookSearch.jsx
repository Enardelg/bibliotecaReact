import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton,
  Box
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const BookSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar libros por título, autor o género..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default BookSearch;