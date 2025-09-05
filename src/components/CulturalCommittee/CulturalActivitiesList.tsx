import React from 'react';
import { Calendar, Users, DollarSign, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

interface CulturalActivitiesListProps {
  searchTerm: string;
  activityFilter: string;
  activities?: Array<{
    id: string;
    name: string;
    description: string;
    eventDate: string;
    status: string;
    targetAmount: number;
    collectedAmount: number;
    expenseAmount: number;
    participatingFlats: number;
    totalFlats: number;
    committee: string[];
    category: string;
    balanceInHand?: number;
    pendingCollections?: number;
  }>;
}

const CulturalActivitiesList: React.FC<CulturalActivitiesListProps> = ({ searchTerm, activityFilter, activities }) => {
  const currentActivities = activities || [];

  const filteredActivities = currentActivities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activityFilter === 'all' || activity.status === activityFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'upcoming': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'planning': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'ongoing': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'ongoing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'religious': return 'bg-purple-100 text-purple-800';
      case 'celebration': return 'bg-pink-100 text-pink-800';
      case 'cultural': return 'bg-indigo-100 text-indigo-800';
      case 'sports': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Activities</p>
              <p className="text-2xl font-bold text-blue-900">{currentActivities.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Collected</p>
              <p className="text-2xl font-bold text-green-900">
                ₹{currentActivities.reduce((sum, a) => sum + a.collectedAmount, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-900">
                ₹{currentActivities.reduce((sum, a) => sum + a.expenseAmount, 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Net Balance</p>
              <p className="text-2xl font-bold text-purple-900">
                ₹{(currentActivities.reduce((sum, a) => sum + a.collectedAmount, 0) - 
                   currentActivities.reduce((sum, a) => sum + a.expenseAmount, 0)).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Cultural Activities Defined</h3>
          <p className="text-gray-500 mb-6">
            No cultural activities have been created yet. Activities need to be created by Admin or Treasurer first.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-md mx-auto">
            <h4 className="font-medium text-blue-900 mb-2">How to Get Started:</h4>
            <ol className="text-sm text-blue-800 text-left space-y-1">
              <li>1. Admin/Treasurer creates cultural activities</li>
              <li>2. Cultural Committee manages collections and expenses</li>
              <li>3. Activities appear here for management</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Financial Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                    <div className="text-sm text-gray-500">{activity.description}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                        {activity.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        Committee: {activity.committee.join(', ')}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.eventDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium">₹{activity.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Collected:</span>
                      <span className="font-medium text-green-600">₹{activity.collectedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expenses:</span>
                      <span className="font-medium text-red-600">₹{activity.expenseAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
                      <span className="text-gray-600">Balance:</span>
                      <span className="font-bold text-purple-600">
                        ₹{(activity.collectedAmount - activity.expenseAmount).toLocaleString()}
                      </span>
                    </div>
                    {activity.balanceInHand && (
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>In Hand:</span>
                        <span>₹{activity.balanceInHand.toLocaleString()}</span>
                      </div>
                    )}
                    {activity.pendingCollections && activity.pendingCollections > 0 && (
                      <div className="flex justify-between text-xs text-red-500 mt-1">
                        <span>Pending:</span>
                        <span>₹{activity.pendingCollections.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {activity.participatingFlats}/{activity.totalFlats} flats
                    </div>
                    <div className="text-gray-500">
                      {((activity.participatingFlats / activity.totalFlats) * 100).toFixed(1)}% participation
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(activity.participatingFlats / activity.totalFlats) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(activity.status)}
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 p-1" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-700 p-1" title="Edit Activity">
                    <Edit className="w-4 h-4" />
                  </button>
                  {activity.status === 'planning' && (
                    <button className="text-red-600 hover:text-red-700 p-1" title="Delete Activity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      )}
    </div>
  );
};

export default CulturalActivitiesList;