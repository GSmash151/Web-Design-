// src/App.jsx
import React from 'react';
import './App.css'; // Keep this for now
import { useAuth } from './contexts/AuthContext'; // Path already updated, should be correct
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your new PAGE components from src/pages/auth
import LoginPage from './pages/auth/LoginPage'; // Correct path for LoginPage
import SignupPage from './pages/auth/SignupPage'; // Correct path for SignupPage

function App() {
  const { currentUser, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Loading authentication state...
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          {/* Route for Login Page */}
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" replace /> : <LoginPage />}
          />

          {/* Route for Signup Page */}
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" replace /> : <SignupPage />}
          />

          {/* Protected Route for Home/Dashboard */}
          <Route
            path="/"
            element={
              currentUser ? (
                <div className="p-4">
                  <p className="text-xl">Welcome, {currentUser.email}!</p>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                  >
                    Logout
                  </button>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold">Tchala App Dashboard</h2>
                    <p>This is where your main lottery app features will go.</p>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;