import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import SpeedometerGauge from '../components/SpeedometerGauge';
import API from '../services/api';

const CreditScore = ({ onOpenApply }) => {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [scoreResult, setScoreResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/otp/send', { mobile });
      if (res.data.success) {
        setOtpSent(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyScore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/otp/verify', { mobile, otp });
      if (res.data.success) {
        const randomScore = Math.floor(740 + Math.random() * 50);
        setScoreResult(randomScore);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Main Container */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block border border-emerald-500/20">
            FREE CREDIT REPORT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Check Your Free Credit Score In <span className="text-emerald-400">2 Minutes</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get official credit bureau insights, customized loan eligibility recommendations, and actionable steps to boost your score to 750+.
          </p>
          <ul className="space-y-2 text-xs font-semibold text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free - No Credit Card Needed</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Soft Inquiry - Does Not Hurt Your Credit Score</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pre-Approved Loan & Card Offers Included</li>
          </ul>
        </div>

        {/* Verification Form Card with Speedometer */}
        <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          
          {scoreResult ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <span className="text-xs font-bold uppercase text-slate-500">Your Calculated Credit Score</span>
              
              {/* Rapid Animated Speedometer Gauge */}
              <SpeedometerGauge targetScore={scoreResult} />

              <p className="text-xs text-slate-600">
                Great job! You qualify for pre-approved personal loans with interest rates starting at <strong>10.5% p.a.</strong>
              </p>
              <button
                onClick={() => onOpenApply('credit_score')}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
              >
                Apply Pre-Approved Loan Now
              </button>
            </div>
          ) : (
            <form onSubmit={!otpSent ? handleSendOtp : handleVerifyScore} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 text-center">Get Your Credit Score</h3>
              
              <SpeedometerGauge targetScore={785} />

              {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">⚠️ {error}</div>}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
                <div className="flex">
                  <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl px-3 flex items-center text-xs font-bold text-slate-600">+91</span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={10}
                    placeholder="10-digit mobile"
                    disabled={otpSent}
                    className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 disabled:opacity-75"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-blue-900 uppercase">Enter OTP (Demo: 555555)</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-white border border-blue-300 rounded-xl px-4 py-2 text-center text-base font-mono font-bold tracking-widest"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
              >
                {loading ? 'Processing...' : (!otpSent ? 'Send Verification OTP' : 'Check My Score Now')}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};

export default CreditScore;
