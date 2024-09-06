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

// Composant pour vérifier si l'utilisateur a une souscription "premium"
function PremiumRoute({ element, isAuthenticated, user }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (user.subscription !== 'premium') {
    return <Navigate to="/checkout" />; 
  }
  return element;
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
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/forgotpassword" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />} />

          {/* Routes protégées */}
          <Route path="/" element={<PrivateLayout user={user} isAuthenticated={isAuthenticated} rootFolder={rootFolder} />}>
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard rootFolder={rootFolder} user={user} />} isAuthenticated={isAuthenticated} />} />
            <Route path="/favoris" element={<PremiumRoute element={<Favoris />} isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/reload/:page" element={<PremiumRoute element={<Reload />} isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/corbeille" element={<PremiumRoute element={<h1>Corbeille</h1>} isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings user={user} isAuthenticated={isAuthenticated} />} isAuthenticated={isAuthenticated} />} />
            <Route path="/admin" element={<PremiumRoute element={<AdminPage />} isAuthenticated={isAuthenticated} user={user} />} />
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