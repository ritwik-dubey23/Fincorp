import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Building2,
  CreditCard,
  Lock,
  Sparkles,
  Award,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Calendar,
  FileText,
  Target,
  PhoneCall,
  RotateCcw,
  Star,
  Users,
  Briefcase,
  ShieldAlert,
  Smartphone,
  Check,
  Gauge,
} from 'lucide-react';
import EMICalculator from '../components/EMICalculator';
import SpeedometerGauge from '../components/SpeedometerGauge';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';

const Home = ({ onOpenApply }) => {
  // Hero Embedded Lead State
  const [heroName, setHeroName] = useState('');
  const [heroMobile, setHeroMobile] = useState('');
  const [creditMobile, setCreditMobile] = useState('');

  // Benefits Carousel State
  const [benefitIndex, setBenefitIndex] = useState(0);

  // Testimonials Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (onOpenApply) {
      onOpenApply('personal_loan');
    }
  };

  const handleCreditScoreSubmit = (e) => {
    e.preventDefault();
    if (onOpenApply) {
      onOpenApply('credit_score');
    }
  };

  const lenders = [
    { name: 'Hero FINCORP', code: 'HERO' },
    { name: 'InCred Finance', code: 'INCRED' },
    { name: 'indifi', code: 'INDIFI' },
    { name: 'ADITYA BIRLA CAPITAL', code: 'ABC' },
    { name: 'FlexiLoans', code: 'FLEXI' },
    { name: 'DMI FINANCE', code: 'DMI' },
    { name: 'Flot', code: 'FLOT' },
    { name: 'L&T Finance', code: 'LT' },
    { name: 'Tata Capital', code: 'TATA' },
    { name: 'Bajaj Finserv', code: 'BAJAJ' },
    { name: 'Muthoot Finance', code: 'MUTHOOT' },
    { name: 'MoneyTap', code: 'MONEYTAP' },
    { name: 'PaySense', code: 'PAYSENSE' },
    { name: 'KreditBee', code: 'KREDITBEE' },
  ];

  const benefits = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: 'Flexible Tenure',
      description: 'Select repayment tenures that suit your comfort and financial planning.',
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      title: 'Trusted Lending Partners',
      description: "Loans backed by India's leading banks and NBFCs for secure and reliable disbursals.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: 'Instant Approvals',
      description: 'Apply online and receive quick approvals with minimal documentation.',
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: '100% Paperless',
      description: 'Zero physical paperwork. Complete identity verification and KYC completely online.',
    },
  ];

  const testimonials = [
    {
      name: 'Sneha Reddy',
      role: 'Marketing Manager, Hyderabad',
      text: "I was looking for the best cashback credit card and FinCrop's comparison tool made it so easy. Applied and got approved the very same day. Excellent service!",
      initials: 'SR',
    },
    {
      name: 'Deepak Singh',
      role: 'Teacher, Jaipur',
      text: 'As a first-time borrower, I had no idea about loan eligibility. FinCrop not only checked my eligibility for free but also guided me to the best offers.',
      initials: 'DS',
    },
    {
      name: 'Kavita Nair',
      role: 'Government Employee, Chennai',
      text: 'Got my personal loan of ₹5 Lakhs approved in just 4 hours through FinCrop. The interest rate was lower than what my own bank offered.',
      initials: 'KN',
    },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-[#f8faff]" data-purpose="hero-section">
        {/* Subtle Decorative Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #0050b5 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Hero Header Tag & Titles */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-100/70 text-[#0050b5] border border-blue-200/80 shadow-xs mb-4">
              EMPOWERING SMARTER BORROWING
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Your Smart Borrowing Partner<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050b5] to-blue-700"> - FinCrop</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              A trusted partner for smarter financial decisions, offering clarity, support, and tools to move ahead. Begin your journey toward confident financial progress today.
            </p>
            
            {/* Action CTA Group */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenApply && onOpenApply('personal_loan')}
                className="btn-smooth-animate btn-brand-glow px-8 py-3.5 bg-[#0050b5] hover:bg-[#003e8c] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#playstore"
                className="btn-smooth-animate btn-dark-glow px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center gap-2.5 shadow-md"
              >
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Play Store</span>
              </a>
            </div>
          </div>

          {/* Hero Phone Mockup with Floating Callout Card & Embedded Quick Apply Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto mt-8">
            
            {/* Left Mockup & Floating Card (Column 7) */}
            <div className="lg:col-span-7 relative flex justify-center items-center">
              
              {/* Floating Info Card (Desktop) */}
              <div className="hidden sm:block absolute -left-4 lg:-left-6 top-8 z-20 bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-white/10 max-w-[240px]">
                <div className="flex items-center gap-2 text-xs text-blue-200 mb-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="font-bold">Find Your Ideal Match</span>
                </div>
                <p className="text-sm font-black text-white mb-3">20+ Verified Lending Partners</p>
                <div className="space-y-2 text-xs text-slate-200 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Free Credit Score Access
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> No Application Fee
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Smart Rate Comparison
                  </div>
                </div>
              </div>

              {/* Phone Device Container */}
              <div className="relative w-64 sm:w-72 rounded-[44px] p-3 bg-gradient-to-b from-slate-700 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,35,90,0.3)] border-4 border-slate-300">
                <div className="relative bg-white rounded-[36px] overflow-hidden pt-4 pb-6 px-4 flex flex-col items-center min-h-[440px] border border-slate-200">
                  {/* Notch Pill */}
                  <div className="w-24 h-4 bg-slate-900 rounded-full mb-3" />
                  
                  {/* In-App Header */}
                  <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-medium">Hi, User!</span>
                      <span className="font-bold text-slate-800">Welcome Back</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0050b5] flex items-center justify-center font-black">
                      FC
                    </div>
                  </div>

                  {/* In-App Loan Match Card */}
                  <div className="w-full mt-4 p-3 bg-gradient-to-br from-[#0050b5] to-blue-700 rounded-xl text-white shadow-md">
                    <span className="text-[10px] text-blue-200 tracking-wide uppercase font-bold">Pre-Approved Offer</span>
                    <p className="text-lg font-black mt-0.5">₹ 5,00,000</p>
                    <div className="mt-2 flex justify-between items-center text-[10px] text-blue-100">
                      <span>Interest from 10.49%</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded font-bold">Instant</span>
                    </div>
                  </div>

                  {/* In-App Category Tiles */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-3">
                    <div className="p-2.5 bg-slate-50 rounded-lg text-center border border-slate-100">
                      <Zap className="w-4 h-4 text-[#0050b5] mx-auto mb-1" />
                      <span className="block text-[11px] font-bold text-slate-700">Personal</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg text-center border border-slate-100">
                      <Building2 className="w-4 h-4 text-[#0050b5] mx-auto mb-1" />
                      <span className="block text-[11px] font-bold text-slate-700">Business</span>
                    </div>
                  </div>

                  {/* Credit Score Dial Preview */}
                  <div className="mt-3 w-full p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500 font-medium">Your Credit Score</span>
                    <p className="text-base font-extrabold text-[#0050b5]">785 <span className="text-[10px] text-emerald-600 font-bold">Excellent</span></p>
                  </div>

                  <button
                    onClick={() => onOpenApply && onOpenApply('personal_loan')}
                    className="btn-smooth-animate btn-brand-glow mt-4 w-full py-2 bg-[#0050b5] text-white rounded-lg text-xs font-extrabold shadow cursor-pointer"
                  >
                    Check Offers
                  </button>
                </div>
              </div>

            </div>

            {/* Right Quick Lead Apply Card (Column 5) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 text-slate-900 shadow-xl border border-slate-200/80 relative">
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#0050b5] uppercase tracking-wider text-xs">Instant Loan Eligibility</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Digital
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-[#0050b5] rounded-full" />
                  </div>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                      <UserIcon className="w-3.5 h-3.5 text-[#0050b5]" /> Full Name (as per PAN)
                    </label>
                    <input
                      type="text"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-[#0050b5]" /> Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-bold text-slate-700 flex items-center justify-center shrink-0">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={heroMobile}
                        onChange={(e) => setHeroMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit mobile"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-smooth-animate btn-brand-glow w-full py-3.5 rounded-xl bg-[#0050b5] hover:bg-[#003e8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Get Instant OTP Offers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 font-medium leading-normal text-center pt-1">
                    By clicking, you agree to FinCrop's{' '}
                    <Link to="/privacy" className="text-[#0050b5] hover:underline">Privacy Policy</Link> &{' '}
                    <Link to="/terms" className="text-[#0050b5] hover:underline">Terms</Link>.
                  </p>
                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. METRIC COUNTER STRIP */}
      <section className="bg-slate-950 text-white py-10 relative border-y border-slate-800" data-purpose="metrics-counter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            <div className="px-4 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter end={100} duration={2} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1.5 uppercase tracking-wide">Seamless Digital Journey</p>
            </div>
            <div className="px-4 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter end={95} duration={2} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1.5 uppercase tracking-wide">Strong Approval Performance</p>
            </div>
            <div className="px-4 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter end={100} duration={2} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1.5 uppercase tracking-wide">Complete Online Processing</p>
            </div>
            <div className="px-4 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter end={98} duration={2} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-bold mt-1.5 uppercase tracking-wide">Client Satisfaction Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTINUOUS MOVING LENDERS MARQUEE */}
      <section className="py-10 bg-slate-50 border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">OUR TRUSTED LENDING PARTNERS</span>
        </div>

        {/* Continuous Infinite Marquee Track */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee space-x-4">
            {/* Duplicated Lender List for Infinite Loop */}
            {[...lenders, ...lenders].map((lender, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 hover:border-[#0050b5] rounded-xl px-6 py-3.5 shadow-xs hover:shadow-md transition cursor-pointer shrink-0 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0050b5] font-black flex items-center justify-center text-xs">
                  {lender.code.substring(0, 2)}
                </div>
                <span className="text-xs font-black text-slate-800 tracking-tight whitespace-nowrap">{lender.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED LOAN PRODUCTS */}
      <section className="py-12 bg-white" id="featured-loans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Card 1: Personal Loan */}
            <ScrollReveal className="bg-gradient-to-b from-blue-50/60 to-[#f8faff] rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft shadow-card-hover flex flex-col justify-between" id="personal-loan">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0050b5] text-white flex items-center justify-center text-xl shadow-md mb-6">
                  <UserIcon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Personal Loan
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Access quick personal financing for important life moments - from medical needs to travel and everyday goals.
                </p>
                <button
                  onClick={() => onOpenApply && onOpenApply('personal_loan')}
                  className="btn-smooth-animate btn-primary-glow inline-flex items-center gap-2 px-7 py-3 bg-[#0050b5] hover:bg-[#003e8c] text-white font-bold text-sm rounded-xl shadow cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200/80 bg-white">
                <div className="h-44 sm:h-52 bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center text-center p-6 border-t border-amber-100">
                  <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl font-mono font-bold text-base sm:text-lg tracking-wider shadow-inner uppercase mb-2">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-600" /> [ PERSONAL LOAN ]
                  </div>
                  <span className="text-xs text-slate-600 font-bold">Quick approval • Flexible repayment • 100% digital</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Business Loan */}
            <ScrollReveal delay={100} className="bg-gradient-to-b from-blue-50/60 to-[#f8faffに入っ] rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft shadow-card-hover flex flex-col justify-between" id="business-loan">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl shadow-md mb-6">
                  <Building2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Business Loan
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Empower your business with flexible funding designed for expansion, working capital, and new growth opportunities.
                </p>
                <button
                  onClick={() => onOpenApply && onOpenApply('business_loan')}
                  className="btn-smooth-animate btn-primary-glow inline-flex items-center gap-2 px-7 py-3 bg-[#0050b5] hover:bg-[#003e8c] text-white font-bold text-sm rounded-xl shadow cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200/80 bg-white">
                <div className="h-44 sm:h-52 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center text-center p-6 border-t border-blue-100">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-xl font-mono font-bold text-base sm:text-lg tracking-wider shadow-inner uppercase mb-2">
                    <Briefcase className="w-4 h-4 text-blue-700" /> [ BUSINESS LOAN ]
                  </div>
                  <span className="text-xs text-slate-600 font-bold">Collateral-free options • Fast disbursal • High limits</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE FINCROP */}
      <section className="py-16 bg-[#fbfdff]" id="why-choose">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0050b5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                WHY CHOOSE FINCROP
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                A Smarter Way To Access The Right Financial Solutions
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                FinCrop helps you navigate lending with clarity and confidence. Compare trusted lenders, check your eligibility instantly, and choose solutions designed to support your financial progress.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenApply && onOpenApply('personal_loan')}
                  className="btn-smooth-animate btn-primary-glow inline-flex items-center gap-2 px-7 py-3.5 bg-[#0050b5] hover:bg-[#003e8c] text-white font-bold text-sm rounded-xl shadow-md cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ScrollReveal className="p-6 bg-white rounded-2xl border border-slate-100 shadow-soft hover:border-blue-300 transition duration-200">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">End-to-End Digital Journey</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Apply, verify, and receive funds through a fully digital process. No physical paperwork or in-person visits required.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={100} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-soft hover:border-blue-300 transition duration-200">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Effortless Application</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  A streamlined platform built for simplicity. Compare options and apply for loans with confidence.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={150} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-soft hover:border-blue-300 transition duration-200">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Eligibility & Approvals</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Check your loan eligibility instantly and connect with trusted lenders for fast approval updates.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-soft hover:border-blue-300 transition duration-200">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">24/7 Support</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Our expert team is ready around the clock to assist you via phone or email whenever needed.
                </p>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 6. OUR FINANCIAL SERVICES (NAVY WATERMARK SECTION) */}
      <section className="py-20 bg-[#0b1b36] relative text-white overflow-hidden" id="financial-services">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[120px] sm:text-[180px] lg:text-[240px] font-black text-white/[0.03] tracking-wider uppercase font-sans">
            Services
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 text-blue-200 border border-white/10 mb-4">
              OUR FINANCIAL SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Essential Tools To Support Your Financial Progress
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1 */}
            <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-xl flex flex-col justify-between border-t-4 border-[#0050b5]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0050b5] text-white flex items-center justify-center text-xl mb-4">
                  <UserIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Personal Loan</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  Access quick personal funding for important life needs - from medical costs to travel and everyday plans.
                </p>
              </div>
              <button
                onClick={() => onOpenApply && onOpenApply('personal_loan')}
                className="btn-smooth-animate btn-primary-glow w-full py-2.5 text-center text-xs font-bold text-white bg-[#0050b5] rounded-lg cursor-pointer"
              >
                Apply Here
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-xl flex flex-col justify-between border-t-4 border-blue-700">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Business Loan</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  Smart business financing designed to support growth, working capital, and new investment opportunities.
                </p>
              </div>
              <button
                onClick={() => onOpenApply && onOpenApply('business_loan')}
                className="btn-smooth-animate btn-primary-glow w-full py-2.5 text-center text-xs font-bold text-white bg-[#0050b5] rounded-lg cursor-pointer"
              >
                Apply Here
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-xl flex flex-col justify-between border-t-4 border-emerald-500">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl mb-4">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Free Credit Score</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  Get your credit score instantly online at no cost and discover practical tips to improve your credit profile.
                </p>
              </div>
              <button
                onClick={() => onOpenApply && onOpenApply('credit_score')}
                className="btn-smooth-animate btn-emerald-glow w-full py-2.5 text-center text-xs font-bold text-white bg-emerald-600 rounded-lg cursor-pointer"
              >
                Free Score
              </button>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-xl flex flex-col justify-between border-t-4 border-amber-500">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl mb-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Credit Cards</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  Explore leading credit cards with cashback, rewards, and travel advantages tailored to your lifestyle.
                </p>
              </div>
              <Link
                to="/credit-cards"
                className="btn-smooth-animate btn-primary-glow w-full py-2.5 text-center text-xs font-bold text-white bg-[#0050b5] rounded-lg block"
              >
                Explore Cards
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. LOAN PLANNER & EMI CALCULATOR */}
      <section className="py-16 bg-white" id="calculators">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-slate-100 text-slate-700 mb-3">
              FINANCE TOOLS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Loan Planner
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Use our free calculators to understand your loan better. Check EMI estimates, eligibility, interest costs, and repayment options.
            </p>
          </div>

          <ScrollReveal>
            <EMICalculator onApply={onOpenApply} />
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CREDIT SCORE CTA BANNER */}
      <section className="py-12 bg-[#f8faff]" id="credit-score">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#0d3b84] via-[#1151b5] to-[#2575fc] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="max-w-xl z-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Get Your Free Credit Score<br />In Just 2 Minutes
              </h2>
              <p className="text-blue-100 text-sm font-normal">
                Check comprehensive credit health report with zero impact on your credit score.
              </p>

              <form onSubmit={handleCreditScoreSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={creditMobile}
                    onChange={(e) => setCreditMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter mobile number"
                    required
                    className="w-full pl-14 pr-4 py-3 bg-white text-slate-900 placeholder-slate-400 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none border-0 shadow"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-smooth-animate btn-emerald-glow px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow whitespace-nowrap cursor-pointer"
                >
                  Get Free Score
                </button>
              </form>
            </div>

            <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
              <div className="w-52 sm:w-60 h-40 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 flex flex-col items-center justify-center text-center shadow-inner">
                <Gauge className="w-10 h-10 text-emerald-300 mb-1.5" />
                <span className="text-[11px] uppercase tracking-widest text-blue-200 font-bold">Credit Health</span>
                <span className="text-2xl font-black text-white">790 / 900</span>
                <span className="text-[11px] text-emerald-300 font-bold mt-0.5">Excellent Status</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. EASY 3-STEP PROCESS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-50 text-[#0050b5] mb-3">
              APPLY IN 3 STEPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get Loan Approved In 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl shadow-lg mb-6 ring-8 ring-blue-50">
                <UserIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Step 1: Share Basic Details</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Enter key details like income, employment status, and loan requirement. The quick form takes less than two minutes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#0050b5] text-white flex items-center justify-center text-2xl shadow-lg mb-6 ring-8 ring-blue-50">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Step 2: Review Loan Options</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Receive tailored offers from leading lenders instantly. Compare rates, EMIs, fees, and repayment terms effortlessly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-lg mb-6 ring-8 ring-blue-50">
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Step 3: Complete & Receive Funds</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Confirm your preferred offer, finish simple e-KYC, and get funds credited to your bank account directly.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 10. CUSTOMER TESTIMONIALS */}
      <section className="py-16 bg-[#f8faff]" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-slate-200/60 text-slate-700 mb-3">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 gap-1 text-sm mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 italic font-medium">
                    "{item.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0050b5] font-black flex items-center justify-center text-sm">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SECURITY & TRUST */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-slate-100 text-slate-700 mb-3">
              SAFE & SECURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Millions Prefer FinCrop
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">RBI Compliant</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                We partner only with lenders regulated by the Reserve Bank of India.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">256-Bit SSL Encryption</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Your data is protected with bank-grade security and encryption protocols.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">100% Paperless</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No branch visits or physical forms. Complete everything from home.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0050b5] flex items-center justify-center text-xl mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Transparent Rates</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No hidden costs or hidden processing fees. Complete clarity upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
