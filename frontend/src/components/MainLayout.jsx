import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] text-gray-700 dark:bg-[#0e0e0e] dark:text-gray-300">
      <Header />

      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
); }
