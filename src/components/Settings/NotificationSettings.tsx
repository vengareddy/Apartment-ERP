import React, { useState } from 'react';
import { Save, Mail, MessageSquare, Smartphone, Bell } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'admin@greenvalley.com',
    smtpPassword: '',
    fromName: 'Green Valley Apartments',
    fromEmail: 'admin@greenvalley.com',
    enableTLS: true
  });

  const [smsSettings, setSmsSettings] = useState({
    provider: 'twilio',
    apiKey: '',
    apiSecret: '',
    senderId: 'GRNVLY',
    enabled: true
  });

  const [whatsappSettings, setWhatsappSettings] = useState({
    businessApiKey: '',
    phoneNumberId: '',
    enabled: false
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    billGeneration: { email: true, sms: true, whatsapp: false, push: true },
    paymentReceived: { email: true, sms: false, whatsapp: false, push: true },
    paymentOverdue: { email: true, sms: true, whatsapp: true, push: true },
    maintenanceUpdates: { email: true, sms: false, whatsapp: false, push: true },
    systemAlerts: { email: true, sms: false, whatsapp: false, push: true }
  });

  const handleSave = () => {
    alert('Notification settings saved successfully!');
  };

  const updateNotificationPreference = (type: string, channel: string, value: boolean) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [type]: {
        ...notificationPreferences[type as keyof typeof notificationPreferences],
        [channel]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Email Configuration */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-blue-600" />
          Email Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host *
            </label>
            <input
              type="text"
              value={emailSettings.smtpHost}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port *
            </label>
            <input
              type="number"
              value={emailSettings.smtpPort}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="email"
              value={emailSettings.smtpUsername}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              value={emailSettings.smtpPassword}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Name
            </label>
            <input
              type="text"
              value={emailSettings.fromName}
              onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email
            </label>
            <input
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableTLS"
              checked={emailSettings.enableTLS}
              onChange={(e) => setEmailSettings({ ...emailSettings, enableTLS: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="enableTLS" className="ml-2 text-sm text-gray-700">
              Enable TLS/SSL encryption
            </label>
          </div>
        </div>
      </div>

      {/* SMS Configuration */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
          SMS Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMS Provider
            </label>
            <select
              value={smsSettings.provider}
              onChange={(e) => setSmsSettings({ ...smsSettings, provider: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="twilio">Twilio</option>
              <option value="aws-sns">AWS SNS</option>
              <option value="textlocal">TextLocal</option>
              <option value="msg91">MSG91</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sender ID
            </label>
            <input
              type="text"
              value={smsSettings.senderId}
              onChange={(e) => setSmsSettings({ ...smsSettings, senderId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={smsSettings.apiKey}
              onChange={(e) => setSmsSettings({ ...smsSettings, apiKey: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Secret
            </label>
            <input
              type="password"
              value={smsSettings.apiSecret}
              onChange={(e) => setSmsSettings({ ...smsSettings, apiSecret: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableSMS"
              checked={smsSettings.enabled}
              onChange={(e) => setSmsSettings({ ...smsSettings, enabled: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="enableSMS" className="ml-2 text-sm text-gray-700">
              Enable SMS notifications
            </label>
          </div>
        </div>
      </div>

      {/* WhatsApp Configuration */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
          WhatsApp Business API
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business API Key
            </label>
            <input
              type="password"
              value={whatsappSettings.businessApiKey}
              onChange={(e) => setWhatsappSettings({ ...whatsappSettings, businessApiKey: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number ID
            </label>
            <input
              type="text"
              value={whatsappSettings.phoneNumberId}
              onChange={(e) => setWhatsappSettings({ ...whatsappSettings, phoneNumberId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableWhatsApp"
              checked={whatsappSettings.enabled}
              onChange={(e) => setWhatsappSettings({ ...whatsappSettings, enabled: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="enableWhatsApp" className="ml-2 text-sm text-gray-700">
              Enable WhatsApp notifications
            </label>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-purple-600" />
          Notification Preferences
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SMS
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WhatsApp
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Push
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(notificationPreferences).map(([type, preferences]) => (
                <tr key={type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={preferences.email}
                      onChange={(e) => updateNotificationPreference(type, 'email', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={preferences.sms}
                      onChange={(e) => updateNotificationPreference(type, 'sms', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={preferences.whatsapp}
                      onChange={(e) => updateNotificationPreference(type, 'whatsapp', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={preferences.push}
                      onChange={(e) => updateNotificationPreference(type, 'push', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default NotificationSettings;