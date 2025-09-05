import React, { useState } from 'react';
import { X, User, Mail, Phone, Home, Shield } from 'lucide-react';

interface AddUserModalProps {
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    idNumber: '',
    role: 'resident',
    flatNumber: '',
    userType: 'resident', // 'owner' or 'resident'
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    tenantWhatsappNumber: '',
    tenantIdNumber: '',
    monthlyRent: '',
    password: '',
    confirmPassword: '',
    sendWelcomeEmail: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate user creation
    alert(`User created: ${formData.name} (${formData.role})`);
    onClose();
  };

  const availableFlats = [
    'A-101', 'A-102', 'A-103', 'A-201', 'A-202', 'A-203',
    'B-101', 'B-102', 'B-103', 'B-201', 'B-202', 'B-203',
    'C-101', 'C-102', 'C-103', 'C-201', 'C-202', 'C-203'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number (Aadhar/PAN) *
                </label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  placeholder="AADHAR-1234-5678-9012 or PAN-ABCDE1234F"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="WhatsApp number for notifications"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">For payment reminders and society notices</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="resident">Resident</option>
                    <option value="treasurer">Treasurer</option>
                    <option value="auditor">Auditor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Flat Assignment */}
          {(formData.role === 'resident' || formData.role === 'treasurer') && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Home className="w-5 h-5 mr-2 text-green-600" />
                Flat Assignment
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupancy Type
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="resident">Self-Occupied (Owner lives in flat)</option>
                  <option value="owner">Rented Out (Owner has tenant)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flat Number {formData.role === 'resident' ? '*' : '(Optional)'}
                </label>
                <select
                  value={formData.flatNumber}
                  onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={formData.role === 'resident'}
                >
                  <option value="">Select a flat</option>
                  {availableFlats.map(flat => (
                    <option key={flat} value={flat}>{flat}</option>
                  ))}
                </select>
              </div>

              {/* Tenant Information for Owners */}
              {formData.userType === 'owner' && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-3">Tenant Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant Name
                      </label>
                      <input
                        type="text"
                        value={formData.tenantName}
                        onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Current tenant name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.tenantPhone}
                        onChange={(e) => setFormData({ ...formData, tenantPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tenant phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant Email
                      </label>
                      <input
                        type="email"
                        value={formData.tenantEmail}
                        onChange={(e) => setFormData({ ...formData, tenantEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tenant email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.tenantWhatsappNumber}
                        onChange={(e) => setFormData({ ...formData, tenantWhatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tenant WhatsApp number"
                        required={formData.userType === 'owner'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tenant ID Number (Aadhar/PAN) *
                      </label>
                      <input
                        type="text"
                        value={formData.tenantIdNumber}
                        onChange={(e) => setFormData({ ...formData, tenantIdNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="AADHAR-1234-5678-9012"
                        required={formData.userType === 'owner'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Rent (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.monthlyRent}
                        onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Monthly rental amount"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="text-sm font-medium text-blue-900 mb-2">📱 WhatsApp Notification Setup</h5>
                    <p className="text-xs text-blue-800">
                      Both owner and tenant WhatsApp numbers are required for:
                    </p>
                    <ul className="text-xs text-blue-800 mt-1 space-y-1">
                      <li>• Monthly maintenance bill reminders</li>
                      <li>• Corpus fund collection notices</li>
                      <li>• Payment confirmations and receipts</li>
                      <li>• Society announcements and updates</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              Security
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  minLength={8}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendWelcomeEmail"
                checked={formData.sendWelcomeEmail}
                onChange={(e) => setFormData({ ...formData, sendWelcomeEmail: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="sendWelcomeEmail" className="ml-2 text-sm text-gray-700">
                Send welcome email with login credentials
              </label>
            </div>
          </div>

          {/* Role Permissions Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Role Permissions</h4>
            <div className="text-sm text-gray-600">
              {formData.role === 'admin' && (
                <p>• Full system access including user management, billing, payments, expenses, and reports</p>
              )}
              {formData.role === 'treasurer' && (
                <p>• Access to billing, payments, expenses, and financial reports</p>
              )}
              {formData.role === 'auditor' && (
                <p>• Read-only access to all financial data and reports</p>
              )}
              {formData.role === 'resident' && (
                <p>• Access to personal bills, payments, and basic society information</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;