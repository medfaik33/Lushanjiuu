

import React from 'react';
import { WhatsAppIcon } from './Icons.tsx';
import { WHATSAPP_PHONE_NUMBER } from '../constants.ts';

const FloatingWhatsAppButton: React.FC = () => {
    const generalInquiryMessage = encodeURIComponent("Hello Lushanjiu! I have a question about your products. 🍵");
    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${generalInquiryMessage}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 z-40"
            aria-label="Chat with us on WhatsApp"
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
};

export default FloatingWhatsAppButton;