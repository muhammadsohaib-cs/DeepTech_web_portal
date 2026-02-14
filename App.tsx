
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Summit from './pages/Summit';
import Contact from './pages/Contact';
import WhyAttend from './pages/WhyAttend';
import Button from './components/Button';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import Verification from './pages/Verification';
import Profile from './pages/Profile';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary selection:text-white">
    <Header />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/summit-2026" element={<Summit />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/why-attend" element={<WhyAttend />} />
      </Routes>
    </main>
    <div className="py-20 bg-primary/5 text-center border-t border-primary/10">
      <h3 className="text-2xl font-display font-bold mb-6">Stay Connected with the DeepTech Hub</h3>
      <a href="https://chat.whatsapp.com/dummy-link" target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="bg-green-600 hover:bg-green-700 border-none shadow-[0_0_20px_rgba(22,163,74,0.3)]">
          Join WhatsApp Community
        </Button>
      </a>
    </div>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes (Standalone) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/profile" element={<Profile />} />

          {/* Main Site Routes */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
