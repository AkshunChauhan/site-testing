
// Import routing components from react-router-dom for SPA navigation.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import the ThemeProvider to wrap the application and provide theme context.
import { ThemeProvider } from './context/ThemeContext';
// Import the custom hook to access authentication status.
import { useAuth } from './context/AuthContext';
// Import page components.
import HomePage from './pages/HomePage';
import TaskListPage from './pages/TaskListPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// Import the main CSS file for global styles.
import './index.css';

/**
 * App Component
 * 
 * This is the root component of the application. It sets up the router,
 * theme provider, and handles protected routes based on user authentication.
 */
function App() {
  // useAuth hook provides the current authenticated user.
  const { currentUser } = useAuth();

  return (
    // ThemeProvider makes the theme (e.g., dark/light mode) available to all child components.
    <ThemeProvider>
      {/* Router handles the client-side navigation. */}
      <Router>
        {/* Routes component defines all possible application routes. */}
        <Routes>
          {/* Public routes for login and signup. If a user is already logged in, they are redirected to the homepage. */}
          <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!currentUser ? <SignupPage /> : <Navigate to="/" />} />
          
          {/* Protected route for the homepage. Only accessible to authenticated users. */}
          <Route 
            path="/" 
            element={currentUser ? <HomePage /> : <Navigate to="/login" />}
          />
          {/* Protected route for the individual task list page. Only accessible to authenticated users. */}
          <Route 
            path="/task-lists/:taskListId" 
            element={currentUser ? <TaskListPage /> : <Navigate to="/login" />}
          />

          {/* Catch-all route. Redirects to the homepage if logged in, otherwise to the login page. */}
          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
