import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

ChartJS.register(ArcElement, Tooltip, Legend);

const StorageCard = ({ documents, medias, others, total, limit, setFilesUpdated }) => {
  const data = {
    labels: ['Documents', 'Médias', 'Autres'],
    datasets: [
      {
        label: 'GB Utilisés',
        data: [documents, medias, others],
        backgroundColor: ['#FF6384', '#36A2EB',  '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB',  '#4BC0C0'],
      },
    ],
  };

  const options = {
    cutout: '50%',
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  useEffect(() => {
    setFilesUpdated(false);
  }, []);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid rgba(0, 0, 0, 0.12)' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} textAlign={{ xs: 'center', md: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '14px', md: '16px', lg: '18px' } }}>
              Stockage Utilisé
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '10px', md: '12px', lg: '14px' } }}>
              {total} GB sur {limit} GB Utilisés
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} display="flex" justifyContent="center">
            <Box sx={{ width: { xs: '150px', md: '200px', lg: '300px' }, height: { xs: '150px', md: '200px', lg: '300px' } }}>
              <Doughnut data={data} options={options} />
            </Box>
          </Grid>

          <Grid item xs={12} md ={12}>
            <Card sx={{ borderRadius: 3, boxShadow: 1, backgroundColor: '#1976d2', color: 'white' }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="body2" align="left" sx={{ opacity: 0.8, fontSize: { xs: '8px', md: '10px', lg: '12px' } }}>
                      Mettez à niveau votre plan pour obtenir plus d'espace de stockage
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} display="flex" justifyContent={{ xs: 'flex-end', sm: 'flex-end', md : "flex-end" }} >
                    <Button 
                      variant="contained" 
                      color="success"
                      sx={{ 
                        color: 'white', 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        width: '100%',
                        maxWidth: { xs: '100%', md: '100%' },
                      }}
                      onClick={() => console.log('Upgrade plan clicked')}
                    >
                      Mise à niveau <RocketLaunchIcon sx={{ ml: 1 }} />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StorageCard;
