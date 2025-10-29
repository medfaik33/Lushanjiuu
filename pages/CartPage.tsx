import React from 'react';

const CartPage: React.FC = () => {
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };

    return (
        <div className="bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center max-w-2xl mx-auto" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-soft-white mb-4">Your Shopping Cart</h1>
                    <p className="text-lg text-charcoal/80 dark:text-soft-white/80 mb-8">
                        Your cart is currently empty.
                    </p>
                    <a 
                        href="#/shop" 
                        onClick={handleNav} 
                        className="bg-forest-green text-soft-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-800 dark:bg-gold-amber dark:text-charcoal dark:hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg self-center"
                    >
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
