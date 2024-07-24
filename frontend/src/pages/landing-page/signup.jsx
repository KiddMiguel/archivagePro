// src/pages/Signup.js
import React from "react";
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
} from "@mui/material";
import { register } from "../../services/service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = React.useState(false);
  const [message , setMessage] = React.useState("");

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      telephone: e.target.telephone.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // Call the register function from the service
    const response = await register(user);
    console.log(response);
    if (response.success) {
      login(response.user, response.token);
      navigate('/dashboard');
    } else {
      setError(true);
      if(response.success === false){
        setMessage(response.msg);
      }else{
        setMessage(response.errors[0].message);
      }
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
            onSubmit={(e) => handleRegister(e)}
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
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ marginBottom: "20px" }}
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
              Créer un compte
            </Button>
            {error && (
              <Alert severity="error" sx={{ marginBottom: "20px" }}>
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
