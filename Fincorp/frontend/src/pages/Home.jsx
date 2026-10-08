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
} from 'lucide-react';
import EMICalculator from '../components/EMICalculator';
import SpeedometerGauge from '../components/SpeedometerGauge';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';

const Home = ({ onOpenApply }) => {
  // Hero Embedded Lead State
  const [heroName, setHeroName] = useState('');
  const [heroMobile, setHeroMobile] = useState('');

  // Benefits Carousel State (Screenshot 3)
  const [benefitIndex, setBenefitIndex] = useState(0);

  // Testimonials Carousel State (Screenshot 5)
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (onOpenApply) {
      onOpenApply('personal_loan');
    }
  };

  const benefits = [
    {
      icon: <Calendar className="w-10 h-10 text-blue-600" />,
      title: 'Flexible Tenure',
      description: 'Select repayment tenures that suit your comfort and financial planning.',
    },
    {
      icon: <Building2 className="w-10 h-10 text-blue-600" />,
      title: 'Trusted Lending Partners',
      description: "Loans backed by India's leading banks and NBFCs for secure and reliable disbursals.",
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: 'Instant Approvals',
      description: 'Apply online and receive quick approvals with minimal documentation.',
    },
    {
      icon: <Lock className="w-10 h-10 text-blue-600" />,
      title: '100% Paperless',
      description: 'Zero physical paperwork. Complete identity verification and KYC completely online.',
    },
  ];

  const testimonials = [
    {
      name: 'Ravi Kumar',
      role: 'Personal Loan Customer',
      text: 'Got my personal loan approved and disbursed within 24 hours. Very smooth experience and completely transparent rates!',
    },
    {
      name: 'Neha Sharma',
      role: 'Home Loan Customer',
      text: 'FinCRO helped me compare pre-approved loan offers across 5 top lenders. The team guided me through the entire process.',
    },
    {
      name: 'Arjun Mehta',
      role: 'Business Loan Customer',
      text: 'Got collateral-free business loan capital to expand my retail inventory. Highly recommended for all Indian entrepreneurs!',
    },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Urbanist',sans-serif]">
      
      {/* 1. HERO SECTION — EXACT MATCH TO SCREENSHOT 1 */}
      <section className="relative bg-gradient-to-r from-[#072448] via-[#0d3b66] to-[#1e40af] text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        
        {/* Fine Dot Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                  Get Instant Loans <br />
                  <span className="text-white">up to </span>
                  <span className="text-[#fbbf24] drop-shadow-md">₹10 Lakhs</span>
                </h1>
                <p className="text-base sm:text-lg text-blue-100 font-medium leading-relaxed max-w-xl">
                  Simple, fast and 100% digital loan process. Check your eligibility in just 30 seconds.
                </p>
              </div>

              {/* 4 Feature Pills Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Zap className="w-4 h-4 fill-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">Instant Approval</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">Paperless Process</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <span className="text-xs font-bold">₹</span>
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">Quick Disbursal</span>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">Secure & Safe</span>
                </div>

              </div>

              {/* Privacy Banner Box (Bottom Left) */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg max-w-xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <p className="text-xs text-blue-100 font-semibold leading-relaxed">
                  We value your privacy and keep your data <strong className="text-white font-extrabold">100% safe and confidential</strong>.
                </p>
              </div>

            </div>

            {/* Right Hero Column — Embedded Apply Lead Card (Matching Screenshot 1) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-7 text-slate-900 shadow-2xl border border-slate-100 relative">
                
                {/* Card Top Progress Bar */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-blue-900 uppercase tracking-wider text-xs">Step 1 of 2</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Your data is safe
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-blue-600 rounded-full transition-all duration-500" />
                  </div>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                      <UserIcon className="w-3.5 h-3.5 text-blue-600" /> Full Name (as per PAN)
                    </label>
                    <input
                      type="text"
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>

                  {/* Field 2: Mobile Number */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600" /> Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-3.5 text-sm font-bold text-slate-700 flex items-center justify-center shrink-0">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={heroMobile}
                        onChange={(e) => setHeroMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit mobile number"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#0d3b66] via-blue-700 to-[#1e40af] hover:from-blue-800 hover:to-blue-900 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Get OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Terms & Conditions Disclaimer */}
                  <p className="text-[11px] text-slate-400 font-medium leading-normal text-center pt-2">
                    By clicking "Continue", you agree to FinCRO's{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>,{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>, and Bureau Terms & Conditions.{' '}
                    <span className="text-blue-600 font-bold cursor-pointer hover:underline">Read More</span>
                  </p>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR LENDERS SECTION — EXACT MATCH TO SCREENSHOT 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">OUR LENDERS</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Leading Banks and NBFCs
          </h2>
        </div>

        {/* Lender Logo Pill Cards Grid / Marquee */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
          {[
            'Hero FINCORP',
            'InCred Finance',
            'indifi',
            'ADITYA BIRLA CAPITAL',
            'FlexiLoans',
            'DMI FINANCE',
            'Flot',
            'L&T Finance',
            'Tata Capital',
            'Bajaj Finserv',
            'Muthoot Finance',
            'MoneyTap',
            'PaySense',
            'KreditBee',
          ].map((partner, idx) => (
            <ScrollReveal key={idx} delay={idx * 30} className="bg-white border border-slate-200/80 rounded-2xl py-4 px-3 text-center shadow-xs hover:shadow-md transition hover:border-blue-400 cursor-pointer">
              <span className="text-xs font-black text-slate-800 tracking-tight">{partner}</span>
            </ScrollReveal>
          ))}
        </div>

        {/* 2 Blue Gradient Feature Banner Cards (Bottom of Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
          
          <ScrollReveal delay={100} className="bg-gradient-to-r from-[#0c356a] to-[#279eff] text-white p-7 rounded-3xl shadow-xl flex items-center justify-between gap-4">
            <div className="space-y-2 max-w-sm">
              <h3 className="text-xl font-black">Partner with Leading Lenders</h3>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                We collaborate with Reputed Leading Banks, NBFCs, and fintech institutions to provide a wide range of loan options in one place.
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="bg-gradient-to-r from-[#0c356a] to-[#279eff] text-white p-7 rounded-3xl shadow-xl flex items-center justify-between gap-4">
            <div className="space-y-2 max-w-sm">
              <h3 className="text-xl font-black">Trusted Lending Partners</h3>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                Access loans from India's most trusted financial institutions with competitive rates tailored to your requirements.
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-white stroke-[2.5]" />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. LOAN FEATURES ("GET THE RIGHT BENEFITS") — EXACT MATCH TO SCREENSHOT 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">LOAN FEATURES</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Get the Right Benefits
          </h2>
        </div>

        {/* Benefits Carousel Slider */}
        <div className="relative max-w-5xl mx-auto flex items-center gap-4">
          
          <button
            onClick={() => setBenefitIndex((prev) => (prev === 0 ? benefits.length - 1 : prev - 1))}
            className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shadow-md transition cursor-pointer shrink-0"
            aria-label="Previous Benefit"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {benefits.slice(benefitIndex, benefitIndex + 3).concat(benefits.slice(0, Math.max(0, (benefitIndex + 3) - benefits.length))).map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-4 shadow-sm hover:shadow-xl transition duration-300">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <button
            onClick={() => setBenefitIndex((prev) => (prev + 1) % benefits.length)}
            className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shadow-md transition cursor-pointer shrink-0"
            aria-label="Next Benefit"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {benefits.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBenefitIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === benefitIndex ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </section>

      {/* 4. "SEE FINCRO IN ACTION" — EXACT MATCH TO SCREENSHOT 4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text & Feature Cards */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              See FinCRO in Action
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Discover how FinCRO helps you unlock pre-approved offers in minutes. Complete a simple digital application, get matched with trusted partners, and choose the best offer tailored to your profile — all through a fast, secure, and paperless process.
            </p>

            {/* 3 Color Feature Blocks Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Card 1: Purple */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-5 rounded-2xl shadow-lg space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-black">Smart Offer Matching</h4>
                <p className="text-[11px] text-purple-100 font-medium leading-tight">
                  Instantly matched with lenders based on your profile and eligibility.
                </p>
              </div>

              {/* Card 2: Green */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-lg space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <h4 className="text-sm font-black">Quick & Secure Process</h4>
                <p className="text-[11px] text-emerald-100 font-medium leading-tight">
                  Complete your verification and documentation online in minutes.
                </p>
              </div>

              {/* Card 3: Red/Pink */}
              <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white p-5 rounded-2xl shadow-lg space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <h4 className="text-sm font-black">Fast Disbursal</h4>
                <p className="text-[11px] text-rose-100 font-medium leading-tight">
                  Get approved and receive money quickly without unnecessary delays.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column Illustration Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-blue-50 to-white p-8 rounded-3xl border border-slate-200/80 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
                <Building2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-blue-600 tracking-wider">FINCRO APP ENGINE</span>
                <h3 className="text-2xl font-black text-slate-900">Instant Sanction</h3>
                <p className="text-xs text-slate-500 font-medium">100% digital loan matching with 20+ RBI lenders</p>
              </div>
              <button
                onClick={onOpenApply}
                className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
              >
                Apply Loan Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS (EXACT MATCH TO SCREENSHOT 5) */}
      <section className="bg-gradient-to-b from-[#0d3b66] to-[#1e40af] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-blue-200">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">What Our Customers Say</h2>
          </div>

          <div className="relative max-w-4xl mx-auto flex items-center gap-4">
            
            <button
              onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 text-slate-900">
              {testimonials.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 text-left space-y-4 shadow-xl flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                    "{item.text}"
                  </p>
                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-blue-600 font-bold">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <span key={idx} className={`w-2 h-2 rounded-full ${idx === testimonialIndex ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. CREDIT SCORE & EMI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal>
          <EMICalculator onApply={onOpenApply} />
        </ScrollReveal>
      </section>

    </div>
  );
};

export default Home;
