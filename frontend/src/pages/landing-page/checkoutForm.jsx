import React, { useState } from 'react';
import {
  Container, Grid, TextField, FormControlLabel, Checkbox, Button, Typography, Box, 
 Card, CardContent, CardHeader, Divider, Tabs, Tab,
  AppBar,
  Toolbar,
  CircularProgress
} from '@mui/material';
import { CreditCard, AccountBalanceWallet} from '@mui/icons-material';
import { createInvoice } from '../../services/serviceInvoices';
import { updateUser } from '../../services/serviceUsers';
import { useNavigate } from 'react-router-dom';
import Reload from '../reload';
import { useAuth } from '../../services/AuthContext';


const CheckoutForm = ({user}) => {
  const { updated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [billingInfo, setBillingInfo] = useState({});

  const [tab, setTab] = useState(0);


  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    user.storageLimit = user.storageLimit + 20 * 1024 * 1024 * 1024;
    user.subscription = 'premium';
    billingInfo.user = user.id || user._id;
    billingInfo.facture = user;
    billingInfo.amount = 20;
    billingInfo.subscription = 'premium';

    billingInfo.address = {
      street: billingInfo.address1,
      city: billingInfo.city,
      postalCode: billingInfo.postalCode,
      country: billingInfo.country
    }
    console.log(billingInfo);


    await createInvoice(billingInfo);
    await updateUser(billingInfo);
    const updatedUser = { ...user, address: billingInfo.address };
    await updated(updatedUser);
    setLoading(true);    
  };
  if(loading){
    return (<Reload message="Paiement en cours..." redirectURL={"dashboard"} time ={5000}/>);
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
        <Container component="main" maxWidth="lg">
          <Box
            mt={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#fff'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Paiement
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Adresse de facturation
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Adresse"
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleChange}
                        value={user && user.address && user.address.street}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address2"
                        name="address2"
                        label="Adresse 2 (Optionnel)"
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={handleChange}
                        value={user && user.address && user.address.street2}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Pays"
                        fullWidth
                        autoComplete="shipping country"
                        onChange={handleChange}
                        value={user && user.address && user.address.country}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="Région"
                        fullWidth
                        autoComplete="shipping address-level1"
                        onChange={handleChange}
                        value={user && user.address && user.address.city}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="postalCode"
                        name="postalCode"
                        label="Code postal"
                        fullWidth
                        autoComplete="shipping postal-code"
                        onChange={handleChange}
                        value={user && user.address && user.address.postalCode}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <FormControlLabel
                        control={<Checkbox color="primary" name="saveAddress" value="yes" />}
                        label="L'adresse de livraison est la même que l'adresse de facturation"
                      />
                      <FormControlLabel
                        control={<Checkbox color="primary" name="saveInfo" value="yes" />}
                        label="Enregistrer ces informations pour la prochaine fois"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardHeader title="Résumé" />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="div">
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="body2">Avez-vous un code promo ?</Typography>
                          <TextField id="promoCode" name="promoCode" label="Code promo" size="small" />
                        </Box>
                        <Divider />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="body2">Sous-total</Typography>
                          <Typography variant="body2">20.00€</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="body2">Taxe estimée</Typography>
                          <Typography variant="body2">—</Typography>
                        </Box>
                        <Divider />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="h6">Total</Typography>
                          <Typography variant="h6">20.00€</Typography>
                        </Box>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                    <Tab label={<Box  display="flex" alignItems="center" sx={{ textTransform: 'none' }}><CreditCard /> Carte de crédit</Box>} />
                    <Tab label={<Box display="flex" alignItems="center" sx={{ textTransform: 'none' }}><AccountBalanceWallet /> PayPal</Box>} />
                  </Tabs>
                  <Box hidden={tab !== 0}>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="cardName"
                          name="cardName"
                          label="Nom du titulaire de la carte"
                          fullWidth
                          autoComplete="cc-name"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField
                        required
                        id="cardNumber"
                        name="cardNumber"
                        label="Numéro de carte"
                        fullWidth
                        autoComplete="cc-number"
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 16,
                          pattern: "[0-9]*"
                        }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField
                      required
                      id="expiration"
                      name="expiration"
                      label="Date d'expiration (MM/AA)"
                      fullWidth
                      autoComplete="cc-exp"
                      type="text" 
                      onChange={handleChange}
                      
                    />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="cvv"
                          name="cvv"
                          label="CVV"
                          fullWidth
                          autoComplete="cc-csc"
                          onChange={handleChange}
                          inputProps={{
                            maxLength: 3,
                            pattern: "[0-9]*"
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box hidden={tab !== 1}>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth sx={{textTransform: 'none' }}>
                          Connexion à PayPal
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                          Note : Après avoir cliqué sur le bouton, vous serez dirigé vers une passerelle de paiement sécurisée.
                          Après avoir terminé le processus de paiement, vous serez redirigé vers le site pour voir les détails de votre commande.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  
                  <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{textTransform: 'none' }}>
                    {loading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Paiement en cours...
                        <CircularProgress
                          color="inherit" 
                          thickness={5} 
                          size={20} 
                          sx={{ color: 'white' }} 
                        />
                      </div>
                    ) : (
                      'Confirmer le paiement de 20.00€'
                    )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CheckoutForm;
