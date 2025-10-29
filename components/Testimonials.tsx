
import React from 'react';

const testimonials = [
  {
    quote: "The best Moroccan Mint tea I've ever had. The quality is exceptional, and ordering via WhatsApp was incredibly simple. Highly recommended!",
    name: "Fatima Z.",
    location: "Casablanca",
    image: "https://picsum.photos/seed/person1/100/100",
  },
  {
    quote: "I'm in love with the Earl Grey Supreme. The aroma fills my kitchen every morning. The delivery from Lushanjiu was fast, and the packaging is beautiful.",
    name: "Youssef A.",
    location: "Rabat",
    image: "https://picsum.photos/seed/person2/100/100",
  },
  {
    quote: "Lushanjiu has become my go-to for high-quality, organic teas. The Chamomile Dream is perfect for relaxing after a long day.",
    name: "Amira K.",
    location: "Marrakech",
    image: "https://picsum.photos/seed/person3/100/100",
  },
];

const Testimonials: React.FC = () => {
    return (
        <section className="py-16 sm:py-24 bg-warm-cream dark:bg-charcoal">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-soft-white mb-4">What Our Customers Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white dark:bg-charcoal/60 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 border-4 border-gold-amber/50"/>
                            <p className="text-charcoal/80 dark:text-soft-white/80 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                            <div>
                                <h4 className="font-bold text-lg text-forest-green">{testimonial.name}</h4>
                                <p className="text-charcoal/60 dark:text-soft-white/60">{testimonial.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
