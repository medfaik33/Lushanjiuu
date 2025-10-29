import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useProductsContext } from '../context/ProductContext.tsx';
import { Product } from '../types.ts';
import { XIcon, SparklesIcon } from './Icons.tsx';
import { useCurrency } from '../context/CurrencyContext.tsx';

interface AIRecommenderProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: Product[];
};

const AIRecommender: React.FC<AIRecommenderProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const { products, loading: productsLoading } = useProductsContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const { currency, convertPrice, getSymbol } = useCurrency();

  useEffect(() => {
    // Safely initialize the AI client
    if (aiRef.current) return;

    // In a browser environment, `process.env` is not available by default.
    // This check prevents a crash if the API key is not provided via the execution environment.
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
      console.error('CRITICAL: Gemini API key not found in environment variables. The AI recommender will be disabled.');
      setIsConfigured(false);
      return;
    }
    
    aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (!isConfigured) {
        setMessages([
          {
            sender: 'ai',
            text: "I'm sorry, the AI Sommelier is currently unavailable due to a configuration issue. Please contact the site administrator.",
          },
        ]);
      } else if (messages.length === 0) { // Only set initial message if chat is empty
        setMessages([
          {
            sender: 'ai',
            text: "Hello! I am Lin, your personal tea sommelier. How can I help you find the perfect tea today? Feel free to tell me what flavors you enjoy or what mood you're in.",
          },
        ]);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isConfigured, messages.length]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const constructPrompt = (userInput: string, productList: Product[]): string => {
    const productInfo = productList.map(p => ({
      name: p.name,
      description: p.short_description.replace(/<[^>]*>?/gm, ''),
      price: p.price,
      image_url: p.images[0]?.src,
    }));

    return `You are Lin, an expert tea sommelier for Lushanjiu, a premium organic tea brand. Your tone is warm, elegant, and knowledgeable.
    Based on the user's request, you must recommend one or more teas from the provided list. Consider all available product information, including description and price, to make the best recommendation.
    You must format your response as a single JSON object that strictly follows this schema: { "response_text": "string", "recommended_products": ["string"] }.
    'response_text' is your conversational, friendly reply to the user, explaining your choices.
    'recommended_products' is an array of the exact product names you are recommending from the list. If you cannot find a suitable tea, return an empty array.
    Do not recommend any tea that is not on this list.

    Available Teas (JSON format):
    ${JSON.stringify(productInfo)}

    User request: "${userInput}"`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || productsLoading || !aiRef.current || !isConfigured) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const prompt = constructPrompt(currentInput, products);
      const response = await aiRef.current.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    response_text: { type: Type.STRING, description: "Your conversational reply to the user." },
                    recommended_products: {
                        type: Type.ARRAY,
                        description: "An array of exact product names being recommended.",
                        items: { type: Type.STRING }
                    }
                },
                required: ['response_text', 'recommended_products']
            }
        }
      });
      
      const jsonResponse = JSON.parse(response.text);
      const recommendedProductNames: string[] = jsonResponse.recommended_products || [];
      const recommendedProducts = products.filter(p => recommendedProductNames.includes(p.name));

      const aiMessage: Message = {
        sender: 'ai',
        text: jsonResponse.response_text || "I'm not sure what to recommend, but feel free to browse our collection!",
        recommendedProducts: recommendedProducts,
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error with Gemini API:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, I'm having a little trouble connecting. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
        window.location.hash = href;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="ai-recommender-title">
        <div 
            className="fixed bottom-4 right-4 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-warm-cream dark:bg-charcoal/90 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
            onClick={e => e.stopPropagation()}
        >
            <header className="bg-forest-green p-4 flex items-center justify-between text-soft-white">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="h-6 w-6 text-gold-amber"/>
                    <h2 id="ai-recommender-title" className="text-lg font-bold">AI Tea Master</h2>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20" aria-label="Close AI recommender">
                    <XIcon className="h-6 w-6"/>
                </button>
            </header>
            
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-gold-amber/20 dark:bg-gold-amber/30 rounded-br-none' : 'bg-forest-green/10 dark:bg-forest-green/20 rounded-bl-none'}`}>
                           <p className="text-charcoal dark:text-soft-white whitespace-pre-wrap">{msg.text}</p>
                           {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                                <div className="mt-3 grid grid-cols-1 gap-2 pt-3 border-t border-forest-green/20 dark:border-soft-white/20">
                                    {msg.recommendedProducts.map(product => {
                                        const parsedPrice = parseFloat(product.price) || 0;
                                        return (
                                            <a href={`#/product/${product.id}`} key={product.id} onClick={handleProductClick} className="flex items-center space-x-3 p-2 rounded-lg bg-white dark:bg-charcoal/60 hover:bg-forest-green/10 dark:hover:bg-forest-green/20 transition-colors">
                                                <img src={product.images[0].src} alt={product.images[0].alt} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                                <div>
                                                    <p className="font-bold text-forest-green text-sm">{product.name}</p>
                                                    <p className="text-charcoal/80 dark:text-soft-white/80 text-xs">{getSymbol(currency)}{convertPrice(parsedPrice)}</p>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-2xl bg-forest-green/10 dark:bg-forest-green/20 rounded-bl-none">
                           <div className="flex items-center space-x-2">
                               <div className="h-2 w-2 bg-forest-green dark:bg-gold-amber rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                               <div className="h-2 w-2 bg-forest-green dark:bg-gold-amber rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                               <div className="h-2 w-2 bg-forest-green dark:bg-gold-amber rounded-full animate-bounce"></div>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-forest-green/20 dark:border-warm-cream/20">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder={!isConfigured ? "AI is disabled." : (productsLoading ? "Loading teas..." : "Ask for a tea recommendation...")}
                        className="w-full py-3 pl-4 pr-12 border-2 border-forest-green/30 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-amber transition bg-white dark:bg-charcoal dark:border-forest-green/70 dark:text-soft-white"
                        disabled={isLoading || productsLoading || !isConfigured}
                        aria-label="Your message to the AI Tea Master"
                    />
                    <button onClick={handleSend} disabled={isLoading || productsLoading || !input.trim() || !isConfigured} className="absolute right-2 top-1/2 -translate-y-1/2 bg-forest-green text-white p-2 rounded-full hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed" aria-label="Send message">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AIRecommender;