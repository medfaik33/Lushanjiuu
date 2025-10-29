
import React from 'react';

const badges = [
    { icon: '🌿', title: 'Organic Certified', description: 'Pure and free from pesticides.' },
    { icon: '🚚', title: 'Free Shipping', description: 'On all orders over 300 MAD.' },
    { icon: '💖', title: 'Satisfaction Guaranteed', description: 'Love it or your money back.' },
];

const TrustBadges: React.FC = () => {
    return (
        <div className="bg-forest-green/10 dark:bg-forest-green/20 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {badges.map((badge) => (
                        <div key={badge.title} className="flex flex-col items-center">
                            <div className="text-4xl mb-2">{badge.icon}</div>
                            <h3 className="font-bold text-lg text-forest-green dark:text-gold-amber">{badge.title}</h3>
                            <p className="text-charcoal/70 dark:text-soft-white/70 text-sm">{badge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;