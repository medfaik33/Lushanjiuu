
import React from 'react';
import usePosts from '../hooks/usePosts.ts';
import BlogPostCard from '../components/BlogPostCard.tsx';

const BlogPage: React.FC = () => {
    const { posts, loading, error } = usePosts();

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
        <div className="bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-soft-white mb-4">Lushanjiu Tea Journal</h1>
                    <p className="max-w-2xl mx-auto text-lg text-charcoal/80 dark:text-soft-white/80">
                        Stories, guides, and inspiration for the modern tea lover.
                    </p>
                </div>
                
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => renderSkeleton())}
                    </div>
                )}

                {error && <p className="text-center text-red-600 text-lg">{error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                           <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
                 {posts.length === 0 && !loading && (
                    <p className="text-center text-charcoal/80 dark:text-soft-white/80 text-lg mt-8">No articles found.</p>
                )}
            </div>
        </div>
    );
};

export default BlogPage;