import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';
import Shimmer from '../common/Shimmer';

const GalleryPreview = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mediaData, setMediaData] = useState([]);

    const getMedia = async () => {
        try {
            setLoading(true);
            setError(false);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/media/get-media?page=3`);

            if (res.ok === false) {
                setLoading(false);
                setError(true);
                return;
            }

            const resData = await res.json();

            setLoading(false);
            setError(false);
            setMediaData(resData.data);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    return (
        <div className="gallery-preview p-4">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Gallery Preview</h2>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Shimmer key={index} />
                    ))}
                </div>
            ) : error ? (
                <ErrorMessage />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaData.map((media, mediaIndex) => (
                        <React.Fragment key={mediaIndex}>
                            {media.imgUrls.map((image, imgIndex) => (
                                <img
                                    key={`${mediaIndex}-${imgIndex}`}
                                    src={image}
                                    alt={`Highlight ${imgIndex + 1}`}
                                    className="highlight-image w-full h-48 object-cover shadow-lg transition-transform transform hover:scale-105"
                                />
                            ))}
                            {media.videoUrls.map((video, videoIndex) => (
                                <video
                                    key={`${mediaIndex}-${videoIndex}`}
                                    src={video}
                                    controls
                                    className="highlight-video w-full h-48 object-cover shadow-lg transition-transform transform hover:scale-105"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            )}
            <div className="text-center mt-6">
                <Link to="/gallery" className="text-white shadow-lg bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>View Full Gallery</Link>
            </div>
        </div>
    );
};

export default GalleryPreview;
