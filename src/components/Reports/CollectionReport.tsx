import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface CollectionReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

const CollectionReport: React.FC<CollectionReportProps> = ({ dateRange }) => {
  const collectionData = [
    { flatNumber: 'A-101', residentName: 'John Smith', amount: 5400, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-10' },
    { flatNumber: 'A-102', residentName: 'Sarah Wilson', amount: 5400, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-08' },
    { flatNumber: 'A-103', residentName: 'Mike Johnson', amount: 5400, status: 'pending', dueDate: '2025-01-31', paidDate: null },
    { flatNumber: 'B-201', residentName: 'Lisa Brown', amount: 6800, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-12' },
    { flatNumber: 'B-202', residentName: 'David Lee', amount: 6800, status: 'overdue', dueDate: '2025-01-31', paidDate: null },
    { flatNumber: 'B-203', residentName: 'Emma Davis', amount: 6800, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-05' },
    { flatNumber: 'C-301', residentName: 'Alex Chen', amount: 8200, status: 'paid', dueDate: '2025-01-31', paidDate: '2025-01-15' },
    { flatNumber: 'C-302', residentName: 'Nina Patel', amount: 8200, status: 'pending', dueDate: '2025-01-31', paidDate: null },
  ];

  const totalFlats = collectionData.length;
  const paidFlats = collectionData.filter(item => item.status === 'paid').length;
  const pendingFlats = collectionData.filter(item => item.status === 'pending').length;
  const overdueFlats = collectionData.filter(item => item.status === 'overdue').length;

  const totalAmount = collectionData.reduce((sum, item) => sum + item.amount, 0);
  const collectedAmount = collectionData
    .filter(item => item.status === 'paid')
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingAmount = collectionData
    .filter(item => item.status !== 'paid')
    .reduce((sum, item) => sum + item.amount, 0);

  const collectionRate = (collectedAmount / totalAmount) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Collection Report</h2>
        <div className="text-sm text-gray-500">
          Period: {dateRange.startDate} to {dateRange.endDate}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Collection Rate</p>
              <p className="text-2xl font-bold text-blue-900">{collectionRate.toFixed(1)}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Collected</p>
              <p className="text-2xl font-bold text-green-900">₹{collectedAmount.toLocaleString()}</p>
            </div>
            <div className="text-xs text-green-600">{paidFlats}/{totalFlats} flats</div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="text-xs text-yellow-600">{pendingFlats + overdueFlats} flats</div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Overdue</p>
              <p className="text-2xl font-bold text-red-900">{overdueFlats}</p>
            </div>
            <Clock className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Collection Status Chart */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Collection Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className="bg-green-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{ width: `${collectionRate}%` }}
          >
            {collectionRate.toFixed(1)}%
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{collectedAmount.toLocaleString()} collected</span>
          <span>₹{pendingAmount.toLocaleString()} pending</span>
        </div>
      </div>

      {/* Detailed Collection List */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Flat-wise Collection Status</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flat / Resident
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collectionData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.flatNumber}</div>
                    <div className="text-sm text-gray-500">{item.residentName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₹{item.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.paidDate || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(item.status)}
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Items */}
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <h3 className="font-medium text-orange-900 mb-2">Action Items</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Send payment reminders to {pendingFlats + overdueFlats} residents</li>
          <li>• Follow up with {overdueFlats} overdue flats</li>
          <li>• Collection rate is {collectionRate > 90 ? 'excellent' : collectionRate > 80 ? 'good' : 'needs improvement'}</li>
          <li>• Target: Achieve 95% collection rate by month-end</li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionReport;