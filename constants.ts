
export const WHATSAPP_PHONE_NUMBER = '212625174906';

export const getWhatsAppMessage = (productName: string, price: string): string => {
    const message = `مرحبا، أنا مهتم بـ ${productName} 🍵
السعر: ${price} درهم
هل المنتج متوفر؟ أود طلبه من فضلك.
شكرا لكم! ☕

Hello! I'm interested in ordering ${productName} from Lushanjiu 🍵
Price: ${price} MAD
Is this tea currently in stock? I'd like to place an order.
Thank you!`;
    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};
