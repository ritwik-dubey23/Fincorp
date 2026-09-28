import React from 'react';
import { Building2, ShieldCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const lenders = [
  { name: 'HDFC Bank Ltd', type: 'Scheduled Commercial Bank', minRate: '10.50%', maxTenure: '72 Months' },
  { name: 'ICICI Bank Ltd', type: 'Scheduled Commercial Bank', minRate: '10.65%', maxTenure: '60 Months' },
  { name: 'Axis Bank Ltd', type: 'Scheduled Commercial Bank', minRate: '10.49%', maxTenure: '60 Months' },
  { name: 'State Bank of India', type: 'Public Sector Bank', minRate: '10.30%', maxTenure: '84 Months' },
  { name: 'Bajaj Finance Ltd', type: 'RBI Registered NBFC', minRate: '11.00%', maxTenure: '96 Months' },
  { name: 'Tata Capital Financial Services', type: 'RBI Registered NBFC', minRate: '10.99%', maxTenure: '72 Months' },
  { name: 'Aditya Birla Finance Ltd', type: 'RBI Registered NBFC', minRate: '11.25%', maxTenure: '60 Months' },
  { name: 'Fullerton India Credit Co. Ltd', type: 'RBI Registered NBFC', minRate: '11.99%', maxTenure: '60 Months' },
];

const PartnersPage = ({ onOpenApply }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> RBI Regulated Financial Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Our RBI-Approved Lending Partners</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Fincorp partners with 20+ top Banks and Non-Banking Financial Companies (NBFCs) across India to offer competitive interest rates and transparent digital loan disbursal.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {lenders.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{item.name}</h3>
                    <span className="text-[11px] font-semibold text-slate-500">{item.type}</span>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-full">
                  VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-100">
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Starting Interest Rate</span>
                  <span className="font-extrabold text-blue-600 text-sm">{item.minRate} p.a.</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Max Loan Tenure</span>
                  <span className="font-bold text-slate-800 text-xs">{item.maxTenure}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-lg font-black">Compare Loans & Get Instant Approval</h3>
            <p className="text-xs text-blue-100">Check pre-approved offers from all partners with zero application fee.</p>
          </div>
          <button
            onClick={() => onOpenApply && onOpenApply('personal_loan')}
            className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-xs uppercase tracking-wider shadow-md transition shrink-0 cursor-pointer"
          >
            Apply Now
          </button>
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

export default PartnersPage;
