import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import validator from 'validator';
// import ReCAPTCHA from 'react-google-recaptcha';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // const [recaptcha, setRecaptcha] = useState('');
    // const captchaRef = useRef();
    const today = new Date().toISOString().split('T')[0];


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const validateEmail = (email) => {
        return validator.isEmail(email);
    }

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Please enter your name.'
        if (!formData.email) {
            newErrors.email = 'Please enter your email address.'
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.'
        }
        if (!formData.phone) {
            newErrors.phone = 'Please provide your phone number.'
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number.'
        }
        if (!formData.weddingDate) newErrors.weddingDate = 'Please select the event date.'
        if (!formData.message) newErrors.message = 'Please write a message.'
        // if (!recaptcha) newErrors.captcha = 'Please verify that you are not a robot.';
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        try {
            // captchaRef.current.reset();
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contacts/create-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        ...formData
                        // , recaptcha
                    }
                )
            });

            if (res.ok === false) {
                const errorData = await res.json();
                setLoading(false);
                return toast.error(errorData.message);
            }
            setLoading(false);
            toast.success('We received your details. We will get back to you shortly!');

            setFormData({
                name: '',
                email: '',
                phone: '',
                weddingDate: '',
                message: ''
            });
            // setRecaptcha('');

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }


    }

    // const handleCaptchaChange = (value) => {
    //     setRecaptcha(value);
    // };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    Contact Us For Booking
                </h1>
                <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                    We'd love to hear from you! Please fill out the form below to get in touch.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Event Date</label>
                            <input type="date" id="weddingDate" value={formData.weddingDate} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" min={today} />
                            {errors.weddingDate && <p className="text-red-500 text-sm">{errors.weddingDate}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" value={formData.message} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" rows="4"></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                        {/* <div>
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                ref={captchaRef}
                                onChange={handleCaptchaChange}
                            />
                            {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
                        </div> */}
                        <div>
                            <button type="submit" className="w-full shadow-lg text-white bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                                {loading ? 'Loading...' : 'Request a Consultation'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FaPhone className="text-pink-500 mr-4" />
                        <span className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>7294157589</span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-pink-500 mr-4" />
                        <span className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>manishdevelops411@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-pink-500 mr-4" />
                        <span className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>Digwadih, Dhanbad, India</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                            <FaInstagram className="h-6 w-6" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                            <FaFacebook className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="mt-8">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.2528219236356!2d86.41301307518593!3d23.702663978702994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69900427331a1%3A0x39a3b9bc6f80ac15!2sDigwadih%2010%20no!5e0!3m2!1sen!2sin!4v1734863220873!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0 }} loading="lazy" title='address'></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;