import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function FAQItem({ faq, isOpen, onToggle, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="border-b border-gold/10 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-4">
          <motion.span
            className="text-gold/70 font-serif text-lg font-bold"
            animate={isOpen ? { scale: 1.1, color: 'rgba(249,115,22,0.9)' } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <span className={`font-serif text-lg sm:text-xl transition-colors duration-300 ${
            isOpen ? 'text-gold-light' : 'text-white group-hover:text-gold-light'
          }`}>
            {faq.q}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'border-gold bg-gold/10 text-gold shadow-[0_0_12px_rgba(249,115,22,0.2)]'
              : 'border-gold/30 text-gold/60 group-hover:border-gold/50'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-14 pr-14">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-gray text-sm sm:text-base leading-relaxed"
              >
                {faq.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="relative min-h-screen py-16 flex flex-col justify-center overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/3 rounded-full blur-[150px]"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 32 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] bg-gold/50"
            />
            <span className="text-gold text-xs tracking-[0.3em] uppercase">{t('faq.sectionTag')}</span>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 32 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] bg-gold/50"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">{t('faq.title')}</span>
          </motion.h2>
        </div>

        {/* FAQ Items with premium glass */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -5 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card p-6 sm:p-8"
          style={{ perspective: '1000px' }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
