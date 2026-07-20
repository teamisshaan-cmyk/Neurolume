import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function IngredientCard({ ingredient, isActive, isAdjacent }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      animate={{ 
        opacity: isActive ? 1 : (isAdjacent ? 0.3 : 0),
        scale: isActive ? 1 : 0.85,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="w-[280px] sm:w-[320px] h-[340px] cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => isActive && setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 overflow-hidden group border border-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-[24px]"
          style={{
            backfaceVisibility: 'hidden',
            background: 'rgba(253, 251, 247, 0.9)',
          }}
        >
          {ingredient.icon && (
            <img
              src={ingredient.icon}
              alt={ingredient.name}
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 z-0"
            />
          )}
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-[24px] p-8 flex flex-col justify-center border border-gold/20 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, #fdfbf7 0%, ${ingredient.color}15 50%, #fdfbf7 100%)`,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[70px] opacity-30 pointer-events-none"
            style={{ background: ingredient.color }}
          />
          <div className="relative z-10 text-center">
            <p className="text-gold/90 text-xs tracking-widest uppercase mb-4 italic font-semibold">
              {ingredient.latin}
            </p>
            <p className="text-green-800 text-sm leading-relaxed font-medium">
              {ingredient.description}
            </p>
            <div className="w-12 h-[2px] bg-gold/40 mx-auto mt-6" />
          </div>
        </div>
      </motion.div>

      {/* Ingredient Name Below Card */}
      <div className="absolute left-0 right-0 -bottom-16 text-center pointer-events-none">
        <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-all duration-500 ${isActive ? 'text-blue-900 drop-shadow-md opacity-100 translate-y-0' : 'text-blue-900/40 opacity-0 -translate-y-4'}`}>
          {ingredient.name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Ingredients() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const ingredients = [
    {
      name: t('ingredients.items.shankhpushpi.name'),
      latin: 'Convolvulus pluricaulis',
      dose: '112.5 mg',
      color: '#2d8a5e',
      icon: '/shankhpushpi_herb.png',
      description: t('ingredients.items.shankhpushpi.description'),
    },
    {
      name: t('ingredients.items.ashwagandha.name'),
      latin: 'Withania somnifera',
      dose: '50 mg',
      color: '#3ba876',
      icon: '/ashwagandha_herb.png',
      description: t('ingredients.items.ashwagandha.description'),
    },
    {
      name: t('ingredients.items.tagar.name'),
      latin: 'Valeriana wallichii',
      dose: '25 mg',
      color: '#27ae60',
      icon: '/tagar_herb.png',
      description: t('ingredients.items.tagar.description'),
    },
    {
      name: t('ingredients.items.jayphal.name'),
      latin: 'Myristica fragrans',
      dose: '12.50 mg',
      color: '#8B7355',
      icon: '/jayphal_herb.png',
      description: t('ingredients.items.jayphal.description'),
    },
    {
      name: t('ingredients.items.basant.name'),
      latin: 'Hypericum perforatum',
      dose: '12.50 mg',
      color: '#708090',
      icon: '/basant_herb.png',
      description: t('ingredients.items.basant.description'),
    },
  ];

  const excipients = t('ingredients.excipientsList', { returnObjects: true }) || [];
  
  const handleNext = () => setActiveIndex(prev => prev + 1);
  const handlePrev = () => setActiveIndex(prev => prev - 1);

  const activeItemIndex = ((activeIndex % 5) + 5) % 5;
  const angle = 360 / 5;

  return (
    <section id="ingredients" className="relative min-h-screen py-16 lg:py-24 flex flex-col justify-center overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald/10 rounded-full blur-[150px] -z-10 pointer-events-none"
      />

      <div className="max-w-[85rem] mx-auto px-4 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="mb-8 lg:mb-10 text-left">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-blue-900">
                {t('ingredients.title')}
              </h2>
              <p className="text-green-700 font-medium text-lg sm:text-xl">
                {t('ingredients.subtitle')}
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8 lg:p-10">
              <h3 className="text-lg sm:text-xl font-serif text-blue-900 font-bold mb-6 flex items-center gap-3">
                <div className="w-6 h-[2px] bg-gold" />
                {t('ingredients.compositionCardTitle')}
              </h3>
              
              <div className="space-y-4">
                {ingredients.map((ing) => (
                  <div key={ing.name} className="flex justify-between items-end border-b border-blue-900/10 pb-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-blue-900 text-sm sm:text-base">{ing.name}</span>
                      <span className="text-[11px] sm:text-xs text-green-700 italic">{ing.latin}</span>
                    </div>
                    <span className="font-bold text-gold text-sm sm:text-base shrink-0 ml-4">{ing.dose}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center min-h-[500px] w-full"
          >
            <div className="absolute inset-x-0 z-50 flex justify-between items-center px-0 sm:px-4 pointer-events-none">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-blue-900 hover:text-gold hover:scale-110 transition-all duration-300 pointer-events-auto shadow-md"
                aria-label="Previous Ingredient"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-blue-900 hover:text-gold hover:scale-110 transition-all duration-300 pointer-events-auto shadow-md"
                aria-label="Next Ingredient"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>

            {/* Carousel 3D Scene */}
            <div className="relative w-[280px] sm:w-[320px] h-[340px] perspective-1500">
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: -activeIndex * angle }}
                transition={{ type: 'spring', stiffness: 80, damping: 22, mass: 1.2 }}
              >
                {ingredients.map((ingredient, i) => {
                  const offset = (i - activeItemIndex + 5) % 5;
                  const isActive = offset === 0;
                  const isAdjacent = offset === 1 || offset === 4;
                  
                  return (
                    <div
                      key={ingredient.name}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ 
                        transform: `rotateY(${i * angle}deg) translateZ(300px)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <IngredientCard 
                        ingredient={ingredient} 
                        isActive={isActive}
                        isAdjacent={isAdjacent}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
