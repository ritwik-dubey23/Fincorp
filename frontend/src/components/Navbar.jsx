import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, ShieldCheck, User as UserIcon, LogOut, CreditCard, Building2, Calculator, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdown, setLoansDropdown] = useState(false);
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

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                  FIN<span className="text-blue-600">CORP</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                  Smart Borrowing Partner
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center bg-slate-50/80 border border-slate-200/80 rounded-full px-5 py-2 space-x-6 text-sm font-semibold text-slate-700 shadow-xs">
              <div 
                className="relative group py-1"
                onMouseEnter={() => setLoansDropdown(true)}
                onMouseLeave={() => setLoansDropdown(false)}
              >
                <button className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
                  Loans <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
                {loansDropdown && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link to="/personal-loan" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition">
                      Personal Loan
                    </Link>
                    <Link to="/business-loan" className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition">
                      Business Loan
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/credit-score" className="hover:text-blue-600 transition">Credit Score</Link>
              <Link to="/credit-card" className="hover:text-blue-600 transition">Credit Card</Link>
              <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
              <Link to="/tools" className="hover:text-blue-600 transition">Tools</Link>
              <Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
              <Link to="/track-status" className="text-blue-600 font-bold hover:text-blue-700 transition">Track Status</Link>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={user.role === 'admin' ? '/admin/dashboard' : '/track-status'}
                    className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold flex items-center gap-2 transition"
                  >
                    <UserIcon className="w-4 h-4 text-blue-600" />
                    {user.role === 'admin' ? 'Admin Portal' : user.name}
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-sm transition transform active:scale-95"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={onOpenApply}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition transform active:scale-95 flex items-center gap-2"
              >
                Apply Now
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenApply}
                className="px-3 py-1.5 text-xs font-bold rounded-full bg-blue-600 text-white shadow-xs"
              >
                Apply
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-800 hover:text-blue-600 hover:bg-slate-100 transition focus:outline-none"
                aria-label="Open Mobile Navigation Sidebar"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div 
            onClick={() => setMobileMenuOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 z-[101]" 
          />

          <div className="fixed top-0 right-0 bottom-0 z-[102] w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-slate-100 animate-in slide-in-from-right duration-250">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-extrabold text-slate-900">FIN<span className="text-blue-600">CORP</span></span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-sm font-semibold text-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Products & Services</span>
                
                <Link 
                  to="/personal-loan" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Building2 className="w-4 h-4 text-blue-600" /> Personal Loan
                </Link>

                <Link 
                  to="/business-loan" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Building2 className="w-4 h-4 text-indigo-600" /> Business Loan
                </Link>

                <Link 
                  to="/credit-score" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Credit Score
                </Link>

                <Link 
                  to="/credit-card" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition"
                >
                  <CreditCard className="w-4 h-4 text-purple-600" /> Credit Card
                </Link>

                <div className="pt-3 pb-1 border-b border-slate-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Navigation</span>
                </div>

                <Link 
                  to="/track-status" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl text-blue-600 font-extrabold bg-blue-50/70"
                >
                  <Search className="w-4 h-4 text-blue-600" /> Track Status
                </Link>

                <Link 
                  to="/tools" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <Calculator className="w-4 h-4 text-slate-500" /> Tools & EMI Calculator
                </Link>

                <Link 
                  to="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-slate-50 transition"
                >
                  About Us
                </Link>

                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-slate-50 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              {user ? (
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs text-center block shadow-sm"
                >
                  Sign In
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs text-center block shadow-lg shadow-blue-500/20"
              >
                Apply Instant Loan
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
