import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme } from '@mui/material';
import FilesTable from './FilesTable';

const FolderFilesDialog = ({ open, onClose, folder }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="md" fullWidth >
      <DialogTitle>Fichiers dans le dossier {folder?.name}</DialogTitle>
      <DialogContent sx={{height : "350px"}}>
        {folder && (
          <FilesTable rootFolder={folder} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" sx={{ textTransform: "none" }}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FolderFilesDialog;
