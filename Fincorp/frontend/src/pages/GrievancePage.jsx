import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Clock, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const GrievancePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> RBI Digital Lending Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Grievance Redressal Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Fincorp is committed to transparent customer service. If you have any complaint or query regarding digital loan applications, our Nodal Officer is here to assist you.
          </p>
        </div>

        {/* Grievance Details Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" /> Resolution Matrix & Timelines
            </h2>
            <p>
              In accordance with RBI guidelines for digital lending, customer complaints are logged and addressed under a strict SLA resolution protocol:
            </p>

            <div className="grid sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-center">
                <span className="font-extrabold text-slate-900 block text-sm">Level 1: Customer Support</span>
                <span className="text-blue-600 font-bold block">Resolution: 24 - 48 Hours</span>
                <p className="text-slate-500 text-[11px]">Email or telephonic assistance for general application & status queries.</p>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-1 text-center">
                <span className="font-extrabold text-blue-950 block text-sm">Level 2: Nodal Officer</span>
                <span className="text-blue-700 font-bold block">Resolution: 3 - 7 Working Days</span>
                <p className="text-slate-600 text-[11px]">Formal grievance escalation for unresolved disputes.</p>
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-1 text-center">
                <span className="font-extrabold text-indigo-950 block text-sm">Level 3: RBI Ombudsman</span>
                <span className="text-indigo-700 font-bold block">SLA: Up to 30 Days</span>
                <p className="text-slate-600 text-[11px]">Escalation to Reserve Bank of India Integrated Ombudsman Scheme.</p>
              </div>
            </div>
          </section>

          {/* Officer Details Card */}
          <section className="pt-4 border-t border-slate-100 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900">Designated Grievance Redressal Officer</h2>
            
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <span className="text-xs text-blue-400 font-extrabold uppercase tracking-wider">Nodal Grievance Officer</span>
                  <h3 className="text-xl font-black text-white">Mr. Rajesh K. Sharma</h3>
                </div>
                <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                  Official Contact Desk
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Email: <strong className="text-white">grievance@fincorp.com</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Phone: <strong className="text-white">+91 91542 97990</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Hours: <strong>Mon - Fri (10:00 AM - 6:00 PM)</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Location: <strong>Visakhapatnam, AP, India</strong></span>
                </div>
              </div>
            </div>
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

export default GrievancePage;
