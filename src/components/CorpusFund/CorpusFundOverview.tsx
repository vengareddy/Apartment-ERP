import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const CorpusFundOverview: React.FC = () => {
  const quarterlyData = [
    { quarter: 'Q1 2024', collected: 420000, target: 500000, expenses: 85000 },
    { quarter: 'Q2 2024', collected: 480000, target: 500000, expenses: 120000 },
    { quarter: 'Q3 2024', collected: 465000, target: 500000, expenses: 95000 },
    { quarter: 'Q4 2024', collected: 420000, target: 500000, expenses: 215000 },
  ];

  const recentExpenses = [
    { id: '1', description: 'Elevator Modernization', amount: 150000, date: '2025-01-08', category: 'Infrastructure', status: 'completed' },
    { id: '2', description: 'Roof Waterproofing', amount: 85000, date: '2025-01-05', category: 'Maintenance', status: 'completed' },
    { id: '3', description: 'Fire Safety System Upgrade', amount: 120000, date: '2024-12-28', category: 'Safety', status: 'completed' },
    { id: '4', description: 'Swimming Pool Renovation', amount: 200000, date: '2024-12-15', category: 'Amenities', status: 'in-progress' },
  ];

  const upcomingCollections = [
    { quarter: 'Q1 2025', dueDate: '2025-03-31', targetAmount: 500000, collectedSoFar: 125000 },
  ];

  return (
    <div className="space-y-8">
      {/* Quarterly Performance */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Performance</h3>
        <div className="space-y-4">
          {quarterlyData.map((quarter, index) => {
            const collectionRate = (quarter.collected / quarter.target) * 100;
            const netAmount = quarter.collected - quarter.expenses;
            
            return (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{quarter.quarter}</h4>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-600">Collected: ₹{quarter.collected.toLocaleString()}</span>
                    <span className="text-red-600">Expenses: ₹{quarter.expenses.toLocaleString()}</span>
                    <span className={`font-medium ${netAmount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Net: ₹{netAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Collection Progress</span>
                      <span>{collectionRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${collectionRate >= 90 ? 'bg-green-500' : collectionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(collectionRate, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Quarter Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Quarter (Q1 2025)</h3>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-blue-900">Collection Status</h4>
                <p className="text-sm text-blue-700">Due: March 31, 2025</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-700">Target Amount:</span>
                <span className="font-medium text-blue-900">₹5,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Collected So Far:</span>
                <span className="font-medium text-blue-900">₹1,25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Remaining:</span>
                <span className="font-medium text-blue-900">₹3,75,000</span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2">
                <span className="text-blue-700">Collection Rate:</span>
                <span className="font-bold text-blue-900">25%</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Major Expenses</h3>
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${expense.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {expense.status === 'completed' ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> : 
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">₹{expense.amount.toLocaleString()}</p>
                  <p className={`text-xs ${expense.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {expense.status === 'completed' ? 'Completed' : 'In Progress'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fund Utilization Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Utilization by Category (Last 12 Months)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { category: 'Infrastructure', amount: 350000, percentage: 45, color: 'bg-blue-500' },
            { category: 'Maintenance', amount: 200000, percentage: 26, color: 'bg-green-500' },
            { category: 'Safety & Security', amount: 150000, percentage: 19, color: 'bg-red-500' },
            { category: 'Amenities', amount: 80000, percentage: 10, color: 'bg-purple-500' },
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{item.category}</h4>
                <span className="text-sm text-gray-500">{item.percentage}%</span>
              </div>
              <p className="text-lg font-bold text-gray-900 mb-2">₹{item.amount.toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Summary */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Audit Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">100%</p>
            <p className="text-sm text-green-700">Transactions Documented</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">₹7,80,000</p>
            <p className="text-sm text-green-700">Total Audited Amount</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-green-700">Discrepancies Found</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorpusFundOverview;