import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import IncomeExpenseReport from './IncomeExpenseReport';
import FlatLedgerReport from './FlatLedgerReport';
import CollectionReport from './CollectionReport';
import ExpenseCategoryReport from './ExpenseCategoryReport';
import OwnerTenantReport from './OwnerTenantReport';
import { Users } from 'lucide-react';

interface ReportsProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const Reports: React.FC<ReportsProps> = ({ currentUser }) => {
  const [activeReport, setActiveReport] = useState('income-expense');
  const [dateRange, setDateRange] = useState({
    startDate: '2025-01-01',
    endDate: '2025-01-31'
  });

  const adminReportTypes = [
    { id: 'income-expense', name: 'Income vs Expense', icon: TrendingUp },
    { id: 'collection', name: 'Collection Report', icon: BarChart3 },
    { id: 'flat-ledger', name: 'Flat-wise Ledger', icon: BarChart3 },
    { id: 'expense-category', name: 'Expense by Category', icon: BarChart3 },
    { id: 'owner-tenant', name: 'Owner-Tenant Details', icon: Users },
  ];

  const residentReportTypes = [
    { id: 'income-expense', name: 'Society Financial Overview', icon: TrendingUp },
  ];

  const reportTypes = currentUser?.role === 'resident' ? residentReportTypes : adminReportTypes;

  const renderReport = () => {
    switch (activeReport) {
      case 'income-expense':
        return <IncomeExpenseReport dateRange={dateRange} currentUser={currentUser} />;
      case 'collection':
        return <CollectionReport dateRange={dateRange} />;
      case 'flat-ledger':
        return <FlatLedgerReport dateRange={dateRange} />;
      case 'expense-category':
        return <ExpenseCategoryReport dateRange={dateRange} />;
      case 'owner-tenant':
        return <OwnerTenantReport dateRange={dateRange} />;
      default:
        return <IncomeExpenseReport dateRange={dateRange} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentUser?.role === 'resident' ? 'Society Reports' : 'Financial Reports'}
        </h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {currentUser?.role !== 'resident' && (
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeReport === report.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <report.icon className="w-4 h-4" />
              <span>{report.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;