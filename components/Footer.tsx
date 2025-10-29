
import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, TikTokIcon, TeaLeafIcon } from './Icons.tsx';
import { WHATSAPP_PHONE_NUMBER } from '../constants.ts';

const Footer: React.FC = () => {
    const generalInquiryMessage = encodeURIComponent("Hello Lushanjiu, I have a question.");
    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${generalInquiryMessage}`;
    const currentYear = new Date().getFullYear();
    
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            window.location.hash = href;
        }
    };

    return (
        <footer className="bg-forest-green text-soft-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <a href="#/" onClick={handleNav} className="flex items-center space-x-2 mb-4">
                            <TeaLeafIcon className="h-8 w-8 text-warm-cream" />
                            <span className="text-2xl font-bold text-warm-cream tracking-tight">Lushanjiu</span>
                        </a>
                        <p className="text-warm-cream/80">
                            Bringing moments of serenity to your daily life, one cup at a time.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gold-amber mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#/shop" onClick={handleNav} className="hover:text-gold-amber transition">Shop All Teas</a></li>
                            <li><a href="#/blog" onClick={handleNav} className="hover:text-gold-amber transition">Blog</a></li>
                            <li><a href="#/about" onClick={handleNav} className="hover:text-gold-amber transition">Our Story</a></li>
                            <li><a href="#/contact" onClick={handleNav} className="hover:text-gold-amber transition">Contact Us</a></li>
                            <li><a href="#" onClick={handleNav} className="hover:text-gold-amber transition">FAQs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gold-amber mb-4">Contact</h3>
                         <ul className="space-y-2 text-warm-cream/80">
                            <li>Phone: +212 625 174906</li>
                            <li>Location: Morocco</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gold-amber mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="hover:text-gold-amber transition"><FacebookIcon className="h-6 w-6" /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-gold-amber transition"><InstagramIcon className="h-6 w-6" /></a>
                            <a href="https://www.tiktok.com/@999teamaisonduthe" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gold-amber transition"><TikTokIcon className="h-6 w-6" /></a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-gold-amber transition"><WhatsAppIcon className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-warm-cream/20 text-center text-warm-cream/60">
                    <p>&copy; {currentYear} Lushanjiu. All Rights Reserved. Crafted with love.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;