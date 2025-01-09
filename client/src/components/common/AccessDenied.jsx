import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const AccessDenied = () => {
    const [keyInput, setKeyInput] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyInput === process.env.REACT_APP_ADMIN_SECRET_KEY) {
            toast.success('Access Granted');
            setAccessGranted(true);
        } else {
            toast.error('Access Denied');
        }
    };

    if (accessGranted) {
        return <Navigate to="/secure-upload" />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: 'red' }}>
                Access Denied
            </h1>
            <p className="text-lg mb-8" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                Please enter the key to gain access.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Enter key"
                />
                <button type="submit" className="text-white bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AccessDenied;
