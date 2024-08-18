import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link, Grid, Divider } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderCard from '../../components/dashboard-page/FolderCard';
import FolderIcon from '@mui/icons-material/Folder';
import FilesTable from '../../components/dashboard-page/FilesTable';
import StorageCard from '../../components/dashboard-page/StorageCard';

const Dashboard = () => {
  
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom : "1px solid rgba(0, 0, 0, 0.12)", pb : 2}}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" fontSize="12px">
              Accueil
            </Link>
            <Typography color="text.primary" sx={{fontWeight : "500", fontSize : "12px"}}>Dashboard</Typography>
          </Breadcrumbs>
          <Typography variant="h4" align="left" sx={{ fontWeight: 'bold', mt: 1 }}>
            Dashboard
          </Typography>
        </Box>

        {/* Boutons d'action */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<CreateNewFolderIcon />} sx={{ backgroundColor: '#1976d2', borderRadius : 9, textTransform : "none" }}>Dossier</Button>
          <Button variant="outlined" startIcon={<NoteAddIcon />} sx= {{borderRadius : 9, textTransform : "none" }}>Fichier</Button>
        </Box>
      </Box>

      {/* Contenu du dashboard */}
      <Box sx={{ marginTop: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <Typography align='left' variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Dossiers
        </Typography>
        <Button align='left' sx={{ fontWeight: 'regular', marginBottom: 2, fontSize : 13, textTransform : "none"  }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
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

    </Box>
  );
};

export default Dashboard;