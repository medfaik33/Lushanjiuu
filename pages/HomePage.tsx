
import React from 'react';
import Hero from '../components/Hero.tsx';
import FeaturedProducts from '../components/FeaturedProducts.tsx';
import About from '../components/About.tsx';
import Testimonials from '../components/Testimonials.tsx';
import TrustBadges from '../components/TrustBadges.tsx';
import FeaturedBlog from '../components/FeaturedBlog.tsx';

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <About />
            <TrustBadges />
            <Testimonials />
            <FeaturedBlog />
        </>
    );
};

export default HomePage;