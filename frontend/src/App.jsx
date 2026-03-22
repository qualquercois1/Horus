import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import MainLayout from './components/MainLayout';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />


          <Route path="/about" element={<UnderConstruction />} />

          <Route path="/privacy" element={<UnderConstruction />} />
          <Route path="/terms" element={<UnderConstruction />} />
        </Route>

      </Routes>
    </Router>
); }

export default App;