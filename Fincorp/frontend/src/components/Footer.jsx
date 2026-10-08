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
            <div className="bg-white rounded-xl px-4 py-2.5 inline-block shadow-md">
              <img
                src="/logo.png"
                alt="FinCRO Logo"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-black text-slate-900">FINCRO</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Our mission is to provide you with seamless, convenient, and personalized loan services that cater to your unique financial needs.
            </p>
          </div>

          {/* Right: Contact Header & Email Pill */}
          <div className="space-y-3 text-left md:text-right">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Contact</h4>
            <a
              href="mailto:supportmaharajji@gmail.com"
              className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl px-5 py-3 text-xs text-slate-200 font-bold transition shadow-sm hover:border-slate-600"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>contact@fincro.com</span>
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

        {/* Bottom Copyright Row (Matching Screenshot 5) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="font-semibold text-slate-400">FinCRO. All Rights Reserved.</p>
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
