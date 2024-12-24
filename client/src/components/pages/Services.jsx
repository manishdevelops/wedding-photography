import React from 'react'
import { Link } from 'react-router-dom'

const services = [
    {
        name: 'Full-Day Wedding Package',
        description: 'Comprehensive coverage of your wedding day from start to finish.',
        details: 'Includes pre-wedding preparations, ceremony, reception, and more.',
        price: '$2000'
    },
    {
        name: 'Engagement Sessions',
        description: 'Capture the love and excitement of your engagement.',
        details: 'Includes a 2-hour photo session at a location of your choice.',
        price: '$500'
    },
    {
        name: 'Birthday Parties',
        description: 'Document the joy and fun of your birthday celebrations.',
        details: 'Includes coverage of the entire event, from decorations to cake cutting.',
        price: '$300'
    },
    {
        name: 'Corporate Events',
        description: 'Professional photography for your corporate events and conferences.',
        details: 'Includes coverage of keynote speeches, networking sessions, and more.',
        price: '$1000'
    },
    {
        name: 'Family Portraits',
        description: 'Beautiful family portraits to cherish forever.',
        details: 'Includes a 1-hour photo session at a location of your choice.',
        price: '$400'
    },
    {
        name: 'Drone Photography',
        description: 'Capture stunning aerial shots of your event venue.',
        details: 'Includes drone coverage of the entire event.',
        price: '$400'
    }
]

const Services = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    Our Services
                </h1>
                <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                    Discover our range of photography and videography services
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>
                            {service.name}
                        </h2>
                        <p className="text-lg mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                            {service.description}
                        </p>
                        <p className="text-sm mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                            {service.details}
                        </p>
                        <p className="text-lg font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: '#ff6347' }}> {/* Changed color to tomato */}
                            {service.price}
                        </p>
                        <div className="flex space-x-4">
                            {/* Removed "Book Now" button */}
                            <Link to="/contact-us" className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-700 hover:to-purple-700 rounded-md px-4 py-2 text-lg font-bold shadow-lg" style={{ fontFamily: "'Dancing Script', cursive" }}> {/* Added shadow-lg */}
                                Request a Quote
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services