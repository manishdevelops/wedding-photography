import React from 'react';

const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: 'red' }}>
            Error
        </h1>
        <p className="text-lg mb-8" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
            Failed to load media content. Please try again later.
        </p>
    </div>
);

export default ErrorMessage;
