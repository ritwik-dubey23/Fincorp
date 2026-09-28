import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-blue-400" /> Data Protection & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Your privacy and data security are our top priorities. Learn how Fincorp protects, processes, and respects your personal and financial information.
          </p>
          <div className="text-[11px] text-slate-400 pt-2 font-medium">Last Updated: January 2026</div>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> 1. Information We Collect
            </h2>
            <p>
              When you apply for a loan or check your credit score on Fincorp, we collect essential personal and financial information required for loan processing, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 font-medium">
              <li>Full Name, Contact Number, Email Address, and Residential Address</li>
              <li>PAN (Permanent Account Number) and Aadhaar identification details</li>
              <li>Employment status, monthly income, and bank statement verification data</li>
              <li>Credit score inquiries conducted via authorized credit bureaus (CRIF High Mark / CIBIL)</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" /> 2. How We Use Your Data
            </h2>
            <p>
              We process your data strictly to evaluate loan eligibility, match you with appropriate RBI-registered lending partners, verify applicant identity, and send transaction notifications.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1">
                <span className="font-bold text-blue-900">✓ Bank Grade Encryption</span>
                <p className="text-slate-600">All data transmitted across our network is secured with 256-bit SSL encryption.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1">
                <span className="font-bold text-emerald-900">✓ Zero Third-Party Spam</span>
                <p className="text-slate-600">We do not sell, rent, or lease your personal information to unauthorized marketing agencies.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> 3. Data Sharing with RBI Lenders
            </h2>
            <p>
              Your loan application details are shared exclusively with our verified banking and NBFC partners to process loan sanction letters. All lending partners comply with RBI Fair Practices Codes and Indian digital lending regulations.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" /> 4. Your Rights & Consent
            </h2>
            <p>
              You maintain full control over your stored data. You may request data modification or account deletion at any time by contacting our Privacy Desk at <a href="mailto:privacy@fincorp.com" className="text-blue-600 font-bold hover:underline">privacy@fincorp.com</a>.
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

export default PrivacyPage;
