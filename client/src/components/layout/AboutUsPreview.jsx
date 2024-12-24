import { Link } from 'react-router-dom';

const AboutUsPreview = () => {
    return (
        <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" >
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    About Us
                </h1>
                <p className="text-lg mb-8" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                    Capturing the real emotion of your special day
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-12">
                <img className="w-48 h-48 rounded-full mb-4 md:mb-0 md:mr-8" src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Photographer" />
                <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>John Doe</h2>
                    <p className="text-lg mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                        With over 10 years of experience in wedding photography, John Doe has a unique style that captures the essence of every moment.
                    </p>
                </div>
            </div>
            <div className="text-center">
                <Link to="/about-us" className="text-white shadow-lg bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Learn More
                </Link>
            </div>
        </div >
    )
}

export default AboutUsPreview;
