import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DropzoneArea from './DropzoneArea';

const drawerWidth = 180;

export default function LeftBar({ open }) {
  const location = useLocation();

  const determineSelectedIndex = (path) => {
    switch (path) {
      case '/dashboard':
        return 0;
      case '/favoris':
        return 1;
      case '/corbeille':
        return 2;
      case '/parametres':
        return 3;
      default:
        return null;
    }
  };

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
            key="Favoris"
            selected={selectedIndex === 1}
            sx={listItemStyle(1)}
            component={Link}
            to="/favoris"
          >
            <ListItemIcon>
              <GradeIcon
                sx={{
                  fontSize: 22,
                  color: selectedIndex === 1 ? '#1976d2' : 'inherit',
                }}
                
              />
            </ListItemIcon>
            <ListItemText
              primary="Favoris"
              primaryTypographyProps={{
                fontWeight: selectedIndex === 1 ? '500' : 'regular',
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
              onDrop={(acceptedFiles) => console.log('Files dropped:', acceptedFiles)}
              label="Glisser des fichiers, ou"
              iconSize={48}
              borderColor="#ccc"
              activeBgColor="#f0f8ff"
              textColor="#1976d2"
            />
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
            to="/parametres"
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
