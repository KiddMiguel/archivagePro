import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Reload = () => {
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
        </Box>
    );
};

export default Reload;
