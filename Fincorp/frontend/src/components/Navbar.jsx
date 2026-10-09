import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdown, setLoansDropdown] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. Left: Official Fincorp Company Logo */}
            <Link to="/" className="flex items-center group focus:outline-none shrink-0 py-2">
              <img
                src="/logo.png"
                alt="Fincorp Logo"
                className="h-10 sm:h-12 w-auto object-contain transition transform group-hover:scale-105 duration-200"
              />
            </Link>

            {/* 2. Center: Desktop Navigation Items */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-black uppercase tracking-wider text-slate-700 whitespace-nowrap">
              
              {/* Loans Dropdown */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setLoansDropdown(true)}
                onMouseLeave={() => setLoansDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer leading-none">
                  Loans <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
                {loansDropdown && (
                  <div className="absolute top-full left-0 w-52 bg-white/98 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl py-2 mt-1 z-50 animate-in fade-in duration-150">
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

            {/* 3. Right: Actions Container */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {!user && (
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-full bg-[#0d3b66] hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={() => onOpenApply('personal_loan')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md border-2 border-white group-hover:scale-105 transition transform duration-200">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div 
                      className="absolute right-0 top-full mt-2.5 w-60 bg-white/98 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl py-3 px-2 z-50 animate-in fade-in duration-150"
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

            {/* Mobile Actions & Menu Toggle */}
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
                aria-label="Toggle mobile menu"
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
