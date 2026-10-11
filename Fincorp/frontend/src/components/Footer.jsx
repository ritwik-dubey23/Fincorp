import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Send, ShieldCheck, Mail } from 'lucide-react';

const Footer = ({ onOpenApply }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181c22] text-slate-300 relative pt-12 pb-24 lg:pb-12 border-t border-slate-800 font-['Urbanist',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Main Row (Matching Screenshot 5) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Left: Logo & Mission Statement */}
          <div className="space-y-4 max-w-xl">
            <div className="bg-white rounded-xl px-4 py-2 inline-block shadow-md">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="FinCrop Logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCZA8NC-H0zKhrhPkjysvI96EoP2Q5Wjc4SjZqNmEikYwVOgAEWF_0O3kpk2uOTUdKbdt5YAdWciCmIwrLJJxXDKr5AGLOBJqncgOxExre7Ew7zDRds9XIEwQS1AVnyR_UYFi0cEtw9w9eowu3AMSpMLMJYDvj9-l8gAyjzxL52ew27LRgxJs98mvRteHtUuh1iZqN4XBotv7a_3yaUsu4CCDAD4sGIwvAns46x4OBzzpdRDks4nniGU8DVlpi3lwdijVs";
                  }}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Our mission is to provide you with seamless, convenient, and personalized loan services that cater to your unique financial needs.
            </p>
          </div>

          {/* Right: Contact Header & Email Pill */}
          <div className="space-y-3 text-left md:text-right">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Contact</h4>
            <a
              href="mailto:contact@fincrop.in"
              className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl px-5 py-3 text-xs text-slate-200 font-bold transition shadow-sm hover:border-slate-600"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>contact@fincrop.in</span>
            </a>
          </div>

        </div>

        {/* Links Navigation Row */}
        <div className="py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-400 border-b border-slate-800/60">
          <div>
            <h4 className="font-extrabold text-slate-200 mb-2.5 uppercase tracking-wider text-[11px]">Loan Products</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/personal-loan" className="hover:text-blue-400 transition cursor-pointer">Personal Loan</Link></li>
              <li><Link to="/business-loan" className="hover:text-blue-400 transition cursor-pointer">Business Loan</Link></li>
              <li><Link to="/credit-card" className="hover:text-blue-400 transition cursor-pointer">Credit Cards</Link></li>
              <li><Link to="/credit-score" className="hover:text-blue-400 transition cursor-pointer">Credit Score</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-200 mb-2.5 uppercase tracking-wider text-[11px]">Financial Tools</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/tools" className="hover:text-blue-400 transition cursor-pointer">EMI Calculator</Link></li>
              <li><Link to="/tools" className="hover:text-blue-400 transition cursor-pointer">Loan Eligibility Checker</Link></li>
              <li><Link to="/tools" className="hover:text-blue-400 transition cursor-pointer">IFSC Code Finder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-200 mb-2.5 uppercase tracking-wider text-[11px]">Governance</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/lenders" className="hover:text-blue-400 transition cursor-pointer">Our Lending Partners</Link></li>
              <li><Link to="/grievance" className="hover:text-blue-400 transition cursor-pointer">Grievance Redressal</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition cursor-pointer">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-200 mb-2.5 uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 font-medium">
              <li><Link to="/customers" className="hover:text-blue-400 transition cursor-pointer">Reviews</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition cursor-pointer">About Us</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition cursor-pointer">Terms & Conditions</Link></li>
              <li><Link to="/track-status" className="hover:text-blue-400 transition cursor-pointer">Track Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="font-semibold text-slate-400">FinCrop. All Rights Reserved.</p>
          <button 
            onClick={scrollToTop} 
            aria-label="Back to top" 
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
