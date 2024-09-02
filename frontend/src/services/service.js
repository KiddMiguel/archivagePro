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
    const rootFolderResponse = await service.get('/files/root', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    console.log(rootFolderResponse);
    return { ...response.data, rootFolder: rootFolderResponse.data };
  } catch (error) {
    return error.response.data;
  }
};

// Connecter un utilisateur 
export const loginService = async (user) => {
  try {
    // Connexion de l'utilisateur
    const response = await service.post('/users/login', user);
    // Récupérer le dossier root
    const rootFolderResponse = await service.get('/files/root', {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    return { ...response.data, rootFolder: rootFolderResponse.data };
  } catch (error) {
    return error.response ? error.response.data : { message: 'Erreur réseau' };
  }
};


// Valider le token
export const validateToken = async () => {
  try {
    const response = await service.get('/users/profile');
    const rootFolderResponse = await service.get('/files/root');
    return { ...response.data, rootFolder: rootFolderResponse.data };
  }catch (error) {
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

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await service.put('users/password', { oldPassword, newPassword });
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

// --------------------------------------------------------- Fichiers

// Créer un dossier
export const createFolder = async (folder) => {
  try {
    const response = await service.post('/files/folder', folder);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Récupérer un dossier parent root
export const getRootFolder = async (userId) => {
  try {
    const response = await service.get('/files/root', {
      user: userId
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};



// Téléverser un fichier
export const uploadFile = async (file, folderId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await service.post(`/files/upload/${folderId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || { message: 'Upload failed' };
  }
};

// Récupérer les fichiers d'un utilisateur
export const getUserFiles = async (userId) => {
  try {
    const response = await service.get(`/files/user/${userId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


// Récupérer les dossiers d'un utilisateur
export const getUserFolders = async (userId) => {
  try {
    const response = await service.get(`/files/folder/user/${userId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Supprimer un dossier
export const deleteFolder = async (folderId) => {
  try {
    const response = await service.delete(`/files/folder/${folderId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Récupérer les fichiers d'un dossier
export const getFolderFiles = async (folderId) => {
  try {
    const response = await service.get(`/files/folder/${folderId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


// Récupérer un les fichiers d'un user
export const getAllFiles = async (user) => {
  try {
    const response = await service.get(`/files/user/${user}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Supprimer un fichier
export const deleteFile = async (fileId) => {
  try {
    const response = await service.delete(`/files/user/${fileId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await service.get('/users/users');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Download a file
export const downloadFile = async (fileId) => {
  try {
    const response = await service.get(`/files/download/${fileId}`, {
      responseType: 'blob',
    });

    console.log('Headers:', response.headers);

    let fileName = 'downloaded_file';
    const contentDisposition = response.headers['content-disposition'];
    
    if (contentDisposition) {
      console.log('Content-Disposition:', contentDisposition);
      const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (fileNameMatch && fileNameMatch.length > 1) {
          fileName = fileNameMatch[1];
      }
  }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', decodeURIComponent(escape(fileName))); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};


// --------------------------------------------------------- Factures

// Récupérer les factures d'un utilisateur
export const getInvoices = async () => {
  try {
    const response = await service.get('/billings/invoices');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

