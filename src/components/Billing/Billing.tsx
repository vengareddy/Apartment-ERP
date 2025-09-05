import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import BillGenerationModal from './BillGenerationModal';
import BillsList from './BillsList';

interface BillingProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const Billing: React.FC<BillingProps> = ({ currentUser }) => {
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [billType, setBillType] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
        <div className="flex items-center space-x-3">
          {(currentUser?.role === 'admin' || currentUser?.role === 'treasurer') && (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowGenerationModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Generate Bills</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bills by flat number, resident name..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
            <select
              value={billType}
              onChange={(e) => setBillType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Bills</option>
              <option value="maintenance">Maintenance</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filter Options</span>
          </div>
        </div>

        <BillsList searchTerm={searchTerm} billType={billType} />
      </div>

      {showGenerationModal && (
        <BillGenerationModal onClose={() => setShowGenerationModal(false)} />
      )}
    </div>
  );
};

export default Billing;