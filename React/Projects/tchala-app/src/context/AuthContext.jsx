// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges, registerUser, loginUser, logoutUser } from '../services/auth';

const AuthContext = createContext(null); // Initialize context with null

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // To indicate loading state
    
    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((user) => {
            setCurrentUser(user);
            setLoading(false); // Set loading to false once we have the user state
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const value = { 
        currentUser,
        loading,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    // Only render children when loading is complete to prevent flickering
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext easily
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};