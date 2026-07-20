import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ImagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const images = [
    { src: '/images_box.png', alt: 'Neurolume Box' },
    { src: '/images_open_box.png', alt: 'Neurolume Open Box' },
    { src: '/images_capsules.png', alt: 'Neurolume Capsules' }
  ];

  return (
    <section id="images" className="relative py-16 lg:py-24 flex flex-col justify-center overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      <div className="max-w-[90rem] mx-auto px-4 lg:px-8 w-full relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
          >
            Product Gallery
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card p-2 sm:p-4 flex items-center justify-center overflow-hidden group hover:border-gold/30 transition-colors duration-300"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
