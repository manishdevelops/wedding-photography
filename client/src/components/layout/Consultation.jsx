import React, { useState } from 'react'

const Consultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        message: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({ ...formData, [id]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // Add your form submission logic here
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>
                    Book a Consultation
                </h1>
                <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                    We'd love to discuss your special day with you! Please fill out the form below to book a consultation.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                            <input type="date" id="preferredDate" value={formData.preferredDate} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" min={today} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" value={formData.message} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" rows="4"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full text-white bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="space-y-4">
                    <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>
                        We look forward to meeting you and discussing how we can make your special day unforgettable. Please provide as much detail as possible so we can better understand your needs.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Consultation
