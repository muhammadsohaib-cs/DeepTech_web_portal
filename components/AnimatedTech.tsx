
import React from 'react';

export const TechCore: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0E4FAF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3A74D1', stopOpacity: 0.1 }} />
        </linearGradient>
      </defs>
      <path d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z" fill="none" stroke="#0E4FAF" strokeWidth="0.2" opacity="0.2">
        <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="10s" repeatCount="indefinite" />
      </path>
      <circle cx="100" cy="100" r="85" fill="none" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="75" fill="none" stroke="#0E4FAF" strokeWidth="1" strokeDasharray="20 10" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="40s" repeatCount="indefinite" />
      </circle>
      <g filter="url(#glow)">
        <ellipse cx="100" cy="100" rx="98" ry="38" fill="none" stroke="#0E4FAF" strokeWidth="1.5" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="100" cy="100" rx="98" ry="38" fill="none" stroke="#0E4FAF" strokeWidth="1.5" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" from="120 100 100" to="480 100 100" dur="20s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="100" cy="100" rx="98" ry="38" fill="none" stroke="#0E4FAF" strokeWidth="1.5" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" from="240 100 100" to="600 100 100" dur="20s" repeatCount="indefinite" />
        </ellipse>
      </g>
      <circle cx="100" cy="100" r="14" fill="#0E4FAF" filter="url(#glow)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="22" fill="none" stroke="#0E4FAF" strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="20;30;20" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export const DeepVisionGraphic: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <filter id="visionGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <mask id="eyeMask">
          <circle cx="100" cy="100" r="60" fill="white" />
        </mask>
      </defs>

      {/* Outer Rotating HUD Elements */}
      <g stroke="#0E4FAF" fill="none" strokeWidth="0.5">
        <circle cx="100" cy="100" r="95" strokeDasharray="1, 10" opacity="0.2">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="120s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="88" strokeDasharray="40, 20" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="80s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Iris / Core Visual */}
      <g mask="url(#eyeMask)" filter="url(#visionGlow)">
        <circle cx="100" cy="100" r="50" fill="#0E4FAF" opacity="0.1" />
        {/* Animated Nerve/Circuit Lines inside */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100" y1="100"
            x2={100 + 60 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={100 + 60 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="#0E4FAF"
            strokeWidth="0.5"
            opacity="0.2"
          >
            <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Central Pupil / Atom Core */}
        <circle cx="100" cy="100" r="10" fill="#0E4FAF">
           <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="20" fill="none" stroke="#0E4FAF" strokeWidth="2" strokeDasharray="5, 15">
           <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="10s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Scanning Arcs */}
      <path d="M60 60 A 60 60 0 0 1 140 60" fill="none" stroke="#0E4FAF" strokeWidth="2" opacity="0.4" strokeLinecap="round">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M60 140 A 60 60 0 0 0 140 140" fill="none" stroke="#0E4FAF" strokeWidth="2" opacity="0.4" strokeLinecap="round">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* Tech Nodes Floating around */}
      {[
        { x: 30, y: 100 }, { x: 170, y: 100 },
        { x: 100, y: 30 }, { x: 100, y: 170 }
      ].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r="3" fill="#0E4FAF" opacity="0.6">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={pos.x} cy={pos.y} r="8" fill="none" stroke="#0E4FAF" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="8;12;8" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  </div>
);

export const VisionGraphic: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="visionGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0E4FAF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0E4FAF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#0E4FAF" strokeWidth="0.5" fill="none">
        <path d="M100 40 L160 100 L100 160 L40 100 Z" opacity="0.3" />
        <path d="M100 20 L180 100 L100 180 L20 100 Z" opacity="0.1" />
        <line x1="100" y1="40" x2="100" y2="160" opacity="0.2">
          <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="40" y1="100" x2="160" y2="100" opacity="0.2">
          <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="4s" repeatCount="indefinite" />
        </line>
      </g>
      <circle cx="100" cy="100" r="50" fill="url(#visionGrad)" opacity="0.2" />
      <circle cx="100" cy="100" r="5" fill="#0E4FAF" />
      <circle cx="100" cy="100" r="15" fill="none" stroke="#0E4FAF" strokeWidth="1" strokeDasharray="2 2">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="30" fill="none" stroke="#0E4FAF" strokeWidth="0.5" opacity="0.5" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#0E4FAF" strokeWidth="2" opacity="0.3">
        <animate attributeName="y1" values="60;140;60" dur="5s" repeatCount="indefinite" />
        <animate attributeName="y2" values="60;140;60" dur="5s" repeatCount="indefinite" />
      </line>
    </svg>
  </div>
);

export const DataStream: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={i * 12 + 10} y1="0" x2={i * 12 + 10} y2="100" stroke="#0E4FAF" strokeWidth="0.3" strokeDasharray="2 6">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  </div>
);

export const CircuitNode: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="4" fill="#0E4FAF">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <g stroke="#0E4FAF" strokeWidth="0.8" fill="none">
        <path d="M50 46 V 20 H 75" />
        <path d="M50 54 V 80 H 25" />
        <path d="M46 50 H 15 V 30" />
        <path d="M54 50 H 85 V 70" />
      </g>
      <circle cx="75" cy="20" r="2" fill="#0E4FAF" />
      <circle cx="25" cy="80" r="2" fill="#0E4FAF" />
      <circle cx="15" cy="30" r="2" fill="#0E4FAF" />
      <circle cx="85" cy="70" r="2" fill="#0E4FAF" />
    </svg>
  </div>
);

export const NodeNetwork: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="3" fill="#0E4FAF" className="animate-pulse" />
      <g opacity="0.4">
        <circle cx="15" cy="25" r="1.5" fill="#0E4FAF" />
        <circle cx="85" cy="25" r="1.5" fill="#0E4FAF" />
        <circle cx="25" cy="85" r="1.5" fill="#0E4FAF" />
        <circle cx="75" cy="85" r="1.5" fill="#0E4FAF" />
        <circle cx="50" cy="15" r="1.5" fill="#0E4FAF" />
        <circle cx="50" cy="85" r="1.5" fill="#0E4FAF" />
        <g stroke="#0E4FAF" strokeWidth="0.3">
          <line x1="15" y1="25" x2="50" y2="50" />
          <line x1="85" y1="25" x2="50" y2="50" />
          <line x1="25" y1="85" x2="50" y2="50" />
          <line x1="75" y1="85" x2="50" y2="50" />
          <line x1="50" y1="15" x2="50" y2="50" />
          <line x1="50" y1="85" x2="50" y2="50" />
          <line x1="15" y1="25" x2="50" y2="15" />
          <line x1="85" y1="25" x2="50" y2="15" />
        </g>
      </g>
    </svg>
  </div>
);

export const DNAAnimation: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 200" className="w-full h-full">
      {Array.from({ length: 15 }).map((_, i) => (
        <g key={i}>
          <circle cx="20" cy={10 + i * 13} r="2" fill="#0E4FAF">
            <animate attributeName="cx" values="20;80;20" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy={10 + i * 13} r="2" fill="#3A74D1">
            <animate attributeName="cx" values="80;20;80" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <line x1="20" y1={10 + i * 13} x2="80" y2={10 + i * 13} stroke="#0E4FAF" strokeWidth="0.4" opacity="0.1">
             <animate attributeName="x1" values="20;80;20" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
             <animate attributeName="x2" values="80;20;80" dur="5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}
    </svg>
  </div>
);
