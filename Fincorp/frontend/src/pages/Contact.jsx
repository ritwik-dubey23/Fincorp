import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200">
          GET IN TOUCH
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          We Are Here To Help
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions about your loan application, interest rates, or eligibility? Reach out to our financial support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-xl font-bold">Contact Information</h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Financial District, Visakhapatnam, Andhra Pradesh, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <a href="tel:+919154297990" className="hover:underline">+91 91542 97990</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <a href="mailto:support@fincorp.com" className="hover:underline">support@fincorp.com</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-2 text-emerald-600 font-bold">
              ✓ Thank you! Your message has been received. Our team will get back to you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-lg font-bold text-slate-900">Send Us A Message</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Your Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Mobile</label>
                  <input type="tel" required placeholder="10-digit mobile" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Email</label>
                <input type="email" required placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Message</label>
                <textarea rows={4} required placeholder="How can we help you?" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider shadow-md">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
