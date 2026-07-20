import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Mouse-tracking 3D tilt for product card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Floating orb particles with depth layers
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    depth: Math.random(), // 0 = far, 1 = near
    blur: Math.random() > 0.7,
  }));

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Animated Background with depth */}
      <motion.div style={{ scale }} className="absolute inset-0 hero-gradient">
        {/* Depth-layered floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.blur
                ? `radial-gradient(circle, rgba(249,115,22,0.4), rgba(249,115,22,0.1))`
                : `rgba(249,115,22,${0.1 + p.depth * 0.2})`,
              filter: p.blur ? `blur(${2 + p.depth * 3}px)` : 'none',
              zIndex: Math.floor(p.depth * 3),
            }}
            animate={{
              y: [0, -40 * p.depth, -20, -60 * p.depth, 0],
              x: [0, 15 * p.depth, -10, 20 * p.depth, 0],
              opacity: [0.1, 0.4 * p.depth + 0.1, 0.2, 0.5 * p.depth + 0.1, 0.1],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Radial glow effects - multi-layer depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald/5 rounded-full blur-[100px]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-midnight)_100%)]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-16 lg:pt-0"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text */}
          <div className="max-w-2xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.5,
                    }
                  }
                }}
                className="font-serif text-[28px] sm:text-4xl lg:text-5xl xl:text-[56px] font-bold leading-[1.1] mb-6 flex flex-wrap text-blue-900"
              >
                {t('hero.title').split(' ').map((word, i) => (
                  <span key={i} className="inline-flex mr-[0.3em]">
                    {word.split('').map((char, j) => (
                      <motion.span
                        key={j}
                        variants={{
                          hidden: { opacity: 0, y: 50, rotateZ: 5, rotateX: -90 },
                          visible: { 
                            opacity: 1, 
                            y: 0, 
                            rotateZ: 0,
                            rotateX: 0,
                            transition: { type: "spring", damping: 12, stiffness: 150 }
                          }
                        }}
                        className="italic inline-block p-2 -m-2 text-blue-900 drop-shadow-md"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-green-700 text-[13px] sm:text-[15px] leading-relaxed mb-8 max-w-lg font-medium"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#ingredients"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(249,115,22,0.3), 0 20px 40px rgba(249,115,22,0.15)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-white font-semibold text-sm tracking-widest uppercase rounded-full transition-all duration-300"
              >
                {t('hero.ctaStress')}
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05, borderColor: 'rgba(249,115,22,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-gold/30 text-gold-light font-medium text-sm tracking-widest uppercase rounded-full hover:bg-gold/5 transition-all duration-300 backdrop-blur-sm"
              >
                {t('hero.ctaScience')}
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - 3D Mouse-Tracking Product Box */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            className="flex justify-center items-center relative mt-8 lg:mt-0 w-full"
            style={{ perspective: '1500px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Multi-layer background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[500px] h-[400px] bg-gold/8 rounded-full blur-[120px]"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.08, 0.04] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="w-[350px] h-[350px] bg-emerald/5 rounded-full blur-[100px]"
              />
            </div>

            {/* 3D Tilted Product Box with mouse tracking */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative cursor-pointer"
            >
              {/* 3D depth shadow beneath */}
              <motion.div
                style={{ rotateX: 0, rotateY: 0, transform: 'translateZ(-40px)' }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[75%] h-12 bg-gold/8 blur-3xl rounded-full"
              />

              {/* Floating orbiting particles around the card */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gold/30"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 + i * 4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 2,
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-gold/40 blur-[1px]"
                    style={{
                      position: 'absolute',
                      top: `${-60 - i * 25}px`,
                      left: 0,
                    }}
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              ))}

              {/* Product Box Image */}
              <motion.img
                src="/neurolume_hero_section_image.png"
                alt="Neurolume - Stress Relief"
                className="w-full max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] rounded-lg relative z-10 object-contain mx-auto"
                style={{
                  transform: 'translateZ(40px)',
                  filter: 'drop-shadow(0 25px 60px rgba(249,115,22,0.2)) drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Premium shine sweep overlay */}
              <motion.div
                animate={{
                  opacity: [0, 0.2, 0],
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 rounded-lg overflow-hidden pointer-events-none"
                style={{ mixBlendMode: 'overlay', transform: 'translateZ(60px)' }}
              />


            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray text-xs tracking-[0.2em] uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-gold/30 rounded-full flex justify-center pt-1.5 backdrop-blur-sm"
        >
          <motion.div
            animate={{ height: [6, 10, 6], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-gold rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
