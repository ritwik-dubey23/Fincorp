import React, { useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, TrendingUp, ShieldCheck, Zap, PhoneCall, User as UserIcon } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';

const BusinessLoan = ({ onOpenApply }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onOpenApply) {
      onOpenApply('business_loan');
    }
  };

  const businessFaqs = [
    {
      q: 'What is a Business Loan?',
      a: 'A business loan provides collateral-free capital for working capital, machinery purchase, business expansion, or inventory stock to MSMEs and commercial enterprises.',
    },
    {
      q: 'What documents are required for a Business Loan?',
      a: 'Basic documents include PAN card, Aadhaar, GST Registration certificate, business vintage proof, and last 6 months bank statement.',
    },
    {
      q: 'What is the maximum loan limit?',
      a: 'FinCrop offers business loan limits up to ₹50 Lakhs depending on business turnover and annual financial statements.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#fafbfc]">
      
      {/* 1. HERO SECTION & EXACT BUSINESS LOAN IMAGE */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Form Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0050b5]">
              BUSINESS GROWTH CAPITAL
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Collateral-Free Business Loans Up to <span className="text-[#0050b5]">₹50 Lakhs</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Empower your MSME or commercial business with working capital, machinery purchase, inventory expansion, and trade financing with minimal digital documentation.
            </p>

            {/* Quick Lead Form Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-[#0050b5]" /> Full Name / Business Owner Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter owner full name"
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
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-smooth-animate btn-brand-glow w-full py-3.5 rounded-xl bg-[#0050b5] hover:bg-[#003e8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply For Business Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Hero Image Column (EXACT REFERENCE IMAGE) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative bg-gradient-to-tr from-amber-50/50 via-slate-50 to-blue-50/40 p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7OMq7YrGTkUXstt3CAA6_WJll6XJtPieQxsRtpkty115fxcY4zjbL45oFbMiAhrmR_ezIh5tr0d6NpathGeD1RzrkFc3CRiGq07OxAzJEtQJ0mMbHnw05ZUVDiVz6LcK2JduR9wgHFSXCaFD43X30jr9IPrBvWJJ9jHUh6J-iwfzdzI-yihDCNG-wFvs8jkVScezcPZnDhTwgYFIY-fT88ArHyM4AmXF1C0h5XNGT8OKPkuHk2WVikJ6aqCtmu5NGsgo"
                alt="Business Loan"
                className="w-full h-auto block rounded-2xl object-contain shadow-md"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. APPLICATION STEPS ILLUSTRATION SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative w-full overflow-hidden rounded-3xl bg-[#161324] p-3 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkPI6XY4uzfGpJB_e2XhESUHyKMKfv575Ose4X0vQlx4JI7twrN7lLQSfjbccvsYA4T5MDztOmm_M3FMeNL_fekrdZ-71sP0a6oFwX583RHr-GMZ_veSACK15kzM3rD2EbNUqAIaK1NdSJd7MrtnbIggoc1uEdgujf7rO8hGUhuonmUnN0ga_XiOZmtMGKDDfsGz3evblW0V6wO_KFD3yzZtKsEuF4EJe-VpLBdjKWZ1McBpUSyOYGuw8Jad11n_4F8e4"
                alt="Business Loan Application Steps"
                className="w-full h-auto block rounded-2xl object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0050b5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              SMART BUSINESS LENDING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Fast Tracked Capital for MSMEs & Enterprises
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Zero Collateral Required</h4>
                  <p className="text-xs text-slate-500">Unsecured loans based purely on business performance and cashflows.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Flexible Repayment Tenure</h4>
                  <p className="text-xs text-slate-500">Choose tenures from 12 to 60 months according to cashflow cycles.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Competitive Interest Rates</h4>
                  <p className="text-xs text-slate-500">Interest rates starting from 14% p.a. based on business credit history.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. EMI CALCULATOR */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <EMICalculator onApply={() => onOpenApply && onOpenApply('business_loan')} />
      </section>

      {/* 4. CREDIT SCORE PROMO WITH REFERENCE IMAGE */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">CHECK YOUR</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0050b5]">FREE CREDIT SCORE</h3>
            <p className="text-xs text-slate-600 font-medium">Free instant business credit score health check.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeeHA-W5j4o_BKknjwWc7d1k5I36tQzpoQlXGjVFxQv_m-LupLB8LLD9GUT6yDy8TfPNokF7b4aSeRzdX3K33tHonI5TgvPT1WDV0QX9qzJAxqLM9i2gtkFO76YqQ9CP847bfY0cyG9MI-ON_e0dNJosuJ5FhkA09Uye8x-_M9M1v0cLYBKbYuLOvl20R9zuq54na2Rq_jqB8-lMfHg2LL4m0ZGtE4P36fr7fqK0KhNpgqzO5HH4U4gCg5Lq72w3gAF7w"
              alt="Free Credit Score Meter"
              className="w-32 sm:w-44 h-auto object-contain"
            />
            <button
              onClick={() => onOpenApply && onOpenApply('credit_score')}
              className="btn-smooth-animate btn-emerald-glow px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer"
            >
              Get Free Score
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Business Loan FAQs</h2>
        </div>

        <div className="space-y-4">
          {businessFaqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 flex justify-between items-center text-sm sm:text-base cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-[#0050b5] font-black text-xl">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BusinessLoan;
