import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Send, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import SpeedometerGauge from './SpeedometerGauge';

const Footer = ({ onOpenApply }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative pt-16 pb-28 lg:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                FIN<span className="text-blue-500">CORP</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Fincorp helps you navigate lending with clarity and confidence for greater financial progress. We offer smart loan comparison, instant eligibility checks, and zero application fees.
            </p>

            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Financial District, Visakhapatnam, AP, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href="tel:+919154297990" className="hover:text-white transition">+91 91542 97990</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:supportmaharajji@gmail.com" className="hover:text-white transition">supportmaharajji@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white">Subscribe Newsletter</h3>
            <p className="text-xs text-slate-400">
              Get the latest financial tips, loan offers, and credit rate updates directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-full px-5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs font-medium text-emerald-400 mt-1">
                  ✓ Thank you for subscribing to Fincorp Newsletter!
                </p>
              )}
            </form>
          </div>

          {/* Col 3: Exact Reference Speedometer Card */}
          <div className="lg:col-span-3">
            <SpeedometerGauge />
          </div>

        </div>

        {/* Lower Links Section */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-400 border-b border-slate-900">
          <div>
            <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Loan Products</h4>
            <ul className="space-y-2">
              <li><Link to="/personal-loan" className="hover:text-white transition">Personal Loan</Link></li>
              <li><Link to="/business-loan" className="hover:text-white transition">Business Loan</Link></li>
              <li><Link to="/credit-card" className="hover:text-white transition">Credit Cards</Link></li>
              <li><Link to="/credit-score" className="hover:text-white transition">Credit Score</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Financial Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/tools" className="hover:text-white transition">EMI Calculator</Link></li>
              <li><Link to="/tools" className="hover:text-white transition">Loan Eligibility Checker</Link></li>
              <li><Link to="/tools" className="hover:text-white transition">IFSC Code Finder</Link></li>
              <li><Link to="/tools" className="hover:text-white transition">Gold Rate Trends</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Governance & Policy</h4>
            <ul className="space-y-2">
              <li><a href="#lenders" className="hover:text-white transition">Our Lending Partners</a></li>
              <li><a href="#grievance" className="hover:text-white transition">Grievance Policy</a></li>
              <li><a href="#redressal" className="hover:text-white transition">Grievance Redressal</a></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">Terms & Support</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Disclaimer</Link></li>
              <li><Link to="/track-status" className="hover:text-white transition">Track Application</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FINCORP FINANCIAL SERVICES LIMITED. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-400">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms</Link>
            <button onClick={scrollToTop} className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Floating Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white px-4 py-3 shadow-2xl flex items-center justify-between lg:hidden border-t border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-xl">💰</span>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide leading-tight">Get Instant Loan Online</p>
            <p className="text-[10px] text-purple-200 font-medium">Instant Disbursal • Minimal Documentation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenApply}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-purple-900 font-bold text-xs shadow-md transition transform active:scale-95"
          >
            Apply Now
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
