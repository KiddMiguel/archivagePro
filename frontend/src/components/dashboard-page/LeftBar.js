import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Typography, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DropzoneArea from './DropzoneArea';
import { uploadFile } from '../../services/serviceFiles';
import { CircularProgress } from '@mui/material';
import Reload from '../../pages/reload';

const drawerWidth = 180;

export default function LeftBar({ open, rootFolder }) {
  const location = useLocation();
  const [uploadMessage, setUploadMessage] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const determineSelectedIndex = (path) => {
    switch (path) {
      case '/dashboard':
        return 0;
      case '/favoris':
        return 1;
      case '/corbeille':
        return 2;
      case '/settings':
        return 3;
      default:
        return null;
    }
  };


  
  const handleFileDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setUploadMessage('Vous ne pouvez télécharger qu\'un seul fichier à la fois');
      return;
    }
  
    const file = acceptedFiles[0];
  
    if (file.size > 50000000) {
      setUploadMessage('La taille du fichier ne doit pas dépasser 50 Mo');
      return;
    }
  
    setLoadingUpload(true);
    await uploadFile(file, rootFolder._id);
    setLoadingUpload(false);
    setUploadMessage('');
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
  }, [loading]);




  const selectedIndex = determineSelectedIndex(location.pathname);

  const listItemStyle = (currentIndex) => ({
    color: selectedIndex === currentIndex ? '#1976d2' : '#6c757d',
    paddingTop: '1px',
    backgroundColor: 'inherit',
    '&.Mui-selected': {
      backgroundColor: 'inherit',
      '&:hover': {
        backgroundColor: 'inherit',
      },
    },
    '&:hover': {
      backgroundColor: 'inherit',
    },
  });

  if(loading) {
    navigate('/reload/dashboard');
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      <Box>
        <Toolbar>
          <Typography variant="h3">ArchiDrive</Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem
            button
            key="Dashboard"
            selected={selectedIndex === 0}
            sx={listItemStyle(0)}
            component={Link}
            to="/dashboard"
          >
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 0 ? '#1976d2' : 'inherit',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 0 ? '500' : 'regular',
              }}
              sx={{
                marginLeft: '-15px',
              }}
            />
          </ListItem>

          

          <ListItem
            button
            key="Corbeille"
            selected={selectedIndex === 2}
            sx={listItemStyle(2)}
            component={Link}
            to="/corbeille"
          >
            <ListItemIcon>
              <DeleteSweepIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 2 ? '#1976d2' : 'inherit',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Corbeille"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 2 ? '500' : 'regular',
              }}
              sx={{
                marginLeft: '-15px',
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ mb: 2 }}>
        <List>
          <Box
            sx={{
              padding: '10px',
              width: '155px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <DropzoneArea
            onDrop={handleFileDrop}
              label="Glisser des fichiers, ou"
              iconSize={48}
              borderColor="#ccc"
              activeBgColor="#f0f8ff"
              textColor="#1976d2"
            />
          {uploadMessage && <Typography color="error" sx={{mt : 1, fontSize : "12px"}} >{uploadMessage}</Typography>}
          {loadingUpload ? (
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize : "12px", mt : 1, color : "#1976d2" }}>
              Envoi en cours ...
              <CircularProgress
                color="inherit" 
                thickness={5} 
                size={20} 
                sx={{ color: '#1976d2' }} 
              />
            </Typography>
          ) : (
            '')
          }
          </Box>
          <Divider
            sx={{
              mb: 2,
              mt: 2,
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <ListItem
            button
            key="Paramètres"
            selected={selectedIndex === 3}
            sx={listItemStyle(3)}
            component={Link}
            to="/settings"
          >
            <ListItemIcon>
              <SettingsIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 3 ? '#1976d2' : 'inherit',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Paramètres"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 3 ? '500' : 'regular',
              }}
              sx={{
                marginLeft: '-15px',
              }}
            />
          </ListItem>

          <ListItem
            button
            key="Déconnexion"
            sx={{ color: '#c1121f' }}
            component={Link}
            to="/logout"
          >
            <ListItemIcon>
              <LogoutIcon
                sx={{
                  fontSize: 22,
                  color: '#c1121f',
                }}
              />
            </ListItemIcon>
            <ListItemText   sx={{
                marginLeft: '-15px',
              }} primary="Déconnexion" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
