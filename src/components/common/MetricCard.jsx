import React from 'react';

const colorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
};

export default function MetricCard({ label, value, icon: Icon, color = 'blue' }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color].bg}`}>
          <Icon size={24} className={colorMap[color].text} />
        </div>
      </div>
    </div>
  );
}
