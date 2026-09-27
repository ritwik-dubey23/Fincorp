import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, DollarSign, Clock } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';

const PersonalLoan = ({ onOpenApply }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <span className="bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block border border-white/15">
            PERSONAL FINANCING
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Instant Personal Loans Up to <span className="text-amber-400">₹15 Lakhs</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Access quick personal financing for medical emergencies, home renovation, higher education, wedding, travel, or debt consolidation with zero collateral.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenApply('personal_loan')}
              className="px-8 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg transition flex items-center gap-2"
            >
              Apply Instant Personal Loan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white space-y-3 shrink-0 w-full max-w-xs text-xs font-semibold">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-white/10 pb-2">
            <Zap className="w-4 h-4" /> Key Loan Highlights
          </div>
          <p>✓ Interest Rates: 10.5% - 24% p.a.</p>
          <p>✓ Tenure: 12 to 60 Months</p>
          <p>✓ Disbursal Time: Under 24 Hours</p>
          <p>✓ Processing Fee: 1% - 2.5%</p>
          <p>✓ Zero Hidden Charges</p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
          <Clock className="w-8 h-8 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-lg">Instant Approvals</h3>
          <p className="text-xs text-slate-500">Get pre-approved in principle within 2 minutes of form submission.</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-lg">100% Digital Process</h3>
          <p className="text-xs text-slate-500">Complete Aadhaar & PAN e-KYC online without physical paperwork.</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
          <DollarSign className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-lg">Direct Bank Transfer</h3>
          <p className="text-xs text-slate-500">Loan amount disbursed directly to your verified savings account.</p>
        </div>
      </div>

      {/* EMI Calculator */}
      <EMICalculator onApply={() => onOpenApply('personal_loan')} />

    </div>
  );
};

export default PersonalLoan;
