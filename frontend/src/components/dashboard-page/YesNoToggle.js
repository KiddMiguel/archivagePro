import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

const YesNoDialog = ({ title, message, open, yesComport, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="yes-no-dialog-title"
      aria-describedby="yes-no-dialog-description"
    >
      <DialogTitle id="yes-no-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="yes-no-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            yesComport();
            onClose();
          }}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default YesNoDialog;
