import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

interface PendingPaymentsProps {
  userRole: string;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const PendingPayments: React.FC<PendingPaymentsProps> = ({ userRole, currentUser }) => {
  const pendingItems = [
    { id: '1', flat: 'A-101', resident: 'John Smith', amount: 5400, days: 15, type: 'Maintenance' },
    { id: '2', flat: 'B-205', resident: 'Sarah Jones', amount: 1200, days: 8, type: 'Water Bill' },
    { id: '3', flat: 'C-303', resident: 'Mike Wilson', amount: 5400, days: 22, type: 'Maintenance' },
    { id: '4', flat: 'A-204', resident: 'Lisa Brown', amount: 980, days: 5, type: 'Water Bill' },
    { id: '5', flat: 'B-102', resident: 'David Lee', amount: 5400, days: 30, type: 'Maintenance' },
  ];

  const getResidentNotifications = () => {
    if (!currentUser?.flatNumber) return [];
    
    return [
      { id: '1', title: 'Payment Reminder', message: `January maintenance due in 5 days for ${currentUser.flatNumber}`, type: 'warning' },
      { id: '2', title: 'Water Bill', message: `December water bill payment confirmed for ${currentUser.flatNumber}`, type: 'success' },
      { id: '3', title: 'Society Notice', message: 'Annual general meeting on 15th Jan', type: 'info' },
      { id: '4', title: 'Maintenance Alert', message: 'Elevator maintenance scheduled tomorrow', type: 'info' },
    ];
  };

  if (userRole === 'resident') {
    const isOwnerWithTenant = currentUser?.flatNumber && 
      ['A-102', 'B-203', 'C-301'].includes(currentUser.flatNumber);
    
    const getOwnerNotifications = () => {
      if (!currentUser?.flatNumber) return [];
      
      const tenantName = currentUser.flatNumber === 'A-102' ? 'Rajesh Kumar' : 
                        currentUser.flatNumber === 'B-203' ? 'Priya Sharma' : 'Amit Patel';
      
      return [
        { id: '1', title: 'Tenant Payment Update', message: `${tenantName} has paid January maintenance for ${currentUser.flatNumber}`, type: 'success' },
        { id: '2', title: 'Society Notice', message: 'Annual general meeting on 15th Jan - Important for all owners', type: 'info' },
        { id: '3', title: 'Maintenance Alert', message: 'Elevator maintenance scheduled tomorrow - Inform your tenant', type: 'warning' },
        { id: '4', title: 'Tenant Compliance', message: `${tenantName} has been following all society rules`, type: 'success' },
      ];
    };

    const notifications = isOwnerWithTenant ? getOwnerNotifications() : getResidentNotifications();
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {isOwnerWithTenant ? 'Owner Notifications (Tenant Monitoring)' : 'Owner Notifications (Self-Occupied)'}
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Mark All Read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
              <div className={`p-1 rounded-full mt-1 ${
                notification.type === 'warning' ? 'bg-yellow-100' :
                notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <AlertCircle className={`w-3 h-3 ${
                  notification.type === 'warning' ? 'text-yellow-600' :
                  notification.type === 'success' ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Pending Payments</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Send Reminders
        </button>
      </div>

      <div className="space-y-4">
        {pendingItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{item.flat}</span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  item.days > 20 ? 'bg-red-100 text-red-800' :
                  item.days > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.days} days
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.resident}</p>
              <p className="text-xs text-gray-500">{item.type}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Overdue</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Pending:</span>
          <span className="font-semibold text-red-600">₹87,400</span>
        </div>
      </div>
    </div>
  );
};

export default PendingPayments;