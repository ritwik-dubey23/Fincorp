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
  PhoneCall,
  Mail,
  User as UserIcon,
  Upload,
} from 'lucide-react';

const ApplyModal = ({ isOpen, onClose, initialProduct = 'personal_loan' }) => {
  const { user, loading: authLoading, otpUserAuth } = useAuth();
  const navigate = useNavigate();

  // Workflow Steps:
  // 1: Mobile Input
  // 2: OTP Verification
  // 3: Name & Email Setup (New Users Only)
  // 4: Loan Details & Documents
  // 5: Application Success
  const [step, setStep] = useState(1);

  // Form Inputs
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    panNumber: '',
    employmentType: 'salaried',
    monthlyIncome: '50000',
    requestedAmount: '200000',
    productType: initialProduct,
    city: '',
    address: '',
    pincode: '',
  });

  // OTP State
  const [otpPreview, setOtpPreview] = useState('');
  const [timer, setTimer] = useState(0);

  // Status & Feedback States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Sync logged in user profile to states if user is already authenticated
  useEffect(() => {
    if (user) {
      setMobile(user.mobile || '');
      setName(user.name || '');
      setEmail(user.email || '');
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        mobile: user.mobile || prev.mobile,
      }));
      // If user is already authenticated, jump straight to loan application details if on step 1 or 2 or 3
      if (step < 4) {
        setStep(4);
      }
    }
  }, [user]);

  // Sync initialProduct if prop changes
  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, productType: initialProduct }));
    }
  }, [initialProduct]);

  // Countdown timer for OTP resend
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

  // --- Step 1: Send Mobile OTP via MsgClub Backend Service ---
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/otp/send', { mobile: mobile.trim() });
      if (res.data.success) {
        setStep(2);
        setMessage(res.data.message || 'OTP sent successfully to your mobile number.');
        if (res.data.otpPreview) {
          setOtpPreview(res.data.otpPreview);
        }
        setTimer(60);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP to mobile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP via MsgClub Backend Service ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!otp || otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code sent to your mobile.');
      return;
    }

    setLoading(true);
    try {
      const verifyRes = await API.post('/otp/verify', {
        mobile: mobile.trim(),
        otp: otp.trim(),
      });

      if (verifyRes.data.success) {
        // Authenticate or check if existing user via passwordless endpoint
        const authData = await otpUserAuth({ mobile: mobile.trim() });

        if (authData.success) {
          if (authData.isExistingUser && authData.user) {
            // Existing user: jump straight to Loan Details step
            setMessage(`Welcome back, ${authData.user.name}!`);
            setFormData((prev) => ({
              ...prev,
              fullName: authData.user.name,
              email: authData.user.email,
              mobile: authData.user.mobile,
            }));
            setStep(4);
          } else {
            // New user: proceed to Name & Email setup (Step 3)
            setMessage('Mobile verified! Please enter your name and email to continue.');
            setStep(3);
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Complete Passwordless Registration for New Users ---
  const handleNewUserRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim()) {
      setError('Please enter your full name as per PAN');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const authData = await otpUserAuth({
        mobile: mobile.trim(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
      });

      if (authData.success && authData.user) {
        setMessage('Account created successfully!');
        setFormData((prev) => ({
          ...prev,
          fullName: authData.user.name,
          email: authData.user.email,
          mobile: authData.user.mobile,
        }));
        setStep(4);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Step 4: Submit Loan Application ---
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.fullName.trim()) {
      setError('Please enter your full name as per PAN');
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
      const appRes = await API.post('/applications/apply', {
        ...formData,
        mobile: mobile || user?.mobile,
        email: email || user?.email,
      });

      if (appRes.data.success) {
        setSuccessData(appRes.data);
        setStep(5);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(user ? 4 : 1);
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
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-auto transition-all transform-gpu">
        
        {/* Prominent White Circular Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="absolute top-4 right-4 z-[120] w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center shadow-lg border border-slate-200 transition transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Top Gradient Banner with FinCRO Shield Logo */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 pt-7 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-black tracking-wider uppercase text-white">FINCORP DIGITAL LOANS</span>
            </div>

            <h3 className="text-xl font-black tracking-tight leading-tight">
              Instant Loan Approval up to <span className="text-amber-400">₹10 Lakhs</span>
            </h3>
            <p className="text-xs text-blue-200 font-medium">100% digital passwordless application with instant SMS verification.</p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[10px] font-bold">
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <Zap className="w-3 h-3 text-amber-400" /> Fast Sanction
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <FileText className="w-3 h-3 text-blue-300" /> Zero Paperwork
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-4">
          {authLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-bold">Initializing application context...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              {message && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
                  <span>ℹ️</span>
                  <span>{message}</span>
                </div>
              )}

              {/* STEP 1: MOBILE NUMBER INPUT */}
              {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Step 1 of 3</span>
                    <h4 className="text-lg font-black text-slate-900">Enter Your Mobile Number</h4>
                    <p className="text-xs text-slate-500">We will send a 6-digit SMS verification code to your mobile.</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }}
                        required
                        placeholder="9876543210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? 'Sending OTP...' : <>Send Verification OTP <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}

              {/* STEP 2: OTP VERIFICATION */}
              {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Step 2 of 3</span>
                    <h4 className="text-lg font-black text-slate-900">Verify Mobile OTP</h4>
                    <p className="text-xs text-slate-500">
                      Enter the 6-digit code sent to <strong className="text-slate-800">+91 {mobile}</strong>
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
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                    required
                    placeholder="0 0 0 0 0 0"
                    className="w-full bg-white border border-blue-300 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition"
                  />

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(''); }}
                      className="font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Change Mobile Number
                    </button>
                    
                    <button
                      type="button"
                      disabled={timer > 0 || loading}
                      onClick={handleSendOtp}
                      className={`font-bold flex items-center gap-1 cursor-pointer ${timer > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? 'Verifying OTP...' : <>Verify OTP & Continue <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}

              {/* STEP 3: NAME & EMAIL SETUP (NEW USERS ONLY) */}
              {step === 3 && (
                <form onSubmit={handleNewUserRegistration} className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Step 3 of 3</span>
                    <h4 className="text-lg font-black text-slate-900">Complete Your Profile</h4>
                    <p className="text-xs text-slate-500">Provide your basic details to link your loan application.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name (as per PAN) *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(''); }}
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? 'Creating Profile...' : <>Continue to Application Details <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}

              {/* STEP 4: LOAN APPLICATION & DOCUMENT DETAILS */}
              {step === 4 && (
                <form onSubmit={handleSubmitApplication} className="space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <div>
                      <h4 className="text-base font-black text-slate-900">Loan Details & Documents</h4>
                      <p className="text-[11px] text-slate-500">Provide financial details to receive instant bank sanction.</p>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Verified User
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">PAN Number *</label>
                      <input
                        type="text"
                        name="panNumber"
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={handleChange}
                        required
                        placeholder="ABCDE1234F"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-mono uppercase text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Monthly Income (₹) *</label>
                      <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Requested Amount (₹) *</label>
                      <input
                        type="number"
                        name="requestedAmount"
                        value={formData.requestedAmount}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-bold text-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Employment</label>
                      <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-2 text-[11px]"
                      >
                        <option value="salaried">Salaried</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="business_owner">Business Owner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Product</label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-1 py-2 text-[11px] font-bold text-blue-700"
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
                    className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? 'Submitting Application...' : <>Submit Loan Application <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              )}

              {/* STEP 5: APPLICATION SUCCESS & CONFIRMATION */}
              {step === 5 && successData && (
                <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-600">Application Submitted</span>
                    <h4 className="text-xl font-black text-slate-900 mt-1">
                      Congratulations! Your loan application has been submitted successfully.
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      A confirmation has been dispatched to your email address <strong className="text-slate-800">{formData.email}</strong>.
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
                      <span className="text-slate-500">Mobile</span>
                      <span className="font-bold text-slate-800">+91 {mobile}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Loan Product</span>
                      <span className="font-bold text-slate-800 uppercase">{formData.productType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Requested Amount</span>
                      <span className="font-bold text-emerald-600">₹{Number(formData.requestedAmount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { handleReset(); navigate('/track-status'); }}
                      className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition cursor-pointer"
                    >
                      Track Application Status
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplyModal;
