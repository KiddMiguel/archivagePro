import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid, Divider, CircularProgress, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePassword } from '../../../services/serviceUsers';

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

const TabPanelSecurity = ({ selectedTab, index, user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    setMessage(null);
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    const response = await changePassword(currentPassword, newPassword);

    if (response.success) {
      setLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
      setMessage("Mot de passe mis à jour avec succès !");
    } else {
        console.log(response.msg);
      setError(response.errors ? response.errors[0].message : response.msg);
      setLoading(false);
    }
  };

  const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <TabPanel value={selectedTab} index={index}>
      <form onSubmit={handlePasswordChange}>
        <Grid container spacing={3} sx={{ width: "70%" }}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, ml: 2, mt: 2 }}>Modifier le mot de passe</Typography>
            
            <Divider sx={{ mb: 2, width: '97%', marginLeft: 'auto', marginRight: 'auto' }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mot de passe actuel"
                  variant="outlined"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowCurrentPassword}
                          edge="end"
                          sx={{ fontSize: 20 }}
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  variant="outlined"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowNewPassword}
                          edge="end"
                          sx={{ fontSize: 20 }}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmer le nouveau mot de passe"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowConfirmPassword}
                          edge="end"
                          sx={{ fontSize: 20 }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {error && <Typography variant="body2" sx={{ color: 'red', mt: 0 }}>{error}</Typography>}
            {message && <Typography variant="body2" sx={{ color: 'green', mt: 2 }}>{message}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: "100%" }}>
              <Button variant="contained" color="primary" sx={{ textTransform: 'none' }} type="submit">
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Modification en cours...
                    <CircularProgress color="inherit" thickness={5} size={20} sx={{ color: 'white' }} />
                  </div>
                ) : (
                  'Enregistrer les modifications'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </TabPanel>
  );
};

export default TabPanelSecurity;
