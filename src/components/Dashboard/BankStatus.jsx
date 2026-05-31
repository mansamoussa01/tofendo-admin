import React from 'react';
import { CheckCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function BankStatus({ banks = [] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Statut Intégrations Bancaires</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banks.map((bank, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-800">{bank.name}</h4>
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Statut:</span> 
                <span className="ml-2">
                  <StatusBadge status={bank.status} />
                </span>
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
  );
}
