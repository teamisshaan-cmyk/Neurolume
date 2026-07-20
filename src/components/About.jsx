import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function TiltCard3D({ children, className = '' }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div style={{ perspective: '1000px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={className}
      >
        {/* Dynamic light glow following mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(249,115,22,0.08) 0%, transparent 60%)`
            ),
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      title: t('about.leafTitle'),
      desc: t('about.leafDesc'),
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      ),
      title: t('about.tradeName'),
      desc: t('about.tradeNameDesc'),
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      ),
      title: t('about.dosageForm'),
      desc: t('about.dosageFormDesc'),
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-24 overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-gold/3 rounded-full blur-[120px]" />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-48 h-48 bg-emerald/3 rounded-full blur-[100px]"
      />

      <div className="max-w-[85rem] mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
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
              className="h-[1px] bg-blue-800/50"
            />
            <span className="text-blue-800 text-xs tracking-[0.3em] uppercase">{t('about.sectionTag')}</span>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 32 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] bg-blue-800/50"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-blue-900">{t('about.title')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-green-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        {/* 3D Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
            >
              <TiltCard3D className="glass-card glass-card-hover pt-6 pb-10 px-6 lg:pt-8 lg:pb-12 lg:px-8 text-center group cursor-default h-full transition-all duration-500 hover:scale-[1.05] hover:!bg-orange-100/80 hover:ring-[3px] hover:ring-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] border-transparent">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="text-green-700 group-hover:text-blue-700 mb-4 flex justify-center transition-colors duration-500"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {feature.icon}
                </motion.div>
                <h3
                  className="font-serif text-xl font-semibold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors duration-300"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-green-700 text-sm leading-relaxed font-medium"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {feature.desc}
                </p>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
