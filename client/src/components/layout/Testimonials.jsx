import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import ReCAPTCHA from 'react-google-recaptcha';


const Testimonials = () => {
    const [reviews, setReviews] = useState()
    const [name, setName] = useState('')
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState({})
    const [error, setError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(false);
    const [loadReview, setLoadReview] = useState(false);

    // const [recaptcha, setRecaptcha] = useState('');
    // const captchaRef = useRef();

    const getReviews = async () => {
        try {
            setLoadReview(true);
            setError(false);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/get-reviews`);
            if (!res.ok) {
                setLoadReview(false);
                const errorData = res.json();
                setError(true);
                return toast.error(errorData.message);
            }
            const data = await res.json();
            setLoadReview(false);
            setReviews(data.data);
        } catch (error) {
            setError(true);
            setLoadReview(true);
            return toast.error(error.message);
        }
    }

    useEffect(() => {
        getReviews();

    }, [])

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
            }, 5000);

            return () => clearInterval(interval); // Cleanup on unmount or reviews change
        }
    }, [reviews]); // Runs whenever `reviews` changes

    // const handleCaptchaChange = (value) => {
    //     setRecaptcha(value);
    // };

    const validateForm = () => {
        const newErrors = {}
        if (!name) newErrors.name = 'Please enter your name.'
        if (!review) newErrors.review = 'Please write a review.'
        // if (!recaptcha) newErrors.captcha = 'Please verify that you are not a robot.';
        return newErrors
    }

    const handleSubmit = async (e) => {
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

        try {
            setLoading(true);
            // captchaRef.current.reset();

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews/create-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newReview,
                    // recaptcha
                })
            });

            if (res.ok === false) {
                const errorData = await res.json();
                setLoading(false);
                // setRecaptcha('');
                return toast.error(errorData.message);
            }

            setLoading(false);
            toast.success('Review submitted successfully😇!');
            // setRecaptcha('');
            getReviews();


        } catch (error) {
            setLoading(false);
            toast.error('Failed to submit Review!');
        }
    }

    const Shimmer = () => (
        <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-lg animate-pulse w-full max-w-sm mx-auto">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>
    )

    return (


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Testimonials</h2>
            {
                !loading && error && (
                    <p className="text-lg mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: 'red' }}>
                        Failed to load Reviews. Please try again later.
                    </p>
                )
            }
            {
                !error && loadReview ?
                    <div className="flex justify-center">
                        <Shimmer />
                    </div> :
                    reviews && (
                        <div className="relative">
                            <div className="overflow-hidden">
                                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    {reviews.map((testimonial, index) => (
                                        <div key={index} className="min-w-full flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>{testimonial.name}</h3>
                                            <p className="text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: '#6c757d' }}>{testimonial.review}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
            }
            <h2 className="text-2xl font-semibold my-4 text-center" style={{ fontFamily: "'Dancing Script', cursive", color: '#d63384' }}>Leave a Review</h2>
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
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Testimonials;
