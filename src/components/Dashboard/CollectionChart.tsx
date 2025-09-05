import React from 'react';
import { TrendingUp } from 'lucide-react';

interface CollectionChartProps {
  userRole: string;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const CollectionChart: React.FC<CollectionChartProps> = ({ userRole, currentUser }) => {
  const monthlyData = [
    { month: 'Jan', collection: 450000, target: 500000 },
    { month: 'Feb', collection: 480000, target: 500000 },
    { month: 'Mar', collection: 520000, target: 500000 },
    { month: 'Apr', collection: 495000, target: 500000 },
    { month: 'May', collection: 510000, target: 500000 },
    { month: 'Jun', collection: 485000, target: 500000 },
    { month: 'Jul', collection: 530000, target: 500000 },
    { month: 'Aug', collection: 515000, target: 500000 },
    { month: 'Sep', collection: 490000, target: 500000 },
    { month: 'Oct', collection: 525000, target: 500000 },
    { month: 'Nov', collection: 540000, target: 500000 },
    { month: 'Dec', collection: 560000, target: 500000 },
  ];

  const residentPaymentHistory = [
    { month: 'Jan', amount: 5400, status: 'paid' },
    { month: 'Dec', amount: 5400, status: 'paid' },
    { month: 'Nov', amount: 5400, status: 'paid' },
    { month: 'Oct', amount: 5400, status: 'paid' },
    { month: 'Sep', amount: 5400, status: 'paid' },
    { month: 'Aug', amount: 5400, status: 'paid' },
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.collection, d.target)));

  if (userRole === 'resident') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Payment History</h2>
            <p className="text-sm text-gray-500">Flat: {currentUser?.flatNumber}</p>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">All payments up to date</span>
          </div>
        </div>

        <div className="space-y-4">
          {residentPaymentHistory.map((data, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700">{data.month} 2025</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">₹{data.amount.toLocaleString()}</span>
                <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {data.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Paid (Last 6 months):</span>
            <span className="font-semibold text-green-600">₹32,400</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {userRole === 'resident' ? 'Payment History' : 'Monthly Collection'}
          </h2>
          <p className="text-sm text-gray-500">Collection vs Target comparison</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+12.5% from last year</span>
        </div>
      </div>

      <div className="space-y-4">
        {monthlyData.slice(-6).map((data) => (
          <div key={data.month} className="flex items-center space-x-4">
            <div className="w-8 text-sm font-medium text-gray-600">{data.month}</div>
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full relative"
                  style={{ width: `${(data.collection / maxValue) * 100}%` }}
                >
                  <div
                    className="absolute top-0 right-0 w-1 h-2 bg-red-400 rounded-full"
                    style={{ 
                      right: `${100 - (data.target / maxValue) * 100}%`,
                      display: data.target > data.collection ? 'block' : 'none'
                    }}
                  />
                </div>
              </div>
              <div className="w-20 text-right text-sm font-medium text-gray-900">
                ₹{(data.collection / 1000).toFixed(0)}k
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">Collected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-600">Target</span>
            </div>
          </div>
          <div className="text-gray-500">
            YTD Collection: ₹6,25,000
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionChart;