
import React from 'react';
import usePosts from '../hooks/usePosts.ts';
import BlogPostCard from './BlogPostCard.tsx';

const FeaturedBlog: React.FC = () => {
    const { posts, loading, error } = usePosts();

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };

    const renderSkeleton = () => (
        <div className="bg-white dark:bg-charcoal/50 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>
    );

    return (
        <section className="py-16 sm:py-24 bg-forest-green/5 dark:bg-forest-green/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-soft-white mb-4">From Our Tea Journal</h2>
                    <p className="max-w-2xl mx-auto text-lg text-charcoal/80 dark:text-soft-white/80">
                        Discover brewing tips, tea stories, and the latest news from the world of Lushanjiu.
                    </p>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, i) => renderSkeleton())}
                    </div>
                )}

                {error && <p className="text-center text-red-600 text-lg">{error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.slice(0, 3).map(post => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
                
                {posts.length > 0 && (
                    <div className="text-center mt-16">
                        <a href="#/blog" onClick={handleNav} className="bg-forest-green text-soft-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-800 dark:bg-gold-amber dark:text-charcoal dark:hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Read More On The Blog
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedBlog;