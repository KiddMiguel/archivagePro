// Dashboard.js
import React, { useState } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import Header from '../../components/dashboard-page/Header';
import LeftBar from '../../components/dashboard-page/LeftBar';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} />
      <LeftBar open={open} />
      <Main open={open}>
        <Toolbar />
        {/* Your content goes here */}
        <Typography paragraph>
          Your main content goes here...
        </Typography>
      </Main>
    </Box>
  );
}
