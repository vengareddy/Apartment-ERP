import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

interface RecentTransactionsProps {
  userRole: string;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ userRole, currentUser }) => {
  const adminTransactions = [
    { id: '1', type: 'income', description: 'Maintenance - A-101', amount: 5400, date: '2025-01-10', status: 'completed', method: 'UPI' },
    { id: '2', type: 'expense', description: 'Gardening Services', amount: 8500, date: '2025-01-10', status: 'completed', method: 'Bank Transfer' },
    { id: '3', type: 'income', description: 'Water Bill - B-205', amount: 1200, date: '2025-01-09', status: 'completed', method: 'Cash' },
    { id: '4', type: 'expense', description: 'Electricity Bill', amount: 15600, date: '2025-01-09', status: 'pending', method: 'Cheque' },
    { id: '5', type: 'income', description: 'Maintenance - C-303', amount: 5400, date: '2025-01-08', status: 'completed', method: 'Net Banking' },
  ];

  const getResidentTransactions = () => {
    if (!currentUser?.flatNumber) return [];
    
    const isOwnerWithTenant = ['A-102', 'B-203', 'C-301'].includes(currentUser.flatNumber);
    const tenantName = currentUser.flatNumber === 'A-102' ? 'Rajesh Kumar' : 
                      currentUser.flatNumber === 'B-203' ? 'Priya Sharma' : 'Amit Patel';
    
    // Show transactions for the flat (paid by tenant if applicable)
    return [
      { id: '1', type: 'payment', description: `January Maintenance - ${currentUser.flatNumber}${isOwnerWithTenant ? ` (Paid by ${tenantName})` : ''}`, amount: 5400, date: '2025-01-10', status: 'completed', method: 'UPI' },
      { id: '2', type: 'payment', description: `Water Bill - Dec 2024 - ${currentUser.flatNumber}${isOwnerWithTenant ? ` (Paid by ${tenantName})` : ''}`, amount: 1200, date: '2025-01-08', status: 'completed', method: 'UPI' },
      { id: '3', type: 'payment', description: `December Maintenance - ${currentUser.flatNumber}${isOwnerWithTenant ? ` (Paid by ${tenantName})` : ''}`, amount: 5400, date: '2024-12-10', status: 'completed', method: 'Net Banking' },
      { id: '4', type: 'payment', description: `Water Bill - Nov 2024 - ${currentUser.flatNumber}${isOwnerWithTenant ? ` (Paid by ${tenantName})` : ''}`, amount: 980, date: '2024-12-08', status: 'completed', method: 'UPI' },
    ];
  };

  const transactions = userRole === 'resident' ? getResidentTransactions() : adminTransactions;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' || transaction.type === 'payment' 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                {transaction.type === 'income' || transaction.type === 'payment' ? (
                  <ArrowDownRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{transaction.date}</span>
                  <span>•</span>
                  <span>{transaction.method}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' || transaction.type === 'payment'
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' || transaction.type === 'payment' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;