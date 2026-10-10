import React, { useState } from 'react';
import { Target, Award, Users, ShieldCheck, Heart, Sparkles, Building2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Business Owner, Delhi',
      text: 'FinCrop made loan comparison effortless. Got collateral-free business capital within 24 hours to scale my operations.',
      initials: 'RS',
    },
    {
      name: 'Ananya Verma',
      role: 'Software Engineer, Bengaluru',
      text: 'Super fast personal loan disbursal with zero physical paperwork. The team was extremely supportive!',
      initials: 'AV',
    },
    {
      name: 'Vikram Choudhury',
      role: 'Retail Entrepreneur, Kolkata',
      text: 'Checked my free credit score and unlocked pre-approved loan offers at competitive interest rates.',
      initials: 'VC',
    },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8faff]">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#0050b5] text-xs font-bold uppercase tracking-wider">
          ABOUT FINCROP
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Empowering Smarter Financial Growth Across India
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          FinCrop is a technology-driven lending platform dedicated to simplifying personal and business borrowing with transparency, speed, and complete digital convenience.
        </p>
      </section>

      {/* 2. MAIN STORY & EXACT REFERENCE IMAGE */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white p-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdYrN5sE4zoK2rpIgV7wm33vSyGFubRrnEdSkCHDZgqdMuG4_diyy3JKFSvhU4b2orPdW_Xpw1s09-WbsuqTOYhgzYZgO1KUjOoKOw47A-7F51eKIoEDtVJK1Ab9dn97T9pzV_-sbHWCA1d8C6fCXVErtwc-_Lido2FCEcVmcOyYlstHDQfU4hULHj4Ri88kgSLzQ-WkpYaKLePpyh5XtlsKM6EGQXQyBGnn-L2C2ThbH9JkDSox3Q0Q"
                alt="Business growth laptop analytics meeting"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0050b5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              OUR MISSION & VISION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Transforming Lending Through Innovation & Trust
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              We bridge the gap between borrowers and RBI-regulated financial institutions. By leveraging advanced algorithmic matching, we eliminate unnecessary delays, physical paperwork, and hidden charges.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <Target className="w-6 h-6 text-[#0050b5] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Customer First</h4>
                <p className="text-xs text-slate-500 font-medium">Clear, unbiased financial guidance tailored to your needs.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2 stroke-[2.5]" />
                <h4 className="font-bold text-slate-900 text-sm">100% Security</h4>
                <p className="text-xs text-slate-500 font-medium">Bank-level 256-bit encryption for all user data.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <Award className="w-8 h-8 text-[#0050b5] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Excellence</h3>
            <p className="text-xs text-slate-500 font-medium">Striving for seamless digital user journeys and instant approvals.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <Users className="w-8 h-8 text-[#0050b5] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Inclusivity</h3>
            <p className="text-xs text-slate-500 font-medium">Financial solutions accessible to salaried professionals and MSMEs alike.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <Sparkles className="w-8 h-8 text-[#0050b5] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Transparency</h3>
            <p className="text-xs text-slate-500 font-medium">No hidden costs or fine print surprises. Complete clarity upfront.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
            <Building2 className="w-8 h-8 text-[#0050b5] mb-3" />
            <h3 className="font-bold text-slate-900 text-base mb-1">RBI Compliant</h3>
            <p className="text-xs text-slate-500 font-medium">Direct partnerships with 20+ regulated banks and NBFCs.</p>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC TESTIMONIALS CAROUSEL */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-xs font-black uppercase tracking-widest text-blue-300">DYNAMIC TESTIMONIALS</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Trusted By Thousands Across India</h2>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-8 rounded-3xl max-w-3xl mx-auto text-left relative">
            <div className="flex text-amber-400 gap-1 text-sm mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm sm:text-base text-slate-200 italic font-medium leading-relaxed mb-6">
              "{testimonials[testimonialIdx].text}"
            </p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-slate-950 font-black flex items-center justify-center text-sm">
                  {testimonials[testimonialIdx].initials}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{testimonials[testimonialIdx].name}</h4>
                  <p className="text-xs text-blue-300">{testimonials[testimonialIdx].role}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
