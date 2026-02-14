
import React from 'react';
import { CheckCircle, TrendingUp, Network, Award } from 'lucide-react';

const WhyAttend: React.FC = () => {
  const benefits = [
    {
      title: "For Researchers",
      icon: <Award className="w-10 h-10 text-primary" />,
      points: [
        "Learn how to commercialize your patents",
        "Connect with venture capitalists looking for science",
        "Bridge the gap from lab results to market product",
        "Access year-round mentorship from the Power-Hub"
      ]
    },
    {
      title: "For Investors",
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      points: [
        "First-look at high-potential deeptech breakthroughs",
        "Network with the scientific frontier of Pakistan",
        "Understand the science behind multi-million dollar bets",
        "Exclusive access to the Venture Pitch finalists"
      ]
    },
    {
      title: "For Students",
      icon: <Network className="w-10 h-10 text-primary" />,
      points: [
        "Find your path to becoming a DeepTech CEO",
        "Network with industry titans and global players",
        "Experience the cutting-edge of AI, Biotech, and Nanotech",
        "Access internships and project collaborations"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-display font-bold mb-6">Why Attend <span className="text-primary">Summit 2026?</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            This is the ultimate platform designed specifically for the Pakistani youth to rise, take charge, and lead through deep science.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="glass-effect p-10 rounded-3xl border-primary/10 hover:border-primary/40 transition-all flex flex-col">
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="text-2xl font-display font-bold mb-8">{benefit.title}</h3>
              <ul className="space-y-4 flex-grow">
                {benefit.points.map((point, j) => (
                  <li key={j} className="flex items-start space-x-3 text-gray-400">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center space-y-8">
          <h2 className="text-4xl font-display font-bold">The connections you make here will open doors <span className="text-primary">globally.</span></h2>
          <p className="text-xl text-gray-400">Through this community, you will remain part of a highly valuable network long after the event.</p>
          <div className="flex justify-center pt-8">
            <button className="bg-primary text-white text-xl px-12 py-5 rounded-full font-bold hover:bg-primary-light transition-all shadow-2xl shadow-primary/40">
              Secure Your Seat Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyAttend;
