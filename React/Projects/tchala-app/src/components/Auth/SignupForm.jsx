// src/components/auth/SignupForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import icons from lucide-react
import { Eye, EyeOff } from '../../imports/authImports'; 
// Import the SignupForm component from the authImports


const SignupForm = ({ onSubmit, error }) => { // Receive onSubmit and error as props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, confirmPassword); // Pass all relevant data up
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl bg-gray-900 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner-neumorphic-dark text-gray-50 transition-all duration-200"
            placeholder="yourname@example.com"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pr-10 rounded-xl bg-gray-900 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner-neumorphic-dark text-gray-50 transition-all duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-50 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 pr-10 rounded-xl bg-gray-900 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner-neumorphic-dark text-gray-50 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-lg shadow-neumorphic-button-dark hover:shadow-neumorphic-button-hover-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Sign Up
        </button>
      </form>

      {/* Already have an account? Sign In */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignupForm;