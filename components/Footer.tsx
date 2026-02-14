
import React from 'react';
import { Rocket, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-primary/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Rocket className="text-primary w-8 h-8" />
              <span className="font-display font-bold text-2xl tracking-tight">
                DEEP<span className="text-primary">TECH</span> 2026
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Engineering the future by accelerating the DeepTech movement in Pakistan. Bridging science and market.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <span>info@deeptechsummit.pk</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>Main Campus, FCCU, Lahore</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#/about" className="hover:text-primary transition-colors">About Mission</a></li>
              <li><a href="#/summit-2026" className="hover:text-primary transition-colors">Three Pillars</a></li>
              <li><a href="#/why-attend" className="hover:text-primary transition-colors">Why Attend</a></li>
              <li><a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay updated with the latest DeepTech breakthroughs.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-dark border border-white/10 rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-light transition-colors font-semibold">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DeepTech Summit 2026. Engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
