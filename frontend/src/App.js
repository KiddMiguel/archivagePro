import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/landing-page/home';
import Login from './pages/landing-page/login';
import Signup from './pages/landing-page/signup';
import CheckoutForm from './pages/landing-page/checkoutForm';
import Dashboard from './pages/dashboard-page/Dashboard';
import './assets/styles/App.css';
import { useAuth } from './services/AuthContext';
import Reload from './pages/reload';
import Favoris from './pages/dashboard-page/Favoris';
import PrivateLayout from './components/PrivateLayout';
import Deconnexion from './components/dashboard-page/Deconnexion';
import Settings from './pages/dashboard-page/Settings';
import ApiRoutes from './routes/ApiRoutes'; 
import ForgotPassword from './pages/landing-page/forgotPassword';
import DashTest from './pages/dashboard-page/DashTest';
import AdminPage from './pages/AdminPage';
import Statistics from './pages/Statistics';

// Composant pour vérifier l'authentification
function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

// Composant pour gérer la redirection selon le rôle après le login
function RoleBasedRedirect({ isAuthenticated, user }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirection selon le rôle
  if (user.isAdmin === true) {
    return <Navigate to="/admin" />;
  } else {
    return <Navigate to="/dashboard" />;
  }
}

function App() {
  const { isAuthenticated, user, rootFolder } = useAuth();
  console.log("user", user);
  console.log("rootFolder", rootFolder);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<DashTest />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <RoleBasedRedirect isAuthenticated={isAuthenticated} user={user} /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <RoleBasedRedirect isAuthenticated={isAuthenticated} user={user} /> : <Signup />} 
          />
          <Route 
            path="/forgotpassword" 
            element={isAuthenticated ? <RoleBasedRedirect isAuthenticated={isAuthenticated} user={user} /> : <ForgotPassword />} 
          />

          {/* Routes protégées */}
          <Route path="/" element={<PrivateLayout user={user} isAuthenticated={isAuthenticated} rootFolder={rootFolder} />}>
            {/* Route dashboard uniquement accessible aux clients (non admin) */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard rootFolder={rootFolder} user={user} />} isAuthenticated={isAuthenticated} />} />
            <Route path="/favoris" element={<ProtectedRoute element={<Favoris />} isAuthenticated={isAuthenticated} />} />
            <Route path="/reload/:page" element={<ProtectedRoute element={<Reload />} isAuthenticated={isAuthenticated} />} />
            <Route path="/corbeille" element={<ProtectedRoute element={<h1>Corbeille</h1>} isAuthenticated={isAuthenticated} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings user={user} />} isAuthenticated={isAuthenticated} />} />
            {/* Route admin protégée */}
            <Route path="/admin" element={<ProtectedRoute element={<AdminPage user= {user} />} isAuthenticated={isAuthenticated} />} />
            <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} isAuthenticated={isAuthenticated} />} />
            <Route path="/logout" element={<Deconnexion />} />
          </Route>

          {/* Route checkout en dehors de PrivateLayout */}
          <Route path="/checkout/" element={<ProtectedRoute element={<CheckoutForm user={user} />} isAuthenticated={isAuthenticated} />} />
        </Routes>
        <ApiRoutes />  
      </Router>
    </div>
  );
}

export default App;
