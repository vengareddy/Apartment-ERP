import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Download, RefreshCw } from 'lucide-react';

interface PaymentsListProps {
  searchTerm: string;
  paymentStatus: string;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const PaymentsList: React.FC<PaymentsListProps> = ({ searchTerm, paymentStatus, currentUser }) => {
  const payments = [
    {
      id: '1',
      flatNumber: 'A-101',
      residentName: 'John Smith',
      billType: 'Maintenance',
      amount: 5400,
      paymentMethod: 'UPI',
      transactionId: 'UPI123456789',
      paymentDate: '2025-01-10',
      status: 'success'
    },
    {
      id: '2',
      flatNumber: 'B-205',
      residentName: 'Sarah Jones',
      billType: 'Water Bill',
      amount: 1200,
      paymentMethod: 'Net Banking',
      transactionId: 'NB987654321',
      paymentDate: '2025-01-09',
      status: 'success'
    },
    {
      id: '3',
      flatNumber: 'C-303',
      residentName: 'Mike Wilson',
      billType: 'Maintenance',
      amount: 5400,
      paymentMethod: 'UPI',
      transactionId: 'UPI456789123',
      paymentDate: '2025-01-09',
      status: 'pending'
    },
    {
      id: '4',
      flatNumber: 'A-204',
      residentName: 'Lisa Brown',
      billType: 'Water Bill',
      amount: 980,
      paymentMethod: 'Credit Card',
      transactionId: 'CC789123456',
      paymentDate: '2025-01-08',
      status: 'failed'
    },
    {
      id: '5',
      flatNumber: 'B-102',
      residentName: 'David Lee',
      billType: 'Maintenance',
      amount: 5400,
      paymentMethod: 'UPI',
      transactionId: 'UPI321654987',
      paymentDate: '2025-01-08',
      status: 'success'
    },
    {
      id: '6',
      flatNumber: 'A-302',
      residentName: 'Emma Davis',
      billType: 'Electricity',
      amount: 2800,
      paymentMethod: 'Cash',
      transactionId: 'CASH001',
      paymentDate: '2025-01-07',
      status: 'success'
    }
  ];

  // Filter payments based on user role
  const getFilteredPayments = () => {
    let paymentsToShow = payments;
    
    // If user is a resident, only show their flat's payments
    if (currentUser?.role === 'resident' && currentUser?.flatNumber) {
      paymentsToShow = payments.filter(payment => payment.flatNumber === currentUser.flatNumber);
    }
    
    return paymentsToShow.filter(payment => {
      const matchesSearch = payment.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = paymentStatus === 'all' || payment.status === paymentStatus;
      return matchesSearch && matchesStatus;
    });
  };

  const filteredPayments = getFilteredPayments();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'UPI': return 'bg-blue-100 text-blue-800';
      case 'Net Banking': return 'bg-purple-100 text-purple-800';
      case 'Credit Card': return 'bg-orange-100 text-orange-800';
      case 'Cash': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
              Flat / Resident
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
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
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                  <div className="text-sm text-gray-500">{payment.billType}</div>
                  <div className="text-xs text-gray-400">{payment.paymentDate}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{payment.flatNumber}</div>
                  <div className="text-sm text-gray-500">{payment.residentName}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(payment.paymentMethod)}`}>
                  {payment.paymentMethod}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(payment.status)}
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                {payment.status === 'success' && (
                  <button className="text-green-600 hover:text-green-700 p-1" title="Download Receipt">
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {payment.status === 'failed' && (
                  <button className="text-orange-600 hover:text-orange-700 p-1" title="Retry Payment">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or payment filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentsList;