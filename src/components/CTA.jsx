import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function CTA() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Stars background with depth
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
    depth: Math.random(),
  }));

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-48 lg:py-56 overflow-hidden"
    >
      {/* Starfield Background with depth */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-navy to-midnight" />

        {/* Aurora glow layers */}
        <motion.div
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 80% 40% at 30% 30%, rgba(249,115,22,0.06) 0%, transparent 60%)',
          }}
        />
        <motion.div
          animate={{
            opacity: [0.02, 0.06, 0.02],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 60%, rgba(22,163,74,0.04) 0%, transparent 50%)',
          }}
        />

        {/* Stars with depth-based sizing */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size * (0.5 + star.depth * 0.5),
              height: star.size * (0.5 + star.depth * 0.5),
              filter: star.depth < 0.3 ? 'blur(0.5px)' : 'none',
            }}
            animate={{
              opacity: [0.1, 0.8 * star.depth + 0.2, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Mountain silhouette hint */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 opacity-10"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0 200 L200 80 L400 140 L600 40 L800 120 L1000 60 L1200 100 L1440 20 L1440 200 Z"
            fill="url(#mountainGrad)"
          />
          <defs>
            <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2744" />
              <stop offset="100%" stopColor="#0a0e1a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow orbs with animation */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-gold/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -10, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-emerald/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Content with 3D perspective */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center" style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-8 h-[2px] bg-gold/50 mx-auto mb-12"
        />

        <motion.h2
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold mb-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.span
            className="text-white block"
            style={{ transform: 'translateZ(20px)' }}
          >
            {t('hero.titlePart1')}
          </motion.span>
          <motion.span
            className="italic gold-text block animate-neon-breathe"
            style={{ transform: 'translateZ(40px)' }}
          >
            {t('hero.titlePart2')}
          </motion.span>
          <motion.span
            className="text-white block"
            style={{ transform: 'translateZ(20px)' }}
          >
            NEUROLUME
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-light text-xl mb-12 max-w-xl mx-auto"
        >
          {t('stressWidget.activateDesc')}
        </motion.p>

        {/* Trust badges with 3D hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-10 text-gray"
        >
          {[
            { 
              icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor"><path d="M17 8C8 10 5 16 5 16C5 16 7 12 12 10C9 14 8 19 8 19C8 19 13 18 17 12C21 6 22 2 22 2C22 2 19 4 17 8Z" /></svg>, 
              label: t('details.formulationDesc')
            },
            { 
              icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>, 
              label: t('details.statusDesc')
            },
            { 
              icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, 
              label: t('hero.herbal')
            },
            { 
              icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, 
              label: t('hero.capsules')
            },
          ].map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="flex items-center gap-2 text-xs tracking-wider uppercase cursor-default"
            >
              <span className="flex items-center justify-center">{badge.icon}</span>
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
