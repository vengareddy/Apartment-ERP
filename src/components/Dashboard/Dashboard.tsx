import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertCircle,
  CreditCard,
  Receipt,
  Building,
  Calendar
} from 'lucide-react';
import MetricCard from './MetricCard';
import RecentTransactions from './RecentTransactions';
import CollectionChart from './CollectionChart';
import PendingPayments from './PendingPayments';

interface DashboardProps {
  userRole: string;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, currentUser }) => {
  const isAdmin = userRole === 'admin';
  const isTreasurer = userRole === 'treasurer';
  const isResident = userRole === 'resident';
  const isAuditor = userRole === 'auditor';

  // Check if user is an owner with tenant
  const isOwnerWithTenant = currentUser?.role === 'resident' && currentUser?.flatNumber && 
    ['A-102', 'B-203', 'C-301'].includes(currentUser.flatNumber); // Demo flats with tenants

  const adminMetrics = [
    { title: 'Total Revenue', value: '₹4,52,800', change: '+12.5%', icon: DollarSign, color: 'green' },
    { title: 'Pending Dues', value: '₹87,400', change: '-8.2%', icon: AlertCircle, color: 'red' },
    { title: 'Total Flats', value: '84', change: '+2', icon: Building, color: 'blue' },
    { title: 'Active Residents', value: '156', change: '+5', icon: Users, color: 'purple' },
  ];

  const treasurerMetrics = [
    { title: 'Monthly Collection', value: '₹3,65,400', change: '+15.3%', icon: DollarSign, color: 'green' },
    { title: 'Outstanding', value: '₹87,400', change: '-8.2%', icon: AlertCircle, color: 'red' },
    { title: 'Expenses', value: '₹1,23,500', change: '+5.1%', icon: TrendingUp, color: 'orange' },
    { title: 'Payment Methods', value: '5', change: '0', icon: CreditCard, color: 'blue' },
  ];

  const residentMetrics = [
    { title: 'Current Due', value: '₹0', change: '0%', icon: Receipt, color: 'green' },
    { title: 'This Month', value: '₹5,400', change: '+200', icon: Calendar, color: 'blue' },
    { title: 'Total Paid', value: '₹64,800', change: '+5,400', icon: DollarSign, color: 'purple' },
    { title: 'Payment Status', value: 'Paid', change: 'On Time', icon: CreditCard, color: 'green' },
  ];

  const auditorMetrics = [
    { title: 'Total Transactions', value: '1,247', change: '+67', icon: Receipt, color: 'blue' },
    { title: 'Audit Items', value: '23', change: '-5', icon: AlertCircle, color: 'orange' },
    { title: 'Compliance Score', value: '96%', change: '+2%', icon: TrendingUp, color: 'green' },
    { title: 'Reports Generated', value: '12', change: '+3', icon: Calendar, color: 'purple' },
  ];

  const getMetrics = () => {
    if (isAdmin) return adminMetrics;
    if (isTreasurer) return treasurerMetrics;
    if (isResident) return residentMetrics;
    if (isAuditor) return auditorMetrics;
    return residentMetrics;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isAdmin && 'Admin Dashboard'}
          {isTreasurer && 'Treasurer Dashboard'}
          {isResident && (isOwnerWithTenant ? 'Owner Dashboard (Tenant: Monitoring)' : 'Owner Dashboard (Self-Occupied)')}
          {isAuditor && 'Auditor Dashboard'}
        </h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Owner-Tenant Information */}
      {isOwnerWithTenant && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Property Management - Flat {currentUser?.flatNumber}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Current Tenant:</span>
              <div className="font-medium text-blue-900">
                {currentUser?.flatNumber === 'A-102' ? 'Rajesh Kumar' : 
                 currentUser?.flatNumber === 'B-203' ? 'Priya Sharma' : 'Amit Patel'}
              </div>
            </div>
            <div>
              <span className="text-blue-700">Lease Status:</span>
              <div className="font-medium text-green-600">Active</div>
            </div>
            <div>
              <span className="text-blue-700">Payment Status:</span>
              <div className="font-medium text-green-600">Up to Date</div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetrics().map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CollectionChart userRole={userRole} currentUser={currentUser} />
        </div>
        <div>
          <PendingPayments userRole={userRole} currentUser={currentUser} />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions userRole={userRole} currentUser={currentUser} />
    </div>
  );
};

export default Dashboard;