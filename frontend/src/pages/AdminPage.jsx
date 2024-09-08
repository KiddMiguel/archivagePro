import React, { useEffect, useState } from 'react';
import { Box,Link, Typography, Button, IconButton, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Breadcrumbs } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react'; // Importer ag-Grid
import 'ag-grid-community/styles/ag-grid.css'; // Styles ag-Grid de base
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Styles du thème
import { getAllUsers, getAllFiles, deleteUserid, updateUserid } from '../services/service'; // Importer updateUserid
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FolderFilesDialog from '../components/dashboard-page/FolderFilesDialog';

const AdminPage = ({user}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Stocker l'utilisateur à modifier ou supprimer
    const [openDialog, setOpenDialog] = useState(false); // Gérer l'état du dialog de confirmation ou modification
    const [isEditing, setIsEditing] = useState(false); // Gérer l'état de l'édition d'un utilisateur
    const [openFolderDialog, setOpenFolderDialog] = useState(false); // État pour ouvrir le dialogue des fichiers
    const [filesUpdated, setFilesUpdated] = useState(false); 
    const [editForm, setEditForm] = useState({
        firstName : '',
        lastName: '',
        email: '',
        telephone: '',
        storageLimit : '',
        address : {
            street: '',
            city: '',
            postalCode: '',
            country: ''
        }
    });

    // Afficher le dialog pour les fichiers de l'utilisateur

    const handleOpenFolderDialog = (user) => {
        setSelectedUser(user); // Stocke l'utilisateur ou le dossier pour le dialogue
        setOpenFolderDialog(true); // Ouvre le dialogue des fichiers
    };

    const handleCloseFolderDialog = () => {
        setOpenFolderDialog(false); // Ferme le dialogue des fichiers
    };

    const [columnDefs] = useState([
        { headerName: "Nom", field: "firstName", sortable: true, filter: true, flex: 1,cellStyle: { textAlign: 'left' }},
        { headerName: "Prénom", field: "lastName", sortable: true, filter: true, flex: 1, cellStyle: { textAlign: 'left' } },
        { headerName: "Téléphone", field: "telephone", sortable: true, filter: true, flex: 1, cellStyle: { textAlign: 'left' } },
        { headerName: "Email", field: "email", sortable: true, filter: true, flex: 1, cellStyle: { textAlign: 'left' } },
        {
            headerName: "Stockage Utilisé", field: "storageFormatted", sortable: true, filter: true, flex: 2,
        },
        {
            headerName: "Stockage (%)", field: "storageUsedPercentage", sortable: true, filter: true, flex: 1,
            cellRenderer: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            minWidth: '80px',
                            fontWeight: 'bold',
                            color: params.value >= 80 ? 'red' : params.value >= 50 ? 'orange' : 'green',
                        }}
                    >
                        {`${params.value}%`}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={params.value}
                        sx={{
                            flexGrow: 1,
                            height: '8px',
                            borderRadius: '4px',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor:
                                    params.value >= 80 ? 'red' :
                                    params.value >= 50 ? 'orange' :
                                    'green',
                            },
                        }}
                    />
                </Box>
            )
        }
        ,
        {
            headerName: "Actions", field: "actions", cellRenderer: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleEditUser(params.data)}>
                        <EditIcon sx={{fontSize : "15px"}}/>
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDialog(params.data)}>
                        <DeleteIcon sx={{fontSize : "15px"}} />
                    </IconButton>
                    {/* Icône pour ouvrir le dialogue de fichiers */}
                    <IconButton color="info" onClick={() => handleOpenFolderDialog(params.data)}>
                        <FolderCopyIcon sx={{fontSize : "15px"}}/>
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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telephone: user.telephone,
            storageLimit : user.storageLimit,
            address: {
                street: user.address?.street || '',
                city: user.address?.city || '',
                postalCode: user.address?.postalCode || '',
                country: user.address?.country || ''
            }
        });
        setIsEditing(true);  // Activer le mode édition
        setOpenDialog(true);  // Ouvrir le dialog d'édition
    };

    const updateUser = async () => {
        try {
            const updatedUserData = {
                firstName: editForm.firstName,
                lastName: editForm.lastName,
                email: editForm.email,
                telephone: editForm.telephone,
                address: {
                    street: editForm.address.street,
                    city: editForm.address.city,
                    postalCode: editForm.address.postalCode,
                    country: editForm.address.country
                }
            };
            

            await updateUserid(selectedUser._id, updatedUserData);  // Appel à l'API pour mettre à jour l'utilisateur
            setUsers(users.map(user => (user._id === selectedUser._id ? { ...user, ...updatedUserData } : user)));  // Mettre à jour l'état local
            handleCloseDialog();
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };

    const deleteUser = async () => {
        if (!selectedUser) return;
        try {
            const reponse = await deleteUserid(selectedUser._id);
            console.log(reponse);  
            setUsers(users.filter(user => user._id !== selectedUser._id));  // Mettre à jour la liste des utilisateurs
            handleCloseDialog();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.12)", pb: 2 }}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/" fontSize="12px">
                Accueil
              </Link>
              <Typography color="text.primary" sx={{ fontWeight: "500", fontSize: "12px" }}>Utilisateurs</Typography>
            </Breadcrumbs>
            <Typography variant="h4" align="left" sx={{ fontWeight: 'bold', mt: 1 }}>
            Gestion des Utilisateurs
            </Typography>
          </Box>
        </Box>
            <Box
                className="ag-theme-alpine"
                sx={{
                    height: '75vh',
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

            <FolderFilesDialog
                open={openFolderDialog}
                onClose={handleCloseFolderDialog}
                folder={selectedUser} // Passe l'utilisateur ou le dossier au dialogue
                filesUpdated={filesUpdated}
                setFilesUpdated={setFilesUpdated}
                user={user}
                selectedUser={selectedUser}
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
                                label="Nom"
                                name = "firstName"
                                value={editForm.firstName}
                                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Prenom"
                                name = "lastName"
                                value={editForm.lastName}
                                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            
                            <Box sx={{display : "flex"}}>

                                <Box>
                            <TextField
                                label="Email"
                                name='email'
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            </Box>
                            <Box sx={{paddingLeft : "15px"}}>
                            <TextField
                                label="Telephone"
                                name='telephone'
                                value={editForm.telephone}
                                onChange={(e) => setEditForm({ ...editForm, telephone: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            </Box>
                            </Box>
                            <TextField
                                label="Adresse"
                                name='address'
                                value={editForm.address?.street || ''} 
                                onChange={(e) => setEditForm({...editForm, address: {...editForm.address, street: e.target.value}})}
                                  fullWidth
                                margin="normal"
                            />
                            <Box sx={{display : "flex"}}>

                            <TextField
                                label="Ville"
                                name='city'
                                value={editForm.address?.city || ''} 
                                onChange={(e) => setEditForm({...editForm, address: {...editForm.address, city: e.target.value}})}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{paddingLeft : "15px"}}>

                            <TextField
                                label="Code Postal"
                                name='postalCode'
                                value={editForm.address?.postalCode || ''} 
                                onChange={(e) => setEditForm({...editForm, address: {...editForm.address, postalCode: e.target.value}})}
                                fullWidth
                                margin="normal"
                            />
                            </Box>
                            </Box>
                            <TextField
                                label="Pays"
                                name='country'
                                value={editForm.address?.country || ''} 
                                onChange={(e) => setEditForm({...editForm, address: {...editForm.address, country: e.target.value}})}
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
