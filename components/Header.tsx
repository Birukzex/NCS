
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';
import { AppContext } from '../contexts/AppContext';

const Header: React.FC = () => {
  const { state } = useContext(AppContext)!;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-200 hover:bg-blue-500 hover:text-white'
    }`;

  return (
    <header className="bg-blue-500 dark:bg-blue-700 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white flex items-center space-x-3">
              <Icon name="logo" className="h-8 w-8" />
              <span className="text-xl font-bold">NCS GP Guide</span>
            </div>
             <div className="ml-4 text-xs bg-white bg-opacity-20 text-white py-1 px-2 rounded-full">
                {state.saveStatus === 'saved' ? 'All changes saved' : 'Unsaved changes'}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={linkClass}>Data Entry</NavLink>
              <NavLink to="/guidebook" className={linkClass}>Guidebook</NavLink>
              <NavLink to="/chat" className={linkClass}>Gemini Chat</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;