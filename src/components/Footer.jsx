import React from 'react';
import { Heart } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-textMain/5 relative z-10">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center">
        <h3 className="text-2xl font-heading font-bold text-gradient mb-2">Kaileshwaran P</h3>
        <p className="text-muted-force mb-8">Problem Solver & Algorithmic Thinker</p>
        
        <div className="flex gap-4 mb-8">
          <a href="https://github.com/kaiserkaileshwaran" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-surface hover:bg-textMain/10 text-muted-force hover: transition-all hover:-translate-y-1">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/Kaileshwaran13/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-surface hover:bg-textMain/10 text-muted-force hover: transition-all hover:-translate-y-1">
            <LinkedinIcon />
          </a>
        </div>
        
        <div className="text-sm text-muted-force flex items-center justify-center gap-1">
          &copy; {new Date().getFullYear()} Kailesh's Portfolio. Crafted with <Heart size={14} className="text-red-500 mx-1" /> by Kailesh.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
