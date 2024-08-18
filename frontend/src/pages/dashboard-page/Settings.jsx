import React, { useState } from 'react';
import {
  Box, Typography, Breadcrumbs, Link, Tabs, Tab, TextField, Button, Avatar, Grid, MenuItem,
  Card, CardContent, IconButton, InputAdornment,
  Divider
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [country, setCountry] = useState('Spain');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('Sofia Rivers');
  const [email, setEmail] = useState('sofia@devias.io');
  const [phone, setPhone] = useState('965 245 7623');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.12)", pb: 2 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" fontSize="12px">
              Accueil
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: "500", fontSize: "12px" }}>Paramètres</Typography>
          </Breadcrumbs>
          <Typography variant="h4" align="left" sx={{ fontWeight: 'bold', mt: 1 }}>
            Paramètres
          </Typography>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Paramètres Tabs">
          <Tab label="Profil Utilisateur" />
          <Tab label="Sécurité" />
          <Tab label="Notifications" />
          <Tab label="Préférences" />
          <Tab label="Moyens de Paiement" />
          <Tab label="Aide et Support" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0} align="center">
        <Typography variant="h6" sx={{ mb: 2 }} align='center'>Détails de base</Typography>
        <Grid container spacing={3} sx={{width : "60%"}}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, mb: 2 }}
                src="/path/to/profile-picture.jpg"
              />
              <Button variant="text" color="error">Supprimer</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
              </Grid>
                <Typography variant="h6" sx={{ mb: 1, ml: 2, mt:2 }}>Adresse</Typography>

                <Divider sx={{
                    mb: 2,
                    width: '97%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}/>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rue"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ville"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Code Postal"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pays"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:"58.5%" }}>
          <Button variant="outlined" color="error" sx={{ textTransform: 'none' }}>
            Supprimer le compte
          </Button>
          <Box>
            <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', mr: 2 }}>
              Annuler
            </Button>
            <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
              Enregistrer les modifications
            </Button>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Typography variant="h6">Sécurité</Typography>
        <Typography>Modifier le mot de passe, activer l'authentification à deux facteurs, etc.</Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Typography variant="h6">Notifications</Typography>
        <Typography>Paramètres de notification pour les emails, SMS, etc.</Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        <Typography variant="h6">Préférences</Typography>
        <Typography>Langue, thèmes, paramètres de l'application, etc.</Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={4}>
        <Typography variant="h6">Moyens de Paiement</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      **** **** **** 1234
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Expire le 12/24
                    </Typography>
                  </Box>
                </Box>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          {/* Ajouter plus de cartes de crédit ici si nécessaire */}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
            Ajouter une carte
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={selectedTab} index={5}>
        <Typography variant="h6">Aide et Support</Typography>
        <Typography>FAQ, contact du support, etc.</Typography>
      </TabPanel>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Settings;
