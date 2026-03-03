import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* Brand & Logo Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center">
              <img src="/deeptech_logo.PNG" alt="DeepTech Global" className="h-10 md:h-12 w-auto object-contain" />
            </div>
            <p className="text-blue-100/60 font-light text-sm md:text-base leading-relaxed max-w-sm">
              A sovereign mission dedicated to strengthening the world's deep technology ecosystem by connecting academic excellence, industrial prowess, and venture capital.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400 transition-all text-white/50">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400 transition-all text-white/50">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400 transition-all text-white/50">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-3 lg:col-span-3 space-y-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white">Sitemap</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-blue-100/60 hover:text-sky-400 text-sm font-light transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-blue-100/60 hover:text-sky-400 text-sm font-light transition-colors">About Us</Link></li>
              <li><Link to="/research" className="text-blue-100/60 hover:text-sky-400 text-sm font-light transition-colors">Research / Papers</Link></li>
              <li><Link to="/contact" className="text-blue-100/60 hover:text-sky-400 text-sm font-light transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 lg:col-span-4 space-y-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-sky-500" />
                </div>
                <span className="text-blue-100/60 text-sm font-light group-hover:text-white transition-colors mt-1.5 pt-0.5">info@globaldeeptech.org</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-sky-500" />
                </div>
                <span className="text-blue-100/60 text-sm font-light group-hover:text-white transition-colors mt-1.5 pt-0.5">+92 317 2903943</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-sky-500/30 group-hover:bg-sky-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-sky-500" />
                </div>
                <span className="text-blue-100/60 text-sm font-light leading-relaxed group-hover:text-white transition-colors mt-0.5">Salim Habib University,<br />NCBA&E, Karachi</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-100/40 text-[11px] font-mono tracking-wider font-light uppercase">
            &copy; {new Date().getFullYear()} DeepTech Global Organization. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <button className="text-blue-100/40 text-[11px] font-mono tracking-wider font-light hover:text-white transition-colors uppercase">Privacy Policy</button>
            <span className="text-white/10 text-xs">|</span>
            <button className="text-blue-100/40 text-[11px] font-mono tracking-wider font-light hover:text-white transition-colors uppercase">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
