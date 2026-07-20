import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Science() {
  const { t } = useTranslation();
  // Force HMR update - interactive path layout
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: t('about.point1Title'),
      subtitle: 'Cortisol',
      description: t('about.point1Desc'),
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold transition-colors duration-300 group-hover:text-emerald" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      number: '02',
      title: t('about.point2Title'),
      subtitle: 'GABA',
      description: t('about.point2Desc'),
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold transition-colors duration-300 group-hover:text-emerald" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: t('about.point3Title'),
      subtitle: 'Serotonin',
      description: t('about.point3Desc'),
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold transition-colors duration-300 group-hover:text-emerald" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: t('about.point4Title'),
      subtitle: 'Neuroprotection',
      description: t('about.point4Desc'),
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold transition-colors duration-300 group-hover:text-emerald" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const activeData = steps[activeStep];

  return (
    <section id="science" className="relative min-h-screen py-12 lg:py-20 flex flex-col justify-center overflow-hidden" ref={sectionRef}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-0 w-80 h-80 bg-emerald/5 rounded-full blur-[150px] -z-10"
      />
      
      <div className="max-w-5xl mx-auto px-4 lg:px-8 w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16 w-full max-w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">{t('about.modeOfActionTitle')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-emerald text-base sm:text-lg w-full font-medium truncate"
            title={t('about.modeOfActionDesc')}
          >
            {t('about.modeOfActionDesc')}
          </motion.p>
        </div>

        {/* Interactive Pathway */}
        <div className="relative w-full max-w-3xl mb-12 lg:mb-16 px-4 sm:px-10">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gold/20 -translate-y-1/2 -z-10 rounded-full" />
          
          <div className="flex justify-between items-center w-full relative z-10">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  className="group relative flex flex-col items-center focus:outline-none"
                  aria-label={`View step ${step.number}: ${step.subtitle}`}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive ? 'var(--color-navy)' : 'var(--color-deep-navy)',
                      borderColor: isActive ? 'var(--color-gold)' : 'rgba(234, 88, 12, 0.3)', // Using gold/30 essentially
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-shadow duration-300 ${
                      isActive ? 'shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'hover:border-gold/60 hover:shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                    }`}
                  >
                    <span className={`font-serif font-bold text-sm sm:text-base transition-colors duration-300 ${isActive ? 'text-gold' : 'text-gold/60 group-hover:text-gold/80'}`}>
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Node Label (Optional, below node) */}
                  <div className="absolute top-16 whitespace-nowrap text-center">
                    <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-gold/40 group-hover:text-gold/70'
                    }`}>
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Card Display */}
        <div className="w-full max-w-2xl min-h-[320px] relative">
          <AnimatePresence mode="wait">
            <InteractiveCard key={activeStep} step={activeData} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function InteractiveCard({ step }) {
  const cardRef = useRef(null);
  
  // Mouse-tracking 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass-card glass-card-hover group p-8 sm:p-12 h-full flex flex-col justify-center items-center text-center transition-all duration-300 border border-gold/10 hover:border-gold/30 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
          style={{ transform: 'translateZ(40px)' }}
          className="mb-6 p-4 rounded-full bg-gold/5 border border-gold/20"
        >
          {step.icon}
        </motion.div>

        <h3
          className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 transition-all duration-300 group-hover:opacity-80 group-hover:scale-105"
          style={{ transform: 'translateZ(30px)' }}
        >
          {step.title}
        </h3>

        <p
          className="text-emerald/80 text-base sm:text-lg leading-relaxed max-w-lg mx-auto transition-all duration-300 group-hover:text-emerald group-hover:scale-105"
          style={{ transform: 'translateZ(20px)' }}
        >
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
