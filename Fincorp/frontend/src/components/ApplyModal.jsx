import React, { useState } from 'react';
import { X, CheckCircle, Lock, Zap, FileText, IndianRupee, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import API from '../services/api';

const ApplyModal = ({ isOpen, onClose, initialProduct = 'personal_loan' }) => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpPreview, setOtpPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

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

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.fullName.trim()) {
      setError('Please enter your full name as per PAN');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/otp/send', { mobile: formData.mobile });
      if (res.data.success) {
        setOtpSent(true);
        if (res.data.otpPreview) {
          setOtpPreview(res.data.otpPreview);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp || otp.length < 4) {
      setError('Please enter the verification OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/otp/verify', { mobile: formData.mobile, otp });
      if (res.data.success) {
        setOtpVerified(true);
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit Application
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.email || !formData.panNumber || !formData.monthlyIncome || !formData.requestedAmount) {
      setError('Please fill in all mandatory details');
      return;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      setError('Invalid PAN format. Must be 10 characters (e.g. ABCDE1234F)');
      return;
    }

    if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
      setError('Aadhaar number must be exactly 12 digits');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/applications/apply', formData);
      if (res.data.success) {
        setSuccessData(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setOtpSent(false);
    setOtpVerified(false);
    setOtp('');
    setSuccessData(null);
    onClose();
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) handleReset();
      }}
      className="fixed inset-0 z-[110] overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-auto">
        
        {/* Prominent White Circular Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="absolute top-4 right-4 z-[120] w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 flex items-center justify-center shadow-lg border border-slate-200 transition transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Top Gradient Banner (Matching screenshot 192342) */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 pt-7 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-black tracking-tight">
              Get Instant Loans up to <span className="text-amber-400">₹10 Lakhs</span>
            </h3>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-semibold">
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <Zap className="w-3 h-3 text-amber-400" /> Instant Approval
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <FileText className="w-3 h-3 text-blue-300" /> Paperless Process
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <IndianRupee className="w-3 h-3 text-emerald-400" /> Quick Disbursal
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <Lock className="w-3 h-3 text-purple-300" /> Secure & Safe
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          
          {/* SUCCESS SCREEN */}
          {successData ? (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Application Submitted</span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">Congratulations!</h4>
                <p className="text-xs text-slate-500 mt-1">Your loan application has been registered successfully.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-200/60 pb-2">
                  <span>Application Reference ID</span>
                  <span className="font-mono font-extrabold text-blue-600 text-sm">{successData.applicationId}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 pt-1">
                  <span>Applicant Name</span>
                  <span className="font-bold text-slate-800">{formData.fullName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Requested Amount</span>
                  <span className="font-bold text-slate-800">₹{Number(formData.requestedAmount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Initial Status</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold text-[11px]">Submitted</span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                You can track your application status anytime using your mobile number <strong className="text-slate-700">{formData.mobile}</strong> or Reference ID.
              </p>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Header Progress Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Step {step} of 2
                  </span>
                  <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
                  </div>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Your data is safe
                </span>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* STEP 1: MOBILE & NAME */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name (as per PAN) *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl px-3.5 flex items-center text-sm font-bold text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                        disabled={otpSent}
                        className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition disabled:opacity-75"
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-blue-900 uppercase">
                          Enter 6-Digit OTP *
                        </label>
                        {otpPreview && (
                          <span className="text-[11px] font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                            Demo OTP: <strong>{otpPreview}</strong>
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        placeholder="e.g. 555555"
                        className="w-full bg-white border border-blue-300 rounded-xl px-4 py-2.5 text-center font-mono text-lg font-bold text-slate-900 tracking-widest focus:outline-none focus:border-blue-600"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">OTP valid for 5 minutes</span>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Resend OTP
                        </button>
                      </div>
                    </div>
                  )}

                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition"
                    >
                      {loading ? 'Sending OTP...' : <>Get OTP <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP & Continue'}
                    </button>
                  )}

                  <p className="text-[11px] text-slate-400 text-center leading-tight">
                    By clicking "Continue", you agree to Fincorp's Privacy Policy, Terms & Conditions, and Credit Bureau Terms.
                  </p>
                </div>
              )}

              {/* STEP 2: FULL FINANCIAL DETAILS */}
              {step === 2 && (
                <form onSubmit={handleSubmitApplication} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
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
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Aadhaar Number</label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        maxLength={12}
                        placeholder="12 digit number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Employment Type *</label>
                      <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                      >
                        <option value="salaried">Salaried</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="business_owner">Business Owner</option>
                      </select>
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold text-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="400001"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Product</label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-[11px] font-bold text-blue-700"
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
                    className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition"
                  >
                    {loading ? 'Processing Application...' : 'Submit Application Now'}
                  </button>
                </form>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
