import React from 'react';

const Shimmer = () => (
    <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-lg animate-pulse w-full h-64">
        <div className="h-40 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
);

export default Shimmer;
