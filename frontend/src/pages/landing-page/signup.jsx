import React, { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  AppBar,
  Toolbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../../services/service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  // Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Add state for password and confirm password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setLoading(false);
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const user = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      telephone: e.target.telephone.value,
      email: e.target.email.value,
      password: password,
    };

    const response = await register(user);
    if (response.success) {
      login(response.user, response.token, response.rootFolder);
      navigate("/checkout");
    } else {
      setLoading(false);
      setError(true);
      setMessage(response.success === false ? response.msg : response.errors[0].message);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{ paddingLeft: "10px", paddingRight: "10px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
          >
            ArchiDrive
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f4f6f8",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "60%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "30px",
              backgroundColor: "#fff",
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%", marginBottom: "20px" }}
            >
              <Grid item>
                <Typography variant="h5">S'inscrire </Typography>
              </Grid>
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ textDecoration: "none", color: "#1a73e8" }}
                >
                  Vous avez déjà un compte ?{" "}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Téléphone"
              name="telephone"
              autoComplete="telephone"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "20px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: "20px" }}
              error={confirmPasswordError}
              helperText={confirmPasswordError && "Les mots de passe ne correspondent pas"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: "20px 0",
                padding: "10px",
                backgroundColor: "#1a73e8",
                textTransform: "none",
                fontSize: "15px",
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Inscription en cours...
                  <CircularProgress
                    color="inherit"
                    thickness={5}
                    size={20}
                    sx={{ color: 'white' }}
                  />
                </div>
              ) : (
                "S'inscrire"
              )}
            </Button>
            {error && (
              <Alert severity="error" sx={{ background: "white", color: "#dc3545" }}>
                {message}
              </Alert>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
