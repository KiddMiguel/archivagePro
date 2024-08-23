import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Reload = ({ message}) => {
    const navigate = useNavigate();

    // Récupérer l'url de la page actuelle
    let currentUrl = window.location.href;
    currentUrl = currentUrl.split('/').pop();
    console.log(currentUrl);

    setTimeout(() => {
        navigate('/dashboard');
        console.log('reloading page');
        console.log(currentUrl);
    }, 1000);

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                width: '80vw' 
            }}
        >
            <CircularProgress />
            <Box ml={2}>{message}</Box>
        </Box>
    );
};

export default Reload;
