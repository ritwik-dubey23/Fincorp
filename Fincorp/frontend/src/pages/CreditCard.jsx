import React from 'react';
import { CreditCard as CardIcon, CheckCircle2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const CreditCardPage = ({ onOpenApply }) => {
  const cards = [
    {
      name: 'Fincorp Cashback Platinum',
      reward: '5% Unlimited Cashback on Shopping & Utility Bills',
      fee: '₹499 / year (Waived on ₹50k spend)',
      perks: ['Complimentary Airport Lounge Access', '1% Fuel Surcharge Waiver', 'Zero Joining Fee Offer'],
      badge: 'Most Popular',
      color: 'from-blue-700 to-indigo-900',
    },
    {
      name: 'Fincorp Travel Rewards Signature',
      reward: '4X Reward Points on Flights & Hotel Bookings',
      fee: '₹1,499 / year',
      perks: ['Free International Lounge Visits', 'Comprehensive Travel Insurance', 'Complimentary Golf Rounds'],
      badge: 'Best for Travel',
      color: 'from-purple-800 to-slate-900',
    },
    {
      name: 'Fincorp LTF Select Card',
      reward: 'Lifetime Free Card with 2% Flat Rewards',
      fee: 'Lifetime Free (Zero Annual Fee)',
      perks: ['Instant Instant Approvals', 'Movie Ticket Buy-1-Get-1 Offers', 'No Fee for Life'],
      badge: 'Lifetime Free',
      color: 'from-emerald-700 to-slate-900',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200">
          PRE-APPROVED CREDIT CARDS
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Find The Perfect Credit Card For Your Lifestyle
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Compare top credit cards with instant online approval, zero paperwork, and exclusive rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <div className={`bg-gradient-to-r ${card.color} text-white p-6 relative`}>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block border border-white/20 mb-3">
                  {card.badge}
                </span>
                <CardIcon className="w-10 h-10 text-white/80 mb-2" />
                <h3 className="text-xl font-black text-white">{card.name}</h3>
                <p className="text-xs text-blue-200 mt-1 font-medium">{card.reward}</p>
              </div>

              <div className="p-6 space-y-3 text-xs text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-500">Annual Fee</span>
                  <span className="font-bold text-slate-900">{card.fee}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Key Perks:</span>
                  {card.perks.map((p, i) => (
                    <p key={i} className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onOpenApply('credit_card')}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Apply Card Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditCardPage;
