import React from 'react';
import { Eye, Edit, Trash2, Shield, User, CheckCircle, XCircle } from 'lucide-react';

interface UsersListProps {
  searchTerm: string;
  roleFilter: string;
}

const UsersList: React.FC<UsersListProps> = ({ searchTerm, roleFilter }) => {
  const users = [
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@apartment.com',
      role: 'admin',
      flatNumber: null,
      phone: '+91 98765 43210',
      status: 'active',
      lastLogin: '2025-01-10 09:30',
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Sarah Treasurer',
      email: 'treasurer@apartment.com',
      role: 'treasurer',
      flatNumber: 'A-501',
      phone: '+91 98765 43211',
      status: 'active',
      lastLogin: '2025-01-10 08:15',
      joinDate: '2023-02-01'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      role: 'resident',
      flatNumber: 'A-101',
      phone: '+91 98765 43212',
      status: 'active',
      lastLogin: '2025-01-09 19:45',
      joinDate: '2023-03-10',
      userType: 'resident'
    },
    {
      id: '8',
      name: 'Suresh Reddy',
      email: 'suresh.reddy@email.com',
      role: 'resident',
      flatNumber: 'A-102',
      phone: '+91 98765 43217',
      status: 'active',
      lastLogin: '2025-01-10 11:20',
      joinDate: '2023-07-10',
      userType: 'owner',
      tenantName: 'Rajesh Kumar',
      tenantPhone: '+91 98765 43218'
    },
    {
      id: '9',
      name: 'Lakshmi Devi',
      email: 'lakshmi.devi@email.com',
      role: 'resident',
      flatNumber: 'B-203',
      phone: '+91 98765 43219',
      status: 'active',
      lastLogin: '2025-01-09 15:30',
      joinDate: '2023-08-20',
      userType: 'owner',
      tenantName: 'Priya Sharma',
      tenantPhone: '+91 98765 43220'
    },
    {
      id: '4',
      name: 'Lisa Auditor',
      email: 'auditor@apartment.com',
      role: 'auditor',
      flatNumber: null,
      phone: '+91 98765 43213',
      status: 'active',
      lastLogin: '2025-01-08 14:20',
      joinDate: '2023-04-05'
    },
    {
      id: '5',
      name: 'David Lee',
      email: 'david.lee@email.com',
      role: 'resident',
      flatNumber: 'B-205',
      phone: '+91 98765 43214',
      status: 'inactive',
      lastLogin: '2024-12-20 10:30',
      joinDate: '2023-05-15'
    },
    {
      id: '6',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      role: 'resident',
      flatNumber: 'C-303',
      phone: '+91 98765 43215',
      status: 'active',
      lastLogin: '2025-01-10 16:10',
      joinDate: '2023-06-20'
    },
    {
      id: '7',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      role: 'resident',
      flatNumber: 'A-204',
      phone: '+91 98765 43216',
      status: 'pending',
      lastLogin: 'Never',
      joinDate: '2025-01-08'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.flatNumber && user.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-600" />;
      case 'treasurer': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'auditor': return <Shield className="w-4 h-4 text-purple-600" />;
      default: return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'treasurer': return 'bg-blue-100 text-blue-800';
      case 'auditor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <XCircle className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Flat Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Login
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    {user.userType === 'owner' && user.tenantName && (
                      <div className="text-xs text-blue-600">Tenant: {user.tenantName}</div>
                    )}
                    <div className="text-xs text-gray-400">Joined: {user.joinDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  {getRoleIcon(user.role)}
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.userType === 'owner' ? 'Owner' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div>
                  {user.flatNumber || '-'}
                  {user.userType === 'owner' && (
                    <div className="text-xs text-blue-600">(Rented)</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {user.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(user.status)}
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {user.lastLogin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-700 p-1" title="Edit User">
                  <Edit className="w-4 h-4" />
                </button>
                {user.role !== 'admin' && (
                  <button className="text-red-600 hover:text-red-700 p-1" title="Delete User">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new user.
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersList;