import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import LeftBar from './dashboard-page/LeftBar';
import Header from './dashboard-page/Header';
import { useMediaQuery, Typography, Box } from '@mui/material';

const PrivateLayout = ({user , isAuthenticated, rootFolder}) => {

  // Utilisation de useMediaQuery pour vérifier si l'écran est de taille "medium" ou plus grand
  const isDesktop = useMediaQuery('(min-width:1024px)');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isDesktop) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        textAlign="center"
        p={2}
      >
        <Typography variant="h6">
          L'application ArchiDrive n'est pas disponible sur mobile et tablette.
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ display: 'flex'}}>
      <LeftBar rootFolder ={rootFolder}/>
      <div style={{ flexGrow: 1 }}>
        <Header user={user} rootFolder={rootFolder} />
        <div style={{ padding: '20px', background: "#f8f9fa" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
