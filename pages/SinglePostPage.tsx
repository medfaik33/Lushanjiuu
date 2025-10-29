
import React from 'react';
import usePost from '../hooks/usePost.ts';

interface SinglePostPageProps {
    postId: string;
}

const SinglePostPage: React.FC<SinglePostPageProps> = ({ postId }) => {
    const { post, loading, error } = usePost(postId);

    const renderSkeleton = () => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-pulse">
            <div className="max-w-4xl mx-auto">
                 <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                 <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
                 <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
                 <div className="space-y-4">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
                 </div>
            </div>
        </div>
    );

    if (loading) return renderSkeleton();
    if (error) return <div className="text-center py-24 text-red-500">{error}</div>;
    if (!post) return <div className="text-center py-24">Post not found.</div>;

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-charcoal dark:text-soft-white mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
                        <p className="text-lg text-charcoal/70 dark:text-soft-white/70">{formattedDate}</p>
                    </header>

                    <div className="rounded-lg shadow-xl overflow-hidden mb-12">
                        <img 
                            src={post.featured_image_url} 
                            alt={post.title.rendered}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none text-charcoal/90 dark:text-soft-white/90 text-lg leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    >
                    </div>

                </article>
            </div>
        </div>
    );
};

export default SinglePostPage;