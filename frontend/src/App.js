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
import DashTest from './pages/dashboard-page/DashTest';

function App() {
  const { isAuthenticated,  user, rootFolder } = useAuth();
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
          <Route path="/checkout/" element={<CheckoutForm user={user} />} />

          {/* Routes protégées avec PrivateLayout */}
          {
            user && user.subscription !== "basic" ? (
              <Route path="/dashboard" element={<Navigate to="/checkout" />} />
            ) : (
            <Route path="/" element={<PrivateLayout user={user} isAuthenticated={isAuthenticated} rootFolder={rootFolder} />}>
            <Route path="/dashboard" element={<Dashboard rootFolder = {rootFolder} user = {user}/>} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path= "/reload/:page" element={<Reload  />} />
            <Route path="/corbeille" element={<h1>Corbeille</h1>} />
            <Route path="/settings" element={<Settings user={user} isAuthenticated={isAuthenticated} />} />
            <Route path="/logout" element={<Deconnexion />} />
          </Route>              
            )
          }
          
          
        </Routes>
        <ApiRoutes />  

      </Router>

    </div>
  );
}

export default App;
