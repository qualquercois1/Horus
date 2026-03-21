import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Horus. Cássio e Eduardo.
        </p>
      </div>
    </footer>
); };

export default Footer;