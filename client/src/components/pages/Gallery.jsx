import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import Slideshow from '../common/Slideshow';
import { toast } from 'react-toastify';
import Shimmer from '../common/Shimmer';
import ErrorMessage from '../common/ErrorMessage';

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Events');
    const [selectedPhotographer, setSelectedPhotographer] = useState('All Photographers');
    const [selectedImage, setSelectedImage] = useState(null);
    const [mediaData, setMediaData] = useState([]);
    const [slideshow, setSlideshow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    console.log(mediaData);

    const getMedia = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/media/get-media?page=${page}`);

            if (res.ok === false) {
                setLoading(false);
                setError(true);
                return;
            }

            const resData = await res.json();

            setLoading(false);
            setError(false);
            setMediaData(prevMediaData => [...prevMediaData, ...resData.data]);
            setHasMore(resData.data.length > 0);
        } catch (error) {
            setLoading(false);
            setError(true);
            return toast.error('Failed to load!');
        }
    }, [page]);

    useEffect(() => {
        getMedia();
    }, [getMedia]);

    const lastMediaElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const filteredMedia = !error && mediaData.filter(media =>
        (selectedCategory === 'All Events' || media.eventName === selectedCategory) &&
        (selectedPhotographer === 'All Photographers' || media.photographer === selectedPhotographer)
    );

    const allImages = !error && filteredMedia.flatMap(media => media.imgUrls);

    const uniqueEventNames = [...new Set(mediaData.map(media => media.eventName))];
    const uniquePhotographers = [...new Set(mediaData.map(media => media.photographer))];

    return (
        error ? <ErrorMessage /> : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                        Gallery
                    </h1>
                    <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                        Explore our stunning collection of photos and videos
                    </p>
                    <div className="text-center mt-8">
                        <Link to="/manage-gallery" className="text-white bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                            Upload Files
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
                    <select
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={loading}
                    >
                        <option value="All Events">All Events</option>
                        {uniqueEventNames.map((eventName, index) => (
                            <option key={`${eventName}-${index}`} value={eventName}>{eventName}</option>
                        ))}
                    </select>
                    <select
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={selectedPhotographer}
                        onChange={(e) => setSelectedPhotographer(e.target.value)}
                        disabled={loading}
                    >
                        <option value="All Photographers">All Photographers</option>
                        {uniquePhotographers.map((photographer, index) => (
                            <option key={`${photographer}-${index}`} value={photographer}>{photographer}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setSlideshow(!slideshow)}
                        className="text-white bg-pink-500 hover:bg-pink-700 rounded-md flex items-center gap-2 px-4 py-2 text-lg font-bold"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                        disabled={loading}
                    >
                        {slideshow ? <FaPause /> : <FaPlay />}
                        {slideshow ? ' Pause Slideshow' : ' Start Slideshow'}
                    </button>
                </div>
                {loading && page === 1 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Shimmer key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {!error && filteredMedia.map((media, mediaIndex) => (
                            <React.Fragment key={mediaIndex}>
                                {media.imgUrls.map((image, imgIndex) => (
                                    <div key={`${mediaIndex}-${imgIndex}`} className="relative group" ref={mediaIndex === filteredMedia.length - 1 ? lastMediaElementRef : null}>
                                        <img
                                            src={image}
                                            alt={media.eventName}
                                            className="w-full h-64 object-cover rounded-md shadow-lg transition-transform transform group-hover:scale-105"
                                            onClick={() => setSelectedImage(image)}
                                        />
                                        <div className="text-center mt-2">
                                            <p className="text-sm" style={{ fontFamily: "'Dancing Script', cursive" }}>{media.eventName}</p>
                                            <p className="text-xs" style={{ fontFamily: "'Dancing Script', cursive" }}>Photographer: {media.photographer}</p>
                                        </div>
                                    </div>
                                ))}
                                {media.videoUrls.map((video, videoIndex) => (
                                    <div key={`${mediaIndex}-${videoIndex}`} className="relative group">
                                        <video
                                            src={video}
                                            controls
                                            className="w-full h-64 object-cover rounded-md shadow-lg transition-transform transform group-hover:scale-105"
                                        />
                                        <div className="text-center mt-2">
                                            <p className="text-sm" style={{ fontFamily: "'Dancing Script', cursive" }}>{media.eventName}</p>
                                            <p className="text-xs" style={{ fontFamily: "'Dancing Script', cursive" }}>Photographer: {media.photographer}</p>
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {
                    loading && page !== 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Shimmer key={index} />
                            ))}
                        </div>
                    )
                }
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
                {slideshow && allImages.length > 0 && (
                    <Slideshow images={allImages} onClose={() => setSlideshow(false)} />
                )}
            </div>
        )
    );
};

export default Gallery;