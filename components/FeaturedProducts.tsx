import React, { useState, useMemo } from 'react';
import { useProductsContext } from '../context/ProductContext.tsx';
import ProductCard from './ProductCard.tsx';
import { SearchIcon } from './Icons.tsx';
import { Product } from '../types.ts';
import { useCurrency } from '../context/CurrencyContext.tsx';

const ProductSchema: React.FC<{ product: Product }> = ({ product }) => {
  const { currency, convertPrice } = useCurrency();

  // Safely parse the price
  const parsedPrice = parseFloat(product.price) || 0;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images[0]?.src,
    "description": product.short_description.replace(/<[^>]*>?/gm, ''),
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Lushanjiu"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.origin + '/#/product/' + product.id,
      "priceCurrency": currency,
      "price": convertPrice(parsedPrice),
      "availability": product.stock_status === 'instock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Lushanjiu"
      }
    }
  };
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};

const FeaturedProducts: React.FC = () => {
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
    
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };

    return (
        <section id="shop" className="py-16 sm:py-24 bg-forest-green/5 dark:bg-forest-green/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-soft-white mb-4">Our Curated Teas</h2>
                    <p className="max-w-2xl mx-auto text-lg text-charcoal/80 dark:text-soft-white/80">
                        Each leaf is carefully selected to bring you an unparalleled tea experience.
                    </p>
                </div>

                <div className="max-w-md mx-auto mb-12 relative">
                    <input
                        type="text"
                        placeholder="Search for your favorite tea..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-12 pr-4 border-2 border-forest-green/30 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-amber transition bg-white dark:bg-charcoal dark:border-forest-green/70 dark:text-soft-white"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-charcoal/50 dark:text-soft-white/50" />
                </div>
                
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => renderSkeleton())}
                    </div>
                )}

                {error && <p className="text-center text-red-600 text-lg">{error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.slice(0, 6).map(product => ( // Show only 6 featured products
                            <React.Fragment key={product.id}>
                                <ProductSchema product={product} />
                                <ProductCard 
                                    product={product} 
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                )}
                 {filteredProducts.length === 0 && !loading && (
                    <p className="text-center text-charcoal/80 dark:text-soft-white/80 text-lg mt-8">No teas found matching your search.</p>
                )}

                <div className="text-center mt-16">
                    <a href="#/shop" onClick={handleNav} className="bg-forest-green text-soft-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-800 dark:bg-gold-amber dark:text-charcoal dark:hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        View All Teas
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;