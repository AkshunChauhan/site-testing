import React from 'react';
import { ClipboardList, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Task Manager' }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth(); // Get user and logout function
  const navigate = useNavigate();

  // Handle the logout process
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <ClipboardList className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Display user email and logout button if logged in */}
          {currentUser && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">{currentUser.email}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;