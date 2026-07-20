import { useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function Benefit3DCard({ benefit, index, isInView }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });
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
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="glass-card p-10 lg:p-12 group relative overflow-hidden cursor-default h-full"
      >
        {/* Dynamic mouse-following light */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(249,115,22,0.1) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className="text-gold mb-8"
            whileHover={{ scale: 1.15, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{ transform: 'translateZ(30px)' }}
          >
            {benefit.icon}
          </motion.div>

          <h3
            className="font-serif text-xl font-bold text-white mb-4 group-hover:text-gold-light transition-colors duration-300"
            style={{ transform: 'translateZ(20px)' }}
          >
            {benefit.title}
          </h3>

          <p
            className="text-gray text-sm leading-relaxed"
            style={{ transform: 'translateZ(10px)' }}
          >
            {benefit.description}
          </p>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent group-hover:w-3/4 transition-all duration-700" />
      </motion.div>
    </motion.div>
  );
}

export default function Benefits() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const audienceRef = useRef(null);
  const audienceInView = useInView(audienceRef, { once: true, margin: '-50px' });

  const benefits = [
    {
      title: t('details.tensionTitle'),
      description: t('details.tensionDesc'),
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M16 24 L22 18 L26 22 L32 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 16 L32 16 L32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        </svg>
      ),
      gradient: 'from-gold/10 to-transparent',
    },
    {
      title: t('details.insomniaTitle'),
      description: t('details.insomniaDesc'),
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M24 12 C24 12 16 20 16 28 C16 32 20 36 24 36 C28 36 32 32 32 28 C32 20 24 12 24 12Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <path d="M21 26 L24 29 L28 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      gradient: 'from-emerald/10 to-transparent',
    },
    {
      title: t('details.fatigueTitle'),
      description: t('details.fatigueDesc'),
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M18 30 Q24 14 30 30" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
          <path d="M14 30 Q24 10 34 30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <line x1="16" y1="34" x2="32" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
      gradient: 'from-gold/10 to-transparent',
    },
    {
      title: t('details.imbalanceTitle'),
      description: t('details.imbalanceDesc'),
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M24 14 L24 34 M14 24 L34 24" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      ),
      gradient: 'from-emerald/10 to-transparent',
    },
    {
      title: t('details.posologyTitle'),
      description: t('details.posologyDaily'),
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M14 32 L20 20 L26 28 L32 16 L38 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      gradient: 'from-gold/10 to-transparent',
    },
    {
      title: t('details.safetyTitle'),
      description: t('details.effectsDesc'),
      icon: (
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path d="M20 16 Q24 12 28 16 Q32 20 28 24 Q24 28 20 24 Q16 20 20 16Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
          <path d="M22 20 L24 24 L26 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
      gradient: 'from-emerald/10 to-transparent',
    },
  ];

  const targetAudience = [
    "Individuals with chronic stress",
    "Patients suffering from insomnia",
    "Those experiencing adrenal fatigue",
    "People seeking emotional balance",
  ];

  return (
    <section id="benefits" className="relative py-40 lg:py-48 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-[200px]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24 lg:mb-28">
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
            <span className="text-gold text-xs tracking-[0.3em] uppercase">{t('details.sectionTag')}</span>
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
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
          >
            <span className="text-white">{t('details.title')}</span>
            <br />
            <span className="italic gold-text">{t('details.tabs.indications')}</span>
          </motion.h2>
        </div>

        {/* 3D Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <Benefit3DCard
              key={benefit.title}
              benefit={benefit}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Who It's For Section */}
        <div ref={audienceRef} className="mt-40 lg:mt-48 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={audienceInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-8 h-[2px] bg-gold/50 mb-6"
              initial={{ width: 0 }}
              animate={audienceInView ? { width: 32 } : {}}
              transition={{ duration: 0.8 }}
            />
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8">
              <span className="italic gold-text">{t('details.indicationsTitle')}</span>
              <br />
              <span className="text-white">For Your Health</span>
            </h2>

            <p className="text-gray-light text-lg leading-relaxed mb-10">
              {t('details.subtitle')}
            </p>

            <ul className="space-y-5">
              {targetAudience.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={audienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-gray-light group"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-gold flex-shrink-0"
                    whileHover={{ scale: 1.5, boxShadow: '0 0 10px rgba(249,115,22,0.5)' }}
                  />
                  <span className="text-sm group-hover:text-gold-light transition-colors duration-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 3D Decorative Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={audienceInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Concentric rings with 3D depth */}
              {[0, 1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + ring * 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-gold/5"
                  style={{
                    margin: `${ring * 30}px`,
                    transform: `translateZ(${ring * -10}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {ring < 3 && (
                    <motion.div
                      className="absolute w-2 h-2 rounded-full bg-gold/30"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: ring }}
                      style={{
                        top: ring % 2 === 0 ? '0' : '50%',
                        left: ring % 2 === 0 ? '50%' : '0',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 8px rgba(249,115,22,0.3)',
                      }}
                    />
                  )}
                </motion.div>
              ))}

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center justify-center pointer-events-auto"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                     animate={{ rotate: [0, 5, -5, 0], rotateY: [0, 10, -10, 0] }}
                     transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                     style={{ transformStyle: 'preserve-3d' }}
                  >
                      <div className="w-48 h-48 object-contain mix-blend-multiply drop-shadow-xl opacity-0" />
                  </motion.div>
                  <div className="mt-[-20px] flex flex-col items-center relative z-10" style={{ transform: 'translateZ(50px)' }}>
                    <p className="text-gold font-serif text-3xl font-bold drop-shadow-sm">Neurolume</p>
                    <p className="text-navy font-bold text-xs tracking-widest bg-[#ffffff]/60 px-3 py-1 rounded-full mt-2 backdrop-blur-md border border-gold/20 shadow-sm">{t('details.statusDesc')}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
