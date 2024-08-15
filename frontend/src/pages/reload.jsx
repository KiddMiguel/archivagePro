import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Reload = ({message}) => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                width: '100vw' 
            }}
        >
            <CircularProgress />
            <Box ml={2}>{message}</Box>
        </Box>
    );
};

export default Reload;
