import React from 'react';
import { PieChart, TrendingUp, DollarSign } from 'lucide-react';

interface ExpenseCategoryReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

const ExpenseCategoryReport: React.FC<ExpenseCategoryReportProps> = ({ dateRange }) => {
  const categoryData = [
    { category: 'Security', amount: 75000, percentage: 41.7, color: 'bg-red-500', transactions: 3, trend: '+5.2%' },
    { category: 'Utilities', amount: 45000, percentage: 25.0, color: 'bg-blue-500', transactions: 8, trend: '+12.8%' },
    { category: 'Maintenance', amount: 35000, percentage: 19.4, color: 'bg-green-500', transactions: 5, trend: '-3.1%' },
    { category: 'Gardening', amount: 15000, percentage: 8.3, color: 'bg-yellow-500', transactions: 2, trend: '+8.7%' },
    { category: 'Cleaning', amount: 10000, percentage: 5.6, color: 'bg-purple-500', transactions: 4, trend: '+2.4%' },
  ];

  const monthlyTrend = [
    { month: 'Sep', security: 70000, utilities: 40000, maintenance: 32000, gardening: 12000, cleaning: 8000 },
    { month: 'Oct', security: 72000, utilities: 42000, maintenance: 35000, gardening: 13000, cleaning: 9000 },
    { month: 'Nov', security: 74000, utilities: 43000, maintenance: 36000, gardening: 14000, cleaning: 9500 },
    { month: 'Dec', security: 73000, utilities: 44000, maintenance: 34000, gardening: 14500, cleaning: 9800 },
    { month: 'Jan', security: 75000, utilities: 45000, maintenance: 35000, gardening: 15000, cleaning: 10000 },
  ];

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = categoryData.reduce((sum, item) => sum + item.transactions, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Expense by Category Report</h2>
        <div className="text-sm text-gray-500">
          Period: {dateRange.startDate} to {dateRange.endDate}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Expenses</p>
              <p className="text-2xl font-bold text-blue-900">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Categories</p>
              <p className="text-2xl font-bold text-green-900">{categoryData.length}</p>
            </div>
            <PieChart className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Transactions</p>
              <p className="text-2xl font-bold text-purple-900">{totalTransactions}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Representation */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Expense Distribution</h3>
          
          <div className="space-y-4">
            {categoryData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <span className="font-medium text-gray-900">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">₹{item.amount.toLocaleString()}</span>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Category Analysis</h3>
          
          <div className="space-y-4">
            {categoryData.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.category}</h4>
                  <span className={`text-sm font-medium ${
                    item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <div className="font-medium">₹{item.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Share:</span>
                    <div className="font-medium">{item.percentage}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Transactions:</span>
                    <div className="font-medium">{item.transactions}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Trend by Category</h3>
        
        <div className="space-y-4">
          {monthlyTrend.map((month, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{month.month} 2024</span>
                <span className="text-sm text-gray-600">
                  Total: ₹{(month.security + month.utilities + month.maintenance + month.gardening + month.cleaning).toLocaleString()}
                </span>
              </div>
              <div className="flex h-6 rounded overflow-hidden">
                <div
                  className="bg-red-500 flex items-center justify-center text-white text-xs"
                  style={{ width: `${(month.security / (month.security + month.utilities + month.maintenance + month.gardening + month.cleaning)) * 100}%` }}
                  title={`Security: ₹${month.security.toLocaleString()}`}
                />
                <div
                  className="bg-blue-500 flex items-center justify-center text-white text-xs"
                  style={{ width: `${(month.utilities / (month.security + month.utilities + month.maintenance + month.gardening + month.cleaning)) * 100}%` }}
                  title={`Utilities: ₹${month.utilities.toLocaleString()}`}
                />
                <div
                  className="bg-green-500 flex items-center justify-center text-white text-xs"
                  style={{ width: `${(month.maintenance / (month.security + month.utilities + month.maintenance + month.gardening + month.cleaning)) * 100}%` }}
                  title={`Maintenance: ₹${month.maintenance.toLocaleString()}`}
                />
                <div
                  className="bg-yellow-500 flex items-center justify-center text-white text-xs"
                  style={{ width: `${(month.gardening / (month.security + month.utilities + month.maintenance + month.gardening + month.cleaning)) * 100}%` }}
                  title={`Gardening: ₹${month.gardening.toLocaleString()}`}
                />
                <div
                  className="bg-purple-500 flex items-center justify-center text-white text-xs"
                  style={{ width: `${(month.cleaning / (month.security + month.utilities + month.maintenance + month.gardening + month.cleaning)) * 100}%` }}
                  title={`Cleaning: ₹${month.cleaning.toLocaleString()}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {categoryData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-gray-600">{item.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-yellow-900 mb-2">Key Insights</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Security expenses account for the largest share at 41.7% of total expenses</li>
          <li>• Utilities showed the highest growth at +12.8% compared to previous period</li>
          <li>• Maintenance expenses decreased by 3.1%, indicating improved efficiency</li>
          <li>• Total of {totalTransactions} transactions across all categories</li>
          <li>• Average expense per transaction: ₹{Math.round(totalExpenses / totalTransactions).toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpenseCategoryReport;