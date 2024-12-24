import React from 'react';
import Banner from '../layout/Banner';
import AboutUsPreview from '../layout/AboutUsPreview';
import GalleryPreview from '../layout/GalleryPreview';
import Testimonials from '../layout/Testimonials';

const Home = () => {
    return (
        <>
            <Banner />
            <AboutUsPreview />
            <GalleryPreview />
            <Testimonials />
        </>
    )
}

export default Home