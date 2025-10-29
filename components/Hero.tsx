import React from 'react';

const Hero: React.FC = () => {
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };
    
    return (
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                poster="https://picsum.photos/seed/tea-hero-2/1920/1080"
            >
                <source src="https://res.cloudinary.com/drquwqcgc/video/upload/v1760392688/17973477-uhd_3840_2160_30fps_p3qdqh.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/10 to-charcoal/60"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-soft-white px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4">
                    Experience the Art of Tea
                </h1>
                <p className="max-w-2xl text-lg md:text-xl mb-8 drop-shadow-md">
                    Discover our curated collection of premium organic teas, sourced from the world's most pristine gardens.
                </p>
                <a
                    href="#/shop"
                    onClick={handleNav}
                    className="bg-gold-amber text-charcoal font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                    SHOP NOW
                </a>
            </div>
        </section>
    );
};

export default Hero;