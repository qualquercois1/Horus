import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Roadmap from '../components/Roadmap';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Roadmap />
      </main>
      <Footer />
    </div>
); };

export default LandingPage;