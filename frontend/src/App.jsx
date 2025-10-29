import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<div className="p-10 text-center">Página de Login (Em breve)</div>} />
        <Route path="/register" element={<div className="p-10 text-center">Página de Cadastro (Em breve)</div>} />
      </Routes>
    </Router>
); }

export default App;