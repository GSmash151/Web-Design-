// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from '../../imports/authImports';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLoginSubmit = async (email, password, rememberMe) => {
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // Outer div for the entire screen background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-200 p-4">
      {/* Inner div for the form container with neumorphic styling */}
      <div className="w-full max-w-md p-8 rounded-3xl shadow-neumorphic-dark bg-gray-800 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-50 uppercase tracking-wide">Sign In</h2>
        <LoginForm onSubmit={handleLoginSubmit} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;