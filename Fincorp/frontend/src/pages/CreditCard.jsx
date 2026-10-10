import React, { useState } from 'react';
import { ArrowRight, CreditCard as CardIcon, Star, ShieldCheck, Zap, Award, Gift, Plane, Percent } from 'lucide-react';

const CreditCard = ({ onOpenApply }) => {
  const [activeTab, setActiveTab] = useState('all');

  const cardProducts = [
    {
      name: 'FinCrop Platinum Cashback Card',
      category: 'cashback',
      tag: '5% Unlimited Cashback',
      fee: 'Zero Joining Fee',
      features: ['5% Cashback on Amazon & Flipkart', '1% Fuel Surcharge Waiver', 'Complimentary Airport Lounge Access'],
      rating: 4.9,
    },
    {
      name: 'FinCrop Rewards Select Card',
      category: 'rewards',
      tag: '10X Reward Points',
      fee: '₹499 Annual Fee (Waived on ₹50k spend)',
      features: ['10X Reward Points on Dining & Movies', 'Welcome Gift Voucher worth ₹1,000', 'Buy 1 Get 1 Movie Ticket Free'],
      rating: 4.8,
    },
    {
      name: 'FinCrop Travel Voyager Card',
      category: 'travel',
      tag: 'Free International Airport Lounges',
      fee: '₹1,499 Annual Fee',
      features: ['8 Free International Airport Lounge Visits', 'Low 1.5% Forex Markup Fee', 'Comprehensive Air Travel Insurance'],
      rating: 4.9,
    },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8fafc]">
      
      {/* 1. HERO SECTION WITH EXACT CREDIT CARDS IMAGE */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0050b5]">
              PREMIUM CREDIT CARDS
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Compare & Apply For Best <span className="text-[#0050b5]">Credit Cards</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Explore leading credit cards with instant approval, lifetime free offers, reward points, and travel perks customized to your lifestyle.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenApply && onOpenApply('credit_card')}
                className="btn-smooth-animate btn-brand-glow px-8 py-3.5 bg-[#0050b5] hover:bg-[#003e8c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Apply Instant Credit Card</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-slate-200/80 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClLs66RsI064Y43nsl7MGqGqBXeOn6yAnACGhz-2jfY6oZ_TimD9S3qvEAQYNfiZxf21_NDF7D4jN69Hy-_iBRNhJZp68M6iySvaNrcUtpz3_tIc9T7Vcdy21qz80NqfEXnmr_59eZscB_uK3x6rJieRFIN--kGDqSoCcoUQVXzqoP6xA42q48mt85sf6N-5lcOSQVmJkqlVaC2idyWU5muviK0sMFIvm8Z1_3fTVsthyF15a35MPxgQfmnu5Te1Iygd0"
                alt="Credit Cards"
                className="w-full h-auto object-contain rounded-2xl filter drop-shadow-md"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. 3 STEPS ONLINE APPROVAL GRAPHIC SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg p-4 bg-white rounded-3xl border border-slate-200 shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9WYKvZnFTM5ea21f6k77UEmIjScPtC8riN9KGh48FLZWnwrQ3ohdrNO4zn9SXDd2SdM9sjxGROprutacfKqaPz0j5PcwIVxCuJEFIruZloqainV2wfC0gO4u7MW9FqDV1r3F64EWkpYTgCrDOm1krdDSw5EvvV-nicyWZCpFZDjCwUytYgGZ2_E_4qFWiG7WY1P2ivhRfVXOKk_R-wqAChAE0dpUbNkjAx45FL7wnoksTIe6zWxP8KDSgTZ-cT9VCeEY"
                alt="3 Steps Credit Card Online Approval"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0050b5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              FAST APPROVAL ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get Approved For Credit Cards In 3 Simple Steps
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#0050b5] shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Step 1: Choose Your Preferred Card</h4>
                  <p className="text-xs text-slate-500">Filter cards by cashback, rewards, travel, or fuel benefits.</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Step 2: Instant Eligibility Match</h4>
                  <p className="text-xs text-slate-500">Enter basic details for 100% digital instant approval check.</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Step 3: Online VKYC & Card Delivery</h4>
                  <p className="text-xs text-slate-500">Finish Video KYC and receive your physical card delivered at home.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED CREDIT CARD PRODUCTS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Top Recommended Credit Cards</h2>
          <p className="text-slate-500 text-sm mt-2">Curated pre-approved card options with maximum rewards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardProducts.map((card, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between space-y-4 hover:shadow-xl transition">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="bg-blue-50 text-[#0050b5] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200">
                    {card.tag}
                  </span>
                  <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                    <Star className="w-4 h-4 fill-amber-400" /> {card.rating}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.name}</h3>
                <p className="text-xs text-slate-500 font-semibold">{card.fee}</p>
                
                <ul className="space-y-2 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
                  {card.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenApply && onOpenApply('credit_card')}
                className="btn-smooth-animate btn-primary-glow w-full py-3 bg-[#0050b5] hover:bg-[#003e8c] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CREDIT SCORE METER BANNER WITH REFERENCE IMAGE */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">CHECK YOUR</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0050b5]">FREE CREDIT SCORE</h3>
            <p className="text-xs text-slate-600 font-medium">Higher credit score unlocks premium credit cards with higher limits.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdwmDVewQwLuhH4FIKYsGJ6dthEpuhxvuDXDgmFVpJ8Spip3QNRsOw_Hox23ZgHpJ_bDAsrXV5iP0viK-Dy_5AWfe9LyTURk4D-8VpH-mX4Of0egBZA7h7gE4omOLJjOoLa4zleE1uE2bb8rwiHlSr_4peuUrXItDch_6IWjJAx_jFGYCCHrMZMrk03keK2jmrg1X8h0TWMkguIVwvirh64Kl37ZNc-YBELj6NkhvuSc2ZVipgLvbphJuVOtveuSlt-Ms"
              alt="Credit Score Meter"
              className="w-32 sm:w-44 h-auto object-contain"
            />
            <button
              onClick={() => onOpenApply && onOpenApply('credit_score')}
              className="btn-smooth-animate btn-emerald-glow px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer"
            >
              Check Free Score
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CreditCard;
