import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, Avatar, Grid, Divider
} from '@mui/material';

// Assurez-vous d'avoir un composant TabPanel défini ou importé
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const TabPanelProfil = ({ selectedTab, index, user }) => {
    const [userDetail, setUserDetail] = useState(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for submitting form goes here
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({
            ...userDetail,
            [name]: value,
        });
    };

    return (
        <TabPanel value={selectedTab} index={index} align="left">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ width: "70%" }}>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                sx={{ width: 100, height: 100, mb: 2 }}
                                src="/path/to/profile-picture.jpg"
                            />
                            <Button variant="text" color="error">Supprimer</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Grid container spacing={2}>
                            <Typography variant="h6" sx={{ mb: 1, ml: 2, mt: 2 }}>Détails de base</Typography>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={userDetail?.firstName || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    variant="outlined"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={userDetail?.lastName || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Adresse e-mail"
                                    variant="outlined"
                                    name="email"
                                    onChange={handleChange}
                                    value={userDetail?.email || ''}
                                />
                            </Grid>
                            <Typography variant="h6" sx={{ mb: 1, ml: 2, mt: 2 }}>Adresse</Typography>

                            <Divider sx={{
                                mb: 2,
                                width: '97%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }} />

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Rue"
                                    name="street"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={userDetail?.address?.street || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Ville"
                                    name="city"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={userDetail?.address?.city || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Code Postal"
                                    name="postalCode"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={userDetail?.address?.postalCode || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Pays"
                                    name="country"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={userDetail?.address?.country || ''}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "58.5%" }}>
                    <Button variant="outlined" color="error" sx={{ textTransform: 'none', border: "none" }}>
                        Supprimer le compte
                    </Button>
                    <Box>
                        <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', mr: 2 }}>
                            Annuler
                        </Button>
                        <Button variant="contained" color="primary" sx={{ textTransform: 'none' }} type="submit">
                            Enregistrer les modifications
                        </Button>
                    </Box>
                </Box>
            </form>
        </TabPanel>
    );
};

export default TabPanelProfil;
