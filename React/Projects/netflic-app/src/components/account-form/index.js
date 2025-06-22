// src/components/account-form/index.js
'use client';

import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context'; // Adjust path

export default function AccountForm({ onClose, accountToEdit, onAccountCreatedOrUpdated }) {
    const { session } = useContext(GlobalContext); // To get uid

    const [formData, setFormData] = useState({
        name: '',
        pin: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (accountToEdit) {
            setFormData({
                name: accountToEdit.name,
                pin: '' // PIN is never pre-filled for security
            });
        } else {
            setFormData({ name: '', pin: '' });
        }
    }, [accountToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!session?.user?.uid) {
            setError("User not authenticated.");
            setLoading(false);
            return;
        }

        if (!formData.name.trim() || formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
            setError("Name is required and PIN must be 4 digits.");
            setLoading(false);
            return;
        }

        try {
            const apiUrl = accountToEdit ? `/api/account/update-account` : `/api/account/create-account`;
            const method = accountToEdit ? 'PUT' : 'POST';

            const res = await fetch(apiUrl, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    uid: session.user.uid,
                    ...(accountToEdit && { id: accountToEdit._id }) // Include ID for update
                })
            });

            const data = await res.json();

            if (data.success) {
                alert(data.message);
                onAccountCreatedOrUpdated(); // Refresh accounts in parent
                onClose(); // Close the form
            } else {
                setError(data.message || "Failed to save account.");
            }
        } catch (err) {
            console.error("API call error:", err);
            setError("Network error or server issue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {accountToEdit ? 'Edit Profile' : 'Create New Profile'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                            Profile Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="pin" className="block text-gray-300 text-sm font-bold mb-2">
                            4-Digit PIN
                        </label>
                        <input
                            type="password"
                            id="pin"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            maxLength="4"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            required
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (accountToEdit ? 'Save Changes' : 'Create Profile')}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}