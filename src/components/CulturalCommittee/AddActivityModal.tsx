import React, { useState } from 'react';
import { X, Calendar, Users, DollarSign } from 'lucide-react';

interface AddActivityModalProps {
  onClose: () => void;
  activities: Array<{
    id: string;
    name: string;
  }>;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ onClose, activities }) => {
  const [activityData, setActivityData] = useState({
    name: '',
    description: '',
    category: 'religious',
    eventDate: '',
    targetAmount: '',
    committee: [] as string[],
    newCommitteeMember: '',
    venue: 'community_hall',
    expectedParticipants: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cultural activity created: ${activityData.name}
    
Event Date: ${activityData.eventDate}
Target Amount: ₹${parseInt(activityData.targetAmount).toLocaleString()}
Committee: ${activityData.committee.join(', ')}
Category: ${activityData.category}`);
    onClose();
  };

  const addCommitteeMember = () => {
    if (activityData.newCommitteeMember.trim()) {
      setActivityData({
        ...activityData,
        committee: [...activityData.committee, activityData.newCommitteeMember.trim()],
        newCommitteeMember: ''
      });
    }
  };

  const removeCommitteeMember = (index: number) => {
    setActivityData({
      ...activityData,
      committee: activityData.committee.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Cultural Activity</h2>
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
              Activity Name *
            </label>
            <input
              type="text"
              value={activityData.name}
              onChange={(e) => setActivityData({ ...activityData, name: e.target.value })}
              placeholder="e.g., Vinayaka Chavithi 2025, New Year Celebration"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={activityData.description}
              onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
              placeholder="Describe the activity, what it includes, and any special arrangements"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={activityData.category}
                onChange={(e) => setActivityData({ ...activityData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="religious">Religious Festival</option>
                <option value="celebration">Celebration</option>
                <option value="cultural">Cultural Event</option>
                <option value="sports">Sports Event</option>
                <option value="community">Community Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                value={activityData.eventDate}
                onChange={(e) => setActivityData({ ...activityData, eventDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={activityData.targetAmount}
                  onChange={(e) => setActivityData({ ...activityData, targetAmount: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Participants
              </label>
              <input
                type="number"
                value={activityData.expectedParticipants}
                onChange={(e) => setActivityData({ ...activityData, expectedParticipants: e.target.value })}
                placeholder="Number of expected participants"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <select
              value={activityData.venue}
              onChange={(e) => setActivityData({ ...activityData, venue: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="community_hall">Community Hall</option>
              <option value="garden_area">Garden Area</option>
              <option value="parking_area">Parking Area</option>
              <option value="terrace">Terrace</option>
              <option value="external">External Venue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Committee Members
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={activityData.newCommitteeMember}
                  onChange={(e) => setActivityData({ ...activityData, newCommitteeMember: e.target.value })}
                  placeholder="Enter committee member name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={addCommitteeMember}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Add
                </button>
              </div>
              
              {activityData.committee.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activityData.committee.map((member, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => removeCommitteeMember(index)}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={activityData.notes}
              onChange={(e) => setActivityData({ ...activityData, notes: e.target.value })}
              placeholder="Any additional notes or special requirements"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-orange-600 mr-2" />
              <div>
                <p className="font-medium text-orange-900">Cultural Activity Fund</p>
                <p className="text-sm text-orange-700">
                  This activity will be managed separately from regular maintenance funds with its own collection and expense tracking.
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
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Create Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;