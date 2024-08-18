import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/landing-page/home';
import Login from './pages/landing-page/login';
import Signup from './pages/landing-page/signup';
import CheckoutForm from './pages/landing-page/checkoutForm';
import Dashboard from './pages/dashboard-page/Dashboard';
import APIRest from './pages/ApiRest';
import './assets/styles/App.css';
import { useAuth } from './services/AuthContext';
import Reload from './pages/reload';
import Favoris from './pages/dashboard-page/Favoris';
import PrivateLayout from './components/PrivateLayout';
import Deconnexion from './components/dashboard-page/Deconnexion';

function App() {
  const { isAuthenticated, loading, user } = useAuth();
  console.log(user);
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
          <Route path="/api" element={<APIRest />} />
          <Route path="/checkout/" element={<CheckoutForm />} />

          {/* Routes protégées avec PrivateLayout */}
          <Route path="/" element={<PrivateLayout user ={user} isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/corbeille" element={<h1>Corbeille</h1>} />
            <Route path="/parametres" element={<h1>Paramètres</h1>} />
            <Route path="/logout" element={<Deconnexion/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
