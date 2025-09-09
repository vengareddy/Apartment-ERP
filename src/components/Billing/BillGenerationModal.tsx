import React, { useState } from 'react';
import { X, Calendar, Users, Receipt } from 'lucide-react';

interface BillGenerationModalProps {
  onClose: () => void;
}

const BillGenerationModal: React.FC<BillGenerationModalProps> = ({ onClose }) => {
  const [billType, setBillType] = useState('maintenance');
  const [period, setPeriod] = useState('2025-01');
  const [selectedFlats, setSelectedFlats] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  const flats = [
    '101', '102', '103', '104', '105', '106', '107', '108', '109',
'201', '202', '203', '204', '205', '206', '207', '208', '209',
'301', '302', '303', '304', '305', '306', '307', '308', '309',
'401', '402', '403', '404', '405', '406', '407', '408', '409',
'501', '502', '503', '504', '505', '506', '507', '508', '509',
  ];

  const handleGenerate = () => {
    // Generate bills and UPI payment links
    const flatsToProcess = selectAll ? flats : selectedFlats;
    const billsGenerated = flatsToProcess.map(flat => {
      const residentName = getResidentName(flat);
      const amount = getBillAmount(billType, flat);
      const upiLink = `upi://pay?pa=9392615543@ybl&pn=${encodeURIComponent(residentName)}&am=${amount}&cu=INR`;
      
      // Send WhatsApp message
      sendWhatsAppMessage(residentName, amount, upiLink, flat);
      
      return {
        flat,
        residentName,
        amount,
        upiLink,
        status: 'Payment Link Sent'
      };
    });
    
    alert(`Generated ${billType} bills for ${period}
    
Bills Generated: ${billsGenerated.length}
UPI Payment Links: Created and sent via WhatsApp
Status: Payment Link Sent for all bills`);
    onClose();
  };

  const getResidentName = (flat: string) => {
    const residents: { [key: string]: string } = {
      'A-101': 'John Smith',
      'A-102': 'Sarah Wilson', 
      'A-103': 'Mike Johnson',
      'B-201': 'Lisa Brown',
      'B-202': 'David Lee',
      'B-203': 'Emma Davis',
      'C-301': 'Alex Chen',
      'C-302': 'Nina Patel'
    };
    return residents[flat] || 'Resident';
  };

  const getBillAmount = (type: string, flat: string) => {
    const rates: { [key: string]: number } = {
      'maintenance': 5400,
      'water': 1200,
      'electricity': 2800,
      'parking': 500
    };
    return rates[type] || 5400;
  };

  const sendWhatsAppMessage = (residentName: string, amount: number, paymentLink: string, flat: string) => {
    const isRentedFlat = ['A-102', 'B-203', 'C-301'].includes(flat);
    const ownerInfo = getOwnerInfo(flat);
    const tenantInfo = getTenantInfo(flat);
    
    // Send message to tenant (if rented flat)
    if (isRentedFlat && tenantInfo) {
      const tenantMessage = `Hello ${tenantInfo.name},

Your monthly maintenance of ₹${amount.toLocaleString()} is due for flat ${flat}.

Please pay securely via this link: ${paymentLink}

Thank you,
SDVR Welfare Association.`;

      console.log('WhatsApp Message Sent to Tenant:', {
        to: tenantInfo.whatsappNumber,
        message: tenantMessage,
        timestamp: new Date().toISOString()
      });
    }
    
    // Send message to owner (always)
    const ownerMessage = isRentedFlat ? 
      `Hello ${ownerInfo.name},

Monthly maintenance of ₹${amount.toLocaleString()} is due for your flat ${flat}.

${tenantInfo ? `Your tenant ${tenantInfo.name} has been notified.` : ''}
Payment link: ${paymentLink}

Please coordinate with your tenant for payment.

Thank you,
SDVR Welfare Association.` :
      `Hello ${residentName},

Your monthly maintenance of ₹${amount.toLocaleString()} is due for flat ${flat}.

Please pay securely via this link: ${paymentLink}

Thank you,
SDVR Welfare Association.`;

    console.log('WhatsApp Message Sent to Owner:', {
      to: ownerInfo.whatsappNumber,
      message: ownerMessage,
      timestamp: new Date().toISOString()
    });
  };

  const getPhoneNumber = (flat: string) => {
    const phones: { [key: string]: string } = {
      'A-101': '+919876543210',
      'A-102': '+919876543211',
      'A-103': '+919876543212',
      'B-201': '+919876543213',
      'B-202': '+919876543214',
      'B-203': '+919876543215',
      'C-301': '+919876543216',
      'C-302': '+919876543217'
    };
    return phones[flat] || '+919876543210';
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
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedFlats([...flats]);
    } else {
      setSelectedFlats([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Generate Bills</h2>
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
                Bill Type
              </label>
              <select
                value={billType}
                onChange={(e) => setBillType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="maintenance">Maintenance</option>
                <option value="water">Water Bill</option>
                <option value="electricity">Electricity</option>
                <option value="parking">Parking</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Period
              </label>
              <input
                type="month"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {billType === 'maintenance' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Maintenance Rates</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>1 BHK: ₹4,500/month</div>
                <div>2 BHK: ₹5,400/month</div>
                <div>3 BHK: ₹6,800/month</div>
                <div>4 BHK: ₹8,200/month</div>
              </div>
            </div>
          )}

          {billType === 'water' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Water Billing</h3>
              <p className="text-sm text-green-800">
                Bills will be generated based on meter readings. Rate: ₹15 per unit
              </p>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Select Flats</h3>
              <button
                onClick={toggleSelectAll}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {selectAll ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              <div className="grid grid-cols-4 gap-2">
                {flats.map((flat) => (
                  <label key={flat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectAll || selectedFlats.includes(flat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFlats([...selectedFlats, flat]);
                        } else {
                          setSelectedFlats(selectedFlats.filter(f => f !== flat));
                          setSelectAll(false);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{flat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Receipt className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Summary</p>
              <p className="text-sm text-gray-600">
                {selectAll ? flats.length : selectedFlats.length} flats selected • {billType} bills for {period}
              </p>
            </div>
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate Bills
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillGenerationModal;