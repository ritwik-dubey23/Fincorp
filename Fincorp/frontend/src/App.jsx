import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import ScrollToTop from './components/ScrollToTop';
import { ShieldCheck } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const PersonalLoan = lazy(() => import('./pages/PersonalLoan'));
const BusinessLoan = lazy(() => import('./pages/BusinessLoan'));
const CreditScore = lazy(() => import('./pages/CreditScore'));
const CreditCardPage = lazy(() => import('./pages/CreditCard'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const TrackStatusPage = lazy(() => import('./pages/TrackStatusPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Footer Dedicated Pages
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const GrievancePage = lazy(() => import('./pages/GrievancePage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));

const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminApplicationsPage = lazy(() => import('./pages/AdminApplicationsPage'));
const AdminApplicationDetailPage = lazy(() => import('./pages/AdminApplicationDetailPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-lg animate-pulse">
      <ShieldCheck className="w-7 h-7" />
    </div>
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-black tracking-widest uppercase text-slate-400">FINCORP</span>
  </div>
);

// Apply Direct Route Trigger
const DirectApplyRoute = ({ handleOpenApply }) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleOpenApply('personal_loan');
    navigate('/', { replace: true });
  }, [navigate, handleOpenApply]);

  return <PageLoader />;
};

function App() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('personal_loan');

  const handleOpenApply = (productType = 'personal_loan') => {
    setSelectedProduct(productType);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Urbanist',sans-serif]">
      <ScrollToTop />
      <Navbar onOpenApply={() => handleOpenApply('personal_loan')} />

      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home onOpenApply={() => handleOpenApply('personal_loan')} />} />
            <Route path="/personal-loan" element={<PersonalLoan onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/business-loan" element={<BusinessLoan onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/credit-score" element={<CreditScore onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/credit-card" element={<CreditCardPage onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/tools" element={<ToolsPage onOpenApply={() => handleOpenApply('personal_loan')} />} />
            <Route path="/track-status" element={<TrackStatusPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Footer Dedicated Routes */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/grievance" element={<GrievancePage />} />
            <Route path="/lenders" element={<PartnersPage onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/partners" element={<PartnersPage onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/customers" element={<CustomersPage onOpenApply={(prod) => handleOpenApply(prod)} />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />

            {/* Direct Apply Trigger Routes */}
            <Route path="/apply" element={<DirectApplyRoute handleOpenApply={handleOpenApply} />} />
            <Route path="/apply-loan" element={<DirectApplyRoute handleOpenApply={handleOpenApply} />} />
            <Route path="/login" element={<DirectApplyRoute handleOpenApply={handleOpenApply} />} />
            <Route path="/signup" element={<DirectApplyRoute handleOpenApply={handleOpenApply} />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/applications" element={<AdminApplicationsPage />} />
            <Route path="/admin/applications/:id" element={<AdminApplicationDetailPage />} />

            {/* Fallback Catch-All Route to Home */}
            <Route path="*" element={<Home onOpenApply={() => handleOpenApply('personal_loan')} />} />
          </Routes>
        </Suspense>
      </main>

      <Footer onOpenApply={() => handleOpenApply('personal_loan')} />

      {/* Global Apply Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        initialProduct={selectedProduct}
      />
    </div>
  );
}

export default App;
