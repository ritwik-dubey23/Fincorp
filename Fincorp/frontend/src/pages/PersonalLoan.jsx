import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Lock, DollarSign, Clock, User as UserIcon, PhoneCall, HelpCircle } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';
import InstantLoanHero from '../components/InstantLoanHero';

const PersonalLoan = ({ onOpenApply }) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What is a Personal Loan?',
      a: 'A personal loan is an unsecured loan provided by banks and NBFCs without needing any collateral security. It can be used for any legitimate financial purpose such as medical costs, education, travel, or debt consolidation.',
    },
    {
      q: 'What is the minimum and maximum loan amount I can get?',
      a: 'You can apply for personal loans ranging from ₹25,000 up to ₹15 Lakhs depending on your monthly income, employer profile, and credit score.',
    },
    {
      q: 'How quickly is the loan amount disbursed?',
      a: 'Once your e-KYC and digital agreement are verified, loan disbursal takes between 2 to 24 hours directly into your registered bank account.',
    },
    {
      q: 'Will checking my loan eligibility impact my credit score?',
      a: 'No! Checking your loan eligibility on FinCrop is a soft credit check and has zero impact on your credit score.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8fafc]">
      
      {/* 1. HERO SECTION & FORM (Exact Updated Upper Instant Loan Section) */}
      <InstantLoanHero />

      {/* 2. SMART ADVANTAGES & ELIGIBILITY DUAL CARDS */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Advantages */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft relative pt-12">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border border-[#0050b5] text-[#0050b5] text-xs font-black uppercase tracking-wider shadow-xs">
              Smart Loan Advantages
            </div>
            <p className="text-slate-600 text-sm border-b border-slate-100 pb-5 mb-6 font-medium">
              Benefit from our highly competitive and transparent personal loan features:
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0050b5] shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">100% Digital Process:</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Apply and complete paperless documentation online.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0050b5] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">No Hidden Charges:</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Enjoy complete transparency with zero hidden processing costs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0050b5] shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Attractive Interest Rates:</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Competitive interest rates customized to your financial profile.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Eligibility */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft relative pt-12">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border border-[#0050b5] text-[#0050b5] text-xs font-black uppercase tracking-wider shadow-xs">
              Personal Loan Eligibility
            </div>
            <p className="text-slate-600 text-sm border-b border-slate-100 pb-5 mb-6 font-medium">
              You must meet the following criteria for an instant personal loan:
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0050b5] shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Occupation:</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Salaried or Self-Employed individuals with steady income.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0050b5] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Age Limit:</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Your age should be between 21 to 60 years.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0050b5] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Documents Required:</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Aadhaar & PAN numbers for instant application verification.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SALARY-WISE LOAN ELIGIBILITY TABLE */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#0050b5] text-xs font-bold uppercase tracking-wider">
              LOAN ESTIMATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Salary-Wise Personal <br />Loan Eligibility
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
              Find out how much personal loan you may be eligible for based on monthly salary. Your final loan sanction depends on credit score and repayment capacity.
            </p>
          </div>

          <div className="lg:col-span-6 overflow-hidden rounded-3xl shadow-md border border-slate-200 bg-white">
            <div className="grid grid-cols-2 bg-slate-950 text-white py-4 px-6 text-sm font-bold">
              <div>Monthly Salary</div>
              <div className="text-right">Estimated Loan Amount</div>
            </div>
            <div className="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
              <div className="grid grid-cols-2 py-4 px-6 hover:bg-slate-50 transition">
                <div>₹20,000</div>
                <div className="text-right text-[#0050b5] font-extrabold">₹2 Lakhs</div>
              </div>
              <div className="grid grid-cols-2 py-4 px-6 hover:bg-slate-50 transition">
                <div>₹30,000</div>
                <div className="text-right text-[#0050b5] font-extrabold">₹4 Lakhs</div>
              </div>
              <div className="grid grid-cols-2 py-4 px-6 hover:bg-slate-50 transition">
                <div>₹50,000</div>
                <div className="text-right text-[#0050b5] font-extrabold">₹8 Lakhs</div>
              </div>
              <div className="grid grid-cols-2 py-4 px-6 hover:bg-slate-50 transition">
                <div>₹75,000</div>
                <div className="text-right text-[#0050b5] font-extrabold">₹15 Lakhs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EMI CALCULATOR COMPONENT */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <EMICalculator onApply={() => navigate('/apply-loan')} />
      </section>

      {/* 5. CREDIT SCORE BANNER PROMO WITH REFERENCE GAUGE METER IMAGE */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">CHECK YOUR</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0050b5]">FREE CREDIT SCORE</h3>
            <p className="text-xs text-slate-600 font-medium">Get instant credit health insights without affecting your score.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjS1xwEIh4iT8dpFtIbuooiav-hqGaJrZJkn-h51Ac6N6kB2xMt1zRDuSxG950bjUZWIIBocspNc__VL2oqRoIwYgav7RkLNudsm2G2vtowdV8h8VR4PSyX9KkICB5qwdkOfRUdbH4jVlokX-MdI731hHjSE3w1U54lOGxw8o4UH0dkAvKjZoDjAdc59wTpnh3QWvNi-E0a2uM8ujCoqiuxn7igtwgiT3dl_JkF-5ebnI1wMableFNz1XRYtOt1lIfENI"
              alt="Check Free Credit Score"
              className="w-28 sm:w-36 h-auto object-contain"
            />
            <button
              onClick={() => navigate('/credit-score')}
              className="btn-smooth-animate btn-emerald-glow px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer"
            >
              Check Now
            </button>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm mt-2">Get quick clarity on personal loans.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
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

export default PersonalLoan;
