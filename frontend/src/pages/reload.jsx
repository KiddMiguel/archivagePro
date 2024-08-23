import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Reload = ({ message, timeout = 3000, redirectPath = '/' }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(redirectPath);  // Navigate to the specified path after timeout
        }, timeout);

        return () => clearTimeout(timer);  // Cleanup the timeout on unmount
    }, [timeout, navigate, redirectPath]);

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                width: '75vw' 
            }}
        >
            <CircularProgress />
            <Box ml={2}>{message}</Box>
        </Box>
    );
};

export default Reload;
