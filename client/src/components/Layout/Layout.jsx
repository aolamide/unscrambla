import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-deep-koamoru min-h-screen relative">
      <nav className="w-full p-4">
        <a className="font-cabin text-3xl font-bold text-azureish-white" href="/">Unscrambla</a>
      </nav>
      <div className="w-full flex flex-col items-center">
        {children}
      </div>
      <footer className="pb-4">
        <p className="text-center text-white">Built with &hearts; by <a href="https://twitter.com/olamideaboyeji" className="text-azureish-white">Olamide.</a></p>
      </footer>
    </div>
  );
};

export default Layout;