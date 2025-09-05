import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

const BillingSettings: React.FC = () => {
  const [billingRates, setBillingRates] = useState([
    { id: '1', flatType: '1 BHK', maintenanceRate: 4500, area: 600 },
    { id: '2', flatType: '2 BHK', maintenanceRate: 5400, area: 800 },
    { id: '3', flatType: '3 BHK', maintenanceRate: 6800, area: 1200 },
    { id: '4', flatType: '4 BHK', maintenanceRate: 8200, area: 1600 },
  ]);

  const [waterRates, setWaterRates] = useState({
    ratePerUnit: 15,
    minimumCharge: 200,
    sewageCharge: 50
  });

  const [billingSettings, setBillingSettings] = useState({
    dueDays: 30,
    lateFeeAmount: 100,
    lateFeeType: 'fixed',
    lateFeePercentage: 2,
    gracePeriod: 5,
    autoGenerateBills: true,
    billGenerationDay: 1,
    reminderDays: [7, 3, 1],
    taxRate: 18
  });

  const addFlatType = () => {
    const newId = (billingRates.length + 1).toString();
    setBillingRates([...billingRates, {
      id: newId,
      flatType: '',
      maintenanceRate: 0,
      area: 0
    }]);
  };

  const removeFlatType = (id: string) => {
    setBillingRates(billingRates.filter(rate => rate.id !== id));
  };

  const updateFlatType = (id: string, field: string, value: any) => {
    setBillingRates(billingRates.map(rate => 
      rate.id === id ? { ...rate, [field]: value } : rate
    ));
  };

  const handleSave = () => {
    alert('Billing settings saved successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Maintenance Rates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Maintenance Rates</h2>
          <button
            onClick={addFlatType}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Flat Type</span>
          </button>
        </div>

        <div className="space-y-4">
          {billingRates.map((rate) => (
            <div key={rate.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flat Type
                </label>
                <input
                  type="text"
                  value={rate.flatType}
                  onChange={(e) => updateFlatType(rate.id, 'flatType', e.target.value)}
                  placeholder="e.g., 2 BHK"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  value={rate.area}
                  onChange={(e) => updateFlatType(rate.id, 'area', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rate (₹)
                </label>
                <input
                  type="number"
                  value={rate.maintenanceRate}
                  onChange={(e) => updateFlatType(rate.id, 'maintenanceRate', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => removeFlatType(rate.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  disabled={billingRates.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Billing */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Water Billing Rates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate per Unit (₹)
            </label>
            <input
              type="number"
              value={waterRates.ratePerUnit}
              onChange={(e) => setWaterRates({ ...waterRates, ratePerUnit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Charge (₹)
            </label>
            <input
              type="number"
              value={waterRates.minimumCharge}
              onChange={(e) => setWaterRates({ ...waterRates, minimumCharge: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sewage Charge (₹)
            </label>
            <input
              type="number"
              value={waterRates.sewageCharge}
              onChange={(e) => setWaterRates({ ...waterRates, sewageCharge: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Billing Configuration */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Due Days
            </label>
            <input
              type="number"
              value={billingSettings.dueDays}
              onChange={(e) => setBillingSettings({ ...billingSettings, dueDays: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Days after bill generation</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grace Period (Days)
            </label>
            <input
              type="number"
              value={billingSettings.gracePeriod}
              onChange={(e) => setBillingSettings({ ...billingSettings, gracePeriod: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Days before late fee applies</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Late Fee Type
            </label>
            <select
              value={billingSettings.lateFeeType}
              onChange={(e) => setBillingSettings({ ...billingSettings, lateFeeType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fixed">Fixed Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {billingSettings.lateFeeType === 'fixed' ? 'Late Fee Amount (₹)' : 'Late Fee Percentage (%)'}
            </label>
            <input
              type="number"
              value={billingSettings.lateFeeType === 'fixed' ? billingSettings.lateFeeAmount : billingSettings.lateFeePercentage}
              onChange={(e) => setBillingSettings({
                ...billingSettings,
                [billingSettings.lateFeeType === 'fixed' ? 'lateFeeAmount' : 'lateFeePercentage']: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bill Generation Day
            </label>
            <select
              value={billingSettings.billGenerationDay}
              onChange={(e) => setBillingSettings({ ...billingSettings, billGenerationDay: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Day of month to generate bills</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={billingSettings.taxRate}
              onChange={(e) => setBillingSettings({ ...billingSettings, taxRate: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoGenerateBills"
              checked={billingSettings.autoGenerateBills}
              onChange={(e) => setBillingSettings({ ...billingSettings, autoGenerateBills: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="autoGenerateBills" className="ml-2 text-sm text-gray-700">
              Auto-generate bills monthly
            </label>
          </div>
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Reminders</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Send reminders before due date (days)
          </label>
          <div className="flex space-x-2">
            {billingSettings.reminderDays.map((days, index) => (
              <input
                key={index}
                type="number"
                value={days}
                onChange={(e) => {
                  const newReminderDays = [...billingSettings.reminderDays];
                  newReminderDays[index] = parseInt(e.target.value);
                  setBillingSettings({ ...billingSettings, reminderDays: newReminderDays });
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Automatic reminders will be sent on these days</p>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BillingSettings;
