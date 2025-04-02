import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import GitHubIcon from '../../icons/github.png';
import InfoIcon from '../../icons/info.png';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col justify-between items-center bg-deep-koamoru min-h-screen relative">
      <nav className="w-full p-4 flex justify-between">
        <Link
          className="font-cabin text-3xl font-bold text-azureish-white"
          to="/"
        >
          <img alt="Unscrambla" className="w-20" src="/unscrambla.svg" />
        </Link>
        <div className="flex">
          <Link
            className="bg-white w-8 h-8 rounded-full p-1 mr-4 flex items-center justify-center"
            title="How to play"
            to="/info"
          >
            <img className="w-6 h-4" src={InfoIcon} alt="How to play" />
          </Link>
          <a
            className="bg-white w-8 h-8 rounded-full p-1 mr-3"
            title="See project on GitHub"
            href="https://github.com/aolamide/unscrambla"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-6 h-6" src={GitHubIcon} alt="github" />
          </a>
        </div>
      </nav>
      <div className="w-full flex flex-col items-center">{children}</div>
      <footer className="pb-4">
        <p className="text-center text-white text-lg">
          Built with &hearts; by{' '}
          <a
            href="https://linkedin.com/in/aolamide"
            className="text-azureish-white font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Olamide.
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
