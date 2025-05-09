import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CustomDialog = ({ open, onClose, title, children, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="primary">
            Confirmar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;