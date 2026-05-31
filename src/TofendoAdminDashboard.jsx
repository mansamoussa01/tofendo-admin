import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, LogOut, Settings, Bell, User, Eye, EyeOff, TrendingUp, Users, CreditCard, DollarSign, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function TofendoAdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);

  // ✅ CORRECTION #1: Mapping des couleurs (évite les classes dynamiques Tailwind)
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
  };

  const dashboardData = {
    activeUsers: '5,234,891',
    transactions24h: '1,234,567',
    volume24h: '85.4B GNF',
    revenue24h: '1.28B GNF',
    exchangeRates: {
      usdGnf: 8500,
      eurGnf: 9200,
      usdEur: 1.08
    }
  };

  const chartData = [
    { day: 'Lun', users: 4200, transactions: 900000, revenue: 1.1 },
    { day: 'Mar', users: 4500, transactions: 950000, revenue: 1.15 },
    { day: 'Mer', users: 4800, transactions: 1000000, revenue: 1.2 },
    { day: 'Jeu', users: 5100, transactions: 1100000, revenue: 1.25 },
    { day: 'Ven', users: 5300, transactions: 1200000, revenue: 1.28 },
    { day: 'Sam', users: 5200, transactions: 1150000, revenue: 1.22 },
    { day: 'Dim', users: 5234, transactions: 1234567, revenue: 1.28 }
  ];

  const transactionData = [
    { name: 'Transferts P2P', value: 45, color: '#3b82f6' },
    { name: 'Paiements QR', value: 30, color: '#10b981' },
    { name: 'Retraits', value: 15, color: '#f59e0b' },
    { name: 'Dépôts', value: 10, color: '#8b5cf6' }
  ];

  const recentTransactions = [
    { id: 'TXN-001', user: 'Fatou Diallo', type: 'Transfer', amount: '500,000 GNF', status: 'SUCCESS', time: '18:45' },
    { id: 'TXN-002', user: 'Mohamed Kone', type: 'Payment', amount: '250,000 GNF', status: 'SUCCESS', time: '18:42' },
    { id: 'TXN-003', user: 'Aïssatou Bah', type: 'Withdrawal', amount: '1,000,000 GNF', status: 'PENDING', time: '18:40' },
    { id: 'TXN-004', user: 'Mamadou Sy', type: 'Deposit', amount: '750,000 GNF', status: 'SUCCESS', time: '18:35' },
    { id: 'TXN-005', user: 'Hawa Diop', type: 'Currency', amount: '1000 USD → 8.5M GNF', status: 'SUCCESS', time: '18:30' }
  ];

  const bankStatus = [
    { name: 'BDK', status: 'CONNECTED', uptime: '99.8%', transactions: '234,567' },
    { name: 'BICIGUI', status: 'CONNECTED', uptime: '99.5%', transactions: '156,789' },
    { name: 'Mastercard', status: 'CONNECTED', uptime: '99.9%', transactions: '345,678' },
    { name: 'Stripe', status: 'CONNECTED', uptime: '99.7%', transactions: '123,456' }
  ];

  // ✅ CORRECTION #2: KYC Stats réaliste
  const kycStats = {
    pending: 1234,
    verified: 52000,
    rejected: 5678,
    suspended: 234
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setStep('otp');
    }
  };

  const handleOTPVerify = (e) => {
    e.preventDefault();
    if (otp === '123456') {
      setIsLoggedIn(true);
      setStep('dashboard');
    } else {
      alert('Code OTP incorrect');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep('login');
    setEmail('');
    setPassword('');
    setOtp('');
  };

  // ✅ CORRECTION #3: Memoïser les données pour la performance
  const chartDataMemo = useMemo(() => chartData, []);
  const bankStatusMemo = useMemo(() => bankStatus, []);

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

          {step === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tofendo.gn"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                <p className="font-semibold">Identifiants de test:</p>
                <p>Email: admin@tofendo.gn</p>
                <p>Mot de passe: Admin@2026!Secure</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Connexion
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPVerify} className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-green-700 text-sm">Un code OTP a été envoyé à votre email</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code OTP (6 chiffres)</label>
                <input
                  type="text"
                  value={otp}
                  // ✅ CORRECTION #4: Validation OTP (accepter uniquement les chiffres)
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                <p className="font-semibold">Code de test: 123456</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Vérifier OTP
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Tofendo</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-gray-800 p-2 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'Utilisateurs', icon: '👥' },
            { id: 'transactions', label: 'Transactions', icon: '💳' },
            { id: 'currency', label: 'Change', icon: '💱' },
            { id: 'banks', label: 'Banques', icon: '🏦' },
            { id: 'kyc', label: 'KYC/Conformité', icon: '✅' },
            { id: 'reports', label: 'Rapports', icon: '📈' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                activeTab === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Tableau de Bord'}
            {activeTab === 'users' && 'Gestion Utilisateurs'}
            {activeTab === 'transactions' && 'Transactions'}
            {activeTab === 'currency' && 'Gestion Change'}
            {activeTab === 'banks' && 'Intégration Bancaire'}
            {activeTab === 'kyc' && 'KYC & Conformité'}
            {activeTab === 'reports' && 'Rapports'}
          </h2>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
              <Bell size={20} />
              {notifications > 0 && (
                // ✅ CORRECTION #5: Gestion des notifications (99+ pour les grands nombres)
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {notifications > 99 ? '99+' : notifications}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Paramètres">
              <Settings size={20} />
            </button>
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Utilisateurs Actifs', value: dashboardData.activeUsers, icon: Users, color: 'blue' },
                  { label: 'Transactions (24h)', value: dashboardData.transactions24h, icon: CreditCard, color: 'green' },
                  { label: 'Volume (24h)', value: dashboardData.volume24h, icon: TrendingUp, color: 'purple' },
                  { label: 'Revenus (24h)', value: dashboardData.revenue24h, icon: DollarSign, color: 'orange' }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-800 mt-2">{metric.value}</p>
                      </div>
                      {/* ✅ CORRECTION #1 APPLIQUÉE: Utiliser le mapping statique */}
                      <div className={`p-3 rounded-lg ${colorMap[metric.color].bg}`}>
                        <metric.icon size={24} className={colorMap[metric.color].text} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Taux de Change en Temps Réel</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { pair: 'USD/GNF', rate: dashboardData.exchangeRates.usdGnf, change: '+0.5%' },
                    { pair: 'EUR/GNF', rate: dashboardData.exchangeRates.eurGnf, change: '-0.2%' },
                    { pair: 'USD/EUR', rate: dashboardData.exchangeRates.usdEur, change: '+0.1%' }
                  ].map((rate, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm font-medium">{rate.pair}</p>
                      <p className="text-2xl font-bold text-gray-800 mt-2">{rate.rate}</p>
                      <p className={`text-sm mt-2 font-semibold ${rate.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {rate.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Croissance Utilisateurs (7j)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartDataMemo}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Répartition Transactions</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={transactionData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                        {transactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Transactions Récentes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Montant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Heure</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">{tx.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{tx.user}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{tx.type}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">{tx.amount}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              tx.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banks' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Statut Intégrations Bancaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankStatusMemo.map((bank, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800">{bank.name}</h4>
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Statut:</span> <span className="text-green-600 font-semibold">{bank.status}</span>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Uptime:</span> <span className="text-blue-600">{bank.uptime}</span>
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Transactions:</span> <span className="text-purple-600">{bank.transactions}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Statut KYC & Conformité</h3>
              {/* ✅ CORRECTION #5: Responsive grid (mobile first) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'En Attente', value: kycStats.pending, bgClass: 'bg-yellow-50', textClass: 'text-yellow-700', valueClass: 'text-yellow-900', borderClass: 'border-yellow-200' },
                  { label: 'Vérifiés', value: kycStats.verified, bgClass: 'bg-green-50', textClass: 'text-green-700', valueClass: 'text-green-900', borderClass: 'border-green-200' },
                  { label: 'Rejetés', value: kycStats.rejected, bgClass: 'bg-red-50', textClass: 'text-red-700', valueClass: 'text-red-900', borderClass: 'border-red-200' },
                  { label: 'Suspendus', value: kycStats.suspended, bgClass: 'bg-orange-50', textClass: 'text-orange-700', valueClass: 'text-orange-900', borderClass: 'border-orange-200' }
                ].map((stat, idx) => (
                  <div key={idx} className={`${stat.bgClass} border ${stat.borderClass} rounded-lg p-4`}>
                    <p className={`${stat.textClass} text-sm font-medium`}>{stat.label}</p>
                    <p className={`${stat.valueClass} text-2xl font-bold mt-2`}>
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
