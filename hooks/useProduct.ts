import { useState, useEffect } from 'react';
import { Product } from '../types.ts';

const API_BASE_URL = 'https://dev-lushanjiu.pantheonsite.io/wp-json/wp/v2/products';

const useProduct = (productId: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
        setLoading(false);
        return;
    };

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${productId}?_embed`, { cache: 'no-cache' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const p = await response.json();
        
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

        const formattedProduct: Product = {
          id: p.id,
          name: p.title?.rendered || 'Untitled Product',
          price: price,
          sku: p.slug,
          stock_status: p.meta?._stock_status || 'instock',
          images: [{ src: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/product-${p.id}/800/600`, alt: p.title?.rendered || 'Product Image' }],
          description: p.content?.rendered || '',
          short_description: p.excerpt?.rendered || '',
          categories: categories,
        };

        setProduct(formattedProduct);
      } catch (err) {
        if (err instanceof Error) {
            setError(`Failed to fetch product: ${err.message}`);
        } else {
            setError('An unknown error occurred while fetching the product.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

export default useProduct;