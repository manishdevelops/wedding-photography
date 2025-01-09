import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ImCross } from "react-icons/im";
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';

const Slideshow = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, images.length]);

    const handlePrevious = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <Dialog open={true} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-6xl w-full h-full">
                    <button
                        className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <ImCross className="h-6 w-6" />
                    </button>
                    <div className="relative w-full h-full">
                        <img src={images[currentSlide]} alt={`Slideshow ${currentSlide}`} className="w-full h-full object-contain" />
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                            onClick={handlePrevious}
                        >
                            <FaArrowLeft className="h-6 w-6" />
                        </button>
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                            onClick={handleNext}
                        >
                            <FaArrowRight className="h-6 w-6" />
                        </button>
                        <button
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? <FaPause className="h-6 w-6" /> : <FaPlay className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default Slideshow;
