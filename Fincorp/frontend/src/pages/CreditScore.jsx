import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Gauge, Award, CheckCircle2, Lock, Zap } from 'lucide-react';
import SpeedometerGauge from '../components/SpeedometerGauge';

const CreditScore = ({ onOpenApply }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onOpenApply) {
      onOpenApply('credit_score');
    }
  };

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8faff]">
      
      {/* 1. HERO SECTION WITH LAPTOP CHECK IMAGE */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              100% FREE CREDIT HEALTH CHECK
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get Your Free Credit Score <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">In 2 Minutes</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Check your detailed credit health report from CIBIL / Equifax with zero impact on your credit score and free monthly updates.
            </p>

            {/* Quick Mobile Input Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">
                    Mobile Number (linked to PAN)
                  </label>
                  <div className="flex gap-2">
                    <div className="bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-bold text-slate-700 flex items-center justify-center shrink-0">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-smooth-animate btn-emerald-glow w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Free Credit Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Image Column (EXACT REFERENCE LAPTOP IMAGE) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md p-3 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaTB6b4R4hYTt2snRKxSrrD1j8uyxdxyW14QKcxrOTHq0RUCJMhT250XB4O3UW1IaGYdasegbiuINZv4WfAcjXK88cFh-576MDZEykt5GVoXKU7B2y3C791cF-QXMb10RYflAhwC5Xo_X7lErd-d-9CEDmwB4gcKPERrHEGtSbJVJxMnXpOOk5zQtoZrcUQpkboVNIPMoBvBXo9yW-2o3gdHvubelL8mF3W5FeMCjCPJ_Sahyl2nqcEfXms2sY-ycjEqs"
                alt="Credit score check on laptop"
                className="w-full h-auto block rounded-2xl object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. DYNAMIC SPEEDOMETER GAUGE DEMO SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8 bg-white rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">INTERACTIVE CREDIT GAUGE</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Understand Credit Ranges</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">A credit score above 750 ensures pre-approved lowest interest rates.</p>
        </div>

        <div className="flex justify-center pt-4">
          <SpeedometerGauge score={785} />
        </div>
      </section>

      {/* 3. WHY CHECK CREDIT SCORE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Check Credit Score On FinCrop?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <Lock className="w-8 h-8 text-[#0050b5]" />
            <h3 className="font-bold text-slate-900 text-base">Zero Impact On Score</h3>
            <p className="text-xs text-slate-500 font-medium">Checking your own credit score is a soft inquiry and never lowers your rating.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 stroke-[2.5]" />
            <h3 className="font-bold text-slate-900 text-base">100% Data Protection</h3>
            <p className="text-xs text-slate-500 font-medium">Your financial identity is protected using 256-bit bank grade encryption.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <Zap className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">Instant Pre-Approved Offers</h3>
            <p className="text-xs text-slate-500 font-medium">Unlock exclusive loan and credit card offers tailored to your credit band.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CreditScore;
