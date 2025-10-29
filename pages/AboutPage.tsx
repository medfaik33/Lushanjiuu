
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-soft-white mb-4">Our Story: The Pursuit of Purity</h1>
                    <p className="text-lg text-charcoal/80 dark:text-soft-white/80">
                        Lushanjiu was born from a simple desire: to share the world's most exquisite, ethically sourced teas with those who appreciate moments of tranquility and wellness.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center my-16">
                    <div className="rounded-lg overflow-hidden shadow-xl order-last md:order-first">
                         <img src="https://picsum.photos/seed/tea-about-2/800/600" alt="Tea leaves being harvested" className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-forest-green mb-4">From Soil to Soul</h2>
                        <p className="text-charcoal/80 dark:text-soft-white/80 mb-4">
                           Our journey begins in the pristine, high-altitude gardens where tea has been cultivated for centuries. We build personal relationships with the farmers and communities who tend to these sacred plants. This direct partnership ensures not only that we receive the highest quality leaves, but that the farmers receive a fair, sustainable wage for their incredible craftsmanship.
                        </p>
                        <p className="text-charcoal/80 dark:text-soft-white/80">
                            At Lushanjiu, we believe that the energy and intention put into the cultivation process can be tasted in every cup. That's why we exclusively source 100% organic teas, grown without pesticides or artificial chemicals, allowing the true, vibrant character of the tea to shine through.
                        </p>
                    </div>
                </div>

                 <div className="grid md:grid-cols-2 gap-12 items-center my-16">
                    <div>
                        <h2 className="text-3xl font-bold text-forest-green mb-4">Our Philosophy</h2>
                         <ul className="space-y-4 text-lg">
                            <li className="flex items-start">
                                <span className="text-gold-amber text-2xl mr-4 mt-1">🌿</span>
                                <div>
                                    <h3 className="font-bold text-charcoal dark:text-soft-white">Purity</h3>
                                    <p className="text-charcoal/80 dark:text-soft-white/80">We are committed to providing teas that are clean, natural, and free from anything that would detract from their intrinsic goodness.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gold-amber text-2xl mr-4 mt-1">💖</span>
                                 <div>
                                    <h3 className="font-bold text-charcoal dark:text-soft-white">Passion</h3>
                                    <p className="text-charcoal/80 dark:text-soft-white/80">Tea is not just our business; it's our passion. We meticulously cup and select each tea to ensure it meets our exacting standards of flavor and aroma.</p>
                                </div>
                            </li>
                             <li className="flex items-start">
                                <span className="text-gold-amber text-2xl mr-4 mt-1">🤝</span>
                                 <div>
                                    <h3 className="font-bold text-charcoal dark:text-soft-white">Partnership</h3>
                                    <p className="text-charcoal/80 dark:text-soft-white/80">We honor the hard work of our farming partners by engaging in ethical, transparent, and sustainable sourcing practices.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                     <div className="rounded-lg overflow-hidden shadow-xl">
                         <img src="https://picsum.photos/seed/tea-about-3/800/600" alt="A person enjoying a cup of Lushanjiu tea" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
