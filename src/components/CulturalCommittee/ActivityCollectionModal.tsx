import React, { useState } from 'react';
import { X, Users, DollarSign, Calendar } from 'lucide-react';

interface ActivityCollectionModalProps {
  onClose: () => void;
  activities: Array<{
    id: string;
    name: string;
    targetAmount: number;
    eventDate: string;
  }>;
}

const ActivityCollectionModal: React.FC<ActivityCollectionModalProps> = ({ onClose, activities }) => {
  const [collectionData, setCollectionData] = useState({
    activityId: '',
    amountPerFlat: '',
    collectionDeadline: '',
    selectedFlats: [] as string[],
    selectAll: true,
    collectionMethod: 'voluntary',
    notes: ''
  });

  const flats = [
    'A-101', 'A-102', 'A-103', 'A-201', 'A-202', 'A-203', 'A-301', 'A-302',
    'B-101', 'B-102', 'B-103', 'B-201', 'B-202', 'B-203', 'B-301', 'B-302',
    'C-101', 'C-102', 'C-103', 'C-201', 'C-202', 'C-203', 'C-301', 'C-302'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedActivity = activities.find(a => a.id === collectionData.activityId);
    const totalFlats = collectionData.selectAll ? flats.length : collectionData.selectedFlats.length;
    const totalAmount = totalFlats * parseInt(collectionData.amountPerFlat);
    
    // Send WhatsApp notifications to owners and tenants
    const flatsToNotify = collectionData.selectAll ? flats : collectionData.selectedFlats;
    flatsToNotify.forEach(flat => {
      sendActivityCollectionNotification(
        flat, 
        parseInt(collectionData.amountPerFlat), 
        selectedActivity?.name || 'Cultural Activity',
        collectionData.collectionDeadline
      );
    });
    
    alert(`Cultural activity fund collection initiated!
    
Activity: ${selectedActivity?.name}
Flats: ${totalFlats}
Amount per flat: ₹${parseInt(collectionData.amountPerFlat).toLocaleString()}
Total target: ₹${totalAmount.toLocaleString()}
Deadline: ${collectionData.collectionDeadline}

WhatsApp notifications sent to all owners and tenants.`);
    onClose();
  };

  const sendActivityCollectionNotification = (flat: string, amount: number, activityName: string, deadline: string) => {
    const isRentedFlat = ['A-102', 'B-203', 'C-301'].includes(flat);
    const ownerInfo = getOwnerInfo(flat);
    const tenantInfo = getTenantInfo(flat);
    
    // Send message to tenant (if rented flat)
    if (isRentedFlat && tenantInfo) {
      const tenantMessage = `🎉 Cultural Activity Collection Notice

Hello ${tenantInfo.name},

We are organizing "${activityName}" and collecting funds for the celebration.

Amount: ₹${amount.toLocaleString()} for flat ${flat}
Deadline: ${deadline}
Collection Type: ${collectionData.collectionMethod === 'voluntary' ? 'Voluntary Participation' : 'Mandatory Collection'}

Please coordinate with your landlord for participation.

SDVR Cultural Committee`;

      console.log('Cultural Activity WhatsApp to Tenant:', {
        to: tenantInfo.whatsappNumber,
        message: tenantMessage,
        timestamp: new Date().toISOString()
      });
    }
    
    // Send message to owner (always)
    const ownerMessage = isRentedFlat ? 
      `🎉 Cultural Activity Collection

Hello ${ownerInfo.name},

We are organizing "${activityName}" and collecting funds for the celebration.

Amount: ₹${amount.toLocaleString()} for your flat ${flat}
Deadline: ${deadline}
Collection Type: ${collectionData.collectionMethod === 'voluntary' ? 'Voluntary Participation' : 'Mandatory Collection'}

${tenantInfo ? `Your tenant ${tenantInfo.name} has been notified. Please coordinate for participation.` : ''}

Join us in making this celebration memorable!

SDVR Cultural Committee` :
      `🎉 Cultural Activity Collection

Hello ${ownerInfo.name},

We are organizing "${activityName}" and collecting funds for the celebration.

Amount: ₹${amount.toLocaleString()} for flat ${flat}
Deadline: ${deadline}
Collection Type: ${collectionData.collectionMethod === 'voluntary' ? 'Voluntary Participation' : 'Mandatory Collection'}

Join us in making this celebration memorable!

SDVR Cultural Committee`;

    console.log('Cultural Activity WhatsApp to Owner:', {
      to: ownerInfo.whatsappNumber,
      message: ownerMessage,
      timestamp: new Date().toISOString()
    });
  };

  const getOwnerInfo = (flat: string) => {
    const owners: { [key: string]: { name: string; whatsappNumber: string } } = {
      'A-101': { name: 'John Smith', whatsappNumber: '+919876543210' },
      'A-102': { name: 'Suresh Reddy', whatsappNumber: '+919876543217' },
      'A-103': { name: 'Mike Johnson', whatsappNumber: '+919876543212' },
      'B-201': { name: 'Lisa Brown', whatsappNumber: '+919876543213' },
      'B-202': { name: 'David Lee', whatsappNumber: '+919876543214' },
      'B-203': { name: 'Lakshmi Devi', whatsappNumber: '+919876543219' },
      'C-301': { name: 'Ramesh Gupta', whatsappNumber: '+919876543221' },
      'C-302': { name: 'Nina Patel', whatsappNumber: '+919876543216' }
    };
    return owners[flat] || { name: 'Owner', whatsappNumber: '+919876543210' };
  };

  const getTenantInfo = (flat: string) => {
    const tenants: { [key: string]: { name: string; whatsappNumber: string } | null } = {
      'A-102': { name: 'Rajesh Kumar', whatsappNumber: '+919876543218' },
      'B-203': { name: 'Priya Sharma', whatsappNumber: '+919876543220' },
      'C-301': { name: 'Amit Patel', whatsappNumber: '+919876543222' }
    };
    return tenants[flat] || null;
  };

  const toggleSelectAll = () => {
    setCollectionData({
      ...collectionData,
      selectAll: !collectionData.selectAll,
      selectedFlats: !collectionData.selectAll ? [...flats] : []
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Collect Funds for Cultural Activity</h2>
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
              Select Activity *
            </label>
            <select
              value={collectionData.activityId}
              onChange={(e) => setCollectionData({ ...collectionData, activityId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Choose an activity</option>
              {activities.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.name} - Target: ₹{activity.targetAmount.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount per Flat (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={collectionData.amountPerFlat}
                  onChange={(e) => setCollectionData({ ...collectionData, amountPerFlat: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Deadline *
              </label>
              <input
                type="date"
                value={collectionData.collectionDeadline}
                onChange={(e) => setCollectionData({ ...collectionData, collectionDeadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection Method
            </label>
            <select
              value={collectionData.collectionMethod}
              onChange={(e) => setCollectionData({ ...collectionData, collectionMethod: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="voluntary">Voluntary Participation</option>
              <option value="mandatory">Mandatory Collection</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Select Participating Flats</h3>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                {collectionData.selectAll ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              <div className="grid grid-cols-4 gap-2">
                {flats.map((flat) => (
                  <label key={flat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={collectionData.selectAll || collectionData.selectedFlats.includes(flat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCollectionData({
                            ...collectionData,
                            selectedFlats: [...collectionData.selectedFlats, flat]
                          });
                        } else {
                          setCollectionData({
                            ...collectionData,
                            selectedFlats: collectionData.selectedFlats.filter(f => f !== flat),
                            selectAll: false
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm">{flat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection Notes
            </label>
            <textarea
              value={collectionData.notes}
              onChange={(e) => setCollectionData({ ...collectionData, notes: e.target.value })}
              placeholder="Additional information about the collection"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
            <Calendar className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">Collection Summary</p>
              <p className="text-sm text-orange-700">
                {collectionData.selectAll ? flats.length : collectionData.selectedFlats.length} flats × ₹{collectionData.amountPerFlat || 0} = 
                <span className="font-medium"> ₹{((collectionData.selectAll ? flats.length : collectionData.selectedFlats.length) * parseInt(collectionData.amountPerFlat || '0')).toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">📱 WhatsApp Notifications:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Both owners and tenants will receive collection notices</li>
              <li>• Messages include activity details and payment instructions</li>
              <li>• Owners will be asked to coordinate with tenants for rented flats</li>
              <li>• Collection deadline and amount clearly mentioned</li>
            </ul>
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
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Start Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityCollectionModal;