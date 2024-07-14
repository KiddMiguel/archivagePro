// src/pages/Signup.js
import React from 'react';
import { Container, Box, Grid, Typography, TextField, Button, Link, AppBar, Toolbar } from '@mui/material';


const Signup = () => {
  return (
    <>
      <AppBar position="static" color="transparent" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Toolbar>
          <Typography variant="h6">
            ArchiDrive
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f4f6f8',
        }}
      >
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#fff'
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%', marginBottom: '20px' }}>
              <Grid item>
                <Typography variant="h5">
                S'inscrire                </Typography>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2" sx={{ textDecoration: 'none', color: '#1a73e8' }}>
                Vous avez déjà un compte ?                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  sx={{ marginBottom: '20px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                  sx={{ marginBottom: '20px' }}
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="company"
              label="Entreprise"
              name="company"
              autoComplete="company"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ marginBottom: '20px' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '20px 0', padding: '10px', backgroundColor: '#1a73e8', textTransform: 'none', fontSize: '15px' }}
            >
              Créer un compte
              </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
