import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Breadcrumbs, Link, Tabs, Tab, TextField, Button, Avatar, Grid, 
  Card, CardContent, IconButton, 
  Divider
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import TabPanelProfil from './settings/TabPanelProfil';
import TabPanelSecurity from './settings/TabPanelSecurity';
import TabPanelFactures from './settings/TabPanelFactures';

const Settings = ({user, isAuthenticated}) => {
  console.log(user);
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

  useEffect(() => {
    if(isAuthenticated && !user.address) {
     window.location.reload(); 
    }
    if (isAuthenticated) {
      setFullName(user.fullName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress({
        street: user.address.street,
        city: user.address.city,
        postalCode: user.address.postalCode,
        country: user.address.country
      });
      setBio(user.bio);
    }
  }, [isAuthenticated, user]);

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
          {(user.isAdmin === false) && (
 <Tab label="Facture / Moyens de Paiement" />
          )}
          <Tab label="Aide et Support" />
        </Tabs>
      </Box>

      <TabPanelProfil selectedTab={selectedTab} index={0} user ={user}/>
      <TabPanelSecurity selectedTab={selectedTab} index={1} user = {user} />

      {(user.isAdmin === false) && (
            <TabPanelFactures selectedTab={selectedTab} index={2} user = {user} />
      )}
      

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
