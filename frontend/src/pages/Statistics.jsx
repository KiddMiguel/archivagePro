import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import { getAllFilesBase, getAllUsers } from '../services/service'; // Assurez-vous que le chemin est correct
import 'chart.js/auto';  // Chart.js V3 ne nécessite pas d'importer des composants individuellement

const Statistics = () => {
    const [totalFiles, setTotalFiles] = useState(0);
    const [filesToday, setFilesToday] = useState(0);
    const [filesByClient, setFilesByClient] = useState([]);
    const [dailyUploads, setDailyUploads] = useState([]);
    const [users, setUsers] = useState([]); // Ajout des utilisateurs

    useEffect(() => {
        const fetchStatistics = async () => {
            // Récupération des fichiers
            const files = await getAllFilesBase();
            const today = new Date();
            const todayDateString = today.toISOString().split('T')[0];

            // Filtrer les fichiers uploadés aujourd'hui
            console.log(files)
            const filesUploadedToday = files.filter(file =>
                file.uploadDate.split('T')[0] === todayDateString
            );

            // Compter le nombre de fichiers par ID de client
            const filesCountByClient = files.reduce((acc, file) => {
                const clientId = file.owner; // Utiliser l'ID du client (owner)
                acc[clientId] = (acc[clientId] || 0) + 1;
                return acc;
            }, {});

            // Compter les fichiers par jour
            const uploadsByDay = files.reduce((acc, file) => {
                const uploadDate = file.uploadDate.split('T')[0];
                acc[uploadDate] = (acc[uploadDate] || 0) + 1;
                return acc;
            }, {});

            setTotalFiles(files.length);
            setFilesToday(filesUploadedToday.length);
            setFilesByClient(Object.entries(filesCountByClient));
            setDailyUploads(Object.entries(uploadsByDay));
        };

        const fetchUsers = async () => {
            const allUsers = await getAllUsers();
            setUsers(allUsers);  // Stocker les utilisateurs récupérés
        };

        fetchStatistics();
        fetchUsers();
    }, []);

    // Préparation des données pour le graphique à barres (répartition par client)
    const clientData = {
        labels: filesByClient.map(([clientId]) => {
            const user = users.find(user => user._id === clientId); // Trouver le nom de l'utilisateur
            return user ? `${user.firstName} ${user.lastName}` : clientId; // Si l'utilisateur est trouvé, afficher son nom
        }),
        datasets: [
            {
                label: 'Nombre de fichiers',
                data: filesByClient.map(([, count]) => count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Préparation des données pour le graphique en courbes (nombre de fichiers par jour)
    const dailyData = {
        labels: dailyUploads.map(([date]) => date),
        datasets: [
            {
                label: 'Fichiers Uploadés par Jour',
                data: dailyUploads.map(([, count]) => count),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Statistiques
            </Typography>

            <Grid container spacing={3}>
                {/* Total des fichiers uploadés */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Total de Fichiers Uploadés
                            </Typography>
                            <Typography variant="h3" color="primary">
                                {totalFiles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Fichiers uploadés aujourd'hui */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Fichiers Uploadés Aujourd'hui
                            </Typography>
                            <Typography variant="h3" color="primary">
                                {filesToday}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Nombre d'utilisateurs */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Nombre de Clients
                            </Typography>
                            <Typography variant="h3" color="primary">
                                {users.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Répartition par client (graphique à barres) */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Répartition des Fichiers par Client (ID)
                            </Typography>
                            <Bar data={clientData} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Graphique des fichiers uploadés par jour (graphique en courbes) */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Nombre de Fichiers Uploadés par Jour
                            </Typography>
                            <Line data={dailyData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;
