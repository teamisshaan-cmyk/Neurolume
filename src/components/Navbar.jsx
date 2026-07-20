import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredTab, setHoveredTab] = useState(null);

  const navLinks = [
    { name: t('nav.overview'), href: '#about' },
    { name: t('nav.stressDashboard'), href: '#interactive-widget' },
    { name: t('nav.ingredients'), href: '#ingredients' },
    { name: t('nav.drugProfile'), href: '#benefits' },
    { name: t('nav.faqs'), href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-midnight/85 backdrop-blur-2xl border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <motion.a
            href="#"
            className="flex items-center group shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl sm:text-3xl font-serif font-bold italic tracking-wider text-blue-800 drop-shadow-sm group-hover:text-blue-700 transition-colors duration-300">
              Neurolume
            </span>
          </motion.a>

          {/* Right: Tabs + Lang Switcher + Hamburger */}
          <div className="flex items-center shrink-0">
            {/* Horizontal Tabs */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center overflow-x-auto overflow-y-hidden whitespace-nowrap gap-2 sm:gap-4 mr-4 sm:mr-6 no-scrollbar"
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      onMouseEnter={() => setHoveredTab(link.name)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`relative px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                        hoveredTab === link.name
                          ? 'text-blue-700 font-semibold'
                          : 'text-gray hover:text-blue-700'
                      }`}
                    >
                      {link.name}
                      {hoveredTab === link.name && (
                        <motion.div
                          layoutId="hoverNav"
                          className="absolute bottom-0 left-2 right-2 h-[2px] bg-blue-700 rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          style={{
                            boxShadow: '0 0 8px rgba(29,78,216,0.4)',
                          }}
                        />
                      )}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Section (Lang Switcher) */}
            <div className="hidden sm:flex items-center mr-4 sm:mr-6">
              <div className="flex items-center bg-midnight/30 border border-blue-800/15 rounded-full p-1 backdrop-blur-xl">
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${
                    i18n.language === 'en' || !i18n.language?.startsWith('ru')
                      ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-midnight shadow-[0_0_15px_rgba(29,78,216,0.3)]'
                      : 'text-gray hover:text-gray-light'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage('ru')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 ${
                    i18n.language?.startsWith('ru')
                      ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-midnight shadow-[0_0_15px_rgba(29,78,216,0.3)]'
                      : 'text-gray hover:text-gray-light'
                  }`}
                >
                  RU
                </button>
              </div>
            </div>

            {/* Hamburger Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-gray-light block transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-[2px] bg-gray-light block transition-all"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-gray-light block transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
