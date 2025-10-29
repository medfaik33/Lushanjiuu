
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.tsx';
import HomePage from './pages/HomePage.tsx';
import ShopPage from './pages/ShopPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import CartPage from './pages/CartPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import SinglePostPage from './pages/SinglePostPage.tsx';
import AIRecommender from './components/AIRecommender.tsx';
import { SparklesIcon } from './components/Icons.tsx';

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);
    const [isAiRecommenderOpen, setIsAiRecommenderOpen] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
            window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    
    let currentPage;
    const productRouteMatch = route.match(/^#\/product\/(\d+)$/);
    const postRouteMatch = route.match(/^#\/post\/(\d+)$/);

    if (productRouteMatch) {
        const productId = productRouteMatch[1];
        currentPage = <ProductPage productId={productId} />;
    } else if (postRouteMatch) {
        const postId = postRouteMatch[1];
        currentPage = <SinglePostPage postId={postId} />;
    } else {
        switch (route) {
            case '#/shop':
                currentPage = <ShopPage />;
                break;
            case '#/about':
                currentPage = <AboutPage />;
                break;
            case '#/contact':
                currentPage = <ContactPage />;
                break;
            case '#/cart':
                currentPage = <CartPage />;
                break;
            case '#/blog':
                currentPage = <BlogPage />;
                break;
            case '#/':
            case '':
            default:
                currentPage = <HomePage />;
                break;
        }
    }


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {currentPage}
            </main>
            <Footer />
            <FloatingWhatsAppButton />
            <button
                onClick={() => setIsAiRecommenderOpen(true)}
                className="fixed bottom-28 right-6 bg-gold-amber text-charcoal w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 z-40"
                aria-label="Open AI Tea Recommender"
            >
                <SparklesIcon className="w-8 h-8" />
            </button>
            <AIRecommender 
                isOpen={isAiRecommenderOpen}
                onClose={() => setIsAiRecommenderOpen(false)}
            />
        </div>
    );
};

export default App;