
import React from 'react';
import { Post } from '../types.ts';

interface BlogPostCardProps {
    post: Post;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <a href={`#/post/${post.id}`} onClick={handleNav} className="bg-white dark:bg-charcoal/60 rounded-lg shadow-md overflow-hidden group flex flex-col transition-transform duration-300 hover:-translate-y-2">
            <div className="relative">
                <img
                    src={post.featured_image_url}
                    alt={post.title.rendered}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-sm text-charcoal/60 dark:text-soft-white/60 mb-2">{formattedDate}</p>
                    <h3 className="text-xl font-bold text-forest-green group-hover:text-gold-amber transition-colors duration-300 mb-3" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h3>
                    <div className="text-charcoal/70 dark:text-soft-white/70 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                </div>
                <div className="mt-6">
                    <span className="font-bold text-forest-green dark:text-gold-amber group-hover:underline">Read More →</span>
                </div>
            </div>
        </a>
    );
};

export default BlogPostCard;