// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/landing-page/home';
import Login from './pages/landing-page/login';
import Signup from './pages/landing-page/signup';
import CheckoutForm from './pages/landing-page/checkoutForm';
import APIRest from './pages/ApiRest';
import './assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/api" element={<APIRest />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
