import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ImCross } from "react-icons/im";

const categories = [
    { name: 'Weddings', images: ['wedding1.jpg', 'wedding2.jpg', 'wedding3.jpg'], photographer: 'John Doe' },
    { name: 'Engagements', images: ['engagement1.jpg', 'engagement2.jpg', 'engagement3.jpg'], photographer: 'Jane Smith' },
    { name: 'Receptions', images: ['reception1.jpg', 'reception2.jpg', 'reception3.jpg'], photographer: 'John Doe' },
]

const photographers = ['All Photographers', 'John Doe', 'Jane Smith']

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Events')
    const [selectedPhotographer, setSelectedPhotographer] = useState('All Photographers')
    const [selectedImage, setSelectedImage] = useState(null)

    const filteredCategories = categories.filter(category =>
        (selectedCategory === 'All Events' || category.name === selectedCategory) &&
        (selectedPhotographer === 'All Photographers' || category.photographer === selectedPhotographer)
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    Gallery
                </h1>
                <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                    Explore our stunning collection of photos and videos
                </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
                <select
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All Events">All Events</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <select
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={selectedPhotographer}
                    onChange={(e) => setSelectedPhotographer(e.target.value)}
                >
                    {photographers.map((photographer) => (
                        <option key={photographer} value={photographer}>{photographer}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredCategories.map((category) => (
                    category.images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={`https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D`}
                                alt={category.name}
                                className="w-full h-64 object-cover rounded-md shadow-lg transition-transform transform group-hover:scale-105"
                                onClick={() => setSelectedImage(`https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D`)}
                            />
                        </div>
                    ))
                ))}
            </div>
            {selectedImage && (
                <Dialog open={selectedImage !== null} onClose={() => setSelectedImage(null)} className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-3xl w-full">
                            <button
                                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setSelectedImage(null)}
                            >
                                <ImCross className="h-6 w-6" />
                            </button>
                            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    )
}

export default Gallery