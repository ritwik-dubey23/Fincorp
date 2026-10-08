import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, ShieldCheck, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdown, setLoansDropdown] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Accordion state inside mobile drawer
  const [mobileLoansOpen, setMobileLoansOpen] = useState(false);

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
    navigate('/');
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* FinCRO Logo */}
            <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
              <img
                src="/logo.png"
                alt="FinCRO Logo"
                className="h-10 max-h-11 w-auto object-contain group-hover:scale-105 transition transform duration-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition transform duration-200">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col justify-center leading-none">
                  <span className="text-2xl font-black tracking-tight text-slate-950">
                    FIN<span className="text-blue-600">CORP</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mt-1">
                    Smart Borrowing Partner
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Pill Container */}
            <nav className="hidden lg:flex items-center bg-slate-100/80 backdrop-blur-md border border-slate-200/90 rounded-full px-6 py-2.5 space-x-6 text-xs font-black uppercase tracking-wider text-slate-700 shadow-2xs">
              
              {/* Loans Dropdown */}
              <div 
                className="relative group py-1"
                onMouseEnter={() => setLoansDropdown(true)}
                onMouseLeave={() => setLoansDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer leading-none">
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

              <Link to="/credit-score" className="hover:text-blue-600 transition leading-none">Credit Score</Link>
              <Link to="/credit-card" className="hover:text-blue-600 transition leading-none">Credit Card</Link>
              <Link to="/about" className="hover:text-blue-600 transition leading-none">About Us</Link>
              <Link to="/tools" className="hover:text-blue-600 transition leading-none">Tools</Link>
              <Link to="/contact" className="hover:text-blue-600 transition leading-none">Contact Us</Link>
              <Link to="/track-status" className="text-blue-600 font-black hover:text-blue-700 transition leading-none">Track Status</Link>
            </nav>

            {/* Right: Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3.5">
              <button
                onClick={() => onOpenApply('personal_loan')}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-500/25 transition transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                Apply Now
              </button>

              {user && (
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
                        <p className="text-xs font-black uppercase text-blue-600 tracking-wider">Account Holder</p>
                        <p className="text-sm font-black text-slate-900 truncate mt-0.5">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.mobile || user.email}</p>
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
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => onOpenApply('personal_loan')}
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm transition active:scale-95"
              >
                Apply Now
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-slate-900/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="bg-white border-b border-slate-200 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="space-y-3 font-extrabold text-xs uppercase tracking-wider text-slate-800">
              <div>
                <button
                  onClick={() => setMobileLoansOpen(!mobileLoansOpen)}
                  className="w-full flex items-center justify-between py-2 text-left hover:text-blue-600"
                >
                  <span>Loans</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileLoansOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileLoansOpen && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-blue-500 text-slate-600 font-bold capitalize text-xs">
                    <Link to="/personal-loan" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">• Personal Loan</Link>
                    <Link to="/business-loan" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-blue-600">• Business Loan</Link>
                  </div>
                )}
              </div>

              <Link to="/credit-score" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Credit Score</Link>
              <Link to="/credit-card" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Credit Card</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">About Us</Link>
              <Link to="/tools" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Tools</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-blue-600">Contact Us</Link>
              <Link to="/track-status" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-blue-600 font-black">Track Status</Link>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenApply('personal_loan'); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-md text-center"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
