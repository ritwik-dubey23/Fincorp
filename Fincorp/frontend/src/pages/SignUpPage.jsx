import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserPlus, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, X, LogIn } from 'lucide-react';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExistingUserError, setIsExistingUserError] = useState(false);
  const [message, setMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsExistingUserError(false);
    setMessage('');

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    try {
      const data = await register(name, email, mobile, password);
      if (data.success) {
        setMessage('Congratulations! Your account has been created successfully.');
        const destination = location.state?.from || '/track-status';
        setTimeout(() => {
          navigate(destination);
        }, 1200);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed';
      if (errMsg.toLowerCase().includes('already exists')) {
        setError('Account already exists with this email or mobile number.');
        setIsExistingUserError(true);
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* TOP-CENTER FLOATING POPUP / TOAST FOR ERRORS & SUCCESS */}
      {(error || message) && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] max-w-md w-11/12 animate-in slide-in-from-top-4 duration-200">
          <div className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-start justify-between gap-3 ${
            error
              ? 'bg-red-950/95 border-red-800 text-red-100'
              : 'bg-emerald-950/95 border-emerald-800 text-emerald-100'
          }`}>
            <div className="flex items-start gap-3">
              {error ? (
                <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <p className="font-extrabold text-sm">
                  {error ? (isExistingUserError ? 'Account Already Exists' : 'Registration Error') : 'Success'}
                </p>
                <p className="leading-relaxed">{error || message}</p>

                {/* ALREADY EXISTS -> DIRECT BUTTON TO SIGN IN */}
                {isExistingUserError && (
                  <div className="pt-2">
                    <button
                      onClick={() => navigate('/login', { state: { from: location.state?.from } })}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:from-blue-500 transition cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" /> Sign In to Existing Account →
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => { setError(''); setMessage(''); setIsExistingUserError(false); }}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <UserPlus className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Create Fincorp Account</h2>
          <p className="text-xs text-slate-500">Join Fincorp for instant loans, credit score monitoring, and financial services.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              required
              placeholder="10-digit mobile number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimum 6 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <p>Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link></p>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
