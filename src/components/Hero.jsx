import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 relative z-10 w-full pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block px-4 py-2 rounded-full border border-[var(--global-text)] backdrop-blur-md mb-6 md:mb-8"
          >
            <p className="font-medium text-xs md:text-sm tracking-widest uppercase">
              Freelance Software Developer
            </p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 3.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading leading-[1.1] tracking-tight mb-6 md:mb-8 font-bold"
            style={{ textShadow: '0 2px 20px var(--global-bg), 0 2px 40px var(--global-bg), 0 0 20px var(--hero-glow), 0 0 40px var(--hero-glow)' }}
          >
            Kaileshwaran P.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl leading-relaxed font-light"
            style={{ textShadow: '0 0 10px var(--hero-glow), 0 0 20px var(--hero-glow)' }}
          >
            Engineering elegant, highly-scalable software architecture. A passionate freelance developer dedicated to crafting the future of human-computer interaction through modern technologies and innovative problem-solving.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 3.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 md:gap-6 items-center pointer-events-auto"
          >
            <a href="#contact" className="px-6 py-3 md:px-8 md:py-4 rounded-full hover:scale-105 font-bold flex items-center gap-3 transition-transform text-base md:text-lg shadow-2xl" style={{ backgroundColor: 'var(--global-text)', color: 'var(--card-bg)' }}>
              Collaborate <ArrowRight size={20} />
            </a>
            <div className="flex gap-3 md:gap-4 ml-0 md:ml-2">
              <a href="https://github.com/kaiserkaileshwaran" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full border border-[var(--global-text)] hover:bg-[var(--global-text)]/10 transition-colors backdrop-blur-md">
                <GithubIcon />
              </a>
              <a href="https://www.linkedin.com/in/Kaileshwaran13/" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full border border-[var(--global-text)] hover:bg-[var(--global-text)]/10 transition-colors backdrop-blur-md">
                <LinkedinIcon />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
