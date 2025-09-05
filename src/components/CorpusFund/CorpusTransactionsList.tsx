import React from 'react';
import { TrendingUp, TrendingDown, Eye, Download, CheckCircle, Clock, XCircle } from 'lucide-react';

interface CorpusTransactionsListProps {
  searchTerm: string;
  transactionType: string;
  activeTab: string;
}

const CorpusTransactionsList: React.FC<CorpusTransactionsListProps> = ({ 
  searchTerm, 
  transactionType, 
  activeTab 
}) => {
  const transactions = [
    {
      id: '1',
      type: 'collection',
      description: 'Q4 2024 Corpus Fund Collection - A-101',
      amount: 6000,
      date: '2025-01-10',
      status: 'completed',
      flatNumber: 'A-101',
      residentName: 'John Smith',
      quarter: 'Q4-2024',
      paymentMethod: 'UPI'
    },
    {
      id: '2',
      type: 'expense',
      description: 'Elevator Modernization - Phase 1',
      amount: 150000,
      date: '2025-01-08',
      status: 'completed',
      vendor: 'Otis Elevator Company',
      category: 'Infrastructure',
      invoiceNumber: 'OEC-2025-001',
      approvedBy: 'Management Committee'
    },
    {
      id: '3',
      type: 'collection',
      description: 'Q4 2024 Corpus Fund Collection - B-205',
      amount: 6000,
      date: '2025-01-09',
      status: 'completed',
      flatNumber: 'B-205',
      residentName: 'Sarah Jones',
      quarter: 'Q4-2024',
      paymentMethod: 'Net Banking'
    },
    {
      id: '4',
      type: 'expense',
      description: 'Roof Waterproofing - Building A',
      amount: 85000,
      date: '2025-01-05',
      status: 'completed',
      vendor: 'WaterShield Solutions',
      category: 'Maintenance',
      invoiceNumber: 'WS-2025-003',
      approvedBy: 'Management Committee'
    },
    {
      id: '5',
      type: 'collection',
      description: 'Q1 2025 Corpus Fund Collection - C-303',
      amount: 6000,
      date: '2025-01-03',
      status: 'pending',
      flatNumber: 'C-303',
      residentName: 'Mike Wilson',
      quarter: 'Q1-2025',
      paymentMethod: null
    },
    {
      id: '6',
      type: 'expense',
      description: 'Fire Safety System Upgrade',
      amount: 120000,
      date: '2024-12-28',
      status: 'pending_approval',
      vendor: 'SafeGuard Systems',
      category: 'Safety',
      invoiceNumber: 'SG-2024-089',
      approvedBy: null
    },
    {
      id: '7',
      type: 'collection',
      description: 'Q4 2024 Corpus Fund Collection - A-204',
      amount: 6000,
      date: '2024-12-25',
      status: 'completed',
      flatNumber: 'A-204',
      residentName: 'Lisa Brown',
      quarter: 'Q4-2024',
      paymentMethod: 'UPI'
    },
    {
      id: '8',
      type: 'expense',
      description: 'Swimming Pool Renovation',
      amount: 200000,
      date: '2024-12-15',
      status: 'in_progress',
      vendor: 'AquaTech Solutions',
      category: 'Amenities',
      invoiceNumber: 'AT-2024-156',
      approvedBy: 'Management Committee'
    }
  ];

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (transaction.flatNumber && transaction.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (transaction.vendor && transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = transactionType === 'all' || transaction.type === transactionType;
      
      const matchesTab = activeTab === 'audit' || 
                        (activeTab === 'collections' && transaction.type === 'collection') ||
                        (activeTab === 'expenses' && transaction.type === 'expense');
      
      return matchesSearch && matchesType && matchesTab;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending_approval': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'pending_approval': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'Pending Approval';
      case 'in_progress': return 'In Progress';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Additional Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    transaction.type === 'collection' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'collection' ? (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  transaction.type === 'collection' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {transaction.type === 'collection' ? 'Collection' : 'Expense'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${
                  transaction.type === 'collection' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'collection' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(transaction.status)}
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {getStatusText(transaction.status)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {transaction.type === 'collection' ? (
                  <div>
                    <div>{transaction.flatNumber} - {transaction.residentName}</div>
                    <div className="text-xs text-gray-500">{transaction.quarter}</div>
                  </div>
                ) : (
                  <div>
                    <div>{transaction.vendor}</div>
                    <div className="text-xs text-gray-500">{transaction.category}</div>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                {transaction.status === 'completed' && (
                  <button className="text-green-600 hover:text-green-700 p-1" title="Download Receipt">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            {activeTab === 'collections' ? <TrendingDown className="w-12 h-12" /> : 
             activeTab === 'expenses' ? <TrendingUp className="w-12 h-12" /> : 
             <CheckCircle className="w-12 h-12" />}
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default CorpusTransactionsList;