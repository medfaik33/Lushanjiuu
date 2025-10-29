
import React from 'react';
import useProduct from '../hooks/useProduct.ts';
import { getWhatsAppMessage } from '../constants.ts';
import { useCurrency } from '../context/CurrencyContext.tsx';

interface ProductPageProps {
    productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
    const { product, loading, error } = useProduct(productId);
    const { currency, convertPrice, getSymbol } = useCurrency();
    
    // Safely parse the price
    const parsedPrice = product ? (parseFloat(product.price) || 0) : 0;

    const renderSkeleton = () => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-pulse">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gray-300 dark:bg-gray-700 rounded-lg w-full h-96"></div>
                <div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full mb-6"></div>
                    <div className="h-14 bg-gray-400 dark:bg-gray-600 rounded-full w-full"></div>
                </div>
            </div>
        </div>
    );

    if (loading) return renderSkeleton();
    if (error) return <div className="text-center py-24 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-24">Product not found.</div>;
    
    const whatsappLink = getWhatsAppMessage(product.name, product.price);

    return (
        <div className="bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Product Image Gallery */}
                    <div>
                        <div className="rounded-lg shadow-xl overflow-hidden">
                            <img 
                                src={product.images[0].src} 
                                alt={product.images[0].alt}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Thumbnails can be added here */}
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-soft-white mb-3">{product.name}</h1>
                        <p className="text-3xl font-semibold text-forest-green dark:text-gold-amber mb-6">{getSymbol(currency)}{convertPrice(parsedPrice)}</p>

                        <div className="prose prose-lg text-charcoal/80 dark:text-soft-white/80 max-w-none" dangerouslySetInnerHTML={{ __html: product.description }}></div>

                         <div className="mt-8">
                             <a
                                href={product.stock_status === 'instock' ? whatsappLink : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full text-center inline-block font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg ${
                                    product.stock_status === 'instock'
                                        ? 'bg-forest-green text-soft-white hover:bg-green-800 transform hover:scale-105'
                                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                }`}
                                onClick={(e) => product.stock_status === 'outofstock' && e.preventDefault()}
                            >
                                {product.stock_status === 'instock' ? 'Order on WhatsApp' : 'Out of Stock'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;