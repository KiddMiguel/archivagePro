import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery, useTheme, Box, Typography, Avatar } from '@mui/material';
import FilesTable from './FilesTable';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DropzoneArea from './DropzoneArea';
import RenderIcon from './RenderIcon';
import { uploadFile } from '../../services/serviceFiles';
import { CircularProgress } from '@mui/material';

const FolderFilesDialog = ({ open, onClose, folder }) => {
  const [openFileDialog, setOpenFileDialog] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [uploadMessage, setUploadMessage] = React.useState('');
  const [filesUpdated, setFilesUpdated] = React.useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleOpenFileDialog = () => {
    setOpenFileDialog(true);
  };

  const handleCloseFileDialog = () => {
    setLoadingUpload(false);
    setOpenFileDialog(false);
    setUploadMessage('');
    setSelectedFiles([]);
  };

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]); 
  };

  const handleUploadFiles = async () => {
    if (selectedFiles.length === 0) {
      setUploadMessage('Veuillez sélectionner un fichier');
      return;
    }
    if (selectedFiles.length > 10) {
      setUploadMessage('Vous ne pouvez télécharger que 10 fichiers à la fois');
      return;
    }

    if(selectedFiles.some(file => file.size > 50000000)) {
      setUploadMessage('La taille du fichier ne doit pas dépasser 50 Mo');
      return;
    }

    for (const file of selectedFiles) {
      setLoadingUpload(true);
      await uploadFile(file, folder._id);
    }
      setLoadingUpload(false);
      handleCloseFileDialog(); 
      setFilesUpdated(true);
  };


  return (
    <>
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="md" fullWidth >
            <DialogTitle sx={{ display: 'flex', gap: 2 }}>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fichiers dans le dossier {folder?.name}
          </Typography>
            <Box sx={{ml : "left"}} >
          <Button variant="contained" startIcon={<NoteAddIcon />} sx={{ borderRadius: 9, textTransform: "none" }} onClick={handleOpenFileDialog}>
            Fichier
          </Button>
        </Box>
            </DialogTitle>
  

      <DialogContent sx={{height : "500px"}}>
      
        {folder && (
          <FilesTable  folder ={folder} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" sx={{ textTransform: "none" }}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
    {/* Dialogue pour télécharger un fichier */}
    <Dialog open={openFileDialog} onClose={handleCloseFileDialog} fullScreen={fullScreen} maxWidth="md" fullWidth>
    <DialogTitle>Télécharger des fichiers</DialogTitle>
    <DialogContent>
      <DropzoneArea
        onDrop={handleFileDrop}
        label="Glisser les fichiers ici ou"
        iconSize={64}
        borderColor="#1976d2"
        activeBgColor="#e3f2fd"
        textColor="#1976d2"
      />
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center", overflowX: "auto", width: "100%" }}>
      {selectedFiles.map((file, index) => (
            <Box key={index} sx={{display : "flex"}}>
          <Box  display="flex" alignItems="center" sx={{ fontWeight: "600" }}>
            <Avatar sx={{ bgcolor: "#f5f5f5", color: "#000", mr: 0 }}>
              {<RenderIcon type={file.name.split(".").slice(-1)[0]} />}
            </Avatar>
            {file.name}
          </Box>
          </Box>
        ))}
      </Box>
    </DialogContent>

    <DialogActions>
    {uploadMessage && <Typography color="error" sx={{marginRight : "auto", ml : 2}} >{uploadMessage}</Typography>}

      <Button onClick={handleCloseFileDialog} color="primary" sx={{textTransform : "none"}}>
        Annuler
      </Button>
      <Button onClick={handleUploadFiles} color="primary" variant="contained" sx={{textTransform : "none", mr : 2}} >
      {loadingUpload ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Téléchargement...
                    <CircularProgress
                      color="inherit" 
                      thickness={5} 
                      size={20} 
                      sx={{ color: 'white' }} 
                    />
                  </div>
                ) : (
                  'Télécharger'
                )}
      </Button>
    </DialogActions>
  </Dialog>
    </>
  );
};

export default FolderFilesDialog;
