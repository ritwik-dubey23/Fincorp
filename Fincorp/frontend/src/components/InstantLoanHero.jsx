import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const InstantLoanHero = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name as per official records');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    navigate('/apply-loan', {
      state: {
        fullName: fullName.trim(),
        mobile: cleanMobile,
        productType: 'personal_loan',
      },
    });
  };

  return (
    <div className="w-full">
      {/* BEGIN: Top Hero Section with Dotted Navy Curve */}
      <header className="relative bg-gradient-to-b from-[#021d4d] via-[#052968] to-[#0a357e] curved-bottom pb-44 pt-10 px-4">
        {/* Dotted Overlay */}
        <div aria-hidden="true" className="absolute inset-0 dot-pattern pointer-events-none opacity-85 curved-bottom" />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight md:leading-snug">
            Get Instant Loans<br />
            <span className="text-white">up to </span><span className="text-[#f59e0b]">₹10 Lakhs</span>
          </h1>

          {/* Value Propositions — 4 columns single row, icon + text below */}
          <div
            className="mt-6 grid grid-cols-4 items-start justify-items-center gap-x-2 text-white font-medium px-1 w-full"
            data-purpose="value-propositions"
          >
            {/* Feature 1: Instant Approval */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h7v8l11-14h-8l0-6z" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs leading-tight">Instant<br/>Approval</span>
            </div>

            {/* Feature 2: Paperless Process */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-8 h-8 rounded-full bg-[#0ea5e9] flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs leading-tight">Paperless<br/>Process</span>
            </div>

            {/* Feature 3: Quick Disbursal */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold leading-none">₹</span>
              </div>
              <span className="text-[10px] sm:text-xs leading-tight">Quick<br/>Disbursal</span>
            </div>

            {/* Feature 4: Secure & Safe */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-8 h-8 rounded-full bg-[#8b5cf6] flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs leading-tight">Secure<br/>&amp; Safe</span>
            </div>
          </div>
        </div>
      </header>
      {/* END: Top Hero Section */}

      {/* BEGIN: Main Interactive Card */}
      <div className="relative z-20 -mt-36 px-4 mb-14" data-purpose="loan-application-form-container">
        <div className="max-w-[530px] mx-auto bg-white rounded-[24px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.14)] border border-slate-100 p-6 sm:p-8">
          {/* Card Step Header */}
          <div className="flex items-center justify-between pb-3">
            <span className="text-[17px] font-bold text-[#0c387b]">Step 1 of 2</span>
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs sm:text-sm font-medium">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Your data is safe</span>
            </div>
          </div>

          {/* Progress Track */}
          <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="50" className="w-full bg-[#e8ecf2] h-1.5 rounded-full overflow-hidden mb-7" role="progressbar">
            <div className="bg-[#1e5cd9] h-full w-[24%] rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field 1: Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="heroFullName">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Full Name (as per PAN)</span>
              </label>
              <input
                className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-[#f8fafc]/50 text-slate-800 placeholder-slate-400 text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                id="heroFullName"
                name="heroFullName"
                placeholder="Enter your full name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Field 2: Mobile Number */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="heroMobileNumber">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Mobile Number</span>
              </label>
              <div className="flex rounded-lg border border-slate-200 bg-[#f8fafc]/50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent focus-within:bg-white transition">
                <span className="inline-flex items-center px-4 text-slate-800 text-[15px] font-medium border-r border-slate-200 select-none">
                  +91
                </span>
                <input
                  className="w-full h-12 px-4 bg-transparent border-0 text-slate-800 placeholder-slate-400 text-[15px] focus:ring-0 focus:outline-none"
                  id="heroMobileNumber"
                  maxLength={10}
                  name="heroMobileNumber"
                  placeholder="Enter 10-digit mobile number"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-2">
              <button
                className="w-full h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1752c4] via-[#1e5cd9] to-[#2563eb] text-white font-semibold text-base shadow-md shadow-blue-500/25 hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                type="submit"
              >
                <span>Get OTP</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Terms and Conditions text */}
            <p className="text-[11.5px] leading-relaxed text-slate-500 text-center px-2 pt-1">
              By clicking "Continue", you agree to CredBuddha's Privacy Policy, Terms &amp; Conditions, and Bureau Terms &amp; Conditions.{' '}
              <Link to="/terms" className="text-[#0e4eb5] font-semibold hover:underline">Read More</Link>
            </p>
          </form>
        </div>
      </div>
      {/* END: Main Interactive Card */}

      {/* BEGIN: Lenders Section Header */}
      <div className="pb-8 pt-2 text-center" data-purpose="lenders-section">
        <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          OUR LENDERS
        </h3>
        <p className="text-base sm:text-lg font-bold text-[#0c2e63]">
          Leading Banks and NBFCs
        </p>
      </div>
    </div>
  );
};

export default InstantLoanHero;
