import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css'

// import firebase from './services/firebase'; 
// Import your Firebase configuration if needed
// Import the custom hook to access auth context
import {useAuth} from './context/AuthContext'; 
// Import the Login component
import Login from './components/Auth/Login.jsx'; 
// Import the Signup component
import Signup from './components/Auth/Signup.jsx'; 

function App() {
 const { currentUser, loading, logout } = useAuth(); // Get the current user and loading state from auth context

 if (loading) {
   return <div>Loading authentication state...</div>; // Show a loading message while auth state is being determined
 }

 return (
  <div className="App">
    <header className="App-header">
      <h1>Welcome to Tchala Kriket</h1>
    </header>
    <main>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.email}!</p>
          <button onClick={logout}>Logout</button> {/* Button to log out the user */}
        </div>
      ) : (
        <div>
          <p>Please log in or sign up to continue.</p>        
          <Login /> 
          <hr />
          <Signup />
        </div>
      )}
    </main>
  </div>
 );
}

export default App
