import React from 'react';
import { Eye, Download, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';

interface ExpensesListProps {
  searchTerm: string;
  expenseCategory: string;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ searchTerm, expenseCategory }) => {
  const expenses = [
    {
      id: '1',
      vendor: 'Green Gardens Services',
      category: 'gardening',
      description: 'Monthly garden maintenance',
      amount: 8500,
      expenseDate: '2025-01-10',
      status: 'approved',
      invoiceNumber: 'GGS-001',
      paymentMethod: 'Bank Transfer',
      approvedBy: 'John Admin'
    },
    {
      id: '2',
      vendor: 'Secure Solutions',
      category: 'security',
      description: 'Security guard salary - December',
      amount: 25000,
      expenseDate: '2025-01-05',
      status: 'paid',
      invoiceNumber: 'SS-2024-12',
      paymentMethod: 'Cheque',
      approvedBy: 'Sarah Treasurer'
    },
    {
      id: '3',
      vendor: 'PowerTech Electrical',
      category: 'utilities',
      description: 'Common area lighting repair',
      amount: 4500,
      expenseDate: '2025-01-08',
      status: 'pending',
      invoiceNumber: 'PE-456',
      paymentMethod: 'Cash',
      approvedBy: null
    },
    {
      id: '4',
      vendor: 'CleanPro Services',
      category: 'cleaning',
      description: 'Deep cleaning of common areas',
      amount: 12000,
      expenseDate: '2025-01-07',
      status: 'approved',
      invoiceNumber: 'CP-789',
      paymentMethod: 'UPI',
      approvedBy: 'John Admin'
    },
    {
      id: '5',
      vendor: 'AquaFix Plumbers',
      category: 'maintenance',
      description: 'Water tank cleaning and maintenance',
      amount: 15000,
      expenseDate: '2025-01-06',
      status: 'rejected',
      invoiceNumber: 'AF-321',
      paymentMethod: null,
      approvedBy: 'Sarah Treasurer'
    },
    {
      id: '6',
      vendor: 'City Utilities',
      category: 'utilities',
      description: 'Electricity bill - December 2024',
      amount: 18500,
      expenseDate: '2025-01-03',
      status: 'paid',
      invoiceNumber: 'CU-DEC-24',
      paymentMethod: 'Net Banking',
      approvedBy: 'John Admin'
    }
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = expenseCategory === 'all' || expense.category === expenseCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'paid': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'utilities': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'gardening': return 'bg-green-100 text-green-800';
      case 'cleaning': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expense Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                  <div className="text-sm text-gray-500">Invoice: {expense.invoiceNumber}</div>
                  <div className="text-xs text-gray-400">{expense.expenseDate}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{expense.vendor}</div>
                {expense.paymentMethod && (
                  <div className="text-xs text-gray-500">{expense.paymentMethod}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                  {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">₹{expense.amount.toLocaleString()}</div>
                {expense.approvedBy && (
                  <div className="text-xs text-gray-500">By: {expense.approvedBy}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(expense.status)}
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-700 p-1" title="View Invoice">
                  <FileText className="w-4 h-4" />
                </button>
                {expense.status === 'paid' && (
                  <button className="text-purple-600 hover:text-purple-700 p-1" title="Download Receipt">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new expense.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;