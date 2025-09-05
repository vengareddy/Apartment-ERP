import React, { useState } from 'react';
import { Users, Home, Phone, Mail, Car as IdCard, Download, Search, Filter } from 'lucide-react';

interface OwnerTenantReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

const OwnerTenantReport: React.FC<OwnerTenantReportProps> = ({ dateRange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const ownerTenantData = [
    {
      flatNumber: 'A-101',
      ownerName: 'John Smith',
      ownerPhone: '+91 98765 43210',
      ownerEmail: 'john.smith@email.com',
      ownerIdNumber: 'AADHAR-1234-5678-9012',
      tenantName: null,
      tenantPhone: null,
      tenantEmail: null,
      tenantIdNumber: null,
      occupancyType: 'owner-occupied',
      leaseStartDate: null,
      leaseEndDate: null,
      monthlyRent: null
    },
    {
      flatNumber: 'A-102',
      ownerName: 'Suresh Reddy',
      ownerPhone: '+91 98765 43217',
      ownerEmail: 'suresh.reddy@email.com',
      ownerIdNumber: 'AADHAR-2345-6789-0123',
      tenantName: 'Rajesh Kumar',
      tenantPhone: '+91 98765 43218',
      tenantEmail: 'rajesh.kumar@email.com',
      tenantIdNumber: 'AADHAR-3456-7890-1234',
      occupancyType: 'rented',
      leaseStartDate: '2024-06-01',
      leaseEndDate: '2025-05-31',
      monthlyRent: 25000
    },
    {
      flatNumber: 'A-103',
      ownerName: 'Mike Johnson',
      ownerPhone: '+91 98765 43212',
      ownerEmail: 'mike.johnson@email.com',
      ownerIdNumber: 'AADHAR-4567-8901-2345',
      tenantName: null,
      tenantPhone: null,
      tenantEmail: null,
      tenantIdNumber: null,
      occupancyType: 'owner-occupied',
      leaseStartDate: null,
      leaseEndDate: null,
      monthlyRent: null
    },
    {
      flatNumber: 'B-201',
      ownerName: 'Lisa Brown',
      ownerPhone: '+91 98765 43213',
      ownerEmail: 'lisa.brown@email.com',
      ownerIdNumber: 'AADHAR-5678-9012-3456',
      tenantName: null,
      tenantPhone: null,
      tenantEmail: null,
      tenantIdNumber: null,
      occupancyType: 'owner-occupied',
      leaseStartDate: null,
      leaseEndDate: null,
      monthlyRent: null
    },
    {
      flatNumber: 'B-202',
      ownerName: 'David Lee',
      ownerPhone: '+91 98765 43214',
      ownerEmail: 'david.lee@email.com',
      ownerIdNumber: 'AADHAR-6789-0123-4567',
      tenantName: null,
      tenantPhone: null,
      tenantEmail: null,
      tenantIdNumber: null,
      occupancyType: 'owner-occupied',
      leaseStartDate: null,
      leaseEndDate: null,
      monthlyRent: null
    },
    {
      flatNumber: 'B-203',
      ownerName: 'Lakshmi Devi',
      ownerPhone: '+91 98765 43219',
      ownerEmail: 'lakshmi.devi@email.com',
      ownerIdNumber: 'AADHAR-7890-1234-5678',
      tenantName: 'Priya Sharma',
      tenantPhone: '+91 98765 43220',
      tenantEmail: 'priya.sharma@email.com',
      tenantIdNumber: 'AADHAR-8901-2345-6789',
      occupancyType: 'rented',
      leaseStartDate: '2024-04-01',
      leaseEndDate: '2025-03-31',
      monthlyRent: 28000
    },
    {
      flatNumber: 'C-301',
      ownerName: 'Ramesh Gupta',
      ownerPhone: '+91 98765 43221',
      ownerEmail: 'ramesh.gupta@email.com',
      ownerIdNumber: 'AADHAR-9012-3456-7890',
      tenantName: 'Amit Patel',
      tenantPhone: '+91 98765 43222',
      tenantEmail: 'amit.patel@email.com',
      tenantIdNumber: 'AADHAR-0123-4567-8901',
      occupancyType: 'rented',
      leaseStartDate: '2024-08-01',
      leaseEndDate: '2025-07-31',
      monthlyRent: 32000
    },
    {
      flatNumber: 'C-302',
      ownerName: 'Nina Patel',
      ownerPhone: '+91 98765 43216',
      ownerEmail: 'nina.patel@email.com',
      ownerIdNumber: 'AADHAR-1357-2468-9024',
      tenantName: null,
      tenantPhone: null,
      tenantEmail: null,
      tenantIdNumber: null,
      occupancyType: 'owner-occupied',
      leaseStartDate: null,
      leaseEndDate: null,
      monthlyRent: null
    }
  ];

  const filteredData = ownerTenantData.filter(item => {
    const matchesSearch = item.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.tenantName && item.tenantName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'owner-occupied' && item.occupancyType === 'owner-occupied') ||
                         (filterType === 'rented' && item.occupancyType === 'rented');
    
    return matchesSearch && matchesFilter;
  });

  const totalFlats = ownerTenantData.length;
  const ownerOccupied = ownerTenantData.filter(item => item.occupancyType === 'owner-occupied').length;
  const rented = ownerTenantData.filter(item => item.occupancyType === 'rented').length;
  const totalRentalIncome = ownerTenantData
    .filter(item => item.monthlyRent)
    .reduce((sum, item) => sum + (item.monthlyRent || 0), 0);

  const exportReport = () => {
    const csvContent = [
      'Flat Number,Owner Name,Owner Phone,Owner Email,Owner ID,Tenant Name,Tenant Phone,Tenant Email,Tenant ID,Occupancy Type,Lease Start,Lease End,Monthly Rent',
      ...filteredData.map(item => 
        `${item.flatNumber},${item.ownerName},${item.ownerPhone},${item.ownerEmail},${item.ownerIdNumber},${item.tenantName || ''},${item.tenantPhone || ''},${item.tenantEmail || ''},${item.tenantIdNumber || ''},${item.occupancyType},${item.leaseStartDate || ''},${item.leaseEndDate || ''},${item.monthlyRent || ''}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `owner-tenant-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Owner-Tenant Details Report</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Period: {dateRange.startDate} to {dateRange.endDate}
          </div>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Flats</p>
              <p className="text-2xl font-bold text-blue-900">{totalFlats}</p>
            </div>
            <Home className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Owner Occupied</p>
              <p className="text-2xl font-bold text-green-900">{ownerOccupied}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Rented Flats</p>
              <p className="text-2xl font-bold text-purple-900">{rented}</p>
            </div>
            <Home className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Total Rental Value</p>
              <p className="text-2xl font-bold text-orange-900">₹{totalRentalIncome.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by flat number, owner name, or tenant name..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Flats</option>
            <option value="owner-occupied">Owner Occupied</option>
            <option value="rented">Rented Flats</option>
          </select>
        </div>
      </div>

      {/* Owner-Tenant Details Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flat Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.flatNumber}</div>
                        <div className={`text-xs ${item.occupancyType === 'rented' ? 'text-purple-600' : 'text-green-600'}`}>
                          {item.occupancyType === 'rented' ? 'Rented' : 'Owner Occupied'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.ownerName}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <IdCard className="w-3 h-3 mr-1" />
                        {item.ownerIdNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone className="w-3 h-3 mr-2 text-gray-400" />
                        {item.ownerPhone}
                      </div>
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="w-3 h-3 mr-2 text-gray-400" />
                        {item.ownerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.tenantName ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.tenantName}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <IdCard className="w-3 h-3 mr-1" />
                          {item.tenantIdNumber}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.tenantPhone ? (
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {item.tenantPhone}
                        </div>
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" />
                          {item.tenantEmail}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.leaseStartDate ? (
                      <div className="text-sm">
                        <div className="text-gray-900">₹{item.monthlyRent?.toLocaleString()}/month</div>
                        <div className="text-xs text-gray-500">
                          {item.leaseStartDate} to {item.leaseEndDate}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Occupancy Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Owner Occupied:</span>
              <span className="font-medium text-green-600">{ownerOccupied} flats ({((ownerOccupied/totalFlats)*100).toFixed(1)}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Rented Out:</span>
              <span className="font-medium text-purple-600">{rented} flats ({((rented/totalFlats)*100).toFixed(1)}%)</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-600">Total Monthly Rental:</span>
              <span className="font-bold text-gray-900">₹{totalRentalIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Owners:</span>
              <span className="font-medium text-blue-600">{totalFlats} contacts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Tenants:</span>
              <span className="font-medium text-purple-600">{rented} contacts</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-600">Total Contacts:</span>
              <span className="font-bold text-gray-900">{totalFlats + rented} people</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-medium text-yellow-900 mb-2">Important Notes</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• All personal information is confidential and should be handled according to privacy policies</li>
          <li>• Owner contact details are used for society communications and emergency situations</li>
          <li>• Tenant information is maintained for lease management and maintenance coordination</li>
          <li>• ID numbers are stored for verification and legal compliance purposes</li>
          <li>• This report should only be accessed by authorized personnel (Admin/Treasurer)</li>
        </ul>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerTenantReport;