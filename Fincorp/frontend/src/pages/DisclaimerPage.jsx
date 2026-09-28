import React from 'react';
import { ShieldAlert, Info, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const DisclaimerPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Regulatory Notice
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Financial Disclaimer</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Important regulatory disclaimers regarding interest rates, eligibility criteria, and financial product availability.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" /> 1. Interest Rate & Representative APR Notice
            </h2>
            <p>
              Interest rates shown on Fincorp range from 10.49% to 24.00% p.a. depending on borrower credit profile, employment type, and loan tenure. Representative Annual Percentage Rate (APR) includes processing fees mandated by individual lenders.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" /> 2. Approval Discretion
            </h2>
            <p>
              Fincorp does not guarantee loan approval or specific loan amounts. Credit approval, interest rate calculation, and disbursal terms remain at the sole discretion of partner Banks and NBFCs based on underwriting norms.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-600" /> 3. No Upfront Fee Warning
            </h2>
            <p className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-medium">
              ⚠️ <strong>BEWARE OF FRAUD:</strong> Fincorp never charges upfront advance fees, cash processing deposits, or security registration charges to applicants. Do not pay money to any individual claiming to represent Fincorp.
            </p>
          </section>

        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700">
            ← Return to Home Page
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DisclaimerPage;
