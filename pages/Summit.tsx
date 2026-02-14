
import React from 'react';
import { SUMMIT_PILLARS } from '../constants';
import { TechCore, NodeNetwork, DNAAnimation } from '../components/AnimatedTech';

const Summit: React.FC = () => {
  const getVectorGraphic = (id: number) => {
    switch (id) {
      case 1: return <DNAAnimation className="w-full h-full p-20" />;
      case 2: return <TechCore className="w-full h-full p-10" />;
      case 3: return <NodeNetwork className="w-full h-full p-10" />;
      default: return <TechCore />;
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-display font-bold mb-6">DeepTech Summit <span className="text-primary text-glow">2026</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A permanent ecosystem for Pakistan's scientific breakthroughs. Not just a seminar, but a catalyst for ten-figure businesses.
          </p>
        </div>

        <div className="space-y-32">
          {SUMMIT_PILLARS.map((pillar, index) => (
            <div key={pillar.id} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 space-y-6">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8">
                  {pillar.icon}
                </div>
                <h2 className="text-4xl font-display font-bold">{pillar.title}</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{pillar.description}</p>
                <p className="text-gray-400 leading-relaxed">{pillar.details}</p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                   <div className="p-4 bg-surface border border-white/10 rounded-lg">
                      <p className="text-primary font-bold text-lg">Key Focus</p>
                      <p className="text-gray-500 text-sm">Industry Transformation</p>
                   </div>
                   <div className="p-4 bg-surface border border-white/10 rounded-lg">
                      <p className="text-primary font-bold text-lg">Impact</p>
                      <p className="text-gray-500 text-sm">Global Scalability</p>
                   </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-video bg-primary/5 rounded-3xl border border-primary/20 overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 opacity-10">
                     <TechCore />
                   </div>
                   {getVectorGraphic(pillar.id)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 glass-effect rounded-3xl border-primary/20 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-5 pointer-events-none scale-150">
             <NodeNetwork />
           </div>
           <div className="relative z-10">
             <h2 className="text-3xl font-display font-bold mb-6">Ready to lead the DeepTech revolution?</h2>
             <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join hundreds of researchers, CEOs, and investors in the most anticipated tech event of 2026.</p>
             <button className="bg-primary hover:bg-primary-light text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-primary/20">
                Contact for Sponsorship
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Summit;
