
import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../components/Icons.tsx';
import { WHATSAPP_PHONE_NUMBER } from '../constants.ts';

const ContactPage: React.FC = () => {
    const generalInquiryMessage = encodeURIComponent("Hello Lushanjiu, I have a question.");
    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${generalInquiryMessage}`;

    return (
        <div className="bg-warm-cream dark:bg-charcoal py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-soft-white mb-4">Get in Touch</h1>
                    <p className="text-lg text-charcoal/80 dark:text-soft-white/80">
                        We'd love to hear from you! Whether you have a question about our teas, an order, or just want to share your tea experience, feel free to reach out.
                    </p>
                </div>

                <div className="mt-16 grid md:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-charcoal/60 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-forest-green mb-6">Send us a Message</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-charcoal dark:text-soft-white/80">Full Name</label>
                                <input type="text" id="name" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gold-amber focus:border-gold-amber bg-white dark:bg-charcoal dark:border-gray-600 dark:text-white" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-charcoal dark:text-soft-white/80">Email Address</label>
                                <input type="email" id="email" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gold-amber focus:border-gold-amber bg-white dark:bg-charcoal dark:border-gray-600 dark:text-white" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-charcoal dark:text-soft-white/80">Message</label>
                                <textarea id="message" rows={4} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-gold-amber focus:border-gold-amber bg-white dark:bg-charcoal dark:border-gray-600 dark:text-white"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-forest-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors duration-300">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-forest-green mb-2">Our Contact Info</h3>
                            <p className="text-charcoal/80 dark:text-soft-white/80">Phone/WhatsApp: +212 625 174906</p>
                            <p className="text-charcoal/80 dark:text-soft-white/80">Location: Morocco (Online Store)</p>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-forest-green mb-2">Business Hours</h3>
                            <p className="text-charcoal/80 dark:text-soft-white/80">Monday - Friday: 9am - 6pm</p>
                            <p className="text-charcoal/80 dark:text-soft-white/80">Saturday: 10am - 4pm</p>
                            <p className="text-charcoal/80 dark:text-soft-white/80">Sunday: Closed</p>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-forest-green mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                               <a href="#" aria-label="Facebook" className="text-charcoal dark:text-soft-white hover:text-gold-amber transition"><FacebookIcon className="h-8 w-8" /></a>
                                <a href="#" aria-label="Instagram" className="text-charcoal dark:text-soft-white hover:text-gold-amber transition"><InstagramIcon className="h-8 w-8" /></a>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-charcoal dark:text-soft-white hover:text-gold-amber transition"><WhatsAppIcon className="h-8 w-8" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;