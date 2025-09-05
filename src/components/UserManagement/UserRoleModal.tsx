import React from 'react';
import { X, Shield, Users, Eye, Edit, DollarSign, BarChart3 } from 'lucide-react';

interface UserRoleModalProps {
  onClose: () => void;
}

const UserRoleModal: React.FC<UserRoleModalProps> = ({ onClose }) => {
  const roles = [
    {
      name: 'Admin',
      description: 'Full system administrator with complete access',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: Shield,
      permissions: [
        'User management and role assignment',
        'Complete billing and payment management',
        'Expense management and vendor operations',
        'All financial reports and analytics',
        'System settings and configuration',
        'Audit logs and security management'
      ]
    },
    {
      name: 'Treasurer',
      description: 'Financial management and accounting operations',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: DollarSign,
      permissions: [
        'Bill generation and management',
        'Payment processing and tracking',
        'Expense recording and approval',
        'Financial reports and statements',
        'Vendor management',
        'Collection and reminder management'
      ]
    },
    {
      name: 'Auditor',
      description: 'Read-only access for financial auditing',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: BarChart3,
      permissions: [
        'View all financial transactions',
        'Access to all reports and analytics',
        'Audit trail and log review',
        'Compliance monitoring',
        'Read-only access to bills and payments',
        'Export capabilities for audit purposes'
      ]
    },
    {
      name: 'Resident',
      description: 'Basic access for apartment residents',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: Users,
      permissions: [
        'View personal bills and payment history',
        'Make online payments via UPI/cards',
        'Download payment receipts',
        'Update personal profile information',
        'View society announcements',
        'Submit maintenance requests'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">User Roles & Permissions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              The system uses role-based access control (RBAC) to ensure users have appropriate permissions 
              based on their responsibilities within the apartment management system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${role.color}`}>
                <div className="flex items-center mb-4">
                  <role.icon className="w-8 h-8 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold">{role.name}</h3>
                    <p className="text-sm opacity-80">{role.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Permissions:</h4>
                  <ul className="space-y-1">
                    {role.permissions.map((permission, permIndex) => (
                      <li key={permIndex} className="text-sm flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 mr-2 flex-shrink-0" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Permission Matrix */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Treasurer
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Auditor
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resident
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { feature: 'User Management', admin: 'Full', treasurer: 'None', auditor: 'View', resident: 'None' },
                    { feature: 'Bill Generation', admin: 'Full', treasurer: 'Full', auditor: 'View', resident: 'None' },
                    { feature: 'Payment Processing', admin: 'Full', treasurer: 'Full', auditor: 'View', resident: 'Own Only' },
                    { feature: 'Expense Management', admin: 'Full', treasurer: 'Full', auditor: 'View', resident: 'None' },
                    { feature: 'Financial Reports', admin: 'Full', treasurer: 'Full', auditor: 'View', resident: 'Own Only' },
                    { feature: 'System Settings', admin: 'Full', treasurer: 'Limited', auditor: 'None', resident: 'None' },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          row.admin === 'Full' ? 'bg-green-100 text-green-800' : 
                          row.admin === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                          row.admin === 'View' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {row.admin}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          row.treasurer === 'Full' ? 'bg-green-100 text-green-800' : 
                          row.treasurer === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                          row.treasurer === 'View' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {row.treasurer}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          row.auditor === 'Full' ? 'bg-green-100 text-green-800' : 
                          row.auditor === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                          row.auditor === 'View' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {row.auditor}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          row.resident === 'Full' ? 'bg-green-100 text-green-800' : 
                          row.resident === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                          row.resident === 'View' ? 'bg-blue-100 text-blue-800' :
                          row.resident === 'Own Only' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {row.resident}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Security Notes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• All user actions are logged for audit purposes</li>
              <li>• Role changes require admin approval and are immediately effective</li>
              <li>• Users can only access data relevant to their assigned flats (for residents)</li>
              <li>• Financial data access is strictly controlled and monitored</li>
              <li>• Session timeouts and password policies are enforced</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRoleModal;