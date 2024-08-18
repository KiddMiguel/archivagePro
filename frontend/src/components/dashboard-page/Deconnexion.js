import React, { useEffect } from 'react';
import Home from '../../pages/landing-page/home';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';
const Deconnexion = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate('/login');
    }  , [logout]);


    return (
        <div>
            <Home />
        </div>
    );
};

export default Deconnexion;