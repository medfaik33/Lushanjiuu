import { useState, useEffect } from 'react';
import { Post } from '../types.ts';

const API_BASE_URL = 'https://dev-lushanjiu.pantheonsite.io/wp-json/wp/v2/posts';

const usePost = (postId: string | null) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
        setLoading(false);
        return;
    };

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${postId}?_embed`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const p = await response.json();
        
        const formattedPost: Post = {
          id: p.id,
          date: p.date,
          title: p.title,
          content: p.content,
          excerpt: p.excerpt,
          featured_image_url: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || `https://picsum.photos/seed/${p.id}/800/600`,
        };

        setPost(formattedPost);
      } catch (err) {
        if (err instanceof Error) {
            setError(`Failed to fetch post: ${err.message}`);
        } else {
            setError('An unknown error occurred while fetching the post.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};

export default usePost;