import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <p className="flex items-center mb-2">
                            <FaPhone className="mr-2" /> 7294157589
                        </p>
                        <p className="flex items-center mb-2">
                            <FaEnvelope className="mr-2" /> manishdevelops411@gmail.com
                        </p>
                        <p className="flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> Digwadig, Dhanbad, India
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                                <FaFacebook className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Legal</h3>
                        <Link to="/terms-of-service" className="block mb-2 hover:underline">Terms of Service</Link>
                        <p className="text-sm">&copy; 2025 Wedding Photography. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
