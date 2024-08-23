import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Breadcrumbs, Link, Grid, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery, useTheme,  Avatar, CircularProgress } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderCard from '../../components/dashboard-page/FolderCard';
import FolderIcon from '@mui/icons-material/Folder';
import FilesTable from '../../components/dashboard-page/FilesTable';
import StorageCard from '../../components/dashboard-page/StorageCard';
import DropzoneArea from '../../components/dashboard-page/DropzoneArea';
import { uploadFile, createFolder, getUserFolders, getAllFiles } from '../../services/serviceFiles';
import RenderIcon from '../../components/dashboard-page/RenderIcon';
import FolderFilesDialog from '../../components/dashboard-page/FolderFilesDialog';

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
  const [openFolderFilesDialog, setOpenFolderFilesDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [filesUpdated, setFilesUpdated] = useState(false); 
  const [sizes, setSizes] = useState({ documents: 0, medias: 0, others: 0, limitStockage: 0, usedCurrentStockage: 0 });
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


  const handleDossiers = async () => {
    const folders = await getUserFolders(user._id || user.id);
    setFolders(folders.length ? folders.slice(1) : []);
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
  
    if (selectedFiles.some(file => file.size > 50 * 1024 * 1024)) {
      setUploadMessage('La taille du fichier ne doit pas dépasser 50 Mo');
      return;
    }
  
    setLoadingUpload(true);  
  
    try {
      for (const file of selectedFiles) {
        await uploadFile(file, rootFolder._id);
      }

      setFilesUpdated(true); // Déclenche la mise à jour des données
    } catch (error) {
      setUploadMessage('Erreur lors du téléchargement des fichiers');
    } finally {
      setLoadingUpload(false);
      setTimeout(() => setFilesUpdated(false), 1000);
      handleCloseFileDialog();
    }
  };
  

  const handleOpenFolderFilesDialog = (folder) => {
    setSelectedFolder(folder);
    setOpenFolderFilesDialog(true);
  };
  

  const handleCloseFolderFilesDialog = () => {
    setOpenFolderFilesDialog(false);
    setSelectedFolder(null);
  };

  const handlerCalculateSizeTypeFile = async () => {
    let limitStockage = user.storageLimit;
    let usedCurrentStockage = user.storageUsed;
    let type = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf', 'odt', 'ods', 'odp', 'odg', 'odc', 'odf', 'odb', 'odi', 'odm', 'ott', 'ots', 'otp', 'otg', 'otc', 'otf', 'oti', 'oth', 'ots', 'ott', 'otm'];
    let totalSizeInBytes = 0;
    const files = await getAllFiles(rootFolder.owner);
    for (const file of files) {
      if (type.includes(file.filename.split('.').pop())) {
        totalSizeInBytes += file.length;
      }
    }
    let typeMedia = ['mp3', 'mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv', 'webm', 'm4a', 'm4v', 'f4v', 'f4a', 'm4b', 'm4r', 'f4b', 'wav', 'flac', 'ogg', 'oga', 'opus', 'amr', 'aiff', 'aif', 'aifc', 'wma', 'aac', '3gp', '3gp2', '3g2', '3gpp', '3gpp2', 'ogg', 'ogv', 'oga', 'ogx', 'ogm', 'spx', 'opus', 'webm', 'flv', 'f4v', 'f4p', 'f4a', 'f4b'];
    let totalSizeInBytesMedia = 0;
    for (const file of files) {
      if (typeMedia.includes(file.filename.split('.').pop())) {
        totalSizeInBytesMedia += file.length;
      }
    }
    let typeOther = ['js', 'php', 'ts', 'java', 'py'];
    let totalSizeInBytesOther = 0;
    for (const file of files) {
      if (typeOther.includes(file.filename.split('.').pop())) {
        totalSizeInBytesOther += file.length;
      }
    }
    return { totalSizeInBytes, totalSizeInBytesMedia, totalSizeInBytesOther, limitStockage, usedCurrentStockage };
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleDossiers();
      const data = await handlerCalculateSizeTypeFile();
      setSizes({
        documents: data.totalSizeInBytes,
        medias: data.totalSizeInBytesMedia,
        others: data.totalSizeInBytesOther,
        limitStockage: data.limitStockage,
        usedCurrentStockage: data.usedCurrentStockage,
      });
    };
    fetchData();
  }, [foldersUpdated, filesUpdated]);



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
              {folders.length > 0 ? (
                folders && folders.map((folder, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <FolderCard
                      title={folder.name}
                      icon={<FolderIcon />}
                      onOpen={() => handleOpenFolderFilesDialog(folder)}
                      rootFolder={folder}
                      setFoldersUpdated={setFilesUpdated} 
                    />
                  </Grid>
                ))
              ) : (
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body1" align='center' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                    Aucun dossier trouvé
                  </Typography>
                </Box>
              )}
            </Grid>


              {/* Utilisation du composant FolderFilesDialog */}
              <FolderFilesDialog 
               open={openFolderFilesDialog}
               onClose={handleCloseFolderFilesDialog}
               folder={selectedFolder}
               filesUpdated={filesUpdated}
               setFilesUpdated={setFilesUpdated}
              />
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
            <FilesTable  rootFolder={rootFolder} filesUpdated = {filesUpdated} setFilesUpdated = {setFilesUpdated} />
          </Grid>
          <Grid item xs={12} md={4}>
          <StorageCard
            documents={sizes.documents}
            medias={sizes.medias}
            others={sizes.others}
            limit={(sizes.limitStockage / 1000000000).toFixed(2)}
            setFilesUpdated={setFilesUpdated}

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
      <Dialog open={openFileDialog}   onClose={(event, reason) => {
    if (reason !== "backdropClick") {
      handleCloseFileDialog();
    }
  }}
   fullScreen={fullScreen} maxWidth="md" fullWidth>
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
