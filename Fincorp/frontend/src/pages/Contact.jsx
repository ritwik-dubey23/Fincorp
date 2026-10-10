import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Contact = ({ onOpenApply }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8fafc]">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#0050b5] text-xs font-bold uppercase tracking-wider">
          24/7 CUSTOMER SUPPORT
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Get in Touch With FinCrop
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Have questions about loan eligibility, application status, or repayments? Our team is available 24/7 to assist you.
        </p>
      </section>

      {/* 2. CONTACT INFO CARDS & CONTACT FORM */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Contact Details</h2>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0050b5] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Helpline Number</h4>
                  <p className="text-xs text-slate-500 font-medium">1800-123-4567 / +91 98765 43210</p>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Toll Free • Mon-Sat 9AM-8PM</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0050b5] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                  <p className="text-xs text-slate-500 font-medium">support@fincrop.in / care@fincrop.in</p>
                  <span className="text-[10px] text-slate-400 font-medium">24-Hour Response Guarantee</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0050b5] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Corporate Office</h4>
                  <p className="text-xs text-slate-500 font-medium">FinCrop Financial Towers, Business Bay, BKC, Mumbai - 400051</p>
                </div>
              </div>
            </div>

            {/* Embedded Credit Score Gauge Promo Banner */}
            <div className="bg-gradient-to-r from-[#0d3b66] to-[#1e40af] p-6 rounded-3xl text-white shadow-xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-200">FREE SCORE</span>
                <h4 className="text-base font-extrabold">Check Credit Health</h4>
                <p className="text-xs text-blue-100 font-medium">Instant report with zero impact.</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM2xtS9K9uqBqhLWmGwRQqxJg5D6TCfIFYQ9fAz7Msnuhu1T4fod1RiQZz3jye-KWQ9QJfAVQroGepa3_H_xuiWjhJEuaRDPkrX1N22Ti3bze3W2QK4kl1ubevgFSnNYqdNI68zndr7VjZlgy0tuoZiazvdPK0rUgrU836x9eT1-wkfB0DcZBFXJ0gtCgVTVLOmnWaazD_hgz1zeCcvfza9lZm5yvjKrmnrTjUWU0kv6dyGMDG_tZI-EnktyDYXrEL7FQ"
                alt="Free Credit Score Gauge Meter"
                className="w-24 sm:w-28 h-auto object-contain shrink-0"
              />
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">Thank You!</h3>
                  <p className="text-xs text-emerald-700 font-medium">Your message has been received. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Mobile Number</label>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                        placeholder="10-digit mobile"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Loan Eligibility Query"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message details..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0050b5] focus:bg-white transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-smooth-animate btn-brand-glow w-full py-3.5 rounded-xl bg-[#0050b5] hover:bg-[#003e8c] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
