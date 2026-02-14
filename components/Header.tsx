import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import Button from './Button';

// Optional: Define the shape of your link objects if not already defined
interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Body Scroll Lock when Mobile Menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Helper to render links (avoids code duplication)
  const renderNavLink = (link: NavLink, isMobile: boolean = false) => {
    const baseClasses = isMobile
      ? "text-2xl font-display font-semibold py-4 border-b border-white/10 block w-full"
      : "px-3 py-2 text-sm font-medium transition-colors";

    const activeClasses = location.pathname === link.href
      ? "text-primary"
      : "text-gray-300 hover:text-white";

    const mobileHover = isMobile ? "hover:text-primary transition-colors text-white" : "";

    const combinedClasses = `${baseClasses} ${!isMobile ? activeClasses : mobileHover}`;

    if (link.external) {
      return (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          onClick={() => setIsOpen(false)}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.href}
        className={combinedClasses}
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-3 shadow-lg bg-black/80 backdrop-blur-md' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* LOGO SECTION */}
          <Link
            to="/"
            className="flex items-center gap-2 group z-50 relative"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/deeptech_logo.PNG"
              alt="DeepTech Logo"
              className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center space-x-4">
            {NAV_LINKS.map((link) => renderNavLink(link, false))}
            <Link to="/login">
              <Button size="sm" className="ml-4 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-2 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]">
                Sign In
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-6 overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => renderNavLink(link, true))}
            <Link to="/login" onClick={() => setIsOpen(false)} className="mt-4">
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;