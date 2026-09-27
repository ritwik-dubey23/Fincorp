import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

const EMICalculator = ({ onApply }) => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(3);

  // EMI Calculation Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    const principal = Number(amount);
    const monthlyRate = Number(rate) / 12 / 100;
    const totalMonths = Number(tenureYears) * 12;

    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) return 0;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const totalMonths = tenureYears * 12;
  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayment - amount);

  const interestPercentage = totalPayment > 0 ? Math.round((totalInterest / totalPayment) * 100) : 0;
  const principalPercentage = 100 - interestPercentage;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sm:p-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Finance Tool</span>
          <h3 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-400" /> EMI Calculator
          </h3>
          <p className="text-xs text-slate-300 mt-1">Estimate your monthly EMI, total interest cost, and repayment breakdown.</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Input Area */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Amount Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Required Loan Amount</label>
              <span className="text-base font-extrabold text-blue-600 font-mono">
                ₹{Number(amount).toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={20000}
              max={5000000}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
              <span>₹20,000</span>
              <span>₹50 Lakhs</span>
            </div>
          </div>

          {/* Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Interest Rate (% p.a.)</label>
              <span className="text-base font-extrabold text-blue-600 font-mono">
                {rate}%
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={28}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
              <span>8% p.a.</span>
              <span>28% p.a.</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Loan Tenure (Years)</label>
              <span className="text-base font-extrabold text-blue-600 font-mono">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
              <span>1 Year</span>
              <span>7 Years</span>
            </div>
          </div>

        </div>

        {/* Calculation Result Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100 rounded-3xl p-6 text-center space-y-6 shadow-inner">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Monthly Installment</span>
            <div className="text-3xl font-black text-blue-700 mt-1 font-mono">
              ₹{monthlyEMI.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-500">/ month</span>
            </div>
          </div>

          {/* Breakdown progress bar */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: `${principalPercentage}%` }} className="bg-blue-600 h-full transition-all" title="Principal" />
              <div style={{ width: `${interestPercentage}%` }} className="bg-amber-500 h-full transition-all" title="Interest" />
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Principal ({principalPercentage}%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Interest ({interestPercentage}%)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Principal Amount:</span>
              <span className="font-bold text-slate-800">₹{amount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest Payable:</span>
              <span className="font-bold text-amber-600">₹{totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
              <span>Total Payable Amount:</span>
              <span className="text-blue-700">₹{totalPayment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {onApply && (
            <button
              onClick={onApply}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              Apply Loan For This EMI <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default EMICalculator;
