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
import ApiRoutes from './routes/ApiRoutes';  // Assurez-vous que le chemin est correct
import ForgotPassword from './pages/landing-page/forgotPassword';

function App() {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) {
    return <Reload />;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/forgotpassword" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
          <Route path="/checkout/" element={<CheckoutForm user={user} />} />

          {/* Routes protégées avec PrivateLayout */}
          <Route path="/" element={<PrivateLayout user={user} isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/corbeille" element={<h1>Corbeille</h1>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Deconnexion />} />
          </Route>
          
        </Routes>
        <ApiRoutes />  

      </Router>

    </div>
  );
}

export default App;
