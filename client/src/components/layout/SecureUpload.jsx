import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';

const SecureUpload = () => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [photographer, setPhotographer] = useState('');
    const [eventName, setEventName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const compressVideo = (file) => {
        // Implement video compression logic here if needed
        // For now, we will return the original file
        return Promise.resolve(file);
    };

    const uploadFile = async (file, type, timestamp, signature) => {
        const folder = type === 'image' ? 'images' : 'videos';

        const data = new FormData();
        data.append("file", file);
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
        data.append("folder", folder);

        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await fetch(api, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            return result.secure_url;
        } catch (error) {
            console.error(error);
            toast.error('Failed uploading to cloud.')
        }
    };

    const getSignatureForUpload = async (folder) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signature/generate-signature`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ folder })
            });
            return await res.json();
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!photographer) newErrors.photographer = 'Please enter the photographer name.';
        if (!eventName) newErrors.eventName = 'Please select the event name.';
        if (images.length === 0 && videos.length === 0) newErrors.media = 'Please upload at least one image or video.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            // Get signature for Image upload
            const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');

            // Get signature for video upload
            const { timestamp: videoTimestamp, signature: videoSignature } = await getSignatureForUpload('videos');

            // Compress and upload image files
            const compressedImages = await Promise.all(images.map(img => compressImage(img)));
            const imgUrls = await Promise.all(compressedImages.map(img => uploadFile(img, 'image', imgTimestamp, imgSignature)));

            // Compress and upload video files
            const compressedVideos = await Promise.all(videos.map(video => compressVideo(video)));
            const videoUrls = await Promise.all(compressedVideos.map(video => uploadFile(video, 'video', videoTimestamp, videoSignature)));

            // Send backend api request
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/media/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imgUrls, videoUrls, photographer, eventName })
            });

            if (res.ok === false) {
                // const errorData = await res.json();
                setLoading(false);
                return toast.error("File upload failed to databse!");
            }

            // Reset states 
            setImages([]);
            setVideos([]);
            setPhotographer('');
            setEventName('');
            setErrors({});

            console.log("File upload success!");
            toast.success("File uploaded to databse!");
            setLoading(false);
            navigate("/gallery");
        } catch (error) {
            console.error(error);
            setLoading(false);
            return toast.error("File upload failed to databse!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                Secure Upload
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="photographer" className="block text-sm font-medium text-gray-700">Photographer</label>
                    <input
                        type="text"
                        id="photographer"
                        value={photographer}
                        onChange={(e) => setPhotographer(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    {errors.photographer && <p className="text-red-500 text-sm">{errors.photographer}</p>}
                </div>
                <div>
                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
                    <select
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                        <option value="">Select Event</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Reception">Reception</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Family Gathering">Family Gathering</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}
                </div>
                <div>
                    <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Upload Videos</label>
                    <input
                        type="file"
                        multiple
                        accept="video/*"
                        id="videos"
                        onChange={(e) => setVideos([...e.target.files])}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    {errors.videos && <p className="text-red-500 text-sm">{errors.videos}</p>}
                </div>
                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        id="images"
                        onChange={(e) => setImages([...e.target.files])}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                </div>
                {errors.media && <p className="text-red-500 text-sm">{errors.media}</p>}
                <div>
                    <button type="submit" className="w-full shadow-lg text-white bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Upload
                    </button>
                </div>
            </form>
            {loading && (
                <div className="flex justify-center mt-8">
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>
            )}
        </div>
    );
};

export default SecureUpload;
