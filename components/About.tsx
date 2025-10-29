import React from 'react';

const About: React.FC = () => {

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };

    return (
        <section id="about" className="py-16 sm:py-24 bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="rounded-lg overflow-hidden shadow-xl">
                         <img src="https://picsum.photos/seed/tea-about/800/600" alt="Lush tea garden" className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-soft-white mb-4">From Garden to Cup, with Love</h2>
                        <p className="text-lg text-charcoal/80 dark:text-soft-white/80 mb-6">
                            At Lushanjiu, we believe a cup of tea is more than just a beverage; it's a moment of peace, a ritual of wellness, and a connection to nature. We travel the globe to source the finest organic, loose-leaf teas directly from farmers who share our passion for quality and sustainability.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-gold-amber text-2xl mr-4 mt-1">✓</span>
                                <span className="text-charcoal/80 dark:text-soft-white/80"><strong>100% Organic & Natural:</strong> No pesticides, no artificial flavors. Just pure, wholesome tea.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gold-amber text-2xl mr-4 mt-1">✓</span>
                                <span className="text-charcoal/80 dark:text-soft-white/80"><strong>Ethically Sourced:</strong> We partner with small farms to ensure fair practices and exceptional quality.</span>
                            </li>
                             <li className="flex items-start">
                                <span className="text-gold-amber text-2xl mr-4 mt-1">✓</span>
                                <span className="text-charcoal/80 dark:text-soft-white/80"><strong>Unforgettable Flavor:</strong> Experience the true taste of tea, rich in aroma and nuanced flavors.</span>
                            </li>
                        </ul>
                        <a href="#/about" onClick={handleNav} className="inline-block mt-8 bg-gold-amber text-charcoal font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Learn More About Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;