import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, TextField, InputAdornment, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen, drawerWidth }) {
  return (
    <AppBarStyled position="fixed" open={open} drawerWidth={drawerWidth} elevation={0} sx={{ background: 'inherit', borderBottom : "1px solid rgba(0, 0, 0, 0.12)" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
          <TextField
            variant="outlined"
            placeholder="Recherche de fichiers..."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '10px',
                height: '35px',
                fontSize: '14px',
              },
            }}
          />
        </Box>

        {/* Section du profil utilisateur */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap : 1.5}}>
        <Avatar alt="Philipp Omega" src="/path/to/avatar.jpg" />
          <Typography sx={{fontSize: "14px"}} variant="h6">Philipp Omega</Typography>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBarStyled>
  );
}
