
// Import necessary hooks from React for state management and navigation.
import { useState } from 'react';
// Import routing components from react-router-dom.
import { Link, useNavigate } from 'react-router-dom';
// Import Firebase authentication function for creating users.
import { createUserWithEmailAndPassword } from 'firebase/auth';
// Import the Firebase auth instance from our config file.
import { auth } from '../firebaseConfig';

/**
 * SignupPage Component
 * 
 * This component provides a form for users to create a new account
 * using their email and password.
 */
function SignupPage() {
  // State hooks for managing form inputs and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook for programmatic navigation.
  const navigate = useNavigate();

  /**
   * Handles the user signup process.
   * @param e - The form event.
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior.
    setError(''); // Reset any previous errors.

    // Basic client-side validation for password length.
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return; // Stop the function if validation fails.
    }

    try {
      // Attempt to create a new user with Firebase Authentication.
      await createUserWithEmailAndPassword(auth, email, password);
      // On successful creation, navigate the user to the home page.
      navigate('/');
    } catch (err: any) {
      // Handle specific Firebase errors.
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else {
        // For other errors, show a generic message.
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  // The JSX structure for the signup page.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Create Your Account</h2>
        {/* Display the error message if it exists. */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Signup form */}
        <form onSubmit={handleSignup} className="space-y-6">
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
            Sign Up
          </button>
        </form>

        {/* Link to the login page for existing users */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
