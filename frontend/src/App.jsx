import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Roulette from './pages/Roulette';
import Transactions from './pages/Transactions';

import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games/roulette" element={<Roulette />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>


          <Route path="/about" element={<UnderConstruction />} />

          <Route path="/privacy" element={<UnderConstruction />} />
          <Route path="/terms" element={<UnderConstruction />} />
        </Route>

      </Routes>
    </Router>
); }

export default App;
