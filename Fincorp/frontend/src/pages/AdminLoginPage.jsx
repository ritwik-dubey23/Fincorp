import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle, X } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@fincorp.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.success) {
        if (data.user?.role === 'admin') {
          setMessage('Congratulations! You have logged in successfully.');
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 1000);
        } else {
          setError('Access denied: You do not have administrator permissions.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Admin authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 relative">
      
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
                <p className="font-extrabold text-sm">{error ? 'Admin Authentication Error' : 'Success'}</p>
                <p className="leading-relaxed">{error || message}</p>
              </div>
            </div>

            <button
              onClick={() => { setError(''); setMessage(''); }}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-white">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Fincorp Admin Portal</h2>
          <p className="text-xs text-slate-400">Restricted Administration & Lead Management Console</p>
        </div>

        <div className="p-3 bg-blue-950/50 border border-blue-800/50 rounded-xl text-[11px] text-blue-300 space-y-1">
          <p className="font-bold">Default Admin Credentials:</p>
          <p>Email: <code className="font-mono text-white">admin@fincorp.com</code></p>
          <p>Password: <code className="font-mono text-white">admin123</code></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 pr-11 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-lg transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying Admin Rights...' : <>Login to Admin Dashboard <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLoginPage;
