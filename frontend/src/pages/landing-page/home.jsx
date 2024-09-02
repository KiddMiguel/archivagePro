import React from "react";
import Header from "../../components/landing-page/Header";
import Footer from "../../components/landing-page/Footer";
import { Container, Grid, Typography, Button, Box, Card, CardContent, CardActions } from "@mui/material";
import { Cloud, People, Security, CheckCircle, AddCircle, Euro, Schedule } from '@mui/icons-material'; // Import des icônes Material-UI
import image1 from "../../assets/images/image1.png";

const cardStyles = {
  maxWidth: 345,
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  padding: '20px',
};

const Home = () => {
  return (
    <div className="main-container">
      <Header />
      <Container sx={{ flex: 1 }}>
        <Grid container spacing={5} alignItems="center" style={{ marginTop: '15px' }}>
          <Grid item xs={12} md={6} align="left" sx={{ paddingBottom: "10rem" }}>
            <Typography variant="h1" component="h1" gutterBottom style={{ fontSize: 'calc(2.8rem + 1vw)' }}>
              Bienvenue sur ArchiDrive
            </Typography>
            <Typography variant="body1" component="p" gutterBottom color="GrayText">
              ArchiDrive est la solution idéale pour le stockage sécurisé et l'organisation de tous vos fichiers d'architecture. Simplifiez la gestion de vos projets avec notre plateforme intuitive et performante.
            </Typography>
            <Button component="a" href="/login" variant="contained" color="primary" sx={{ marginTop: '20px', textTransform: 'none' }} size="large">
              Découvrir ArchiDrive
            </Button>
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            <a href="https://www.loom.com/share/27c6a1b00e714ca0aff322b704d8359d?sid=1b16768a-b34c-4d14-b1b9-9d4b52a82245" target="_blank" rel="noopener noreferrer">
              <img src={image1} alt="Watch the video" style={{ width: '100%',  border: 'none' }} />
            </a>
          </Grid>
        </Grid>

        {/* Nouvelle section */}
        <Grid container spacing={4} alignItems="center" style={{ marginTop: '50px' }}>
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <Card sx={cardStyles}>
              <CardContent>
                <Cloud style={{ fontSize: '50px' }} color="primary" />
                <Typography variant="h6" gutterBottom>
                  Stockage en Cloud
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Conservez tous vos fichiers en toute sécurité avec notre solution de stockage cloud. Accédez-y où que vous soyez.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <Card sx={cardStyles}>
              <CardContent>
                <People style={{ fontSize: '50px' }} color="primary" />
                <Typography variant="h6" gutterBottom>
                  Support Client Dédié
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Profitez d'un support client personnalisé pour répondre à toutes vos questions et vous aider à tirer le meilleur parti de notre plateforme.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <Card sx={cardStyles}>
              <CardContent>
                <Security style={{ fontSize: '50px' }} color="primary" />
                <Typography variant="h6" gutterBottom>
                  Sécurité Avancée
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Vos données sont protégées par des mesures de sécurité avancées pour garantir leur confidentialité et leur intégrité.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" style={{ marginTop: '50px' }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              Pourquoi choisir ArchiDrive ?
            </Typography>
            <Box component="ul" style={{ paddingLeft: '20px', listStyle: 'none' }}>
              <Box component="li" display="flex" alignItems="center" mb={2}>
                <CheckCircle style={{ color: '#4caf50', marginRight: '10px' }} />
                Stockage illimité pour tous vos fichiers de projet.
              </Box>
              <Box component="li" display="flex" alignItems="center" mb={2}>
                <CheckCircle style={{ color: '#4caf50', marginRight: '10px' }} />
                Gestion des fichiers client avec accès sécurisé.
              </Box>
              <Box component="li" display="flex" alignItems="center" mb={2}>
                <CheckCircle style={{ color: '#4caf50', marginRight: '10px' }} />
                Outils de gestion de projet intégrés pour une meilleure organisation.
              </Box>
              <Box component="li" display="flex" alignItems="center" mb={2}>
                <CheckCircle style={{ color: '#4caf50', marginRight: '10px' }} />
                Sécurité et confidentialité des données assurées.
              </Box>
              <Box component="li" display="flex" alignItems="center" mb={2}>
                <CheckCircle style={{ color: '#4caf50', marginRight: '10px' }} />
                Accès à vos fichiers depuis n'importe quel appareil, à tout moment.
              </Box>
              <Box component="li" display="flex" alignItems="center" mb={2}>
                <CheckCircle style={{ color: '#4caf50', marginRight: '10px' }} />
                Interface intuitive et facile à utiliser.
              </Box>
            </Box>
          </Grid>
           {/* Section Offre Premium */}
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <Card sx={{ ...cardStyles, backgroundColor: '#1976d2', color: 'white' }}>
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  Offre Premium
                </Typography>
                <Typography variant="h6" color="whitesmoke" gutterBottom>
                  20€ / 20 Go
                </Typography>
                <Box component="ul" style={{ paddingLeft: '20px', listStyle: 'none', color: 'white' }}>
                  <Box component="li" display="flex" alignItems="center" mb={2}>
                    <AddCircle style={{ marginRight: '10px' }} />
                    Espace de stockage supplémentaire
                  </Box>
                  <Box component="li" display="flex" alignItems="center" mb={2}>
                    <Euro style={{ marginRight: '10px' }} />
                    20€ pour 20 Go supplémentaires
                  </Box>
                  <Box component="li" display="flex" alignItems="center" mb={2}>
                    <Schedule style={{ marginRight: '10px' }} />
                    Aucune récurrence mensuelle
                  </Box>
                  <Box component="li" display="flex" alignItems="center" mb={2}>
                    <CheckCircle style={{ marginRight: '10px' }} />
                    Payez ce dont vous avez besoin
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button component="a" href="/login" variant="contained" color="success" fullWidth sx={{ textTransform: 'none' }}>
                  Profiter de l'offre
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
