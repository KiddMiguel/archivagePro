import React, { useState } from 'react';
import { Box, Typography, Button, Breadcrumbs, Link, Grid, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery, useTheme, List, ListItem, ListItemText, Avatar } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderCard from '../../components/dashboard-page/FolderCard';
import FolderIcon from '@mui/icons-material/Folder';
import FilesTable from '../../components/dashboard-page/FilesTable';
import StorageCard from '../../components/dashboard-page/StorageCard';
import DropzoneArea from '../../components/dashboard-page/DropzoneArea';
import { uploadFile } from '../../services/serviceFiles';
import RenderIcon from '../../components/dashboard-page/RenderIcon';


const Dashboard = () => {
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const folders = [
    { title: 'Design Docs', fileCount: 10, sizeUsed: '290 MB', date: '05-08-23', bgColor: '#619B8A' },
    { title: 'Converted Files', fileCount: 10, sizeUsed: '98 MB', date: '03-05-23', bgColor: '#D1D5DB' },
    { title: 'Urgent Folders', fileCount: 10, sizeUsed: '201 MB', date: '02-01-23', bgColor: '#A3B18A' },
    { title: "Client's Brief", fileCount: 10, sizeUsed: '302 MB', date: '24-02-23', bgColor: '#B56576' },
    { title: 'Urgent Folders', fileCount: 10, sizeUsed: '201 MB', date: '02-01-23', bgColor: '#A3B18A' },
    { title: "Client's Brief", fileCount: 10, sizeUsed: '302 MB', date: '24-02-23', bgColor: '#B56576' },
    { title: "Client's Brief", fileCount: 10, sizeUsed: '302 MB', date: '24-02-23', bgColor: '#B56576' },
    { title: "Client's Brief", fileCount: 10, sizeUsed: '302 MB', date: '24-02-23', bgColor: '#B56576' },
    { title: 'Urgent Folders', fileCount: 10, sizeUsed: '201 MB', date: '02-01-23', bgColor: '#A3B18A' },
    { title: "Client's Brief", fileCount: 10, sizeUsed: '302 MB', date: '24-02-23', bgColor: '#B56576' },
  ];

  const handleOpenFolderDialog = () => {
    setOpenFolderDialog(true);
  };

  const handleCloseFolderDialog = () => {
    setOpenFolderDialog(false);
    setFolderName('');
  };

  const handleCreateFolder = () => {
    console.log(`Creating folder: ${folderName}`);
    handleCloseFolderDialog();
  };

  const handleOpenFileDialog = () => {
    setOpenFileDialog(true);
  };

  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
    setSelectedFiles([]);
  };

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]); 
  };

  const handleUploadFiles = async () => {
    for (const file of selectedFiles) {
      console.log(`Uploading file: ${file.name}`);
      await uploadFile(file);
    }
    handleCloseFileDialog(); // Fermer le dialogue après téléchargement
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
          <Button align='left' sx={{ fontWeight: 'regular', marginBottom: 2, fontSize: 13, textTransform: "none" }}>
            Voir tout
          </Button>
        </Box>

        <Grid container spacing={3}>
          {folders.slice(0, 8).map((folder, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <FolderCard
                icon={<FolderIcon />}
                title={folder.title}
                fileCount={folder.fileCount}
                sizeUsed={folder.sizeUsed}
              />
            </Grid>
          ))}
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
          <Button onClick={handleCloseFolderDialog} color="primary">
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
          <Button onClick={handleCloseFileDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUploadFiles} color="primary" variant="contained">
            Télécharger
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
