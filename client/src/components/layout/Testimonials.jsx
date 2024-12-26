import React, { useState } from 'react';

const testimonials = [
    {
        name: 'Jane Doe',
        review: 'Amazing experience! The photos turned out beautiful and captured every special moment.'
    },
    {
        name: 'John Smith',
        review: 'Professional and friendly service. Highly recommend!'
    }
]

const Testimonials = () => {
    const [reviews, setReviews] = useState(testimonials)
    const [name, setName] = useState('')
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!name) newErrors.name = 'Please enter your name.'
        if (!review) newErrors.review = 'Please write a review.'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const newReview = { name, review }
        setReviews([...reviews, newReview])
        setName('')
        setReview('')
        setErrors({})
        console.log(newReview)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {reviews.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>{testimonial.name}</h3>
                        <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>{testimonial.review}</p>
                    </div>
                ))}
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto lg:max-w-2xl lg:w-1/2 ">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Review</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        rows="4"
                    ></textarea>
                    {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
                </div>
                <div>
                    <button type="submit" className="w-full shadow-lg text-white bg-pink-500 hover:bg-pink-700 rounded-md px-4 py-2 text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Testimonials;
