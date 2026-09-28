import React from 'react';
import { FileText, ShieldAlert, CheckCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-blue-400" /> Legal Terms of Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Terms & Conditions</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Please read these terms carefully before accessing Fincorp loan comparison and credit evaluation services.
          </p>
          <div className="text-[11px] text-slate-400 pt-2 font-medium">Effective Date: January 1, 2026</div>
        </div>

        {/* Terms Content Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing or submitting an application through the Fincorp website and mobile applications, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our platforms.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" /> 2. Eligibility Criteria
            </h2>
            <p>
              To apply for financial products via Fincorp, applicants must satisfy the following minimum requirements:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 font-medium">
              <li>Must be an Indian resident citizen aged 21 to 60 years</li>
              <li>Must possess a valid PAN card, Aadhaar card, and an active Indian bank account</li>
              <li>Must have a verifiable regular source of monthly income (Salaried or Self-Employed)</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" /> 3. Marketplace Facilitator Role
            </h2>
            <p>
              Fincorp operates as a technology facilitator connecting borrowers with RBI-registered Banks and Non-Banking Financial Companies (NBFCs). Fincorp does not directly issue loans or extend credit lines. Final loan approval, interest rates, and disbursal terms are determined solely by lending partners based on risk assessment.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-600" /> 4. Accuracy of Information
            </h2>
            <p>
              Applicants certify that all information, PAN details, bank credentials, and income declarations submitted during application are accurate and authentic. Supplying false or fraudulent documentation will result in immediate disqualification and legal escalation.
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

export default TermsPage;
