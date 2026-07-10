import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const BlogArticle: React.FC = () => {
  return (
    <div className="flex flex-col bg-black min-h-screen relative overflow-hidden selection:bg-sky-500/30 selection:text-white">
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="pt-32 pb-24 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium mb-12 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.article 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Subtle inner grid bg */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]"></div>
          </div>

          <div className="relative z-10 space-y-12">
            {/* Header section */}
            <header className="space-y-6 pb-12 border-b border-white/10">
              <motion.div variants={fadeInUp} className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
                  Biotechnology
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                  Quantum Tech
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-white">
                What Happens When You Put Quantum Computing Inside Drug Discovery? I Asked the Woman Building It.
              </motion.h1>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 text-sm text-white/60 font-light mt-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-400" />
                  <span className="font-medium text-white/80">Neha Ahsan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>July 11, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sky-400/80">
                  <Share2 className="w-4 h-4" />
                  <span>Global DeepTech Podcast — Build the Future</span>
                </div>
              </motion.div>
            </header>

            {/* Article Content */}
            <div className="max-w-none text-blue-100/70 font-light leading-relaxed text-[17px] space-y-6">
              
              <motion.p variants={fadeInUp}>
                I'll be honest with you. When I first reached out to Dr. Shahar Keinan, co-founder and CEO of POLARISqb, I wasn't sure she'd reply. She's a computational chemist who has spent decades at the intersection of quantum physics, chemistry, and medicine. I'm a biotechnology student in Pakistan running a student organisation.
              </motion.p>
              
              <motion.p variants={fadeInUp}>
                She replied.
              </motion.p>

              <motion.p variants={fadeInUp}>
                And what followed was one of the most eye-opening conversations I've had not just about quantum computing and drug discovery, but about what it actually takes to build something at the frontier of science. Something that could change how diseases get treated. Something that could, one day, matter to countries like mine.
              </motion.p>

              <motion.p variants={fadeInUp}>
                Here's everything I learned.
              </motion.p>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">First, What Is POLARISqb Actually Doing?</motion.h2>

              <motion.p variants={fadeInUp}>
                Before we get into the founder story, you need to understand what the science is, because it's genuinely mind-bending.
              </motion.p>

              <motion.p variants={fadeInUp}>
                Traditional drug discovery is brutally slow. You design a compound, optimise it, test it, miss a target property, go back to the drawing board, and start all over again. It's a cycle that takes, on average, 10 to 15 years and billions of dollars and still fails most of the time.
              </motion.p>

              <motion.p variants={fadeInUp}>
                POLARISqb is trying to break that cycle entirely.
              </motion.p>

              <motion.p variants={fadeInUp}>
                I asked Dr. Shahar to explain what they do in one analogy. Her answer said everything:
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "We are like architects designing a building — which will become a drug."
              </motion.blockquote>

              <motion.p variants={fadeInUp}>
                But the real magic is in how they design. Rather than screening a limited set of compounds and hoping one fits, POLARISqb uses quantum computing to search billions of molecular possibilities simultaneously, finding the right compound the first time, instead of going in circles.
              </motion.p>

              <motion.p variants={fadeInUp}>
                And they're not comparing themselves to how drug design was done 30 years ago. They're competing against the best AI and computational methods available today. When I pushed her on the numbers because it's not enough to just say you're better, she didn't flinch:
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "We can show, in energy terms, how much better our designs are versus other methods. We can show how much easier these things are to synthesize, how much better they fit a certain pocket. While other methods are around 10% successful, we are around 30% successful."
              </motion.blockquote>

              <motion.p variants={fadeInUp} className="font-medium text-white">
                Three times the success rate. With proof.
              </motion.p>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">How They Choose Which Diseases to Target</motion.h2>

              <motion.p variants={fadeInUp}>
                This is where things got really interesting for me and probably the part that matters most if you're reading this from a country where diseases like dengue, TB, or diabetes are not abstractions but daily realities.
              </motion.p>

              <motion.p variants={fadeInUp}>
                I assumed POLARISqb chased the most dramatic diseases. I was wrong.
              </motion.p>

              <motion.p variants={fadeInUp}>
                Dr. Shahar explained that their tool is disease-agnostic, what they care about is whether the biology is understood well enough to act on, and whether there's a path forward that nobody has managed to take yet.
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "If that disease has many drugs in the market, for us it wouldn't make sense to find another drug. We're looking for cases where something is known about the biology, but there's no good drug."
              </motion.blockquote>

              <motion.p variants={fadeInUp}>
                The example she gave was Parkinson's - a disease where the biology is well understood, but where existing drugs don't cross the blood-brain barrier effectively. POLARISqb can design compounds specifically engineered to go into the brain.
              </motion.p>

              <motion.p variants={fadeInUp}>
                It's a surgical approach: find the gap, design for it, prove it works.
              </motion.p>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">The Pakistan Question and Why It Matters</motion.h2>

              <motion.p variants={fadeInUp}>
                I couldn't let this conversation pass without asking the question that was sitting at the back of my mind the entire time.
              </motion.p>

              <motion.p variants={fadeInUp}>
                Pakistan ranks <strong className="text-white">third</strong> in the world for <strong className="text-white">diabetes</strong> prevalence. <strong className="text-white">Dengue</strong> is becoming an annual crisis. <strong className="text-white">Breast cancer</strong> cases are rising. <strong className="text-white">Polio</strong> is still not fully eradicated. These aren't statistics I read in a paper - they're diseases affecting people I know.
              </motion.p>

              <motion.p variants={fadeInUp}>
                So I asked: <strong className="text-white">how can quantum-aided drug discovery play a role here?</strong>
              </motion.p>

              <motion.p variants={fadeInUp}>
                Dr. Shahar's answer was honest, and I appreciated that. She didn't over-promise.
              </motion.p>

              <motion.p variants={fadeInUp}>
                She explained that POLARISqb is only the beginning of the drug development pipeline, they design the compound, but someone else has to synthesise it, test it, and take it through clinical trials. For diseases like dengue, which require massive clinical trials and affect populations without strong commercial drug markets, the path forward looks different.
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "Working with somebody like the World Health Organisation or the Gates Foundation makes more sense for us. Finding other groups - NGOs, governments - that can fund the next steps."
              </motion.blockquote>

              <motion.p variants={fadeInUp}>
                That hit me. Because it reframed the question. It's not just about what technology can do. It's about who funds it, who partners on it, and who decides which diseases deserve attention.
              </motion.p>

              <motion.p variants={fadeInUp}>
                The commercial reality is that diseases affecting lower-income populations get less investment not because the science isn't there, but because the market isn't there. Quantum computing doesn't fix that problem alone. But it can dramatically lower the cost and time of discovery, making it more viable for global health organisations to step in and carry it forward.
              </motion.p>

              <motion.p variants={fadeInUp}>
                That's the opportunity. And it's one that students in countries like Pakistan should be paying attention to - because we may be exactly the people who need to push for it.
              </motion.p>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">From Scientist to CEO: The Hardest Part Nobody Tells You</motion.h2>

              <motion.p variants={fadeInUp}>
                Here's the part of the conversation that I personally found most valuable, because it's the part most relevant to anyone who wants to build something one day.
              </motion.p>

              <motion.p variants={fadeInUp}>
                Dr. Shahar came from a pure science background. Chemistry, computation, research. And then she started a company.
              </motion.p>

              <motion.p variants={fadeInUp}>
                I asked her what the hardest part of the first year was.
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "Things like business, thinking about how to find customers, how to raise money, all of those things were very challenging for me. I was very lucky to have good mentors. Most of them were not from biotech, but were really good on the business side of things."
              </motion.blockquote>

              <motion.p variants={fadeInUp}>
                She also said something that I think gets underestimated in every "how to start a company" article:
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "Building a company, building relationships - how do you set up your company culture? How do you make sure people are nice to one another? How do you tackle challenges together? All of those things were also difficult."
              </motion.blockquote>

              <motion.p variants={fadeInUp} className="font-medium text-white">
                Culture. People. Not just the product, not just the science. The human side of building.
              </motion.p>

              <motion.p variants={fadeInUp}>
                And then, before I could feel too overwhelmed by all of this, she added something I wasn't expecting:
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "It's also a lot of fun. You learn something new every day. You shape yourself, you shape your company, you shape the future. It is very rewarding."
              </motion.blockquote>

              <motion.p variants={fadeInUp} className="font-medium text-white">
                That one sentence changed the texture of the whole conversation for me.
              </motion.p>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">The One Question Every Aspiring Founder Needs to Answer</motion.h2>

              <motion.p variants={fadeInUp}>
                I asked Dr. Shahar what she would tell a student sitting at the crossroads of quantum computing and biology who wanted to build in this space. Her answer was direct and I think it applies far beyond biotech:
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90">
                "They first need to make sure that what they have is commercially reasonable. That they think they can have customers. That the customers will be willing to pay for it."
              </motion.blockquote>

              <motion.p variants={fadeInUp}>
                And then, the line that really stuck:
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="border-l-4 border-sky-500/50 bg-sky-500/5 px-6 py-4 rounded-r-2xl text-white/90 font-medium text-white">
                "You really need to understand the difference between a company and a project."
              </motion.blockquote>

              <motion.p variants={fadeInUp}>
                Because there are a lot of fascinating scientific problems that do not translate into a commercial entity. Passion is necessary. But it is not sufficient. The question you have to ask first, before the pitch deck, before the co-founder search, before anything - is simply:
              </motion.p>

              <motion.p variants={fadeInUp} className="font-bold text-white text-lg">
                Would anybody pay for this?
              </motion.p>

              <motion.p variants={fadeInUp}>
                If yes, go. Find collaborators. Start thinking about the company. But if you can't answer that question clearly, you don't yet have a business. You have an interesting idea, and that's a different thing.
              </motion.p>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">What I'm Taking Away</motion.h2>

              <motion.p variants={fadeInUp}>
                I walked into this conversation as a student with a podcast and a lot of curiosity. I walked out with a clearer picture of what it actually means to build at the frontier of science.
              </motion.p>

              <motion.p variants={fadeInUp}>
                A few things I'll carry with me:
              </motion.p>

              <motion.ul variants={fadeInUp} className="space-y-4">
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                   <div><strong className="text-white">1. The best founders adapt their explanation to their audience.</strong> Dr. Shahar can talk to a physicist, a biologist, a student, or an investor and say something different each time that still lands. That's not just communication skill. It's clarity of thinking.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                   <div><strong className="text-white">2. Proof matters more than claims.</strong> Don't say you're better. Show the numbers. Every time.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                   <div><strong className="text-white">3. The gap between science and business is real and mentors are how you cross it.</strong> Not biotech mentors specifically. Just good people who've built things before and are willing to guide you through the parts you don't know yet.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                   <div><strong className="text-white">4. Commercial reality and social impact are not opposites.</strong> They require different partners and different funding structures. But they can coexist, if you build for both.</div>
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0"></div>
                   <div><strong className="text-white">5. The first question is not "what can I build?"</strong> It's "would anyone pay for it?"</div>
                </li>
              </motion.ul>

              <motion.h2 variants={fadeInUp} className="font-display font-bold text-white text-2xl mt-12 mb-6">A Final Note</motion.h2>

              <motion.p variants={fadeInUp}>
                What you've read here is my honest account of my conversation with Dr. Shahar Keinan, the insights that stayed with me, and the questions it opened up for me as a student in Pakistan trying to understand where I fit in all of this.
              </motion.p>

              <motion.p variants={fadeInUp}>
                If you're a student thinking about building in deeptech, biotech, or anywhere at the edge of science, I hope this gives you something real to hold onto.
              </motion.p>

              <motion.p variants={fadeInUp}>
                And if you're a founder with a story worth sharing, the door at Global DeepTech is open.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-6 items-center md:items-start text-sm">
                <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-white/20">
                   {/* Using existing placeholder or team image since Neha Ahsan is in TEAM_MEMBERS */}
                   <img src="/team/neha_img.jpeg" alt="Neha Ahsan" className="w-full h-full object-cover filter grayscale-[0.2]" />
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-white font-bold text-lg m-0">Neha Ahsan</h3>
                  <p className="text-blue-100/70 m-0 leading-relaxed">
                    Neha Ahsan is a biotechnology student and founder of <strong className="text-white">Global DeepTech</strong> (globaldeeptech.org), a student-led organisation connecting the next generation of builders with the founders, investors, and professionals shaping deeptech. <em className="text-white">Build the Future</em> is its flagship podcast.
                  </p>
                  <div className="pt-2">
                    <a href="https://globaldeeptech.org" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-medium hover:text-sky-300">
                      Connect or reach out: globaldeeptech.org
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogArticle;
