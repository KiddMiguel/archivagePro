// src/pages/Login.js
import React from 'react';
import { Container, Box, Grid, Typography, TextField, Button, Link, FormControlLabel, Checkbox, AppBar, Toolbar } from '@mui/material';
import {login} from '../../services/service';
import { AuthContext } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = React.useState(null);
  const {login} = React.useContext(AuthContext);
  const history = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await login(user);

    if (response.success) {
      console.log('User logged in successfully');
      if (response.token) {
        login(response.user, response.token);
        history.push('/dashboard');
      }

    }else{
      console.log(response.msg);
    }
  }

  return (
    <>
      <AppBar position="static" color="transparent" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Toolbar>
        <Typography variant="h6" component="a" href="/" sx={{textDecoration : "none"}}> 
        ArchiDrive
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '95vh',
          backgroundColor: '#f4f6f8',
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Box
            component="form"
            onSubmit={(e) => handleLogin(e)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#fff'
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%', marginBottom: '20px' }}>
              <Grid item>
                <Typography variant="h5">
                  Connexion
                </Typography>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ textDecoration: 'none', color: '#1a73e8' }}>
                Vous n'avez pas de compte ?
                </Link>
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
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
            <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%', marginBottom: '20px' }}>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Rester connecté"
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{ textDecoration: 'none', color: '#1a73e8' }}>
                Mot de passe oublié ?                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '20px 0', padding: '10px', backgroundColor: '#1a73e8', textTransform: 'none', fontSize: '15px' }}
            >
              Se connecter
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
