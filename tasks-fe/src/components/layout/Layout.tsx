import React from 'react';
import Header from './Header';

// Define the properties that the Layout component accepts.
export interface LayoutProps {
  children: React.ReactNode; // The content to be rendered within the layout.
  title?: string; // An optional title to be displayed in the header or as the page title.
}

/**
 * Layout Component
 * 
 * This component provides a consistent structure for all pages in the application.
 * It includes a header, a main content area, and a footer.
 * It also ensures a responsive container and proper background colors for the theme.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Main container with a minimum height to fill the screen and a flex column layout.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      
      {/* The application header component. */}
      <Header />
      
      {/* Main content area that grows to fill available space. */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* The children prop is rendered here, which contains the specific page content. */}
        {children}
      </main>
      
      {/* The application footer. */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-4 transition-colors duration-200">
        <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          Task Manager © {new Date().getFullYear()}
        </div>
      </footer>

    </div>
  );
};

export default Layout;