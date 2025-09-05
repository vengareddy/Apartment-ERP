import React, { useState } from 'react';
import { X, Calendar, Users, PiggyBank } from 'lucide-react';

interface CorpusCollectionModalProps {
  onClose: () => void;
}

const CorpusCollectionModal: React.FC<CorpusCollectionModalProps> = ({ onClose }) => {
  const [collectionData, setCollectionData] = useState({
    quarter: 'Q1-2025',
    amountPerFlat: 6000,
    dueDate: '2025-03-31',
    description: 'Quarterly corpus fund collection for major repairs and improvements',
    selectedFlats: [] as string[],
    selectAll: true
  });

  const flats = [
    'A-101', 'A-102', 'A-103', 'A-201', 'A-202', 'A-203', 'A-301', 'A-302',
    'B-101', 'B-102', 'B-103', 'B-201', 'B-202', 'B-203', 'B-301', 'B-302',
    'C-101', 'C-102', 'C-103', 'C-201', 'C-202', 'C-203', 'C-301', 'C-302'
  ];

  const handleGenerate = () => {
    const totalFlats = collectionData.selectAll ? flats.length : collectionData.selectedFlats.length;
    const totalAmount = totalFlats * collectionData.amountPerFlat;
    
    // Send WhatsApp notifications to owners and tenants
    const flatsToNotify = collectionData.selectAll ? flats : collectionData.selectedFlats;
    flatsToNotify.forEach(flat => {
      sendCorpusCollectionNotification(flat, collectionData.amountPerFlat, collectionData.quarter, collectionData.dueDate);
    });
    
    alert(`Corpus fund collection initiated for ${collectionData.quarter}
    
Flats: ${totalFlats}
Amount per flat: ₹${collectionData.amountPerFlat.toLocaleString()}
Total target: ₹${totalAmount.toLocaleString()}
Due date: ${collectionData.dueDate}

WhatsApp notifications sent to all owners and tenants.`);
    onClose();
  };

  const toggleSelectAll = () => {
    setCollectionData({
      ...collectionData,
      selectAll: !collectionData.selectAll,
      selectedFlats: !collectionData.selectAll ? [...flats] : []
    });
  };

  const sendCorpusCollectionNotification = (flat: string, amount: number, quarter: string, dueDate: string) => {
    const isRentedFlat = ['A-102', 'B-203', 'C-301'].includes(flat);
    const ownerInfo = getOwnerInfo(flat);
    const tenantInfo = getTenantInfo(flat);
    
    // Send message to tenant (if rented flat)
    if (isRentedFlat && tenantInfo) {
      const tenantMessage = `Hello ${tenantInfo.name},

Corpus Fund Collection Notice for ${quarter}

Amount: ₹${amount.toLocaleString()} for flat ${flat}
Due Date: ${dueDate}
Purpose: Major repairs and infrastructure improvements

Please coordinate with your landlord for payment.

SDVR Welfare Association`;

      console.log('Corpus Fund WhatsApp to Tenant:', {
        to: tenantInfo.whatsappNumber,
        message: tenantMessage,
        timestamp: new Date().toISOString()
      });
    }
    
    // Send message to owner (always)
    const ownerMessage = isRentedFlat ? 
      `Hello ${ownerInfo.name},

Corpus Fund Collection for ${quarter}

Amount: ₹${amount.toLocaleString()} for your flat ${flat}
Due Date: ${dueDate}
Purpose: Major repairs and infrastructure improvements

${tenantInfo ? `Your tenant ${tenantInfo.name} has been notified. Please coordinate for payment.` : ''}

This is separate from monthly maintenance charges.

SDVR Welfare Association` :
      `Hello ${ownerInfo.name},

Corpus Fund Collection for ${quarter}

Amount: ₹${amount.toLocaleString()} for flat ${flat}
Due Date: ${dueDate}
Purpose: Major repairs and infrastructure improvements

This is separate from monthly maintenance charges.

SDVR Welfare Association`;

    console.log('Corpus Fund WhatsApp to Owner:', {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Initiate Corpus Fund Collection</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Quarter
              </label>
              <select
                value={collectionData.quarter}
                onChange={(e) => setCollectionData({ ...collectionData, quarter: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Q1-2025">Q1 2025 (Jan-Mar)</option>
                <option value="Q2-2025">Q2 2025 (Apr-Jun)</option>
                <option value="Q3-2025">Q3 2025 (Jul-Sep)</option>
                <option value="Q4-2025">Q4 2025 (Oct-Dec)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount per Flat (₹)
              </label>
              <input
                type="number"
                value={collectionData.amountPerFlat}
                onChange={(e) => setCollectionData({ ...collectionData, amountPerFlat: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={collectionData.dueDate}
              onChange={(e) => setCollectionData({ ...collectionData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description/Purpose
            </label>
            <textarea
              value={collectionData.description}
              onChange={(e) => setCollectionData({ ...collectionData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Select Flats</h3>
              <button
                onClick={toggleSelectAll}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
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
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{flat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <PiggyBank className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Collection Summary</p>
              <p className="text-sm text-purple-700">
                {collectionData.selectAll ? flats.length : collectionData.selectedFlats.length} flats × ₹{collectionData.amountPerFlat.toLocaleString()} = 
                <span className="font-medium"> ₹{((collectionData.selectAll ? flats.length : collectionData.selectedFlats.length) * collectionData.amountPerFlat).toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Corpus fund is collected quarterly for major repairs and improvements</li>
              <li>• This amount is separate from monthly maintenance charges</li>
              <li>• Residents will receive separate bills for corpus fund collection</li>
              <li>• All corpus fund transactions are maintained in a separate account</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Initiate Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorpusCollectionModal;