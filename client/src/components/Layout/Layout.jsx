import React from 'react'
import { Link } from 'react-router-dom';
import GitHubIcon from '../../icons/github.png'
import HelpIcon from '../../icons/question-mark.png'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between items-center bg-deep-koamoru min-h-screen relative">
      <nav className="w-full p-4 flex justify-between">
        <Link className="font-cabin text-3xl font-bold text-azureish-white" to="/">Unscrambla</Link>
        <div className="flex">
          <Link className="bg-azureish-white w-10 h-10 rounded-full p-1 mr-4" title="How to play" to="/">
            <img className="w-8 h-8" src={HelpIcon} alt="How to play" />
          </Link>
          <a className="bg-azureish-white w-10 h-10 rounded-full p-1 mr-3" title="See project on GitHub" href="https://github.com/aolamide/unscrambla" target="_blank">
            <img className="w-8 h-8" src={GitHubIcon} alt="github" />
          </a>
        </div>
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