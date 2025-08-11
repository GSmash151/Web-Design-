// src/services/auth.js

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    onAuthStateChanged, // Firebase Auth state listener
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth';
import { auth } from '../config/firebase'; // Import your Firebase auth instance

// Function to register a new user
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Optionally, you can update the user's profile with a display name or photo URL
        // await updateProfile(userCredential.user, 
        return userCredential.user; // Return the user object
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Propagate the error
    }
};

// Function to log in an existing user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the user object
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Propagate the error
    }
};

// Function to log out the current user
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error logging out user:', error.message);
        throw error; // Propagate the error
    }
};

// Function to listen for authentication state changes
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback, (error) => {
        console.error('Error in auth state change:', error);
    });
}