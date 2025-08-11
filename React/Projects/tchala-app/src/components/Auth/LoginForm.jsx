// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Ensure Facebook and Google are imported here

const LoginForm = ({ onSubmit, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password, rememberMe });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                    {/* Updated label color */}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // Updated input styling for neumorphism
                        className="w-full p-3 rounded-xl bg-gray-900 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner-neumorphic-dark text-gray-50 transition-all duration-200"
                        placeholder="serena88@gmail.com"
                    />
                </div>
                {/* Password Input */}
                <div>
                    {/* Updated label color */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            // Updated input styling for neumorphism
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
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                    {/* Updated checkbox color and label text color */}
                    <label className="flex items-center text-gray-400 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            // Updated checkbox styling
                            className="form-checkbox h-4 w-4 text-teal-500 rounded bg-gray-700 border-gray-600 focus:ring-teal-500 transition-all duration-200"
                        />
                        <span className="ml-2">Remember me</span>
                    </label>
                    {/* Updated forgot password link color */}
                    <Link to="/forgot-password" className="text-teal-400 hover:text-teal-300 transition-colors duration-200">Forgot password?</Link>
                </div>
                {/* Error Message */}
                {error && <p className="text-red-400 text-center text-sm">{error}</p>}

                {/* Sign In Button */}
                <button
                    type="submit"
                    // Updated button gradient and shadow
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-lg shadow-neumorphic-button-dark hover:shadow-neumorphic-button-hover-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Sign In
                </button>
            </form>

            {/* Or Sign In With - Updated text color */}
            <div className="text-center text-gray-400 text-sm my-8">Or Sign in with</div>

            {/* Social Login Buttons */}
            <div className="flex space-x-4">
                <button
                    className="flex-1 flex items-center justify-center p-3 rounded-xl shadow-neumorphic-button-dark bg-gray-700 hover:shadow-neumorphic-button-hover-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-white"
                    onClick={() => console.log('Login with Facebook')}
                >
                    {/* <Facebook size={20} className="mr-2" /> */}Facebook 
                </button>
                <button
                    className="flex-1 flex items-center justify-center p-3 rounded-xl shadow-neumorphic-button-dark bg-gray-700 hover:shadow-neumorphic-button-hover-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-white"
                    onClick={() => console.log('Login with Google')}
                >
                    {/* <Google size={20} className="mr-2" /> */}
                     Google
                </button>
            </div>

            {/* Don't have an account? Sign Up */}
            <div className="text-center mt-8 text-gray-400 text-sm">
                Don't have an account?{" "}
                {/* Updated Sign Up link color */}
                <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200">
                    Sign Up
                </Link>
            </div>
        </>
    );
};

export default LoginForm;