import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function InteractiveWidget() {
  const { t } = useTranslation();
  const ref = useRef(null);

  // 4 Daily Parameters (1 to 5 scale)
  const [sleep, setSleep] = useState(2);
  const [anxiety, setAnxiety] = useState(2);
  const [fog, setFog] = useState(1);
  const [tension, setTension] = useState(2);

  // Simulation Override State
  const [isSimulating, setIsSimulating] = useState(false);

  const getLevelLabel = (val) => {
    return t(`interactiveWidget.level${val}`);
  };

  // Average score from 1 to 5
  const avgScore = (sleep + anxiety + fog + tension) / 4;
  
  // Normalize to 0-100 for animations
  const stressPercent = ((avgScore - 1) / 4) * 100;

  // Base state logic based on sliders
  let color = '#10b981'; // Emerald 500
  let statusText = t('interactiveWidget.statusGreen');
  let glowColor = 'rgba(16,185,129,';
  let animDuration = 4;
  let textColorClass = 'text-emerald-500';
  let needNeurolume = false;

  if (avgScore >= 4) {
    color = '#ef4444'; // Red 500
    statusText = t('interactiveWidget.statusRed');
    glowColor = 'rgba(239,68,68,';
    animDuration = 0.6;
    textColorClass = 'text-red-500';
    needNeurolume = true;
  } else if (avgScore >= 3) {
    color = '#f97316'; // Orange 500
    statusText = t('interactiveWidget.statusOrange');
    glowColor = 'rgba(249,115,22,';
    animDuration = 1.2;
    textColorClass = 'text-orange-500';
    needNeurolume = true;
  } else if (avgScore > 1.5) {
    color = '#eab308'; // Yellow 500
    statusText = t('interactiveWidget.statusYellow');
    glowColor = 'rgba(234,179,8,';
    animDuration = 2.5;
    textColorClass = 'text-yellow-500';
    needNeurolume = true;
  }

  // Visual Override logic when Simulating
  let finalColor = color;
  let finalScaleY = 0.2 + (stressPercent/100) * 1.5;
  let finalVibration = (stressPercent / 100) * 4;
  let finalBgGlow = `${glowColor}0.05)`;
  
  if (isSimulating) {
    finalColor = '#3b82f6'; // Blue 500
    // finalScaleY and finalVibration remain dynamic based on the newly reduced parameters!
    finalBgGlow = 'rgba(59,130,246,0.08)'; // Blue glow
    statusText = t('interactiveWidget.statusActive');
    textColorClass = 'text-blue-500';
    animDuration = 4; // Reset to standard calm animation duration
  }

  const sliders = [
    { id: 'sleep', label: t('interactiveWidget.param1'), value: sleep, setter: setSleep },
    { id: 'anxiety', label: t('interactiveWidget.param2'), value: anxiety, setter: setAnxiety },
    { id: 'fog', label: t('interactiveWidget.param3'), value: fog, setter: setFog },
    { id: 'tension', label: t('interactiveWidget.param4'), value: tension, setter: setTension },
  ];

  const handleUseNeurolume = () => {
    if (isSimulating) {
      // Reset simulation allows normal slider operation without override
      setIsSimulating(false);
    } else if (needNeurolume) {
      // Apply Neurolume: Reduce everything by 2 points (min 1)
      setSleep(Math.max(1, sleep - 2));
      setAnxiety(Math.max(1, anxiety - 2));
      setFog(Math.max(1, fog - 2));
      setTension(Math.max(1, tension - 2));
      setIsSimulating(true);
    }
  };

  const handleSliderChange = (setter, val) => {
    if (isSimulating) setIsSimulating(false);
    setter(val);
  };

  return (
    <section id="interactive-widget" className="relative min-h-screen py-10 lg:py-14 flex flex-col justify-center overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 section-divider" />
      
      <motion.div
        animate={{ backgroundColor: finalBgGlow }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="max-w-[85rem] mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] bg-blue-800/50 w-8" />
            <span className="text-blue-800 text-xs tracking-[0.3em] uppercase">{t('interactiveWidget.sectionTag')}</span>
            <div className="h-[1px] bg-blue-800/50 w-8" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-blue-900"
          >
            {t('interactiveWidget.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-green-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {t('interactiveWidget.subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-10 items-center">
          
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full"
          >
            <div className="mb-6 text-center">
              <h3 className="text-lg sm:text-xl font-serif text-blue-900 font-semibold mb-1">
                Overall State
              </h3>
              <p className={`text-lg sm:text-xl tracking-widest uppercase font-bold transition-colors duration-1000 ${textColorClass}`}>
                {statusText}
              </p>
            </div>

            {/* 2x2 Grid Layout for Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-1 mb-6">
              {sliders.map((param) => (
                <div key={param.id} className="relative group flex flex-col justify-center">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-blue-900">{param.label}</span>
                    <span className={`transition-colors duration-300 ${textColorClass}`}>
                      {getLevelLabel(param.value)}
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={param.value}
                    title={getLevelLabel(param.value)}
                    onChange={(e) => handleSliderChange(param.setter, Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none bg-blue-900/10 outline-none focus:outline-none cursor-pointer transition-colors duration-1000"
                    style={{
                      accentColor: finalColor,
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-green-700/60 mt-1.5 font-medium tracking-wide uppercase">
                    <span>{t('interactiveWidget.level1')}</span>
                    <span>{t('interactiveWidget.level5')}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-2 flex flex-col items-center justify-center gap-2">
              <button
                onClick={handleUseNeurolume}
                disabled={!needNeurolume && !isSimulating}
                className={`relative overflow-hidden w-full sm:w-auto px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-500 ${
                  isSimulating
                    ? 'bg-red-500 hover:bg-red-600 !text-[#ffffff] shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    : needNeurolume 
                      ? 'bg-blue-600 hover:bg-blue-700 !text-[#ffffff] shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                      : 'bg-green-100 text-green-700 cursor-default opacity-80'
                }`}
              >
                <span className={`relative z-10 flex items-center justify-center gap-2 ${needNeurolume || isSimulating ? '!text-[#ffffff]' : ''}`}>
                  {isSimulating 
                    ? t('interactiveWidget.btnReset') 
                    : (needNeurolume ? t('interactiveWidget.btnUse') : t('interactiveWidget.btnNoNeed'))
                  }
                </span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT PANEL: SVG Brain */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[380px] sm:h-[420px] lg:h-[450px] flex items-center justify-center glass-card-3d p-8"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              
              {/* Minimalist Brain Outline */}
              <motion.g
                animate={{ scale: [1, 1 + (stressPercent/100)*0.03, 1] }}
                transition={{ duration: animDuration, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '50% 50%' }}
              >
                {[
                  "M 50 15 C 25 15 10 30 15 50 C 18 65 30 75 40 75 C 45 75 48 70 50 70",
                  "M 50 15 C 75 15 90 30 85 50 C 82 65 70 75 60 75 C 55 75 52 70 50 70",
                  "M 45 72 L 45 88 C 45 92 55 92 55 88 L 55 72"
                ].map((d, i) => (
                  <motion.path key={`brain-${i}`} d={d} fill="none" animate={{ stroke: finalColor }} transition={{ duration: 3 }} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                ))}

                {[
                  "M 25 65 C 15 75 25 85 35 80",
                  "M 75 65 C 85 75 75 85 65 80",
                  "M 35 25 C 40 35 45 30 50 40",
                  "M 65 25 C 60 35 55 30 50 40",
                  "M 22 45 C 30 45 35 55 45 50",
                  "M 78 45 C 70 45 65 55 55 50"
                ].map((d, i) => (
                  <motion.path key={`fold-${i}`} d={d} fill="none" animate={{ stroke: finalColor }} transition={{ duration: 3 }} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
                ))}
              </motion.g>

              {/* Dynamic ECG Heart Pulse */}
              <motion.g
                animate={{ scaleY: finalScaleY }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                style={{ transformOrigin: '50% 50%' }}
              >
                <motion.path 
                  d="M 0 50 L 15 50 L 20 35 L 25 50 L 30 70 L 40 5 L 48 95 L 55 50 L 65 35 L 75 50 L 100 50"
                  fill="none" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 12px ${finalColor})` }}
                  animate={{ 
                    x: [-finalVibration, finalVibration, -finalVibration],
                    opacity: [0.7, 1, 0.7],
                    stroke: finalColor
                  }}
                  transition={{ 
                    x: { duration: animDuration * (stressPercent > 50 ? 0.3 : 0.8), repeat: Infinity, ease: "linear" },
                    opacity: { duration: animDuration * (stressPercent > 50 ? 0.3 : 0.8), repeat: Infinity, ease: "linear" },
                    stroke: { duration: 3 }
                  }}
                />
                
                {/* Secondary echo pulse for a glowing high-tech feel */}
                <motion.path 
                  d="M 0 50 L 15 50 L 20 35 L 25 50 L 30 70 L 40 5 L 48 95 L 55 50 L 65 35 L 75 50 L 100 50"
                  fill="none" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  animate={{ 
                    x: [-finalVibration, finalVibration, -finalVibration],
                    opacity: [0.1, 0.3, 0.1],
                    stroke: finalColor
                  }}
                  transition={{ 
                    x: { duration: animDuration * (stressPercent > 50 ? 0.3 : 0.8), repeat: Infinity, ease: "linear" },
                    opacity: { duration: animDuration * (stressPercent > 50 ? 0.3 : 0.8), repeat: Infinity, ease: "linear" },
                    stroke: { duration: 3 }
                  }}
                  style={{ filter: 'blur(4px)' }}
                />
              </motion.g>
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
