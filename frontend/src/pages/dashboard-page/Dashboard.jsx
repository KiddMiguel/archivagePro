import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Breadcrumbs, Link, Grid, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery, useTheme, List, ListItem, ListItemText, Avatar, CircularProgress } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderCard from '../../components/dashboard-page/FolderCard';
import FolderIcon from '@mui/icons-material/Folder';
import FilesTable from '../../components/dashboard-page/FilesTable';
import StorageCard from '../../components/dashboard-page/StorageCard';
import DropzoneArea from '../../components/dashboard-page/DropzoneArea';
import { uploadFile, createFolder, getUserFolders, deleteFolder } from '../../services/serviceFiles';
import RenderIcon from '../../components/dashboard-page/RenderIcon';



const Dashboard = ({rootFolder, user}) => {
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [folderMessage, setFolderMessage] = useState('');
  const [folders, setFolders] = useState([]);
  const [foldersUpdated, setFoldersUpdated] = useState(false);

    
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleCreateFolder = async () => {
    if (!folderName) {
      setFolderMessage('Veuillez entrer un nom de dossier');
      return;
    };
    await createFolder({ name: folderName, parentFolderId: rootFolder._id });
    setFoldersUpdated(true);
    handleCloseFolderDialog();
  };

  const handleDeleteFolder = async () => {
    await deleteFolder();
  };

  const handleDossiers = async () => {
    const folders = await getUserFolders(user._id);
    setFolders(folders.slice(1));
  };

  
  useEffect(() => {
    handleDossiers();
  }, [foldersUpdated]);

  useEffect(() => {
    setFoldersUpdated(false); 
  }, [folders]);


  console.log(rootFolder);

  const handleOpenFolderDialog = () => {
    setOpenFolderDialog(true);
  };

  const handleCloseFolderDialog = () => {
    setOpenFolderDialog(false);
    setFolderName('');
  };



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

    if(selectedFiles.some(file => file.size > 10000000)) {
      setUploadMessage('La taille du fichier ne doit pas dépasser 10 Mo');
      return;
    }

    for (const file of selectedFiles) {
      setLoadingUpload(true);
      await uploadFile(file);
    }
    setTimeout(() => {
      setLoadingUpload(false);
    handleCloseFileDialog(); 
    }, 3000);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.12)", pb: 2 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" fontSize="12px">
              Accueil
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: "500", fontSize: "12px" }}>Dashboard</Typography>
          </Breadcrumbs>
          <Typography variant="h4" align="left" sx={{ fontWeight: 'bold', mt: 1 }}>
            Dashboard
          </Typography>
        </Box>

        {/* Boutons d'action */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<CreateNewFolderIcon />} sx={{ backgroundColor: '#1976d2', borderRadius: 9, textTransform: "none" }} onClick={handleOpenFolderDialog}>
            Dossier
          </Button>
          <Button variant="outlined" startIcon={<NoteAddIcon />} sx={{ borderRadius: 9, textTransform: "none" }} onClick={handleOpenFileDialog}>
            Fichier
          </Button>
        </Box>
      </Box>

      {/* Contenu du dashboard */}
      <Box sx={{ marginTop: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography align='left' variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Dossiers
          </Typography>
          {
            folders.length > 8 && (
              <Button align='left' sx={{ fontWeight: 'regular', marginBottom: 2, fontSize: 13, textTransform: "none" }}>
                Voir tout
              </Button>
            )
          }
        </Box>

        <Grid container spacing={3}>
          {(folders.length > 0) ? (
            folders.map((folder, index) => (
              <Grid item xs={12} md={3} key={index}>
                <FolderCard
                  title={folder.name}
                  icon={<FolderIcon />}
                  onOpen={() => console.log('Open folder')}
                />
                </Grid>
            ))
            ) : (
              <Box sx={{width : "100%"}}>
              <Typography variant="body1" align='center' sx={{ color: 'rgba(0, 0, 0, 0.6)', }}>
                Aucun dossier trouvé
              </Typography>
              </Box>
            )}
        </Grid>
      </Box>

      <Divider
        sx={{
          mb: 1,
          mt: 4,
          width: '100%',
        }} />

      {/* Contenu du dashboard */}
      <Box sx={{ marginTop: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
          <Typography align='left' variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Fichiers
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FilesTable />
          </Grid>
          <Grid item xs={12} md={4}>
            <StorageCard
              documents={2.5}
              medias={4.2}
              others={5.3}
              total={13.1}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Dialogue pour créer un nouveau dossier */}
      <Dialog open={openFolderDialog} onClose={handleCloseFolderDialog} fullScreen={fullScreen} maxWidth="sm" fullWidth>
        <DialogTitle>Créer un nouveau dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du dossier"
            fullWidth
            variant="outlined"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {folderMessage && <Typography color="error" sx={{marginRight : "auto", ml : 2}} >{folderMessage}</Typography>}
          <Button onClick={handleCloseFolderDialog} color="primary" sx={{textTransform : "none"}}>
            Annuler
          </Button>
          <Button onClick={handleCreateFolder} color="primary" variant="contained" sx={{ textTransform: "none", borderRadius: "10px" }}>
            Créer
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
    </Box>
  );
};

export default Dashboard;
