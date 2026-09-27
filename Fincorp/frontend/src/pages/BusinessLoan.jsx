import React from 'react';
import { ArrowRight, Building2, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';

const BusinessLoan = ({ onOpenApply }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block border border-indigo-400/20">
            BUSINESS CAPITAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Collateral-Free Business Loans Up to <span className="text-emerald-400">₹50 Lakhs</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Empower your MSME or commercial business with working capital, machinery purchase, inventory expansion, and trade financing with minimal documentation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenApply('business_loan')}
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg transition flex items-center gap-2"
            >
              Apply Business Loan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white space-y-3 shrink-0 w-full max-w-xs text-xs font-semibold">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-white/10 pb-2">
            <Building2 className="w-4 h-4" /> Eligibility Checklist
          </div>
          <p>✓ Minimum Business Vintage: 1 Year</p>
          <p>✓ Minimum Annual Turnover: ₹12 Lakhs</p>
          <p>✓ Bank Statement: Last 6 Months</p>
          <p>✓ GST Registration / Trade License</p>
        </div>
      </div>

      {/* EMI Calculator */}
      <EMICalculator onApply={() => onOpenApply('business_loan')} />

    </div>
  );
};

export default BusinessLoan;
