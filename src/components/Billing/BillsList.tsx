import React from 'react';
import { Eye, Download, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface BillsListProps {
  searchTerm: string;
  billType: string;
}

const BillsList: React.FC<BillsListProps> = ({ searchTerm, billType }) => {
  const resendPaymentLink = (bill: any) => {
    const isOwnerFlat = ['A-102', 'B-203', 'C-301'].includes(bill.flatNumber);
    const tenantName = bill.flatNumber === 'A-102' ? 'Rajesh Kumar' : 
                      bill.flatNumber === 'B-203' ? 'Priya Sharma' : 'Amit Patel';
    
    const message = `Hello ${bill.residentName},

Your monthly maintenance of ₹${bill.amount.toLocaleString()} is due for flat ${bill.flatNumber}${isOwnerFlat ? ` (Tenant: ${tenantName})` : ''}.

Please pay securely via this link: ${bill.upiLink}

${isOwnerFlat ? 'Note: Please coordinate with your tenant for payment.' : ''}

Thank you,
SDVR Welfare Association.`;

    console.log('Resending WhatsApp Payment Link:', {
      to: bill.flatNumber,
      message: message,
      timestamp: new Date().toISOString()
    });
    
    alert(`Payment link resent to ${bill.residentName} (${bill.flatNumber})`);
  };

  const bills = [
    { id: '1', flatNumber: 'A-101', residentName: 'John Smith', type: 'maintenance', amount: 5400, dueDate: '2025-01-31', status: 'paid', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=John%20Smith&am=5400&cu=INR' },
    { id: '2', flatNumber: 'B-205', residentName: 'Sarah Jones', type: 'water', amount: 1200, dueDate: '2025-01-31', status: 'payment_link_sent', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=Sarah%20Jones&am=1200&cu=INR' },
    { id: '3', flatNumber: 'C-303', residentName: 'Mike Wilson', type: 'maintenance', amount: 5400, dueDate: '2025-01-31', status: 'overdue', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=Mike%20Wilson&am=5400&cu=INR' },
    { id: '4', flatNumber: 'A-204', residentName: 'Lisa Brown', type: 'water', amount: 980, dueDate: '2025-01-31', status: 'payment_link_sent', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=Lisa%20Brown&am=980&cu=INR' },
    { id: '5', flatNumber: 'B-102', residentName: 'David Lee', type: 'maintenance', amount: 5400, dueDate: '2025-01-31', status: 'paid', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=David%20Lee&am=5400&cu=INR' },
    { id: '6', flatNumber: 'A-302', residentName: 'Emma Davis', type: 'electricity', amount: 2800, dueDate: '2025-01-31', status: 'payment_link_sent', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=Emma%20Davis&am=2800&cu=INR' },
    { id: '7', flatNumber: 'C-201', residentName: 'Alex Johnson', type: 'maintenance', amount: 6800, dueDate: '2025-01-31', status: 'paid', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=Alex%20Johnson&am=6800&cu=INR' },
    { id: '8', flatNumber: 'B-301', residentName: 'Nina Patel', type: 'water', amount: 1450, dueDate: '2025-01-31', status: 'overdue', generatedDate: '2025-01-01', paymentLinkSent: true, upiLink: 'upi://pay?pa=9392615543@ybl&pn=Nina%20Patel&am=1450&cu=INR' },
  ];

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.residentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = billType === 'all' || bill.type === billType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'payment_link_sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'payment_link_sent': return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getBillTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'water': return 'bg-cyan-100 text-cyan-800';
      case 'electricity': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flat / Resident
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bill Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
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
          {filteredBills.map((bill) => (
            <tr key={bill.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{bill.flatNumber}</div>
                  <div className="text-sm text-gray-500">{bill.residentName}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getBillTypeColor(bill.type)}`}>
                  {bill.status === 'payment_link_sent' ? 'Payment Link Sent' : bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">₹{bill.amount.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Generated: {bill.generatedDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {bill.dueDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(bill.status)}
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-1" title="View Bill">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-700 p-1" title="Download">
                  <Download className="w-4 h-4" />
                </button>
                {(bill.status !== 'paid' && bill.paymentLinkSent) && (
                  <button 
                    className="text-purple-600 hover:text-purple-700 p-1" 
                    title="Resend Payment Link"
                    onClick={() => resendPaymentLink(bill)}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
                {bill.status !== 'paid' && !bill.paymentLinkSent && (
                  <button className="text-purple-600 hover:text-purple-700 p-1" title="Send Reminder">
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBills.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bills found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or generate new bills.
          </p>
        </div>
      )}
    </div>
  );
};

export default BillsList;