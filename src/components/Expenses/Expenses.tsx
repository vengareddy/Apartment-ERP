import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import ExpensesList from './ExpensesList';
import AddExpenseModal from './AddExpenseModal';

interface ExpensesProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const Expenses: React.FC<ExpensesProps> = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
        <div className="flex items-center space-x-3">
          {(currentUser?.role === 'admin' || currentUser?.role === 'treasurer') && (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Expense</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by vendor, description..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="maintenance">Maintenance</option>
              <option value="utilities">Utilities</option>
              <option value="security">Security</option>
              <option value="gardening">Gardening</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filter Options</span>
          </div>
        </div>

        <ExpensesList searchTerm={searchTerm} expenseCategory={expenseCategory} />
      </div>

      {showAddModal && (
        <AddExpenseModal onClose={() => setShowAddModal(false)} currentUser={currentUser} />
      )}
    </div>
  );
};

export default Expenses;