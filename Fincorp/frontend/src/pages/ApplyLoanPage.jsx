import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Edit2,
  Check,
  AlertCircle,
  Building2,
  Calendar,
  CreditCard,
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import API from '../services/api';
import InstantLoanScrollContent from '../components/InstantLoanScrollContent';

const lenders = [
  { name: 'Aditya Birla Capital', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD39a5MVXWjh9aQfm2QDHSUtI304dQ6w1o2mTTj9e_OJ1AilLjsA-LRyPN6ZiTcPI2pOKJW564KJnrYa1NULtph-Pg-WFEJ1iWo1YvgD_H3rzg6CYpAeX7y3EwTzgOeizj10P5aWpjNXCQ0NsXFu7-zSwN4Z1yVBut5GoKGYWpbLrnGgZhU6KEXUOw6Rl_QOpb23fjvxRfHidD6t857izkO6lwtZGJWl5M_UEoo6qkXyjdIK-lfNVs1N20xWbP2EPJh1BQ', local: '/ref-images/aditya.png' },
  { name: 'Indifi', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQKzETx7yI1F1B7EUxx4hrLnoiD63pCaC4XFoxKTgA2Z5D1XVp5ARNEaNPhSAg1tntxWn7dr6i13Sbwuf-CoAedPX-yYMcHRD2MjamlGI1I5RdAMkitC-50Ezfi7MVD_gVMKz7iByNIq9L2QkiVjAKBeWwyz22r6wSycwJDRt6Aw7l9iuabWBo8LHEzeIYG3WEQfESWJaWIUp0jH8nq-RwHV976uAfOnDiTN86bE_RPWNBzdWDp4A52PFnSn3zaeBB9Xs', local: '/ref-images/indifi.png' },
  { name: 'Tata Capital', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Q_9-vDh85JM_nFWmaFgimN2zMU7CIk2pVuvd-01aTW3GGd9Pf2LsuQuEi1vqlHwaAUdLDmr95e2PcMU6WmoL9dyd5auxCQceCLRI9lbvbupqN6kdM0YeUws4i7G3QLOV7p7TO_UJNIoVx6-3dVXSSpelA6nMYXMpyXLSSgh4kq62E6HCV5usxT1oGA96fopOO8dLZJyk6qGAUQJzsSaAR1YZdPJ1zGLX4D-zbO7AozwYoAC_iz2cYYiXQenrRtsC55E', local: '/ref-images/tatacaptial.png' },
  { name: 'IDFC FIRST Bank', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq_QM1tD4KdwO9_WeZkVsJ_hn4Yy2lE2QmYu8t9Jj1laeAzDr-7p3pIi2k8KUOxGViAMtMWduG3PcDltDQ-uJDWdC2-7Xp6sdNKCRC6KvrNiDCs-FZDnHcjWVOwo8dhfVNGcHF4yXu4ya6u5oIKaivIPyIxhCuW3INhdht1i5Ufka8WDtVBxWw78Qt0bXWAyLVeEGD-vrL8hDSRTTqkasFvbv2KdDdM5fP3XvNjO5CgS_qXrhvARDEo36Syj6XbUY5L0s', local: '/ref-images/idfc.png' },
  { name: 'SalaryOnTime', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ZFwtXgG9lXnmAbsYQQZB-ctC7uYhmZwaIK0XfmZjOP6SfwkcJQy8P_wTocy523OU54ld_4EOVdpteaJZemf_rCI-nZaTPRjiT9ScnKZoGNLKWFrVOxWq31Wm4sEYv2Ga-GL6s0E22UaeCzTVNvRfqkTBR-3EDUrkHKYSbwdP0e1g9r_wImbBFY73dnfu8ew0QF-_4P3p-D2jT4M3ye56lOi1XXojmNImsVO_QvhJXNhLmzKEqGPKl21duXSohxTGk2U', local: '/ref-images/salaryontime.png' },
  { name: 'Poonawalla Fincorp', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcOVat2Vw7iIMmL2YY6Omr1ymPmzM4FUCiwvaiWFkSSFJL3XFN7BZXxdH0IQToO5qI_n7toidukX8MLHVog3t6HZCytVTT2xqJrPozY_ZoekpcUw3rhWozFzSK37BS6f5xc-v2SCDr81SUgxcz-U0NfbDSII50EloGRE56PvMRPKG-BncOOIZTZku7uF08zpOo4eAxFoBb5y83F4o8slbyHylM1Xj0zba8wLkYEVrrvNpH8yfy3aDRxO0-6kX_2rfgT58', local: '/ref-images/poonawalla.png' },
  { name: 'Unity Bank', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkMScoa-5esneBTlRRHbDTIRMFkKLNcHYF0ffAbHLPS3bMb14uBw8auEBWYuVJuX8tvLWIizopzroJCu107_HbNC3Cp_vlEdVPVLCeei3OzU4F87qcnB26JGIfLak9g7AWPy6j26FwDT-CKmz0HPuUkGzlvmZwCa5D8A43P0zqpQB6eamuO4-wVsD__qJVhPVtbdEPlOASOMkQgPWWIyyzmb26EvOb6Wnqzml5N43z6Hyrgf-E6KSgt6r3ZGeck51r0yw', local: '/ref-images/unity.png' },
  { name: 'DMI Finance', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAREnmtZbKo_dFXG1xPpmHa9CYITvXYASxXqMEeIto7_f1yPaS1N3M9bVmIOhMKEv7cpwcKevA8SH9YjN8AHUpSFtbEI1-RgDydJcJ6BWWi6hIoXFRXrMwZY-VS_j5UDn6olnP9VExj8acpjYkKKtzT5ABxqF7It_I69S9RV62_qHdOsS3rnDmUWEVNMpZkMdHUeqzcVGgybTYWeHPONN-0EbeuC352BE5cG60Kjrdv3sAn4DqfUMrqwlrjWWpwlYkbVaM', local: '/ref-images/dmi.png' },
  { name: 'Ram Fincorp', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_5Xumc6wxIVwUSR5MxnORSaNrKeCicvO0lSTH10KxGXPfAm-V8GXyMQk9WjGngm1xki25vF-qn4zYkKyd4lmVtEJmGZagQsBko8Y8zDlDQikfxz18HemZ5Y0Q0ahjnvS-NUKY12K2nTN1nnjakD1QDADGiFnDcGubcOXAbkFNPAymQDeYsM_Uo4ieG3uC6etMFRoR3LXkB9cWYPM7DNHiG6YWLAsVpUW4KBfNNznOM9JkvVs_yQLVyGGuEjdux4AAIWg', local: '/ref-images/ramfincorp.png' },
  { name: 'LENDINGKART', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpKBAf1q9mT1xt7KxwmcbkI-6Q8QJNjU9IYZmqTPK_x4s_ol5k7asF0wr_Qxr32u6NdIyRC70ye4wieVx6k1pcNy1oLjquyDVTiWc02vIZXQSLhzgo6Wf_Y3X9dJ1fq3E69LPcygxuoEmv4mQodBy4ap9yoJLQvEwOlr_DPqyc4vDp5Xrof8duj7waO0LTCSCCYldDXu6GbAkV9RWkRRSMHhhTOsO7uG5oduq-sSUpKdfeGwINdFbiqNiNaoCBpxTZcVs', local: '/ref-images/lending.png' },
];

const ApplyLoanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation passed state
  const initialData = location.state || {};

  // Flow State: 1 = Lead, 2 = OTP, 3 = Basic Details, 4 = Employment Details, 5 = Confirmation / Offers
  const [currentStep, setCurrentStep] = useState(
    initialData.fullName && initialData.mobile ? 2 : 1
  );

  // Form Fields
  const [fullName, setFullName] = useState(initialData.fullName || '');
  const [mobileNumber, setMobileNumber] = useState(initialData.mobile || '');

  // OTP Fields
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(28);

  // Step 3 (cbform - Basic Details)
  const [panNumber, setPanNumber] = useState('FDZPS9623A');
  const [emailId, setEmailId] = useState('BLAZINGSTOREINDIA@GMAIL.COM');
  const [dob, setDob] = useState('1994-09-28');
  const [pincode, setPincode] = useState('450010');
  const [gender, setGender] = useState('Male');
  const [loanAmount, setLoanAmount] = useState('200000');

  // Step 4 (Employment Details)
  const [employmentType, setEmploymentType] = useState('Salaried');
  const [companyName, setCompanyName] = useState('Blazing Store India');
  const [monthlyIncome, setMonthlyIncome] = useState('50000');

  // Submission State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [appReferenceId, setAppReferenceId] = useState('');

  // Resend OTP Countdown
  useEffect(() => {
    let interval = null;
    if (currentStep === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [currentStep, timer]);

  // Handle OTP Inputs
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    setErrorMsg('');

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-box-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Step 1: Submit Initial Lead -> Move to OTP
  const handleStep1Submit = (e) => {
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

    setCurrentStep(2);
    setTimer(28);
    // Auto-focus first OTP box
    setTimeout(() => {
      const firstInput = document.getElementById('otp-box-0');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  // Step 2: Verify OTP
  const handleStep2VerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const fullOtp = otpValues.join('').trim();

    if (fullOtp.length !== 4) {
      setErrorMsg('Please enter the 4-digit verification OTP');
      return;
    }

    // Strict Rule: OTP 1234 works in dev/testing environment
    if (fullOtp === '1234') {
      setCurrentStep(3);
      return;
    }

    // Invalid OTP
    setErrorMsg('Invalid OTP! Please enter 1234 (Development Mode)');
  };

  const handleResendOtp = () => {
    setOtpValues(['', '', '', '']);
    setTimer(30);
    setErrorMsg('');
  };

  // Step 3: Basic Details Continue
  const handleStep3Submit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!panNumber.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(panNumber.trim())) {
      setErrorMsg('Please enter a valid 10-character PAN number (e.g. FDZPS9623A)');
      return;
    }
    if (!emailId.trim() || !/\S+@\S+\.\S+/.test(emailId.trim())) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!dob) {
      setErrorMsg('Please select your date of birth');
      return;
    }
    if (!pincode || pincode.trim().length !== 6) {
      setErrorMsg('Please enter a valid 6-digit PIN code');
      return;
    }
    if (!loanAmount || Number(loanAmount) <= 0) {
      setErrorMsg('Please enter required loan amount');
      return;
    }

    setCurrentStep(4);
  };

  // Step 4: Employment Details & Final Submission
  const handleStep4Submit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!companyName.trim()) {
      setErrorMsg('Please enter company/business name');
      return;
    }
    if (!monthlyIncome || Number(monthlyIncome) <= 0) {
      setErrorMsg('Please enter net monthly income');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: fullName.trim(),
        mobile: mobileNumber.replace(/\D/g, ''),
        email: emailId.trim().toLowerCase(),
        panNumber: panNumber.trim().toUpperCase(),
        dob,
        pincode: pincode.trim(),
        gender,
        requestedAmount: Number(loanAmount),
        employmentType: employmentType.toLowerCase(),
        companyName: companyName.trim(),
        monthlyIncome: Number(monthlyIncome),
        productType: initialData.productType || 'personal_loan',
        otp: '1234',
      };

      const res = await API.post('/applications/apply', payload);
      if (res.data.success) {
        setAppReferenceId(res.data.applicationId || `FIN-2026-${Math.floor(100000 + Math.random() * 900000)}`);
        setCurrentStep(5);
      } else {
        setErrorMsg(res.data.message || 'Failed to submit application. Please retry.');
      }
    } catch (err) {
      // In offline/mock demo scenarios, generate reference id gracefully
      const generatedId = `FIN-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setAppReferenceId(generatedId);
      setCurrentStep(5);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased flex flex-col justify-between selection:bg-blue-200">
      
      {/* ========================================================================= */}
      {/* SCREEN 1 & 2: DOTTED NAVY CURVED HEADER                                   */}
      {/* ========================================================================= */}
      {currentStep <= 2 && (
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
      )}

      {/* Top Header Information for Stepper 3 & 4 */}
      {currentStep > 2 && (
        <div className="max-w-2xl mx-auto pt-6 sm:pt-10 px-4 text-center">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Apply in minutes! <span className="text-[#0050b5]">just in few minutes!</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              We need a few details to show your best loan offers
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN CARD CONTAINER (-mt-36 matching reference)                          */}
      {/* ========================================================================= */}
      <main className={`relative z-20 px-4 mb-14 ${currentStep <= 2 ? '-mt-36' : 'mt-6'}`}>
        <div className="max-w-[530px] mx-auto bg-white rounded-[24px] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.14)] border border-slate-100 p-6 sm:p-8">
          
          {/* STEP 1: LEAD ENTRY (Exact CredBuddha Replication) */}
          {currentStep === 1 && (
            <div>
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

              <form onSubmit={handleStep1Submit} className="space-y-5">
                {/* Field 1: Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="fullName">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Full Name (as per PAN)</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-[#f8fafc]/50 text-slate-800 placeholder-slate-400 text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>

                {/* Field 2: Mobile Number */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="mobileNumber">
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
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile number"
                      required
                      className="w-full h-12 px-4 bg-transparent border-0 text-slate-800 placeholder-slate-400 text-[15px] focus:ring-0 focus:outline-none"
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
                    type="submit"
                    className="w-full h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1752c4] via-[#1e5cd9] to-[#2563eb] text-white font-semibold text-base shadow-md shadow-blue-500/25 hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 tracking-wide cursor-pointer"
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
          )}

          {/* STEP 2: OTP VERIFICATION (Clean matching card) */}
          {currentStep === 2 && (
            <div>
              {/* Progress Step Header */}
              <div className="flex items-center justify-between pb-3">
                <span className="text-[17px] font-bold text-[#0c387b]">Step 2 of 2</span>
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs sm:text-sm font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Your information is safe with us</span>
                </div>
              </div>

              {/* Progress Track */}
              <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" className="w-full bg-[#e8ecf2] h-1.5 rounded-full overflow-hidden mb-7" role="progressbar">
                <div className="bg-[#1e5cd9] h-full w-full rounded-full transition-all duration-500" />
              </div>

              <div className="space-y-6">
                {/* Verify OTP Green Notification Box */}
                <div className="bg-[#f0fbf4] border border-[#d1fae5] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Verify Your OTP</h4>
                      <p className="text-xs text-slate-500 font-medium">Sent to +91 {mobileNumber}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* 4-Digit OTP Boxes */}
                <div className="space-y-3 text-center">
                  <label className="block text-xs font-bold text-slate-700">
                    Enter 4-digit OTP
                  </label>
                  <div className="flex justify-center gap-3 sm:gap-4">
                    {otpValues.map((val, idx) => (
                      <input
                        key={idx}
                        id={`otp-box-${idx}`}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-13 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Resend OTP */}
                  <div className="text-xs text-slate-500 pt-1">
                    Didn't receive OTP?{' '}
                    {timer > 0 ? (
                      <span className="text-blue-600 font-bold">Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}</span>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        className="text-blue-600 font-bold hover:underline cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <div className="pt-1">
                    <span className="inline-block text-[11px] text-slate-400 font-medium">
                      (Development Testing Mode OTP: <strong>1234</strong>)
                    </span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  onClick={handleStep2VerifyOtp}
                  className="w-full h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1752c4] via-[#1e5cd9] to-[#2563eb] text-white font-semibold text-base shadow-md shadow-blue-500/25 hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                >
                  <span>Verify OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>OTP is 100% secure and confidential</span>
                </p>
              </div>
            </div>
          )}

        {/* ========================================================================= */}
        {/* SCREEN 3 & 4: cbform Stepper (Basic Details / Employment Details)         */}
        {/* ========================================================================= */}
        {(currentStep === 3 || currentStep === 4) && (
          <div className="rounded-3xl shadow-xl overflow-hidden border border-slate-200 bg-white animate-in fade-in duration-300">
            
            {/* Stepper Header (Matching Screenshot 3 & 4) */}
            <div className="p-6 bg-white border-b border-slate-100">
              <div className="relative flex justify-between items-center max-w-sm mx-auto">
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
                
                {/* Step 1: Basic Details */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 3 ? 'bg-[#114cc9] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                    1
                  </div>
                  <span className={`text-[11px] font-bold mt-1.5 ${currentStep === 3 ? 'text-[#114cc9]' : 'text-slate-500'}`}>
                    Basic Details
                  </span>
                </div>

                {/* Step 2: Employment Details */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 4 ? 'bg-[#114cc9] text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}>
                    2
                  </div>
                  <span className={`text-[11px] font-bold mt-1.5 ${currentStep === 4 ? 'text-[#114cc9]' : 'text-slate-500'}`}>
                    Employment Details
                  </span>
                </div>

                {/* Step 3: Unlock Offers */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">
                    🔒
                  </div>
                  <span className="text-[11px] font-bold mt-1.5 text-slate-400">
                    Unlock Offers
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Step 1 Body: Basic Details (credBuddha.com/cbform) */}
            {currentStep === 3 && (
              <form onSubmit={handleStep3Submit} className="p-6 sm:p-8 space-y-5">
                
                {/* PAN Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#114cc9]" /> PAN Number
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="Enter PAN Number"
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 uppercase focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                {/* Email ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#114cc9]" /> Email ID
                  </label>
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="Enter Email Address"
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 uppercase focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#114cc9]" /> Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                {/* Current Pincode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#114cc9]" /> Current Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit Pincode"
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                {/* Gender Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-[#114cc9]" /> Gender
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                          gender === g
                            ? 'bg-blue-50/80 border-[#114cc9] text-[#114cc9] ring-2 ring-blue-100'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${gender === g ? 'border-[#114cc9] bg-[#114cc9]' : 'border-slate-300'}`}>
                          {gender === g && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{g}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan Amount Required */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#114cc9]" /> Loan Amount Required
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                      ₹
                    </div>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter Loan Amount"
                      required
                      className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                    />
                  </div>
                </div>

                {/* 3 Trust Badges (Matching Screenshot 2 & 3) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[10px] text-slate-600 text-center font-semibold">
                  <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
                    <Building2 className="w-4 h-4 text-[#114cc9]" />
                    <span>RBI Registered NBFC Partners</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No impact on your credit score</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Used only for eligibility check</span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#114cc9] via-[#0b3fad] to-[#082f8a] hover:from-[#0b3fad] hover:to-[#06246b] text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 transition transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Continue →</span>
                </button>

              </form>
            )}

            {/* Stepper Step 2 Body: Employment Details */}
            {currentStep === 4 && (
              <form onSubmit={handleStep4Submit} className="p-6 sm:p-8 space-y-5">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Employment Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Salaried', 'Self-Employed', 'Business Owner'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEmploymentType(type)}
                        className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center text-center cursor-pointer ${
                          employmentType === type
                            ? 'bg-blue-50/80 border-[#114cc9] text-[#114cc9] ring-2 ring-blue-100'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#114cc9]" /> Company / Employer Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#114cc9]" /> Net Monthly Income
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                      ₹
                    </div>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="e.g. 50000"
                      required
                      className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-1/3 py-4 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 py-4 rounded-full bg-gradient-to-r from-[#114cc9] via-[#0b3fad] to-[#082f8a] hover:from-[#0b3fad] hover:to-[#06246b] text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 transition transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Matching Offers...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Unlock Offers</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 5: INSTANT APPROVAL & APPLICATION OFFERS UNLOCKED                  */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="rounded-3xl shadow-2xl overflow-hidden border border-emerald-200 bg-white p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                LOAN PRE-APPROVED
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Congratulations, {fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your loan application of <strong>₹{Number(loanAmount).toLocaleString('en-IN')}</strong> has been submitted successfully and matched with top lending partners.
              </p>
            </div>

            {/* Application Reference ID Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Application Reference ID</span>
              <h3 className="text-xl font-mono font-black text-[#114cc9] mt-0.5">{appReferenceId}</h3>
              <p className="text-[11px] text-slate-500 mt-1">Keep this ID to track your live status in the portal.</p>
            </div>

            {/* Matched Lender Recommendations */}
            <div className="space-y-3 pt-2 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                Top Matched Lending Partners
              </h4>
              <div className="space-y-2.5">
                {lenders.slice(0, 3).map((lender, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <img src={lender.url} alt={lender.name} className="h-6 max-w-[80px] object-contain" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{lender.name}</span>
                        <span className="text-[11px] text-emerald-600 font-semibold">98% Match • Lowest Interest</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-[#114cc9] rounded-full text-[11px] font-bold">
                      Pre-Approved
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/track-status"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#114cc9] to-[#082f8a] text-white font-extrabold text-xs uppercase tracking-wider shadow-md text-center"
              >
                Track Live Application Status
              </Link>
              <Link
                to="/"
                className="w-full py-3.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider text-center"
              >
                Back To Home
              </Link>
            </div>

          </div>
        )}

        {currentStep > 2 && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-around text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#06b6d4] text-white flex items-center justify-center text-xs shadow-xs mb-1.5">
                🛡️
              </div>
              <span className="text-xs font-bold text-slate-900">100% Safe</span>
              <span className="text-[10px] text-slate-400">& Secure</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#f97316] text-white flex items-center justify-center text-xs shadow-xs mb-1.5">
                ⏱️
              </div>
              <span className="text-xs font-bold text-slate-900">Takes 2 Min</span>
              <span className="text-[10px] text-slate-400">Quick & Easy</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs shadow-xs mb-1.5">
                👥
              </div>
              <span className="text-xs font-bold text-slate-900">2 Million+ Users</span>
              <span className="text-[10px] text-slate-400">Trusted by millions</span>
            </div>
          </div>
        )}
      </div>
    </main>

    {/* BEGIN: Lenders Section Footer Info & Original Lower Sections */}
    <div className="pt-2 text-center" data-purpose="lenders-section">
      {/* 100% UNCHANGED ORIGINAL LOWER SECTIONS & BRAND NAMES */}
      {currentStep <= 2 && <InstantLoanScrollContent />}
    </div>
  </div>
  );
};

export default ApplyLoanPage;
