import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';

const Header = () => {
  const [language, setLanguage] = React.useState('French');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar  position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={isMobile ? 8 : 'auto'}>
            <Typography variant="h6">
              ArchiDrive
            </Typography>
          </Grid>
          <Grid item xs={isMobile ? 4 : 'auto'} style={{ textAlign: 'right' }}>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Accéder à mon ArchiDrive</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                  Accéder à mon ArchiDrive
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
