import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/service'; // Assurez-vous que le chemin est correct

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getAllUsers();
            console.log('Résultat de getAllUsers:', result);
            // Vérifiez ce que `getAllUsers` retourne
            setUsers(result);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Page d'Administration</h1>
            <h2>Liste des utilisateurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin' : 'Utilisateur'}</td>
                            <td>
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
