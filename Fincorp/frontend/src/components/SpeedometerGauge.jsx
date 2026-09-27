import React from 'react';
import { Link } from 'react-router-dom';

const SpeedometerGauge = () => {
  return (
    <div className="bg-[#0c1e36] text-white rounded-3xl p-6 shadow-2xl border border-slate-800/80 max-w-sm w-full mx-auto text-center space-y-4">
      
      {/* Clean Static SVG Semi-Circle Rainbow Arc (Strictly Static, No Animation) */}
      <div className="relative w-48 h-28 mx-auto flex items-center justify-center pt-1">
        <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
          {/* Track background */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#1e293b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Red Zone (Low Score) */}
          <path
            d="M 10 50 A 40 40 0 0 1 32 19"
            fill="none"
            stroke="#ff2a4b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Yellow Zone (Medium Score) */}
          <path
            d="M 32 19 A 40 40 0 0 1 68 19"
            fill="none"
            stroke="#ffd600"
            strokeWidth="9"
          />
          {/* Green Zone (High Score) */}
          <path
            d="M 68 19 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#00c853"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Static Needle resting pointing to Green Zone (~750) */}
          <line
            x1="50"
            y1="50"
            x2="72"
            y2="25"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Center Pin */}
          <circle cx="50" cy="50" r="5" fill="#ffffff" />
          <circle cx="50" cy="50" r="2.5" fill="#0c1e36" />
        </svg>
      </div>

      <div className="pt-1">
        <Link
          to="/credit-score"
          className="w-full py-3 rounded-2xl bg-[#00b060] hover:bg-[#009c54] text-white font-extrabold text-xs tracking-wider uppercase shadow-md block text-center transition cursor-pointer"
        >
          CHECK FREE SCORE
        </Link>
      </div>

    </div>
  );
};

export default SpeedometerGauge;
