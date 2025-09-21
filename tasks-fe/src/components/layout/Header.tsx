import React from 'react';
import { ClipboardList, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Defines the properties that the Header component can accept.
interface HeaderProps {
  title?: string; // An optional title to display. Defaults to 'Task Manager'.
}

/**
 * Header Component
 * 
 * This component renders the main application header, which includes the app title,
 * an icon, and a button to toggle between light and dark themes.
 */
const Header: React.FC<HeaderProps> = ({ title = 'Task Manager' }) => {
  // useTheme hook provides the current theme and the function to toggle it.
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Left side of the header: Icon and Title */}
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
        </div>
        
        {/* Right side of the header: Theme toggle button */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {/* Conditionally render the Sun or Moon icon based on the current theme. */}
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

      </div>
    </header>
  );
};

export default Header;