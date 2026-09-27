import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight, Zap, Building2, CreditCard, Lock, Sparkles, Award, TrendingUp, Clock } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';
import SpeedometerGauge from '../components/SpeedometerGauge';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';

const Home = ({ onOpenApply }) => {
  return (
    <div className="space-y-20 pb-16 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
        
        {/* Ambient Blur Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-7">
            
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-blue-700 text-xs font-extrabold uppercase tracking-wider px-5 py-2 rounded-full shadow-xs">
              <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>EMPOWERING SMARTER BORROWING IN INDIA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08]">
              Your Smart Borrowing Partner <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600">
                — Fincorp Financial
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              A trusted partner for smarter financial decisions. Compare customized loans from 20+ RBI-approved lenders with instant digital approvals & zero application fees.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                onClick={onOpenApply}
                className="px-9 py-4.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-base shadow-xl shadow-blue-500/30 transition transform hover:-translate-y-1 active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                Apply Loan Now <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/credit-score"
                className="px-8 py-4.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-extrabold text-base shadow-sm transition hover:border-slate-300 hover:shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-500" /> Check Free Credit Score
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-extrabold text-slate-500 pt-4">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-blue-600" /> 256-Bit SSL Encrypted</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 20+ RBI Lenders</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-600" /> 10-Min Fast Sanction</span>
            </div>

          </div>

          {/* Hero Feature Visual Cards */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Left Float Glass Card */}
            <ScrollReveal className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white p-7 rounded-3xl shadow-2xl border border-slate-800 space-y-5 animate-float relative overflow-hidden" delay={0}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center text-2xl font-bold">
                  💼
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">Instant Loan Match</h4>
                  <p className="text-xs text-amber-400 font-bold">20+ Top Lending Partners</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs font-semibold text-slate-300 pt-3 border-t border-slate-800/80">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Free Monthly CRIF Credit Report
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Zero Application & Processing Surcharges
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Pre-approved Rates starting 10.49% p.a.
                </li>
              </ul>
            </ScrollReveal>

            {/* Right Card Concept */}
            <ScrollReveal className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xl flex flex-col sm:flex-row items-center gap-6 hover:shadow-2xl transition duration-300" delay={150}>
              <div className="w-28 h-52 bg-slate-950 rounded-2xl p-2.5 shrink-0 border-4 border-slate-800 shadow-xl flex flex-col justify-between text-white text-[9px] relative overflow-hidden">
                <div className="text-center font-black pt-1 text-blue-400 tracking-wider">FINCORP APP</div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-2 text-center shadow-md">
                  <span className="block font-black text-xs text-white">₹15 Lakhs</span>
                  <span className="text-[8px] text-blue-100 font-bold">Instant Disbursal</span>
                </div>
                <div className="space-y-1 font-bold">
                  <div className="bg-slate-800/90 p-1.5 rounded-lg text-slate-300 text-center">Personal Loan</div>
                  <div className="bg-slate-800/90 p-1.5 rounded-lg text-slate-300 text-center">Business Loan</div>
                </div>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block">
                  Fast & 100% Paperless
                </span>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  Seamless Digital Loan Processing with Minimum Documents
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Compare personalized loan offers, lowest EMIs, and flexible tenure terms from 12 to 84 months directly from your phone.
                </p>
                <button 
                  onClick={onOpenApply} 
                  className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 mx-auto sm:mx-0 group cursor-pointer"
                >
                  Explore Loans Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 2. LENDING PARTNERS LOGOS / MARQUEE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          TRUSTED BY LEADING RBI-REGISTERED BANKS & NBFCs
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Bajaj Finserv'].map((partner, idx) => (
            <ScrollReveal key={idx} delay={idx * 50} className="bg-white border border-slate-200/70 rounded-2xl py-4 px-3 text-center shadow-xs hover:shadow-md transition hover:border-blue-300">
              <span className="text-xs font-black text-slate-800 tracking-tight">{partner}</span>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. STATS BANNER WITH ANIMATED COUNT-UP */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                <AnimatedCounter target={100} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-400">Seamless Digital Journey</p>
            </div>
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
                <AnimatedCounter target={95} suffix="%+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-400">Strong Approval Ratio</p>
            </div>
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                <AnimatedCounter target={20} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-400">Bank Partners</p>
            </div>
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                <AnimatedCounter target={98} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-400">Client Satisfaction Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            OUR FINANCIAL SERVICES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Tailored Financial Products For Every Need
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Explore fast-track borrowing options with transparent terms, low interest rates, and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Personal Loan */}
          <ScrollReveal delay={0}>
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group h-full">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/25">
                  👤
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Fast Disbursal</span>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition mt-0.5">Personal Loan</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Access quick personal financing for medical emergencies, home renovation, travel, weddings, or debt consolidation.
                </p>
                <ul className="space-y-2 text-xs font-bold text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">✓ Loans up to ₹15 Lakhs</li>
                  <li className="flex items-center gap-2">✓ Flexible Tenure up to 5 Years</li>
                  <li className="flex items-center gap-2">✓ Interest Rates from 10.5% p.a.</li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={onOpenApply}
                  className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  Apply Personal Loan
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Business Loan */}
          <ScrollReveal delay={100}>
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group h-full">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/25">
                  🏢
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Collateral Free</span>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition mt-0.5">Business Loan</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Empower your enterprise with collateral-free business capital for inventory, equipment purchase, and expansion.
                </p>
                <ul className="space-y-2 text-xs font-bold text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">✓ Loans up to ₹50 Lakhs</li>
                  <li className="flex items-center gap-2">✓ Minimum 1 year business age</li>
                  <li className="flex items-center gap-2">✓ Sanction in under 48 hours</li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={onOpenApply}
                  className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  Apply Business Loan
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Free Credit Score */}
          <ScrollReveal delay={200}>
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group border border-slate-800 h-full">
              <div className="space-y-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center text-2xl font-bold shadow-lg">
                  🎯
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">No Credit Impact</span>
                  <h3 className="text-2xl font-black text-white mt-0.5">Free Credit Score</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Get your comprehensive CRIF / CIBIL score report instantly without impacting your credit score rating.
                </p>
                <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 space-y-1.5 text-xs font-bold">
                  <p className="text-emerald-400 flex items-center gap-1.5">✓ Free Monthly Score Refresh</p>
                  <p className="text-slate-300 flex items-center gap-1.5">✓ Custom Credit Improvement Insights</p>
                </div>
              </div>
              <div className="pt-8 relative z-10">
                <Link
                  to="/credit-score"
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg text-center block transition"
                >
                  Check Free Score Now
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 5. CREDIT SCORE BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 rounded-3xl p-8 lg:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 border border-slate-800">
          
          <div className="space-y-5 max-w-xl text-center lg:text-left">
            <span className="bg-white/15 text-blue-200 text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full inline-block border border-white/15">
              INSTANT CREDIT CHECK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Get Your Official Credit Score In 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              No hidden fees, no spam calls, no impact on score. Uncover pre-approved bank offers tailored specifically for your financial profile.
            </p>
            <div className="pt-2">
              <Link
                to="/credit-score"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition"
              >
                Get Free Credit Score <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md">
            <SpeedometerGauge />
          </div>

        </ScrollReveal>
      </section>

      {/* 6. INTERACTIVE EMI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <EMICalculator onApply={onOpenApply} />
        </ScrollReveal>
      </section>

      {/* 7. 3-STEP APPLICATION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            SIMPLE & TRANSPARENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Get Approved In 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <ScrollReveal delay={0} className="h-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-5 shadow-sm hover:shadow-xl transition duration-300 h-full">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 font-black text-2xl flex items-center justify-center mx-auto shadow-inner">
                01
              </div>
              <h3 className="text-xl font-black text-slate-950">1. Share Basic Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Fill in basic income, employment, and contact details. Our intelligent engine matches you with top bank offers in seconds.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} className="h-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-5 shadow-sm hover:shadow-xl transition duration-300 h-full">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-2xl flex items-center justify-center mx-auto shadow-inner">
                02
              </div>
              <h3 className="text-xl font-black text-slate-950">2. Select Best Offer</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Compare transparent interest rates, EMIs, tenure options, and select the deal that fits your financial goals perfectly.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} className="h-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-5 shadow-sm hover:shadow-xl transition duration-300 h-full">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-2xl flex items-center justify-center mx-auto shadow-inner">
                03
              </div>
              <h3 className="text-xl font-black text-slate-950">3. Direct Disbursal</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Complete quick online KYC verification and receive loan funds directly into your verified bank account.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
};

export default Home;


