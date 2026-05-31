import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import OTPForm from './components/Auth/OTPForm';
import DashboardMetrics from './components/Dashboard/DashboardMetrics';
import ExchangeRates from './components/Dashboard/ExchangeRates';
import RecentTransactions from './components/Dashboard/RecentTransactions';
import BankStatus from './components/Dashboard/BankStatus';
import KYCStats from './components/Dashboard/KYCStats';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorAlert from './components/common/ErrorAlert';
import { AlertCircle } from 'lucide-react';

// Mock data for development
const MOCK_DATA = {
  activeUsers: '5,234,891',
  transactions24h: '1,234,567',
  volume24h: '85.4B GNF',
  revenue24h: '1.28B GNF',
  exchangeRates: {
    usdGnf: 8500,
    eurGnf: 9200,
    usdEur: 1.08
  },
  transactions: [
    { id: 'TXN-001', user: 'Fatou Diallo', type: 'Transfer', amount: '500,000 GNF', status: 'SUCCESS', time: '18:45' },
    { id: 'TXN-002', user: 'Mohamed Kone', type: 'Payment', amount: '250,000 GNF', status: 'SUCCESS', time: '18:42' },
    { id: 'TXN-003', user: 'Aïssatou Bah', type: 'Withdrawal', amount: '1,000,000 GNF', status: 'PENDING', time: '18:40' },
  ],
  banks: [
    { name: 'BDK', status: 'CONNECTED', uptime: '99.8%', transactions: '234,567' },
    { name: 'BICIGUI', status: 'CONNECTED', uptime: '99.5%', transactions: '156,789' },
  ],
  kyc: {
    pending: 1234,
    verified: 52000,
    rejected: 5678,
    suspended: 234
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [step, setStep] = useState('login');
  const [notifications, setNotifications] = useState(3);
  const [error, setError] = useState(null);

  const handleLogin = async ({ email, password }) => {
    try {
      // In production, call actual API
      setStep('otp');
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const handleOTPVerify = async (otp) => {
    try {
      if (otp === '123456') {
        setIsLoggedIn(true);
        setStep('dashboard');
      } else {
        setError('Code OTP incorrect');
      }
    } catch (err) {
      setError('Erreur de vérification OTP');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep('login');
    setError(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-600 text-white p-3 rounded-lg mb-4">
              <CreditCard size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Tofendo Admin</h1>
            <p className="text-gray-600 mt-2">Plateforme de gestion FinTech Guinée</p>
          </div>

          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

          {step === 'login' ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <OTPForm onSubmit={handleOTPVerify} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} notifications={notifications} />

        <div className="flex-1 overflow-auto p-6">
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <DashboardMetrics data={MOCK_DATA} />
              <ExchangeRates rates={MOCK_DATA.exchangeRates} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Placeholder for charts */}
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  <p>Graphique utilisateurs (à intégrer)</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  <p>Graphique transactions (à intégrer)</p>
                </div>
              </div>
              <RecentTransactions transactions={MOCK_DATA.transactions} />
            </div>
          )}

          {activeTab === 'banks' && (
            <BankStatus banks={MOCK_DATA.banks} />
          )}

          {activeTab === 'kyc' && (
            <KYCStats stats={MOCK_DATA.kyc} />
          )}

          {activeTab !== 'dashboard' && activeTab !== 'banks' && activeTab !== 'kyc' && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Section en développement</h3>
              <p className="text-gray-600">Cette section sera disponible prochainement</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
