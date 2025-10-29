
import React from 'react';
import { Product } from '../types.ts';
import { getWhatsAppMessage } from '../constants.ts';
import { useCurrency } from '../context/CurrencyContext.tsx';

interface ProductCardProps {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
    const { currency, convertPrice, getSymbol } = useCurrency();
    const whatsappLink = getWhatsAppMessage(product.name, product.price);

    // Safely parse the price
    const parsedPrice = parseFloat(product.price) || 0;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onToggleFavorite(product.id);
    }
    
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };
    
    return (
        <a href={`#/product/${product.id}`} onClick={handleNav} className="bg-white dark:bg-charcoal/60 rounded-lg shadow-md overflow-hidden group flex flex-col transition-transform duration-300 hover:-translate-y-2">
            <div className="relative">
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                />
                {product.stock_status === 'outofstock' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-lg font-bold bg-red-600/80 px-4 py-2 rounded">Out of Stock</span>
                    </div>
                )}
                <button 
                    onClick={handleFavoriteClick}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isFavorite ? 'bg-red-500/80 text-white' : 'bg-white/70 text-charcoal/70 backdrop-blur-sm dark:bg-charcoal/70 dark:text-soft-white'}`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                    </svg>
                </button>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-forest-green group-hover:text-gold-amber transition-colors duration-300 mb-1">{product.name}</h3>
                    <div className="text-charcoal/70 dark:text-soft-white/70 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: product.short_description }}></div>
                </div>
                <div className="mt-auto">
                    <p className="text-2xl font-semibold text-charcoal dark:text-soft-white mb-4">{getSymbol(currency)}{convertPrice(parsedPrice)}</p>
                    <div
                        className={`w-full text-center block font-bold py-3 px-6 rounded-full transition-all duration-300 ${
                            product.stock_status === 'instock'
                                ? 'bg-forest-green text-soft-white hover:bg-green-800'
                                : 'bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {product.stock_status === 'instock' ? 'View Details' : 'Out of Stock'}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ProductCard;