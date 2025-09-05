import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Calendar, Users } from 'lucide-react';
import CulturalActivitiesList from './CulturalActivitiesList';
import AddActivityModal from './AddActivityModal';
import ActivityCollectionModal from './ActivityCollectionModal';
import ActivityExpenseModal from './ActivityExpenseModal';

interface CulturalCommitteeProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const CulturalCommittee: React.FC<CulturalCommitteeProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('activities');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');

  const [activities] = useState([
    {
      id: '1',
      name: 'Vinayaka Chavithi 2025',
      description: 'SDVR Vinayaka Chavithi Celebrations - Annual Ganesh festival with decorations, prasadam, and cultural programs',
      eventDate: '2024-09-07',
      status: 'completed',
      targetAmount: 50208,
      collectedAmount: 50208,
      expenseAmount: 6300,
      participatingFlats: 104,
      totalFlats: 84,
      committee: ['Satyapraveen', 'Pavan', 'Bapiraju', 'Mallikarjun'],
      category: 'religious',
      balanceInHand: 48092,
      pendingCollections: 2116,
      collections: [
        { flat: '101', amount: 15000, status: 'Vinayaka Idol', paidBy: 'Flat Owner' },
        { flat: '102', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '103', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '104', amount: 2116, status: 'Pending', paidBy: null },
        { flat: '105', amount: 2016, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '106', amount: 1000, status: 'Cash', paidBy: 'Flat Owner' },
        { flat: '107', amount: 1016, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '108', amount: 0, status: 'Green Mats', paidBy: 'Contribution' },
        { flat: '201', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '202', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '203', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '204', amount: 1016, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '206', amount: 1016, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '207', amount: 500, status: 'Paid (BapiRaju)', paidBy: 'BapiRaju' },
        { flat: '208', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '209', amount: 1500, status: 'Paid (BapiRaju)', paidBy: 'BapiRaju' },
        { flat: '301', amount: 1020, status: 'Paid (BapiRaju)', paidBy: 'BapiRaju' },
        { flat: '302', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '303', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '304', amount: 1516, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '305', amount: 1000, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '306', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '308', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '401', amount: 3500, status: 'Paid (Pavan)', paidBy: 'Pavan' },
        { flat: '402', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '403', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '404', amount: 516, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '405', amount: 501, status: 'Cash', paidBy: 'Flat Owner' },
        { flat: '406', amount: 1000, status: 'Cash', paidBy: 'Flat Owner' },
        { flat: '407', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '409', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '501', amount: 1016, status: 'with Mallikarjun Rao', paidBy: 'Mallikarjun Rao' },
        { flat: '502', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '503', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '504', amount: 1116, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '505', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '506', amount: 511, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '507', amount: 2000, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '508', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: '509', amount: 501, status: 'Paid', paidBy: 'Flat Owner' },
        { flat: 'Special', amount: 5000, status: 'Vijayalakshmi - Paid', paidBy: 'Vijayalakshmi' },
        { flat: 'Carry Forward', amount: 5762, status: 'LY Carry Forward', paidBy: 'Previous Year' },
        { flat: '204 Owner', amount: 516, status: 'Kishan - Paid', paidBy: 'Kishan' }
      ],
      expenses: [
        { sno: 1, details: 'Flex and bonds', expense: 2000, mode: 'UPI', paidBy: 'Satyapraveen' },
        { sno: 2, details: 'Flex and bonds', expense: 4000, mode: 'UPI', paidBy: 'Pavan' },
        { sno: 3, details: 'Auto - Frames', expense: 300, mode: 'UPI', paidBy: 'Bapiraju' }
      ],
      budgetEstimation: [
        { sno: 1, details: 'Backdrop Frames', expense: 5300 },
        { sno: 2, details: 'Priest (9 Days)', expense: 10000 },
        { sno: 3, details: 'Pooja Items', expense: 5000 },
        { sno: 4, details: 'Decoration Material', expense: 5000 },
        { sno: 5, details: 'Nimajjanam Auto', expense: 5000 },
        { sno: 6, details: 'Flexi', expense: 6000 },
        { sno: 7, details: 'Watchman', expense: 2000 },
        { sno: 8, details: 'Laddu (3KG + Small)', expense: 2100 }
      ],
      totalBudget: 40400
    },
    {
      id: '2',
      name: 'New Year Celebration 2025',
      description: 'Community New Year party with DJ, decorations, and dinner',
      eventDate: '2024-12-31',
      status: 'completed',
      targetAmount: 75000,
      collectedAmount: 78000,
      expenseAmount: 72000,
      participatingFlats: 76,
      totalFlats: 84,
      committee: ['Lakshmi Devi', 'Suresh Reddy', 'Nina Patel'],
      category: 'celebration'
    },
    {
      id: '3',
      name: 'Diwali Festival 2024',
      description: 'Diwali celebration with rangoli competition, sweets distribution, and fireworks',
      eventDate: '2024-11-01',
      status: 'completed',
      targetAmount: 40000,
      collectedAmount: 42000,
      expenseAmount: 38500,
      participatingFlats: 72,
      totalFlats: 84,
      committee: ['Emma Davis', 'David Lee', 'Alex Johnson'],
      category: 'religious'
    },
    {
      id: '4',
      name: 'Holi Celebration 2025',
      description: 'Holi festival with colors, music, and traditional snacks',
      eventDate: '2025-03-14',
      status: 'planning',
      targetAmount: 30000,
      collectedAmount: 0,
      expenseAmount: 0,
      participatingFlats: 0,
      totalFlats: 84,
      committee: ['Mike Wilson', 'Lisa Brown'],
      category: 'religious'
    }
  ]);

  const tabs = [
    { id: 'activities', name: 'Activities', icon: Calendar },
    { id: 'collections', name: 'Collections', icon: Users },
    { id: 'expenses', name: 'Expenses', icon: Filter },
    { id: 'reports', name: 'Reports', icon: Download },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Cultural Committee</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button
            onClick={() => setShowExpenseModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
          <button
            onClick={() => setShowCollectionModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Collect Funds</span>
          </button>
          <button
            onClick={() => setShowActivityModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Activity</span>
          </button>
        </div>
      </div>

      {/* Cultural Committee Info */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border border-orange-200">
        <div className="flex items-center mb-4">
          <Calendar className="w-8 h-8 text-orange-600 mr-3" />
          <div>
            <h2 className="text-lg font-semibold text-orange-900">Cultural Activities Fund</h2>
            <p className="text-sm text-orange-700">Managing festivals, celebrations, and community events</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold text-green-600">₹48,092</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">This Year Collection</p>
            <p className="text-2xl font-bold text-blue-600">₹50,208</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">₹6,300</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600">Active Events</p>
            <p className="text-2xl font-bold text-purple-600">1</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'activities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search activities..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-80"
                    />
                  </div>
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Activities</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  ₹{activities.reduce((sum, a) => sum + a.collectedAmount, 0).toLocaleString()}
                </p>
              </div>

              <CulturalActivitiesList searchTerm={searchTerm} activityFilter={activityFilter} />
              <CulturalActivitiesList 
                searchTerm={searchTerm} 
                activityFilter={activityFilter}
                activities={activities}
              />
            </div>
          )}
          
          {activeTab === 'collections' && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Collections Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                Track fund collections for cultural activities
              </p>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Expenses Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                Track expenses for cultural activities
              </p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <Download className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Activity Reports</h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate reports for cultural activities
              </p>
            </div>
          )}
        </div>
      </div>

      {showActivityModal && (
        <AddActivityModal 
          onClose={() => setShowActivityModal(false)}
          activities={activities}
        />
      )}

      {showCollectionModal && (
        <ActivityCollectionModal 
          onClose={() => setShowCollectionModal(false)}
          activities={activities}
        />
      )}

      {showExpenseModal && (
        <ActivityExpenseModal 
          onClose={() => setShowExpenseModal(false)}
          activities={activities}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default CulturalCommittee;