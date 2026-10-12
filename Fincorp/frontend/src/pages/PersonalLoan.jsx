import React from 'react';
import InstantLoanHero from '../components/InstantLoanHero';
import InstantLoanScrollContent from '../components/InstantLoanScrollContent';

const PersonalLoan = () => {
  return (
    <div className="space-y-6 pb-16 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] bg-[#f8fafc]">
      {/* 1. HERO SECTION & FORM (Exact Updated Upper Instant Loan Section) */}
      <InstantLoanHero />

      {/* 2. LOWER SECTIONS (100% UNCHANGED ORIGINAL LOWER SECTIONS & BRAND NAMES) */}
      <InstantLoanScrollContent />
    </div>
  );
};

export default PersonalLoan;
