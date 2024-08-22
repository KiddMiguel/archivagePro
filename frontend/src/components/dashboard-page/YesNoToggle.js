import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const YesNoToggle = ({ title, value, onChange, disabled = false, openDialog = false, onDialogClose }) => {
  const [open, setOpen] = useState(openDialog);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
      if (onDialogClose) {
        onDialogClose();
      }
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onDialogClose) {
      onDialogClose();
    }
  };

  return (
    <div>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Yes/No Toggle
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title || 'Choose an option'}</DialogTitle>
        <DialogContent>
          <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
            aria-label="yes no toggle"
            disabled={disabled}
          >
            <ToggleButton value="yes" aria-label="yes">
              Yes
            </ToggleButton>
            <ToggleButton value="no" aria-label="no">
              No
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default YesNoToggle;
