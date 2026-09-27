import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, ShieldCheck, User as UserIcon, LogOut, Play, Facebook, Twitter, Instagram, Linkedin, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdown, setLoansDropdown] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Accordion state inside mobile drawer
  const [mobileLoansOpen, setMobileLoansOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition transform duration-200">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-950 leading-none">
                  FIN<span className="text-blue-600">CORP</span>
                </span>
                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mt-0.5">
                  Smart Borrowing Partner
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Pill Container */}
            <nav className="hidden lg:flex items-center bg-slate-100/70 backdrop-blur-md border border-slate-200/80 rounded-full px-6 py-2.5 space-x-6 text-xs font-black uppercase tracking-wider text-slate-700 shadow-2xs">
              
              {/* Loans Dropdown */}
              <div 
                className="relative group py-1"
                onMouseEnter={() => setLoansDropdown(true)}
                onMouseLeave={() => setLoansDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
                  Loans <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
                {loansDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl py-2 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link to="/personal-loan" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold transition text-xs capitalize">
                      • Personal Loan
                    </Link>
                    <Link to="/business-loan" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold transition text-xs capitalize">
                      • Business Loan
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/credit-score" className="hover:text-blue-600 transition">Credit Score</Link>
              <Link to="/credit-card" className="hover:text-blue-600 transition">Credit Card</Link>
              <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
              <Link to="/tools" className="hover:text-blue-600 transition">Tools</Link>
              <Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
              <Link to="/track-status" className="text-blue-600 font-black hover:text-blue-700 transition">Track Status</Link>
            </nav>

            {/* Right: Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3.5">
              <button
                onClick={() => onOpenApply('personal_loan')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-blue-500/20 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                Apply Now
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-0.5 rounded-full hover:bg-slate-100 transition cursor-pointer focus:outline-none group"
                    title={user.name}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white font-black text-sm flex items-center justify-center shadow-md border-2 border-white ring-2 ring-blue-500/20 group-hover:scale-105 group-hover:ring-blue-500/40 transition transform duration-200">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div 
                      className="absolute right-0 top-full mt-2.5 w-60 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-3 pb-3 mb-2 border-b border-slate-100">
                        <p className="text-xs font-black uppercase text-blue-600 tracking-wider">Logged In As</p>
                        <p className="text-sm font-black text-slate-900 truncate mt-0.5">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email || 'User Account'}</p>
                      </div>

                      <Link
                        to={user.role === 'admin' ? '/admin/dashboard' : '/track-status'}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <UserIcon className="w-4 h-4 text-blue-600" />
                        {user.role === 'admin' ? 'Admin Dashboard' : 'My Applications'}
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer text-left mt-1"
                      >
                        <LogOut className="w-4 h-4 text-red-500" /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4.5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-wider shadow-xs transition transform active:scale-95"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4.5 py-2 rounded-full bg-blue-50/80 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-extrabold uppercase tracking-wider transition transform active:scale-95"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button on the Right */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => onOpenApply('personal_loan')}
                className="px-4 py-1.5 text-xs font-extrabold rounded-full bg-blue-600 text-white shadow-xs uppercase tracking-wider"
              >
                Apply
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-800 hover:text-blue-600 hover:bg-slate-100 transition focus:outline-none"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE DARK DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          
          {/* Dark Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)} 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 z-[101]" 
          />

          {/* Right Side Dark Drawer */}
          <div className="fixed top-0 right-0 bottom-0 z-[102] w-5/6 max-w-xs bg-[#11161d] text-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-slate-800 animate-in slide-in-from-right duration-250">
            
            {/* Drawer Content */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    FIN<span className="text-blue-500">CORP</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  aria-label="Close Drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Profile / Auth Section in Mobile Drawer */}
              <div className="py-3 px-3.5 my-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs flex items-center justify-between shadow-inner">
                {user ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md border border-white/20 shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-extrabold text-slate-200 truncate max-w-[110px] text-xs">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium truncate max-w-[110px]">
                          {user.role === 'admin' ? 'Admin' : 'Member'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 font-extrabold flex items-center gap-1 cursor-pointer text-[11px] bg-red-950/50 px-2.5 py-1.5 rounded-xl border border-red-800/50 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-around w-full gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-1/2 py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs uppercase tracking-wider transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-1/2 py-2 text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Menu Accordions & Navigation List */}
              <div className="divide-y divide-slate-800/80 font-bold text-xs uppercase tracking-wider text-slate-200">
                
                {/* LOANS Dropdown Accordion */}
                <div>
                  <button
                    onClick={() => setMobileLoansOpen(!mobileLoansOpen)}
                    className="w-full py-4 flex items-center justify-between hover:text-blue-400 transition cursor-pointer"
                  >
                    <span>LOANS</span>
                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileLoansOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {mobileLoansOpen && (
                    <div className="pb-3 pl-4 space-y-2 text-slate-400 font-semibold text-xs capitalize">
                      <Link 
                        to="/personal-loan" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-white transition"
                      >
                        • Personal Loan
                      </Link>
                      <Link 
                        to="/business-loan" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-white transition"
                      >
                        • Business Loan
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  to="/credit-score" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 hover:text-blue-400 transition"
                >
                  CREDIT SCORE
                </Link>

                <Link 
                  to="/credit-card" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 hover:text-blue-400 transition"
                >
                  CREDIT CARD
                </Link>

                <Link 
                  to="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 hover:text-blue-400 transition"
                >
                  ABOUT
                </Link>

                <Link 
                  to="/track-status" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 text-blue-400 transition"
                >
                  TRACK STATUS
                </Link>

                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 hover:text-blue-400 transition"
                >
                  CONTACT US
                </Link>

                {/* TOOLS Dropdown Accordion */}
                <div>
                  <button
                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    className="w-full py-4 flex items-center justify-between hover:text-blue-400 transition cursor-pointer"
                  >
                    <span>TOOLS</span>
                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {mobileToolsOpen && (
                    <div className="pb-3 pl-4 space-y-2 text-slate-400 font-semibold text-xs capitalize">
                      <Link 
                        to="/tools" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-white transition"
                      >
                        • EMI Calculator
                      </Link>
                      <Link 
                        to="/tools" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 hover:text-white transition"
                      >
                        • IFSC Finder & Gold Rate
                      </Link>
                    </div>
                  )}
                </div>

              </div>

              {/* Exact Blue Gradient Action Buttons */}
              <div className="pt-6 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenApply('personal_loan');
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-black text-sm uppercase tracking-wide shadow-lg text-center block transition transform active:scale-95 cursor-pointer"
                >
                  Apply Loan
                </button>

                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" /> Play Store
                </a>
              </div>
            </div>

            {/* Contact Info & Social Icons */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h4 className="text-sm font-extrabold text-white">Contact Info</h4>
              
              <div className="space-y-1.5 text-xs text-slate-400 font-medium">
                <p>Visakhapatnam, Andhra Pradesh, India</p>
                <p><a href="tel:+919154297990" className="hover:text-white transition">+91 91542 97990</a></p>
                <p><a href="mailto:supportmaharajji@gmail.com" className="hover:text-white transition">supportmaharajji@gmail.com</a></p>
              </div>

              {/* Rounded Outline Social Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <a href="#facebook" className="w-9 h-9 rounded-full border border-slate-700 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-slate-300 transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#twitter" className="w-9 h-9 rounded-full border border-slate-700 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-slate-300 transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#instagram" className="w-9 h-9 rounded-full border border-slate-700 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-slate-300 transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#linkedin" className="w-9 h-9 rounded-full border border-slate-700 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-slate-300 transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

