// src/pages/auth/SignupPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


const SignupPage = () => {
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSignupSubmit = async (email, password, confirmPassword) => { // Get data from SignupForm
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(email, password);
      // Navigation happens in App.jsx now based on currentUser change
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 p-4">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-neumorphic-dark bg-gray-800 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-50 uppercase tracking-wide">Sign Up</h2>
        <SignupForm onSubmit={handleSignupSubmit} error={error} />
      </div>
    </div>
  );
};

export default SignupPage;