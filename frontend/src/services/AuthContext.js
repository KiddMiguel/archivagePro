import React, { useEffect, createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import {  validateToken } from './service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement
  const [rootFolder, setRootFolder] = useState(null);

  const login = async (user, token,rootFolder ) => {
    setUser(user);
    setRootFolder(rootFolder);
    setIsAuthenticated(true);
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
    setLoading(false);
  };
  

  const logout = () => {
    setUser(null);
    setRootFolder(null);
    setIsAuthenticated(false);
    Cookies.remove('token');
    setLoading(false); // Désactiver le chargement après la déconnexion
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      validateToken(token)
        .then(response => {
          console.log(response);
          if (response.success) {
            setUser(response.user);
            setIsAuthenticated(true);
            setRootFolder(response.rootFolder);
          } else {
            Cookies.remove('token');
            setIsAuthenticated(false);
          }
          setLoading(false); // Désactiver le chargement après la vérification du token
        })
        .catch(error => {
          console.error(error);
          Cookies.remove('token');
          setIsAuthenticated(false);
          setLoading(false); // Désactiver le chargement après une erreur
        });
    } else {
      setLoading(false); // Désactiver le chargement si aucun token n'est présent
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, rootFolder }}>
      {children}
    </AuthContext.Provider>
  );
};
