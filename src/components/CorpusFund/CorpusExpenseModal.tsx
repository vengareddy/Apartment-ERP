import React, { useState } from 'react';
import { X, Upload, PiggyBank } from 'lucide-react';

interface CorpusExpenseModalProps {
  onClose: () => void;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const CorpusExpenseModal: React.FC<CorpusExpenseModalProps> = ({ onClose, currentUser }) => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    category: '',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    vendor: '',
    invoiceNumber: '',
    paymentMethod: 'bank_transfer',
    approvalRequired: currentUser?.role === 'admin',
    notes: ''
  });

  // Master data - would come from API in real implementation
  const corpusCategories = [
    'Infrastructure',
    'Major Maintenance', 
    'Safety & Security',
    'Amenities',
    'Emergency Repairs',
    'Building Upgrades'
  ];

  const corpusVendors = [
    'Otis Elevator Company',
    'WaterShield Solutions',
    'SafeGuard Systems',
    'AquaTech Solutions',
    'BuildTech Contractors',
    'EliteSecurity Systems'
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine approval status based on user role and checkbox
    const needsApproval = currentUser?.role === 'admin' || expenseData.approvalRequired;
    const status = needsApproval ? 'Pending Treasurer Approval' : 'Approved';
    const approver = needsApproval ? 'Requires Treasurer Approval' : `Approved by ${currentUser?.name}`;
    
    alert(`Corpus fund expense recorded:
    
Description: ${expenseData.description}
Category: ${expenseData.category}
Amount: ₹${parseInt(expenseData.amount).toLocaleString()}
Vendor: ${expenseData.vendor}
Status: ${status}
${approver}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Record Corpus Fund Expense</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Description *
            </label>
            <textarea
              value={expenseData.description}
              onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
              placeholder="e.g., Elevator modernization, Roof waterproofing, Fire safety system upgrade"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={expenseData.category}
                onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select category</option>
                {corpusCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expense Date *
              </label>
              <input
                type="date"
                value={expenseData.expenseDate}
                onChange={(e) => setExpenseData({ ...expenseData, expenseDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor/Contractor
              </label>
              <select
                value={expenseData.vendor}
                onChange={(e) => setExpenseData({ ...expenseData, vendor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select vendor</option>
                {corpusVendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Number
              </label>
              <input
                type="text"
                value={expenseData.invoiceNumber}
                onChange={(e) => setExpenseData({ ...expenseData, invoiceNumber: e.target.value })}
                placeholder="INV-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={expenseData.paymentMethod}
                onChange={(e) => setExpenseData({ ...expenseData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cheque">Cheque</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Invoice/Receipt
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG up to 10MB
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    alert(`File selected: ${e.target.files[0].name}`);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={expenseData.notes}
              onChange={(e) => setExpenseData({ ...expenseData, notes: e.target.value })}
              placeholder="Any additional notes or comments"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="approvalRequired"
              checked={expenseData.approvalRequired}
              onChange={(e) => setExpenseData({ ...expenseData, approvalRequired: e.target.checked })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="approvalRequired" className="ml-2 text-sm text-gray-700">
              Requires additional approval before payment
            </label>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center">
              <PiggyBank className="w-5 h-5 text-purple-600 mr-2" />
              <div>
                <p className="font-medium text-purple-900">Corpus Fund Account</p>
                <p className="text-sm text-purple-700">
                  This expense will be recorded against the corpus fund account and tracked separately from regular maintenance expenses.
                </p>
              </div>
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Record Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CorpusExpenseModal;