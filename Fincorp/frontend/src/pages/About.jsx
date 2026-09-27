import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200">
          ABOUT FINCORP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Your Smart Borrowing Partner
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Fincorp is a technology-driven financial marketplace enabling smart, clear, and confident borrowing decisions across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Transparency First</h3>
          <p className="text-xs text-slate-500">No hidden fees, no dark patterns. Complete clarity on interest rates, processing charges, and repayment terms.</p>
        </div>
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-sm">
          <Award className="w-10 h-10 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">20+ Verified Partners</h3>
          <p className="text-xs text-slate-500">We partner with leading RBI-regulated banks and NBFCs to bring you pre-approved loan options.</p>
        </div>
        <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-sm">
          <Users className="w-10 h-10 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">500,000+ Happy Borrowers</h3>
          <p className="text-xs text-slate-500">Empowering individuals and business owners with fast disbursals and expert support.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
