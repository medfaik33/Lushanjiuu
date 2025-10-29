import { useState, useEffect } from 'react';
import { Product } from '../types.ts';

const API_URL = 'https://dev-lushanjiu.pantheonsite.io/wp-json/wp/v2/products?_embed&per_page=100';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add a timestamp to the URL to bypass caches
        const cacheBustedUrl = `${API_URL}&v=${Date.now()}`;
        const response = await fetch(cacheBustedUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const formattedProducts: Product[] = data.map((p: any) => {
            const terms = p._embedded?.['wp:term'] || [];
            const categories = terms.flat().map((term: any) => ({ name: term.name })) || [];

            // Extract and validate price
            let price = '100.00';
            if (p.price) {
              const priceStr = String(p.price).replace(/[^\d.]/g, '');
              const priceNum = parseFloat(priceStr);
              if (!isNaN(priceNum) && priceNum > 0) {
                price = priceNum.toFixed(2);
              }
            }

            return {
              id: p.id,
              name: p.title?.rendered || 'Untitled Product',
              price: price,
              sku: p.slug,
              stock_status: p.meta?._stock_status || 'instock',
              images: [{ src: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/product-${p.id}/400/400`, alt: p.title?.rendered || 'Product Image' }],
              description: p.content?.rendered || '',
              short_description: p.excerpt?.rendered || '',
              categories: categories,
            }
        });

        // Filter out old products
        const updatedProducts = formattedProducts.filter(p => 
            !p.name.toLowerCase().includes('atay lhlou') && 
            !p.name.toLowerCase().includes('royal blend')
        );

        setProducts(updatedProducts);

      } catch (err) {
        if (err instanceof Error) {
            setError(`Failed to fetch products: ${err.message}`);
        } else {
            setError('An unknown error occurred while fetching products.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;