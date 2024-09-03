import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, LinearProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react'; // Importer ag-Grid
import 'ag-grid-community/styles/ag-grid.css'; // Styles ag-Grid de base
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Styles du thème
import { getAllUsers, getAllFiles } from '../services/service'; // Assurez-vous que le chemin est correct

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [columnDefs] = useState([
        { headerName: "Nom", field: "fullName", sortable: true, filter: true, flex: 1 },
        { headerName: "Email", field: "email", sortable: true, filter: true, flex: 1 },
        { headerName: "Rôle", field: "role", sortable: true, filter: true, flex: 1 },
        {
            headerName: "Stockage Utilisé", field: "storageFormatted", sortable: true, filter: true, flex: 2,
        },
        {
            headerName: "Stockage (%)", field: "storageUsedPercentage", sortable: true, filter: true, flex: 1,
            cellRendererFramework: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ minWidth: '80px' }}>
                        {`${params.value}%`}
                    </Typography>
                    <LinearProgress variant="determinate" value={params.value} sx={{ flexGrow: 1 }} />
                </Box>
            )
        },
        {
            headerName: "Actions", field: "actions", cellRendererFramework: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton color="primary" onClick={() => editUser(params.data)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteUser(params.data)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ), flex: 1, sortable: false, filter: false
        }
    ]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getAllUsers();
            const usersWithStorage = await Promise.all(result.map(async user => {
                const { totalSizeInBytes, limitStockage } = await handlerCalculateSizeTypeFile(user);
                const storageUsedPercentage = (totalSizeInBytes / limitStockage) * 100;
                const formattedStorage = formatStorage(totalSizeInBytes, limitStockage);
                return {
                    ...user,
                    fullName: `${user.firstName} ${user.lastName}`,
                    role: user.isAdmin ? 'Admin' : 'Utilisateur',
                    storageFormatted: formattedStorage, // Stockage formaté
                    storageUsedPercentage: storageUsedPercentage.toFixed(2) // Pourcentage arrondi à 2 décimales
                };
            }));
            setUsers(usersWithStorage);
        };

        fetchUsers();
    }, []);

    const handlerCalculateSizeTypeFile = async (user) => {
        const files = await getAllFiles(user._id || user.id);
        let totalSizeInBytes = 0;
        for (const file of files) {
            totalSizeInBytes += file.length;
        }
        return { totalSizeInBytes, limitStockage: user.storageLimit };
    };

    const formatStorage = (usedBytes, limitBytes) => {
        const usedMB = usedBytes / (1024 * 1024);
        const limitGB = limitBytes / (1024 * 1024 * 1024);
        return `${usedMB.toFixed(2)} Mo sur ${limitGB.toFixed(2)} Go Utilisés`;
    };

    const editUser = (user) => {
        console.log("Modifier", user);
    };

    const deleteUser = (user) => {
        console.log("Supprimer", user);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gestion des Utilisateurs
                </Typography>
                <Button variant="contained" color="primary">
                    Ajouter un Utilisateur
                </Button>
            </Box>
            <Box
                className="ag-theme-alpine"
                sx={{
                    height: 500,
                    width: '100%',
                    '& .ag-header': {
                        backgroundColor: '#f5f5f5',
                    },
                    '& .ag-row-even': {
                        backgroundColor: '#f9f9f9',
                    },
                    '& .ag-row-odd': {
                        backgroundColor: '#ffffff',
                    }
                }}
            >
                <AgGridReact
                    rowData={users}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </Box>
        </Box>
    );
};

export default AdminPage;
