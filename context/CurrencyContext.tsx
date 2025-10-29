import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type Currency = 'MAD' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => string;
  getSymbol: (currency: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const exchangeRates = {
  MAD: 1,
  USD: 0.10, // 1 MAD = 0.10 USD
  EUR: 0.092, // 1 MAD = 0.092 EUR
};

const currencySymbols = {
    MAD: 'MAD',
    USD: '$',
    EUR: '€',
}

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('MAD');

  const convertPrice = (priceInMad: number): string => {
    if (isNaN(priceInMad)) return '0.00';
    const rate = exchangeRates[currency];
    const convertedPrice = priceInMad * rate;
    return convertedPrice.toFixed(2);
  };

  const getSymbol = (curr: Currency): string => {
      return currencySymbols[curr];
  }

  const value = useMemo(() => ({
    currency,
    setCurrency: (c: Currency) => setCurrency(c),
    convertPrice,
    getSymbol,
  }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
