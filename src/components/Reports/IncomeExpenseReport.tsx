import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

interface IncomeExpenseReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const IncomeExpenseReport: React.FC<IncomeExpenseReportProps> = ({ dateRange, currentUser }) => {
  const monthlyData = [
    { month: 'Jan 2025', income: 450000, expense: 180000 },
    { month: 'Dec 2024', income: 480000, expense: 165000 },
    { month: 'Nov 2024', income: 520000, expense: 195000 },
    { month: 'Oct 2024', income: 495000, expense: 175000 },
    { month: 'Sep 2024', income: 510000, expense: 188000 },
    { month: 'Aug 2024', income: 485000, expense: 162000 },
  ];

  const incomeBreakdown = [
    { category: 'Maintenance', amount: 380000, percentage: 84.4 },
    { category: 'Water Bills', amount: 45000, percentage: 10.0 },
    { category: 'Parking', amount: 18000, percentage: 4.0 },
    { category: 'Late Fees', amount: 7000, percentage: 1.6 },
  ];

  const expenseBreakdown = [
    { category: 'Security', amount: 75000, percentage: 41.7 },
    { category: 'Utilities', amount: 45000, percentage: 25.0 },
    { category: 'Maintenance', amount: 35000, percentage: 19.4 },
    { category: 'Gardening', amount: 15000, percentage: 8.3 },
    { category: 'Others', amount: 10000, percentage: 5.6 },
  ];

  const totalIncome = 450000;
  const totalExpense = 180000;
  const netIncome = totalIncome - totalExpense;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {currentUser?.role === 'resident' ? 'Society Financial Overview' : 'Income vs Expense Report'}
        </h2>
        <div className="text-sm text-gray-500">
          Period: {dateRange.startDate} to {dateRange.endDate}
        </div>
      </div>

      {currentUser?.role === 'resident' && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">Society Financial Health</h3>
          <p className="text-sm text-blue-800">
            This report shows the overall financial performance of our society, including income from maintenance charges, 
            water bills, and other sources, as well as expenses for maintenance, utilities, and improvements.
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className={`grid grid-cols-1 ${currentUser?.role === 'resident' ? 'md:grid-cols-2' : 'md:grid-cols-4'} gap-6 mb-8`}>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Income</p>
              <p className="text-2xl font-bold text-green-900">₹{totalIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Expense</p>
              <p className="text-2xl font-bold text-red-900">₹{totalExpense.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {currentUser?.role !== 'resident' && (
          <>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Net Income</p>
                  <p className="text-2xl font-bold text-blue-900">₹{netIncome.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Profit Margin</p>
                  <p className="text-2xl font-bold text-purple-900">{((netIncome / totalIncome) * 100).toFixed(1)}%</p>
                </div>
                <PieChart className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend Chart */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => {
              const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{data.month}</span>
                    <span>₹{(data.income - data.expense).toLocaleString()}</span>
                  </div>
                  <div className="flex space-x-1 h-6">
                    <div
                      className="bg-green-500 rounded-l"
                      style={{ width: `${(data.income / maxValue) * 100}%` }}
                      title={`Income: ₹${data.income.toLocaleString()}`}
                    />
                    <div
                      className="bg-red-400 rounded-r"
                      style={{ width: `${(data.expense / maxValue) * 100}%` }}
                      title={`Expense: ₹${data.expense.toLocaleString()}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Income Breakdown */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Income Breakdown</h3>
          <div className="space-y-3">
            {incomeBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">₹{item.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Expense Report for Residents */}
      {currentUser?.role === 'resident' && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Expense Report</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { category: 'Security', description: 'Security guard salaries, CCTV maintenance', amount: 75000, percentage: 41.7 },
                  { category: 'Utilities', description: 'Electricity, water supply, internet', amount: 45000, percentage: 25.0 },
                  { category: 'Maintenance', description: 'Elevator service, plumbing, electrical repairs', amount: 35000, percentage: 19.4 },
                  { category: 'Gardening', description: 'Landscaping, plant maintenance, gardener salary', amount: 15000, percentage: 8.3 },
                  { category: 'Cleaning', description: 'Common area cleaning, housekeeping supplies', amount: 10000, percentage: 5.6 },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{item.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.percentage}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-sm font-bold text-gray-900">
                    TOTAL EXPENSES
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    ₹{totalExpense.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    100%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Regular Expense Breakdown for Admin/Treasurer */}
      {currentUser?.role !== 'resident' && (
        <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenseBreakdown.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <span className="text-xs text-gray-500">{item.percentage}%</span>
              </div>
              <div className="text-lg font-bold text-gray-900">₹{item.amount.toLocaleString()}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Key Insights</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {currentUser?.role === 'resident' ? (
            <>
              <li>• Society income increased by 12.5% compared to the previous month</li>
              <li>• Maintenance charges account for 84.4% of total society income</li>
              <li>• Security expenses are the largest expense category at 41.7%</li>
              <li>• Your maintenance fees contribute to essential services and society upkeep</li>
            </>
          ) : (
            <>
              <li>• Income increased by 12.5% compared to the previous month</li>
              <li>• Maintenance charges account for 84.4% of total income</li>
              <li>• Security expenses are the largest expense category at 41.7%</li>
              <li>• Net profit margin is healthy at 60.0%</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IncomeExpenseReport;