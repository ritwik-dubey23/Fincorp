import React from 'react';
import { Users, Star, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    name: 'Anish V. Nair',
    location: 'Hyderabad, Telangana',
    rating: 5,
    comment: 'Fincorp made getting my personal loan seamless! The online process took under 10 minutes and my application was approved with low interest rates.',
    product: 'Personal Loan',
  },
  {
    name: 'Priya Sharma',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    comment: 'Checked my free CRIF credit report here and identified errors that were pulling down my score. Highly recommended financial platform.',
    product: 'Credit Score',
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    comment: 'Applied for a business loan to expand my logistics firm. Disbursal happened within 24 hours directly into my bank account!',
    product: 'Business Loan',
  },
  {
    name: 'Rohan Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    comment: 'Transparent process with zero hidden processing charges. The status tracking feature kept me updated every step of the way.',
    product: 'Track Application',
  },
];

const CustomersPage = ({ onOpenApply }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-blue-400" /> Trusted by 50,000+ Borrowers
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Customer Stories & Feedback</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Discover how Fincorp empowers individuals and small business owners across India with smart financial solutions.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-2xl font-black text-blue-600 block">50,000+</span>
            <span className="text-xs text-slate-500 font-bold">Happy Borrowers</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-2xl font-black text-emerald-600 block">₹500 Cr+</span>
            <span className="text-xs text-slate-500 font-bold">Loans Disbursed</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-2xl font-black text-indigo-600 block">4.9 / 5.0</span>
            <span className="text-xs text-slate-500 font-bold">User Rating</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-2xl font-black text-amber-500 block">20+</span>
            <span className="text-xs text-slate-500 font-bold">RBI Lenders</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                  {rev.product}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                "{rev.comment}"
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{rev.name}</h4>
                  <span className="text-[11px] text-slate-400">{rev.location}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Borrower
                </span>
              </div>
            </div>
          ))}
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

export default CustomersPage;
