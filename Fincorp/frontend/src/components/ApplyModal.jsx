import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import {
  X,
  CheckCircle,
  Lock,
  Zap,
  FileText,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  UserCheck,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
} from 'lucide-react';

const ApplyModal = ({ isOpen, onClose, initialProduct = 'personal_loan' }) => {
  const { user, loading: authLoading, login, register } = useAuth();
  const navigate = useNavigate();

  // Mode & Step
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    dob: '',
    panNumber: '',
    aadhaarNumber: '',
    employmentType: 'salaried',
    monthlyIncome: '50000',
    requestedAmount: '200000',
    productType: initialProduct,
    address: '',
    city: '',
    pincode: '',
  });

  // Auth Inputs for Inline Login/Signup
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authMobile, setAuthMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpPreview, setOtpPreview] = useState('');
  const [timer, setTimer] = useState(0);

  // Status States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Sync logged in user details to formData
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        mobile: user.mobile || prev.mobile,
      }));
    }
  }, [user]);

  // Sync initialProduct if prop changes
  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, productType: initialProduct }));
    }
  }, [initialProduct]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // --- Inline Auth Handlers ---
  const handleInlineLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const data = await login(authEmail, authPassword);
      if (data.success) {
        setMessage('Congratulations! You have logged in successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleInlineSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!/^[6-9]\d{9}$/.test(authMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    try {
      const data = await register(authName, authEmail, authMobile, authPassword);
      if (data.success) {
        setMessage('Congratulations! Your account has been created successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 1: Send OTP to Email ---
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.fullName.trim()) {
      setError('Please enter your full name as per PAN');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!formData.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      setError('Invalid PAN number format (e.g. ABCDE1234F)');
      return;
    }
    if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0) {
      setError('Please enter your net monthly income');
      return;
    }
    if (!formData.requestedAmount || Number(formData.requestedAmount) <= 0) {
      setError('Please enter requested loan amount');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/applications/send-otp', {
        email: user.email,
        mobile: formData.mobile,
        fullName: formData.fullName,
      });

      if (res.data.success) {
        setOtpSent(true);
        setStep(2);
        setMessage(res.data.message || 'OTP has been sent to your registered email address.');
        if (res.data.otpPreview) {
          setOtpPreview(res.data.otpPreview);
        }
        setTimer(60);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP to registered email.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP & Submit Loan Application ---
  const handleVerifyAndSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!otp || otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code sent to your registered email.');
      return;
    }

    setLoading(true);
    try {
      const verifyRes = await API.post('/applications/verify-otp', {
        email: user.email,
        otp: otp.trim(),
      });

      if (verifyRes.data.success) {
        const appRes = await API.post('/applications/apply', {
          ...formData,
          email: user.email,
          otp: otp.trim(),
        });

        if (appRes.data.success) {
          setSuccessData(appRes.data);
          setStep(3);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setOtpSent(false);
    setOtp('');
    setOtpPreview('');
    setError('');
    setMessage('');
    setSuccessData(null);
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleReset();
      }}
      className="fixed inset-0 z-[110] overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-auto">
        {/* Prominent White Circular Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="absolute top-4 right-4 z-[120] w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center shadow-lg border border-slate-200 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 pt-7 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-1.5">
            <h3 className="text-xl font-black tracking-tight">
              Apply for Instant Loan up to <span className="text-amber-400">₹10 Lakhs</span>
            </h3>
            <p className="text-xs text-blue-200 font-medium">Quick online application with instant email verification.</p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[10px] font-bold">
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <Zap className="w-3 h-3 text-amber-400" /> Instant Processing
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <FileText className="w-3 h-3 text-blue-300" /> 100% Digital
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <Lock className="w-3 h-3 text-emerald-400" /> Bank Grade SSL
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {authLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-bold">Verifying authentication status...</p>
            </div>
          ) : !user ? (
            <div className="space-y-5">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-semibold text-center space-y-1">
                <p className="text-sm font-bold text-amber-900">⚠️ Please Sign Up or Log In first to apply for a loan.</p>
                <p className="text-[11px] text-amber-700">You must be logged in so your application can be linked to your account.</p>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => { setAuthTab('login'); setError(''); setMessage(''); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    authTab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" /> Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthTab('signup'); setError(''); setMessage(''); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    authTab === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" /> Create Account
                </button>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl">⚠️ {error}</div>}
              {message && <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-xl">✅ {message}</div>}

              {/* INLINE LOGIN FORM */}
              {authTab === 'login' && (
                <form onSubmit={handleInlineLogin} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                      placeholder="user@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
                  >
                    {loading ? 'Authenticating...' : <>Log In & Continue Application <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}

              {/* INLINE SIGNUP FORM */}
              {authTab === 'signup' && (
                <form onSubmit={handleInlineSignup} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email *</label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Mobile *</label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={authMobile}
                        onChange={(e) => setAuthMobile(e.target.value)}
                        required
                        placeholder="10-digit mobile"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                        placeholder="Min 6 characters"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 pr-10 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
                  >
                    {loading ? 'Creating Account...' : <>Create Account & Continue <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* LOGGED IN USER APPLICATION FLOW */}
              {step === 3 && successData ? (
                /* STEP 3: SUCCESS SCREEN */
                <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">Application Verified & Submitted</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">
                      Congratulations! Your loan application has been submitted successfully.
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      A confirmation email has been dispatched to your registered email address <strong className="text-slate-800">{user.email}</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                      <span className="text-slate-500 font-semibold">Reference Application ID</span>
                      <span className="font-mono font-black text-blue-600 text-sm">{successData.applicationId}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-500">Applicant Name</span>
                      <span className="font-bold text-slate-800">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Registered Email</span>
                      <span className="font-bold text-slate-800">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Loan Product</span>
                      <span className="font-bold text-slate-800 uppercase">{formData.productType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Requested Loan Amount</span>
                      <span className="font-bold text-emerald-600">₹{Number(formData.requestedAmount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { handleReset(); navigate('/track-status'); }}
                      className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
                    >
                      Track Status
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        Step {step} of 2: {step === 1 ? 'Loan Application Details' : 'Email OTP Verification'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <UserCheck className="w-3.5 h-3.5" /> {user.email}
                    </div>
                  </div>

                  {error && <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">⚠️ {error}</div>}
                  {message && <div className="mb-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">ℹ️ {message}</div>}

                  {/* STEP 1: LOAN APPLICATION DETAILS FORM */}
                  {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name (as per PAN) *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength={10}
                            required
                            placeholder="10-digit mobile"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Registered Email</label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">PAN Number *</label>
                          <input
                            type="text"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                            maxLength={10}
                            required
                            placeholder="ABCDE1234F"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-mono uppercase"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Net Monthly Income (₹) *</label>
                          <input
                            type="number"
                            name="monthlyIncome"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Loan Amount Needed (₹) *</label>
                          <input
                            type="number"
                            name="requestedAmount"
                            value={formData.requestedAmount}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-blue-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Employment</label>
                          <select
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs"
                          >
                            <option value="salaried">Salaried</option>
                            <option value="self_employed">Self Employed</option>
                            <option value="business_owner">Business Owner</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Product</label>
                          <select
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-2 text-[11px] font-bold text-blue-700"
                          >
                            <option value="personal_loan">Personal Loan</option>
                            <option value="business_loan">Business Loan</option>
                            <option value="credit_score">Credit Score</option>
                            <option value="credit_card">Credit Card</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
                      >
                        {loading ? 'Generating Email OTP...' : <>Submit & Send Email OTP <ArrowRight className="w-4 h-4" /></>}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: EMAIL OTP VERIFICATION */}
                  {step === 2 && (
                    <form onSubmit={handleVerifyAndSubmit} className="space-y-4 pt-1">
                      <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3">
                        <div className="text-center space-y-1">
                          <p className="text-xs font-bold text-blue-900">
                            Enter the 6-Digit Verification Code sent to <span className="underline">{user.email}</span>
                          </p>
                          {otpPreview && (
                            <p className="text-[11px] font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded inline-block">
                              Dev OTP Preview: <strong>{otpPreview}</strong>
                            </p>
                          )}
                        </div>

                        <input
                          type="text"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                          required
                          placeholder="0 0 0 0 0 0"
                          className="w-full bg-white border border-blue-300 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                        />

                        <div className="flex items-center justify-between text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => { setStep(1); setError(''); }}
                            className="font-semibold text-slate-500 hover:text-slate-800"
                          >
                            ← Edit Application Details
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
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
                      >
                        {loading ? 'Verifying OTP & Submitting...' : <>Verify OTP & Submit Loan Application <ArrowRight className="w-4 h-4" /></>}
                      </button>
                    </form>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
