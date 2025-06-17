// Import React and necessary hooks
import React, { useState } from 'react';  
// Import the custom hook to access auth context  
import { useAuth } from '../../context/AuthContext'; 


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login } = useAuth(); // Get the login function from auth context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        try {
            await login(email, password); // Call the login function with email and password
        } catch (err) {
            setError('Failed to log in. Please check your credentials.'); // Set error message
            console.error('Login error:', err); // Log the error for debugging
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
export default Login;