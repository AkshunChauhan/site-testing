
// Import necessary hooks from React for state management and navigation.
import { useState } from 'react';
// Import routing components from react-router-dom.
import { Link, useNavigate } from 'react-router-dom';
// Import Firebase authentication functions.
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// Import the Firebase auth instance from our config file.
import { auth } from '../firebaseConfig';

/**
 * LoginPage Component
 * 
 * This component provides a user interface for logging into the application.
 * It supports both email/password and Google-based authentication.
 */
function LoginPage() {
  // State hooks for managing form inputs and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook for programmatic navigation.
  const navigate = useNavigate();

  /**
   * Handles the standard email and password login process.
   * @param e - The form event.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior.
    setError(''); // Reset any previous errors.
    try {
      // Attempt to sign in with Firebase.
      await signInWithEmailAndPassword(auth, email, password);
      // On success, navigate to the home page.
      navigate('/');
    } catch (err: any) {
      // If sign-in fails, display a generic error message.
      setError('Invalid email or password. Please try again.');
    }
  };

  /**
   * Handles the Google Sign-In process using a popup window.
   */
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create a new Google Auth provider.
    try {
      // Attempt to sign in with the Google popup.
      await signInWithPopup(auth, provider);
      // On success, navigate to the home page.
      navigate('/');
    } catch (err: any) {
      // If Google sign-in fails, display an error.
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  // The JSX structure for the login page.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Welcome Back!</h2>
        {/* Display the error message if it exists. */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6">
          {/* Divider with "Or continue with" text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In button */}
          <div className="mt-6">
            <button 
              onClick={handleGoogleSignIn} 
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-300"
            >
              <svg className="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.76,4.73 16.04,5.87 17.01,6.73L19,4.72C17.22,3.14 14.86,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.5,18.33 21.5,12.33C21.5,11.76 21.45,11.43 21.35,11.1Z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Link to the sign-up page */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
