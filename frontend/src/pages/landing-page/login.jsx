// src/pages/Login.js
import React from 'react';
import { Container, Box, Grid, Typography, TextField, Button, Link, FormControlLabel, Checkbox, AppBar, Toolbar, Alert } from '@mui/material';
import { loginService } from '../../services/service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [error, setError] = React.useState(null);
  const [loading , setLoading] = React.useState(false);
  const [message , setMessage] = React.useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await loginService(user);
      if (response.success) {
        if (response.token) {
          login(response.user, response.token, response.rootFolder);
          navigate('/dashboard');
        }
      } else {
        setLoading(false);
        setError(true);
        if(response.success === false){
          setLoading(false);
          setMessage(response.msg);
        }else{
          setLoading(false);
          setMessage(response.errors[0].message);
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

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
                <Link href="/forgotpassword" variant="body2" sx={{ textDecoration: 'none', color: '#1a73e8' }}>
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
       {loading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Connexion en cours...
                        <CircularProgress
                          color="inherit" 
                          thickness={5} 
                          size={20} 
                          sx={{ color: 'white' }} 
                        />
                      </div>
                    ) : (
                      'Connexion'
                    )}
            </Button>
            {error && (
              <Alert severity="error" sx={{ background : "white", color : "#dc3545"}}>
                {message}
              </Alert>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
