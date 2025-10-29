import { useState, useEffect } from 'react';
import { Post } from '../types.ts';

const API_URL = 'https://dev-lushanjiu.pantheonsite.io/wp-json/wp/v2/posts?_embed';

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const formattedPosts: Post[] = data.map((p: any) => ({
          id: p.id,
          date: p.date,
          title: p.title,
          content: p.content,
          excerpt: p.excerpt,
          featured_image_url: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${p.id}/800/600`,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        if (err instanceof Error) {
            setError(`Failed to fetch posts: ${err.message}`);
        } else {
            setError('An unknown error occurred while fetching posts.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default usePosts;