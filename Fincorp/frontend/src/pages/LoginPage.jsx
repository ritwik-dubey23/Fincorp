import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { ShieldCheck, ArrowRight, Eye, EyeOff, KeyRound, Mail, CheckCircle2, RefreshCw, AlertCircle, X, UserPlus } from 'lucide-react';

const LoginPage = () => {
  // Navigation & Auth
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'login' | 'forgot_email' | 'forgot_otp' | 'forgot_reset' | 'forgot_success'
  const [view, setView] = useState('login');

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password States
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // General States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNoAccountError, setIsNoAccountError] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Read message from navigation state (e.g. from protected apply route)
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const switchView = (targetView) => {
    setError('');
    setIsNoAccountError(false);
    setMessage('');
    setView(targetView);
  };

  // --- Handlers ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsNoAccountError(false);
    setMessage('');
    setLoading(true);

    try {
      const data = await login(email, password);
      if (data.success) {
        setMessage('Congratulations! You have logged in successfully.');
        const destination = location.state?.from || (data.user?.role === 'admin' ? '/admin/dashboard' : '/track-status');
        setTimeout(() => {
          navigate(destination);
        }, 1000);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed. Invalid email or password.';
      if (errMsg.toLowerCase().includes('not found') || err.response?.status === 404) {
        setError('No account found. Please create an account first.');
        setIsNoAccountError(true);
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsNoAccountError(false);
    setMessage('');

    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password/send-otp', { email: forgotEmail });
      if (res.data.success) {
        const msg = res.data.otpPreview
          ? `${res.data.message} [OTP Code: ${res.data.otpPreview}]`
          : res.data.message || 'OTP sent successfully to your email address.';
        setMessage(msg);
        setView('forgot_otp');
        setTimer(60);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to send OTP. Please check your email address.';
      if (errMsg.toLowerCase().includes('not found') || err.response?.status === 404) {
        setError('No account found. Please create an account first.');
        setIsNoAccountError(true);
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!otp || otp.trim().length !== 6) {
      setError('Please enter the complete 6-digit OTP sent to your email.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password/verify-otp', { email: forgotEmail, otp });
      if (res.data.success) {
        setMessage('OTP verified successfully! Create a new password below.');
        setView('forgot_reset');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify your new password.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password/reset-password', {
        email: forgotEmail,
        otp,
        newPassword,
      });
      if (res.data.success) {
        setView('forgot_success');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
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
                  {error ? (isNoAccountError ? 'No Account Found' : 'Authentication Error') : 'Success'}
                </p>
                <p className="leading-relaxed">{error || message}</p>

                {/* NO ACCOUNT FOUND -> DIRECT BUTTON TO SIGNUP */}
                {isNoAccountError && (
                  <div className="pt-2">
                    <button
                      onClick={() => navigate('/signup', { state: { from: location.state?.from } })}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:from-blue-500 transition cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" /> Create Account Now →
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => { setError(''); setMessage(''); setIsNoAccountError(false); }}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-6">
        
        {/* Banner Headers */}
        {view === 'login' && (
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Sign In to Fincorp</h2>
            <p className="text-xs text-slate-500">Access your account, track applications, and manage finances.</p>
          </div>
        )}

        {(view === 'forgot_email' || view === 'forgot_otp' || view === 'forgot_reset') && (
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Reset Password</h2>
            <p className="text-xs text-slate-500">
              {view === 'forgot_email' && 'Enter your email to receive a 6-digit verification code.'}
              {view === 'forgot_otp' && `Enter the 6-digit OTP code sent to ${forgotEmail}.`}
              {view === 'forgot_reset' && 'Set a new secure password for your Fincorp account.'}
            </p>
          </div>
        )}

        {view === 'forgot_success' && (
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Password Reset Complete!</h2>
            <p className="text-xs text-slate-500">
              Your password has been successfully updated. You can now log in with your new credentials.
            </p>
          </div>
        )}

        {/* VIEW 1: SIGN IN FORM */}
        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Password</label>
                <button
                  type="button"
                  onClick={() => switchView('forgot_email')}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 focus:outline-none focus:border-blue-600"
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
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        {/* VIEW 2: FORGOT PASSWORD - STEP 1 (ENTER EMAIL) */}
        {view === 'forgot_email' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Registered Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Sending OTP...' : <>Send Verification OTP <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => switchView('login')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* VIEW 3: FORGOT PASSWORD - STEP 2 (VERIFY OTP) */}
        {view === 'forgot_otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 text-center">6-Digit Verification OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                placeholder="0 0 0 0 0 0"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying Code...' : <>Verify OTP <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => switchView('forgot_email')}
                className="font-bold hover:text-slate-800 transition"
              >
                ← Change Email
              </button>
              
              <button
                type="button"
                disabled={timer > 0 || loading}
                onClick={handleSendOtp}
                className={`font-bold flex items-center gap-1 ${timer > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
              >
                <RefreshCw className="w-3 h-3" />
                {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

        {/* VIEW 4: FORGOT PASSWORD - STEP 3 (NEW PASSWORD) */}
        {view === 'forgot_reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter new password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? 'Updating Password...' : <>Save New Password <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        {/* VIEW 5: FORGOT PASSWORD - SUCCESS */}
        {view === 'forgot_success' && (
          <div className="space-y-4 pt-2">
            <button
              type="button"
              onClick={() => switchView('login')}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              Return to Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Nav Links */}
        {view === 'login' && (
          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-2">
            <p>Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create Account</Link></p>
            <p><Link to="/admin/login" className="text-slate-400 hover:text-slate-700 font-semibold">Admin Login Portal →</Link></p>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginPage;
