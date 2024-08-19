import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:4000';

const service = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour les requêtes
service.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    console.log('intercepteur', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enregistrer un utilisateur
export const register = async (user) => {
  try {
    const response = await service.post('/users/register', user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Connecter un utilisateur
export const loginService = async (user) => {
  try {
    const response = await service.post('/users/login', user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Valider le token
export const validateToken = async () => {
  try {
    const response = await service.get('/users/profile');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// --------------------------------------------------------- Utilisateurs

export const updateUser = async (user) => {
  try {
    const response = await service.put('users/profile', user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUser = async () => {
  try {
    const response = await service.delete('users/profile');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await service.post('users/forgot-password', email);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// ---------------------------------------------------------Créer une facture
export const createInvoice = async (invoice) => {
  try {
    const response = await service.post('billings/invoice', invoice);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
