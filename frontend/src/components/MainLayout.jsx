import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] dark:bg-[#0e0e0e]">
      <Header />

      <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Outlet /> 
      </main>
      <Footer />
    </div>
); }