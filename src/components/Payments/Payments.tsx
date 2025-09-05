import React, { useState } from 'react';
import { CreditCard, Search, Filter, Download, Plus } from 'lucide-react';
import PaymentsList from './PaymentsList';
import UPIIntegration from './UPIIntegration';

interface PaymentsProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const Payments: React.FC<PaymentsProps> = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [showUPIModal, setShowUPIModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentUser?.role === 'resident' ? 'My Payments' : 'Payment Management'}
        </h1>
        <div className="flex items-center space-x-3">
          {currentUser?.role !== 'resident' && (
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          )}
          <button
            onClick={() => setShowUPIModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{currentUser?.role === 'resident' ? 'Make Payment' : 'Record Payment'}</span>
          </button>
        </div>
      </div>

      {currentUser?.role === 'resident' && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Payment Information - Flat {currentUser.flatNumber}</h3>
          <p className="text-sm text-blue-800">
            View your payment history and make new payments for your flat. All transactions are secure and instantly verified.
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={currentUser?.role === 'resident' ? "Search your payments..." : "Search by flat number, transaction ID..."}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="success">Successful</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          {currentUser?.role !== 'resident' && (
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Filter Options</span>
            </div>
          )}
        </div>

        <PaymentsList searchTerm={searchTerm} paymentStatus={paymentStatus} currentUser={currentUser} />
      </div>

      {showUPIModal && (
        <UPIIntegration onClose={() => setShowUPIModal(false)} currentUser={currentUser} />
      )}
    </div>
  );
};

export default Payments;