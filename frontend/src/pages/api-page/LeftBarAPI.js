import React from 'react';
import { Drawer, List, Divider, Toolbar, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import SidebarItem from '../../components/dashboard-page/SidebarItem'; // Importez le composant SidebarItem

const drawerWidth = 180;

export default function LeftBarAPI({ open }) {
  const location = useLocation();

  const determineSelectedIndex = (path) => {
    switch (path) {
      case '/api/introduction':
        return 0;
      case '/api/getting-started':
        return 1;
      case '/api/user-api/register':
        return 2;
      case '/api/user-api/login':
        return 3;
      case '/api/user-api/update':
        return 4; // Index pour la mise à jour du profil utilisateur
      case '/api/user-api/delete':
        return 5; // Index pour la suppression du profil utilisateur
      case '/api/user-api/getProfile':
        return 6; // Index pour la récupération du profil utilisateur
      case '/api/user-api/changePassword':
        return 7; // Index pour le changement de mot de passe utilisateur
      case '/api/user-api/getAll':
        return 8; // Index pour la récupération de tous les utilisateurs
      case '/api/billing-api/create':
        return 9; // Index pour la création de facture
      case '/api/billing-api/invoices':
        return 10; // Index pour la récupération des factures
      case '/api/billing-api/update':
        return 11; // Index pour la mise à jour des factures
      case '/api/billing-api/delete':
        return 12; // Index pour la suppression des factures
      case '/api/billing-api/getAll':
        return 13; // Index pour la récupération de toutes les factures (admin)
      case '/api/files-api/create':
        return 14; // Index pour la création de dossier
      case '/api/files-api/delete':
        return 15; // Index pour la suppression de dossier
      case '/api/files-api/update':
        return 16; // Index pour la mise à jour de dossier
      case '/api/files-api/getAll':
        return 17; // Index pour la récupération de tous les dossiers
      case '/api/folder-api/create':
        return 18; // Index pour la création de dossier
      case '/api/folder-api/delete':
        return 19; // Index pour la suppression de dossier
      case '/api/folder-api/getAll':
        return 21; // Index pour la récupération de tous les dossiers
      case '/api/faq':
        return 20;
      // Ajoutez d'autres cas pour chaque route
      default:
        return 0;
    }
  };

  const selectedIndex = determineSelectedIndex(location.pathname);

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
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: 'none', color : "#1976d2" }}>
              ArchiDrive API
            </Link>
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <SidebarItem
            text="Introduction"
            selectedIndex={selectedIndex}
            currentIndex={0}
            to="/api/introduction"
          />
          <SidebarItem
            text="Getting Started"
            selectedIndex={selectedIndex}
            currentIndex={1}
            to="/api/getting-started"
          />
          <SidebarItem
            text="Utilisateur API"
            selectedIndex={selectedIndex}
            currentIndex={2} // Index du parent User API
            subItems={[
              { text: 'Création', icon: <CodeIcon />, to: '/api/user-api/register', index: 2 },
              { text: 'Connexion', icon: <CodeIcon />, to: '/api/user-api/login', index: 3 },
              { text: 'Mise à jour', icon: <CodeIcon />, to: '/api/user-api/update', index: 4 },
              { text: 'Suppression', icon: <CodeIcon />, to: '/api/user-api/delete', index: 5 },
              { text: 'Récupérer Profil', icon: <CodeIcon />, to: '/api/user-api/getProfile', index: 6 },
              { text: 'Changer Mot de Passe', icon: <CodeIcon />, to: '/api/user-api/changePassword', index: 7 },
              { text: 'Tous les Utilisateurs', icon: <CodeIcon />, to: '/api/user-api/getAll', index: 8 },
            ]}
          />
          <SidebarItem
            text="Facturation API"
            selectedIndex={selectedIndex}
            currentIndex={9} // Index du parent Billing API
            subItems={[
              { text: 'Création', icon: <CodeIcon />, to: '/api/billing-api/create', index: 9 },
              { text: 'Factures', icon: <CodeIcon />, to: '/api/billing-api/invoices', index: 10 },
              { text: 'Mise à jour', icon: <CodeIcon />, to: '/api/billing-api/update', index: 11 },
              { text: 'Suppression', icon: <CodeIcon />, to: '/api/billing-api/delete', index: 12 },
              { text: 'Toutes les factures', icon: <CodeIcon />, to: '/api/billing-api/getAll', index: 13 },
            ]}
          />
          <SidebarItem
            text="Fichiers API"
            selectedIndex={selectedIndex}
            currentIndex={9} // Index du parent Billing API
            subItems={[
              { text: 'Création dossier', icon: <CodeIcon />, to: '/api/folder-api/create', index: 9 },
              { text: 'Dossiers', icon: <CodeIcon />, to: '/api/folder-api/getAll', index: 10 },
              { text: 'Mise à jour', icon: <CodeIcon />, to: '/api/billing-api/update', index: 11 },
              { text: 'Suppression', icon: <CodeIcon />, to: '/api/billing-api/delete', index: 12 },
              { text: 'Toutes les factures', icon: <CodeIcon />, to: '/api/billing-api/getAll', index: 13 },
            ]}
          />
          <SidebarItem
            text="FAQ"
            selectedIndex={selectedIndex}
            currentIndex={14}
            to="/api/faq"
          />
        </List>
      </Box>
    </Drawer>
  );
}
