
import React from 'react';

const categories = [
    { name: 'Green Tea', icon: '🌿' },
    { name: 'Black Tea', icon: '☕' },
    { name: 'Herbal Tea', icon: '🌸' },
    { name: 'Oolong Tea', icon: '🍃' },
    { name: 'White Tea', icon: '✨' },
    { name: 'Rooibos', icon: '🍂' },
];

const Categories: React.FC = () => {
    return (
        <section className="py-16 sm:py-24 bg-warm-cream">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Explore Our Collections</h2>
                <p className="max-w-2xl mx-auto text-lg text-charcoal/80 mb-12">
                    From invigorating greens to soothing herbals, find the perfect cup for any moment.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <a href="#shop" key={category.name} className="group flex flex-col items-center p-6 bg-white/50 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{category.icon}</div>
                            <h3 className="text-lg font-semibold text-forest-green">{category.name}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
