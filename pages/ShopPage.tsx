import React, { useState, useMemo } from 'react';
import { useProductsContext } from '../context/ProductContext.tsx';
import ProductCard from '../components/ProductCard.tsx';
import { SearchIcon } from '../components/Icons.tsx';
import { Product } from '../types.ts';

const ShopPage: React.FC = () => {
    const { products, loading, error } = useProductsContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('favoriteProducts');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (id: number) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id];
            localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const renderSkeleton = () => (
         <div className="bg-white dark:bg-charcoal/50 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-6">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded-full w-full"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-soft-white mb-4">Our Tea Collection</h1>
                    <p className="max-w-2xl mx-auto text-lg text-charcoal/80 dark:text-soft-white/80">
                        Explore our full range of carefully selected organic teas from around the world.
                    </p>
                </div>

                <div className="max-w-md mx-auto mb-12 relative">
                    <input
                        type="text"
                        placeholder="Search for your favorite tea..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full py-3 pl-12 pr-4 border-2 border-forest-green/30 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-amber transition bg-white dark:bg-charcoal/80 dark:border-forest-green/70 dark:text-soft-white"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-charcoal/50 dark:text-soft-white/50" />
                </div>
                
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, i) => renderSkeleton())}
                    </div>
                )}

                {error && <p className="text-center text-red-600 text-lg">{error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id}
                                product={product} 
                                isFavorite={favorites.includes(product.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                )}
                 {filteredProducts.length === 0 && !loading && (
                    <p className="text-center text-charcoal/80 dark:text-soft-white/80 text-lg mt-8">No teas found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default ShopPage;