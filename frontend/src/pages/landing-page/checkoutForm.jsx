import React, { useState } from 'react';
import {
  Container, Grid, TextField, FormControlLabel, Checkbox, Button, Typography, Box, Radio, RadioGroup,
  FormControl, FormLabel, Card, CardContent, CardHeader, Divider, Tabs, Tab, MenuItem, Select,
  AppBar,
  Toolbar
} from '@mui/material';
import { CreditCard, Payment, AccountBalanceWallet, AccountBalance } from '@mui/icons-material';

const CheckoutForm = () => {
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    paymentMethod: 'credit',
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Billing Information:', billingInfo);
    alert('Paiement traité avec succès !');
  };

  return (
    <>
      <AppBar position="static" color="transparent" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Toolbar>
          <Typography variant="h6">
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Prénom"
                        fullWidth
                        autoComplete="given-name"
                        value={billingInfo.firstName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Nom"
                        fullWidth
                        autoComplete="family-name"
                        value={billingInfo.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="username"
                        name="username"
                        label="Nom d'utilisateur"
                        fullWidth
                        autoComplete="username"
                        value={billingInfo.username}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        name="email"
                        label="Email (Optionnel)"
                        fullWidth
                        autoComplete="email"
                        value={billingInfo.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Adresse"
                        fullWidth
                        autoComplete="shipping address-line1"
                        value={billingInfo.address1}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address2"
                        name="address2"
                        label="Adresse 2 (Optionnel)"
                        fullWidth
                        autoComplete="shipping address-line2"
                        value={billingInfo.address2}
                        onChange={handleChange}
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
                        value={billingInfo.country}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="state"
                        name="state"
                        label="Région"
                        fullWidth
                        autoComplete="shipping address-level1"
                        value={billingInfo.state}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Code postal"
                        fullWidth
                        autoComplete="shipping postal-code"
                        value={billingInfo.zip}
                        onChange={handleChange}
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
                          <Typography variant="body2">90.00€</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="body2">Expédition & Manutention estimées</Typography>
                          <Typography variant="body2">8.00€</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="body2">Taxe estimée</Typography>
                          <Typography variant="body2">—</Typography>
                        </Box>
                        <Divider />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                          <Typography variant="h6">Total</Typography>
                          <Typography variant="h6">98.00€</Typography>
                        </Box>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                    <Tab label={<Box display="flex" alignItems="center" sx={{ textTransform: 'none' }}><CreditCard /> Carte de crédit</Box>} />
                    <Tab label={<Box display="flex" alignItems="center" sx={{ textTransform: 'none' }}><AccountBalanceWallet /> PayPal</Box>} />
                    <Tab label={<Box display="flex" alignItems="center" sx={{ textTransform: 'none' }}><AccountBalance /> Virement bancaire</Box>} />
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
                          value={billingInfo.cardName}
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
                          value={billingInfo.cardNumber}
                          onChange={handleChange}
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
                          value={billingInfo.expiration}
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
                          value={billingInfo.cvv}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box hidden={tab !== 1}>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Sélectionnez le type de compte PayPal</FormLabel>
                          <RadioGroup aria-label="paypalAccountType" name="paypalAccountType">
                            <FormControlLabel value="domestic" control={<Radio />} label="National" />
                            <FormControlLabel value="international" control={<Radio />} label="International" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth>
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
                  <Box hidden={tab !== 2}>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel component="legend">Sélectionnez votre banque</FormLabel>
                          <Select id="bank" name="bank" value={billingInfo.bank} onChange={handleChange} displayEmpty>
                            <MenuItem value="" disabled>
                              --Veuillez sélectionner votre banque--
                            </MenuItem>
                            <MenuItem value="bank1">Banque 1</MenuItem>
                            <MenuItem value="bank2">Banque 2</MenuItem>
                            <MenuItem value="bank3">Banque 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth>
                          Procéder au paiement
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Confirmer le paiement
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
