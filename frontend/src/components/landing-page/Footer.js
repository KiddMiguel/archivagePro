import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Code } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#1976d2', color: '#fff', padding: '20px', marginTop: '50px' }}>
            <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                        © 2024 ArchiDrive. Tous droits réservés.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
                    <Box component="a" href="/api" sx={{ color: '#fff', marginRight: '10px', display: 'inline-flex', alignItems: 'center' }}>
                        <Code sx={{ fontSize: '20px' }} />
                    </Box>
                    <Box component="a" href="https://www.facebook.com" target="_blank" sx={{ color: '#fff', marginRight: '10px' }}>
                        <Facebook sx={{ fontSize: '20px' }} />
                    </Box>
                    <Box component="a" href="https://www.twitter.com" target="_blank" sx={{ color: '#fff', marginRight: '10px' }}>
                        <Twitter sx={{ fontSize: '20px' }} />
                    </Box>
                    <Box component="a" href="https://www.linkedin.com" target="_blank" sx={{ color: '#fff', marginRight: '10px' }}>
                        <LinkedIn sx={{ fontSize: '20px' }} />
                    </Box>
                    <Box component="a" href="https://www.instagram.com" target="_blank" sx={{ color: '#fff', marginRight: '10px' }}>
                        <Instagram sx={{ fontSize: '20px' }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
