import { Link } from 'react-router-dom';

const highlightImages = [
    'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb',
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
]

const GalleryPreview = () => {
    return (
        <div className="gallery-preview p-4">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Gallery Preview</h2>
            <div className="highlight-images grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {highlightImages.map((image, index) => (
                    <img key={index} src={image} alt={`Highlight ${index + 1}`} className="highlight-image w-full h-48 object-cover shadow-lg transition-transform transform hover:scale-105" />
                ))}
            </div>
            <div className="text-center mt-6">
                <Link to="/gallery" className="text-white shadow-lg bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>View Full Gallery</Link>
            </div>
        </div>
    )
}

export default GalleryPreview;
