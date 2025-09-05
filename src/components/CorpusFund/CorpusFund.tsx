import React, { useState } from 'react';
import { Plus, Search, Filter, Download, PiggyBank, TrendingUp } from 'lucide-react';
import CorpusFundOverview from './CorpusFundOverview';
import CorpusCollectionModal from './CorpusCollectionModal';
import CorpusExpenseModal from './CorpusExpenseModal';
import CorpusTransactionsList from './CorpusTransactionsList';

interface CorpusFundProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const CorpusFund: React.FC<CorpusFundProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState('all');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: PiggyBank },
    { id: 'collections', name: 'Collections', icon: TrendingUp },
    { id: 'expenses', name: 'Expenses', icon: TrendingUp },
    { id: 'audit', name: 'Audit Trail', icon: Filter },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Corpus Fund Management</h1>
        <div className="flex items-center space-x-3">
          {(currentUser?.role === 'admin' || currentUser?.role === 'treasurer') && (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Record Expense</span>
              </button>
              <button
                onClick={() => setShowCollectionModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Collect Corpus</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Corpus Fund Info */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center mb-4">
          <PiggyBank className="w-8 h-8 text-purple-600 mr-3" />
          <div>
            <h2 className="text-lg font-semibold text-purple-900">Corpus Fund Account</h2>
            <p className="text-sm text-purple-700">Quarterly collections for major repairs and improvements</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold text-green-600">₹8,45,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">This Quarter Collection</p>
            <p className="text-2xl font-bold text-blue-600">₹4,20,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">₹2,15,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Collection Rate</p>
            <p className="text-2xl font-bold text-purple-600">85%</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && <CorpusFundOverview />}
          
          {(activeTab === 'collections' || activeTab === 'expenses' || activeTab === 'audit') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search transactions..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-80"
                    />
                  </div>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Transactions</option>
                    <option value="collection">Collections</option>
                    <option value="expense">Expenses</option>
                  </select>
                </div>
              </div>

              <CorpusTransactionsList 
                searchTerm={searchTerm} 
                transactionType={transactionType}
                activeTab={activeTab}
              />
            </div>
          )}
        </div>
      </div>

      {showCollectionModal && (
        <CorpusCollectionModal onClose={() => setShowCollectionModal(false)} />
      )}

      {showExpenseModal && (
        <CorpusExpenseModal onClose={() => setShowExpenseModal(false)} currentUser={currentUser} />
      )}
    </div>
  );
};

export default CorpusFund;