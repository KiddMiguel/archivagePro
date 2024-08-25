import React, { useEffect, useState } from 'react';
import {
    Box, Typography, TextField, Button, Avatar, Grid, Divider
} from '@mui/material';
import { updateUser, deleteUser } from '../../../services/serviceUsers';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../../services/AuthContext';
import YesNoToggle from '../../../components/dashboard-page/YesNoToggle';

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
    const { updated } = useAuth();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({
        ...user,
        address: user.address || { street: '', city: '', postalCode: '', country: '' }
    });
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateUser(userDetail);
        console.log(response);
        if (response.success) {
            updated(response.user, response.rootFolder);
            navigate('/reload/dashboard');
        } else {
            setError(response.message);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prevState => ({
            ...prevState,
            // Si le nom du champ appartient à l'adresse, mettez à jour l'adresse
            address: {
                ...prevState.address,
                [name]: value,
            },
            // Sinon, mettez à jour directement userDetail
            ...(name !== 'street' && name !== 'city' && name !== 'postalCode' && name !== 'country' && { [name]: value })
        }));
    };

    const handleDeleteProfile = async () => {
        // Supprimer le profil
       const response =  await deleteUser();
         if(response.success){
              navigate('/reload/logout');
            } else {
                setError(response.message);
            }
    };
    console.log(userDetail);

    useEffect(() => {
        // UseEffect pour mettre à jour les détails de l'utilisateur
        setUserDetail({
            ...user,
            address: user.address || { street: '', city: '', postalCode: '', country: ''
            }
        });
    }, []);

    return (
        <TabPanel value={selectedTab} index={index} align="left">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ width: "70%" }}>
                    <Grid item xs={12} sm={9} md={9}>
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
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Téléphone"
                                    variant="outlined"
                                    name="telephone"
                                    onChange={handleChange}
                                    value={userDetail?.telephone || ''}
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

                    <Grid item xs={12} sm={9} md={9}>
                    <Box  sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'end', }}>
                    <Button variant="outlined" color="error" sx={{ textTransform: 'none', border: "none" }} 
                    onClick={() => {
                        setOpenDialog(true);
                    }}>
                        Supprimer le compte
                    </Button>
                    <Box>
                        <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', mr: 2 }}>
                            Annuler
                        </Button>
                        <Button variant="contained" color="primary" sx={{ textTransform: 'none' }} type="submit">
                            Enregistrer les modifications
                        </Button>
                        {error && <Typography variant="body2" sx={{ color: 'error', mt: 0 }}>{error}</Typography>}
                    </Box>
                </Box>
                </Grid>
                </Grid>
            </form>

            <YesNoToggle 
                title="Supprimer le profil"
                message="Êtes-vous sûr de vouloir supprimer votre profil? Cette action est irréversible."
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                yesComport={handleDeleteProfile}
            />
        </TabPanel>
    );
};

export default TabPanelProfil;
