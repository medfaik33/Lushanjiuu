import React, { useState, useEffect, useMemo } from 'react';
import { TeaLeafIcon, CartIcon, SearchIcon, MenuIcon, SunIcon, MoonIcon, XIcon } from './Icons.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { useProductsContext } from '../context/ProductContext.tsx';
import { useCurrency } from '../context/CurrencyContext.tsx';
import { Product } from '../types.ts';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { currency, setCurrency, convertPrice, getSymbol } = useCurrency();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    
    const navLinks = [
        { name: 'Home', href: '#/' },
        { name: 'Shop', href: '#/shop' },
        { name: 'Blog', href: '#/blog' },
        { name: 'About', href: '#/about' },
        { name: 'Contact', href: '#/contact' }
    ];

    const SearchOverlay = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const { products, loading } = useProductsContext();
        const { convertPrice: convert, currency: currentCurrency, getSymbol: symbol } = useCurrency();
        
        const filteredProducts = useMemo(() => {
            if (!searchTerm) return [];
            return products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [products, searchTerm]);

        const handleSearchNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
            handleNav(e);
            setIsSearchOpen(false);
        };
        
        return (
            <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-[100] flex justify-center items-start pt-20 p-4" onClick={() => setIsSearchOpen(false)}>
                <div className="relative w-full max-w-2xl bg-warm-cream dark:bg-charcoal rounded-lg shadow-xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 text-charcoal/60 dark:text-soft-white/60 hover:text-gold-amber dark:hover:text-gold-amber">
                        <XIcon className="h-8 w-8" />
                    </button>
                    <div className="p-6">
                         <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for your favorite tea..."
                                value={searchTerm}
                                autoFocus
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full text-lg py-3 pl-12 pr-4 border-2 border-forest-green/30 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-amber transition bg-white dark:bg-charcoal/80 dark:border-forest-green/70 dark:text-soft-white"
                            />
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-charcoal/50 dark:text-soft-white/50" />
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-[60vh] p-6 pt-0">
                        {loading && searchTerm && <p className="text-center">Searching...</p>}
                        {searchTerm && !loading && filteredProducts.length === 0 && <p className="text-center text-charcoal/80 dark:text-soft-white/80">No results found.</p>}
                        <ul className="space-y-4">
                            {filteredProducts.map(product => (
                                <li key={product.id}>
                                    <a href={`#/product/${product.id}`} onClick={handleSearchNav} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-forest-green/10 dark:hover:bg-forest-green/20 transition-colors duration-200">
                                        <img src={product.images[0].src} alt={product.images[0].alt} className="w-16 h-16 object-cover rounded-md"/>
                                        <div>
                                            <p className="font-bold text-forest-green">{product.name}</p>
                                            <p className="text-charcoal dark:text-soft-white">{symbol(currentCurrency)}{convert(parseFloat(product.price))}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <>
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-warm-cream/90 dark:bg-charcoal/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#/" onClick={handleNav} className="flex items-center space-x-2">
                            <TeaLeafIcon className="h-8 w-8 text-forest-green" />
                            <span className="text-2xl font-bold text-forest-green tracking-tight">Lushanjiu</span>
                        </a>

                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={handleNav} className="text-lg font-medium text-charcoal dark:text-soft-white hover:text-gold-amber transition-colors duration-300">{link.name}</a>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="relative">
                                <select 
                                    value={currency} 
                                    onChange={(e) => setCurrency(e.target.value as 'MAD' | 'USD' | 'EUR')}
                                    className="appearance-none bg-transparent text-charcoal dark:text-soft-white font-medium py-2 pr-6 pl-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gold-amber/50 cursor-pointer"
                                    aria-label="Select currency"
                                >
                                    <option value="MAD" className="bg-warm-cream dark:bg-charcoal">MAD</option>
                                    <option value="USD" className="bg-warm-cream dark:bg-charcoal">USD</option>
                                    <option value="EUR" className="bg-warm-cream dark:bg-charcoal">EUR</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-charcoal dark:text-soft-white">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>

                            <div className="pl-2 flex items-center space-x-1 sm:space-x-2">
                                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-forest-green/10 dark:hover:bg-warm-cream/10 transition-colors duration-300">
                                {theme === 'light' ? <MoonIcon className="h-6 w-6 text-charcoal dark:text-soft-white" /> : <SunIcon className="h-6 w-6 text-charcoal dark:text-soft-white" />}
                                </button>
                                <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-forest-green/10 dark:hover:bg-warm-cream/10 transition-colors duration-300">
                                    <SearchIcon className="h-6 w-6 text-charcoal dark:text-soft-white" />
                                </button>
                                <a href="#/cart" onClick={handleNav} className="p-2 rounded-full hover:bg-forest-green/10 dark:hover:bg-warm-cream/10 transition-colors duration-300 relative">
                                    <CartIcon className="h-6 w-6 text-charcoal dark:text-soft-white" />
                                </a>
                                <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    <MenuIcon className="h-6 w-6 text-charcoal dark:text-soft-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-warm-cream/95 dark:bg-charcoal/95 backdrop-blur-sm">
                        <nav className="flex flex-col items-center space-y-4 py-4">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={handleNav} className="text-lg font-medium text-charcoal dark:text-soft-white hover:text-gold-amber transition-colors duration-300">{link.name}</a>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            {isSearchOpen && <SearchOverlay />}
        </>
    );
};

export default Header;