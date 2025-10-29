import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ProductProvider } from './context/ProductContext.tsx';
import { CurrencyProvider } from './context/CurrencyContext.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CurrencyProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CurrencyProvider>
    </ThemeProvider>
  </React.StrictMode>
);
