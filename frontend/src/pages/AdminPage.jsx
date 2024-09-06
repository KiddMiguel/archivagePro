import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react'; // Importer ag-Grid
import 'ag-grid-community/styles/ag-grid.css'; // Styles ag-Grid de base
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Styles du thème
import { getAllUsers, getAllFiles, deleteUserid, updateUserid } from '../services/service'; // Importer updateUserid

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Stocker l'utilisateur à modifier ou supprimer
    const [openDialog, setOpenDialog] = useState(false); // Gérer l'état du dialog de confirmation ou modification
    const [isEditing, setIsEditing] = useState(false); // Gérer l'état de l'édition d'un utilisateur
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        role: ''
    });

    const [columnDefs] = useState([
        { headerName: "Nom", field: "fullName", sortable: true, filter: true, flex: 1 },
        { headerName: "Email", field: "email", sortable: true, filter: true, flex: 1 },
        { headerName: "Rôle", field: "role", sortable: true, filter: true, flex: 1 },
        {
            headerName: "Stockage Utilisé", field: "storageFormatted", sortable: true, filter: true, flex: 2,
        },
        {
            headerName: "Stockage (%)", field: "storageUsedPercentage", sortable: true, filter: true, flex: 1,
            cellRenderer: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ minWidth: '80px' }}>
                        {`${params.value}%`}
                    </Typography>
                    <LinearProgress variant="determinate" value={params.value} sx={{ flexGrow: 1 }} />
                </Box>
            )
        },
        {
            headerName: "Actions", field: "actions", cellRenderer: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleEditUser(params.data)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDialog(params.data)}>
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

    const handleOpenDialog = (user) => {
        setSelectedUser(user);  // Stocker l'utilisateur à supprimer
        setOpenDialog(true);  // Ouvrir le dialog de confirmation
    };

    const handleCloseDialog = () => {
        setSelectedUser(null);  // Réinitialiser l'utilisateur sélectionné
        setOpenDialog(false);  // Fermer le dialog
        setIsEditing(false);  // Réinitialiser le mode édition
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);  // Stocker l'utilisateur à modifier
        setEditForm({
            fullName: user.fullName,
            email: user.email,
            role: user.role
        });
        setIsEditing(true);  // Activer le mode édition
        setOpenDialog(true);  // Ouvrir le dialog d'édition
    };

    const updateUser = async () => {
        try {
            const [firstName, lastName] = editForm.fullName.split(' ');
            const updatedUserData = {
                firstName,
                lastName,
                email: editForm.email,
                role: editForm.role
            };
            await updateUserid(selectedUser._id, updatedUserData);  // Appel à l'API pour mettre à jour l'utilisateur
            setUsers(users.map(user => (user._id === selectedUser._id ? { ...user, ...updatedUserData } : user)));  // Mettre à jour l'état local
            handleCloseDialog();
            alert("Utilisateur mis à jour avec succès.");
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            alert("Erreur lors de la mise à jour de l'utilisateur.");
        }
    };

    const deleteUser = async () => {
        if (!selectedUser) return;
        try {
            await deleteUserid(selectedUser._id);  // Appel à l'API pour supprimer l'utilisateur
            setUsers(users.filter(user => user._id !== selectedUser._id));  // Mettre à jour la liste des utilisateurs
            handleCloseDialog();
            alert("Utilisateur supprimé avec succès.");
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert("Erreur lors de la suppression de l'utilisateur.");
        }
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

            {/* Dialog de confirmation de suppression ou modification */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {isEditing ? (
                    <>
                        <DialogTitle id="alert-dialog-title">{"Modifier cet utilisateur"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Nom Complet"
                                value={editForm.fullName}
                                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Rôle"
                                value={editForm.role}
                                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={updateUser} color="primary" autoFocus>
                                Sauvegarder
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        <DialogTitle id="alert-dialog-title">{"Supprimer cet utilisateur ?"}</DialogTitle>
                        <DialogContent>
                            <Typography>Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser?.fullName}</strong> ? Cette action est irréversible.</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={deleteUser} color="error" autoFocus>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default AdminPage;
