// Import React and necessary hooks
import React, { useState } from 'react';
// Import the custom hook to access auth context
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth(); // Get the signup function from auth context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        try {
            await signup(email, password); // Call the signup function with email and password
        } catch (err) {
            setError('Failed to sign up. Please check your credentials.'); // Set error message
            console.error('Signup error:', err); // Log the error for debugging
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
export default Signup;