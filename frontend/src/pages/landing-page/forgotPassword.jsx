import { AppBar, Toolbar, Typography, Box, Container, TextField, Button, Grid, Link, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { forgotPassword } from '../../services/serviceUsers';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
        };
        try {
            const response = await forgotPassword(user);
            if (response.success) {
                setLoading(true);
                setError(false);
                setMessage(response.msg);
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            } else {
                setLoading(false);
                setError(true);
                setMessage(response.msg);
            }
        } catch (error) {
            setError('Une erreur s\'est produite. Veuillez réessayer');
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
                        onSubmit={(e) => handleForgotPassword(e)}
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
                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                            Mot de passe oublié
                        </Typography>
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
               
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ margin: '20px 0', padding: '10px', backgroundColor: '#1a73e8', textTransform: 'none', fontSize: '15px' }}
                        >
                           {loading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Envoi en cours...
                        <CircularProgress
                          color="inherit" 
                          thickness={5} 
                          size={20} 
                          sx={{ color: 'white' }} 
                        />
                      </div>
                    ) : (
                      'Envoi'
                    )}
                        </Button>
                        {error && (
                            <Alert severity="error" sx={{ background: "white", padding: "0px",  color: "#424242" }}>
                                {message}
                            </Alert>
                        )}
                        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                            <Grid item>
                                <Link href="/login" variant="body2" sx={{ textDecoration: 'none', color: '#1a73e8' }}>
                                    Retour à la connexion
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ForgotPassword;
