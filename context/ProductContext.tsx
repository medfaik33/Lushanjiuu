import React, { createContext, useContext, ReactNode } from 'react';
import { Product } from '../types.ts';
import useProducts from '../hooks/useProducts.ts';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products, loading, error } = useProducts();

  const value = { products, loading, error };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductProvider');
  }
  return context;
};
