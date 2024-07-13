import React from "react";
import Header from "../../components/landing-page/Header";
import { Container, Grid, Typography, Button, Box, Card, CardContent, CardActions } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Container>
        <Header />
        <Grid container spacing={4} alignItems="center" style={{ marginTop: '50px' }}>
          <Grid item xs={12} md={6} align="left">
            <Typography variant="h1" component="h1" gutterBottom style={{ fontSize: "5rem" }}>
              Bienvenue sur ArchiDrive
            </Typography>
            <Typography variant="body1" component="p" gutterBottom color="GrayText">
              ArchiDrive est la solution idéale pour le stockage sécurisé et l'organisation de tous vos fichiers d'architecture. Simplifiez la gestion de vos projets avec notre plateforme intuitive et performante.
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: '20px', textTransform : "none"}} size="large" >
              Découvrir ArchiDrive
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ textAlign: 'center' }}>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/your_video_id" // Replace with your video URL
                title="Wasabi Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ marginTop: 4 }}>
          En libérant vos données avec Wasabi, vous pouvez réduire les coûts de stockage jusqu'à 80%.
        </Typography>
        <Typography variant="body1" component="p" gutterBottom align="center" color="GrayText" sx={{ marginBottom: 4 }}>
          Wasabi se consacre à une seule chose: le stockage cloud. En tant que seul fournisseur du marché entièrement concentré sur le stockage cloud, notre approche unique nous a permis de mettre au point une manière plus efficace de stocker, d'accéder et d'exploiter les données pour les entreprises du monde entier.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Paiement à la consommation
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Payez 6,99 $ par To/mois
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Aucuns frais pour le trafic sortant ou les demandes d’API
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Support Basic
                </Typography>
                <Typography variant="h4" component="p" gutterBottom sx={{ marginTop: 2 }}>
                  $6.99
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  To/mois
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" sx={{ textTransform: "none", width: '100%' }}>
                  Démarrer un essai gratuit
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Reserve Capacity Storage (RCS)
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Acheter par tranches de 1, 3 ou 5 ans
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Aucuns frais pour le trafic sortant ou les demandes d’API
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Support Premium
                </Typography>
                <Typography variant="h6" component="p" gutterBottom sx={{ marginTop: 2 }}>
                  Greater discounts for term & capacity
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary" sx={{ textTransform: "none", width: '100%' }}>
                  En savoir plus sur le RCS
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
