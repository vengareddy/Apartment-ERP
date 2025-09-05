import React, { useState } from 'react';
import { Save, Shield, Key, Clock, AlertTriangle } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordExpiry: 90,
    preventReuse: 5
  });

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: 30,
    maxConcurrentSessions: 3,
    requireReauth: true,
    logoutOnClose: false
  });

  const [securityFeatures, setSecurityFeatures] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    suspiciousActivityAlerts: true,
    ipWhitelisting: false,
    auditLogging: true,
    encryptionAtRest: true
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
    encryptBackups: true,
    offSiteBackup: false
  });

  const handleSave = () => {
    alert('Security settings saved successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Password Policy */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-blue-600" />
          Password Policy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Length
            </label>
            <input
              type="number"
              value={passwordPolicy.minLength}
              onChange={(e) => setPasswordPolicy({ ...passwordPolicy, minLength: parseInt(e.target.value) })}
              min="6"
              max="20"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Expiry (Days)
            </label>
            <input
              type="number"
              value={passwordPolicy.passwordExpiry}
              onChange={(e) => setPasswordPolicy({ ...passwordPolicy, passwordExpiry: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prevent Password Reuse
            </label>
            <input
              type="number"
              value={passwordPolicy.preventReuse}
              onChange={(e) => setPasswordPolicy({ ...passwordPolicy, preventReuse: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Number of previous passwords to remember</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Password Requirements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireUppercase"
                checked={passwordPolicy.requireUppercase}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireUppercase: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="requireUppercase" className="ml-2 text-sm text-gray-700">
                Require uppercase letters
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireLowercase"
                checked={passwordPolicy.requireLowercase}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireLowercase: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="requireLowercase" className="ml-2 text-sm text-gray-700">
                Require lowercase letters
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireNumbers"
                checked={passwordPolicy.requireNumbers}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireNumbers: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="requireNumbers" className="ml-2 text-sm text-gray-700">
                Require numbers
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireSpecialChars"
                checked={passwordPolicy.requireSpecialChars}
                onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireSpecialChars: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="requireSpecialChars" className="ml-2 text-sm text-gray-700">
                Require special characters
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-green-600" />
          Session Management
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (Minutes)
            </label>
            <input
              type="number"
              value={sessionSettings.sessionTimeout}
              onChange={(e) => setSessionSettings({ ...sessionSettings, sessionTimeout: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Concurrent Sessions
            </label>
            <input
              type="number"
              value={sessionSettings.maxConcurrentSessions}
              onChange={(e) => setSessionSettings({ ...sessionSettings, maxConcurrentSessions: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requireReauth"
              checked={sessionSettings.requireReauth}
              onChange={(e) => setSessionSettings({ ...sessionSettings, requireReauth: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="requireReauth" className="ml-2 text-sm text-gray-700">
              Require re-authentication for sensitive operations
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="logoutOnClose"
              checked={sessionSettings.logoutOnClose}
              onChange={(e) => setSessionSettings({ ...sessionSettings, logoutOnClose: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="logoutOnClose" className="ml-2 text-sm text-gray-700">
              Auto-logout when browser is closed
            </label>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-600" />
          Security Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twoFactorAuth"
                checked={securityFeatures.twoFactorAuth}
                onChange={(e) => setSecurityFeatures({ ...securityFeatures, twoFactorAuth: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-700">
                Enable Two-Factor Authentication
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="loginNotifications"
                checked={securityFeatures.loginNotifications}
                onChange={(e) => setSecurityFeatures({ ...securityFeatures, loginNotifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="loginNotifications" className="ml-2 text-sm text-gray-700">
                Send login notifications
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="suspiciousActivityAlerts"
                checked={securityFeatures.suspiciousActivityAlerts}
                onChange={(e) => setSecurityFeatures({ ...securityFeatures, suspiciousActivityAlerts: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="suspiciousActivityAlerts" className="ml-2 text-sm text-gray-700">
                Alert on suspicious activity
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ipWhitelisting"
                checked={securityFeatures.ipWhitelisting}
                onChange={(e) => setSecurityFeatures({ ...securityFeatures, ipWhitelisting: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="ipWhitelisting" className="ml-2 text-sm text-gray-700">
                Enable IP whitelisting
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="auditLogging"
                checked={securityFeatures.auditLogging}
                onChange={(e) => setSecurityFeatures({ ...securityFeatures, auditLogging: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="auditLogging" className="ml-2 text-sm text-gray-700">
                Enable comprehensive audit logging
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="encryptionAtRest"
                checked={securityFeatures.encryptionAtRest}
                onChange={(e) => setSecurityFeatures({ ...securityFeatures, encryptionAtRest: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="encryptionAtRest" className="ml-2 text-sm text-gray-700">
                Enable data encryption at rest
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Recovery */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
          Backup & Recovery
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={backupSettings.backupFrequency}
              onChange={(e) => setBackupSettings({ ...backupSettings, backupFrequency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retention Period (Days)
            </label>
            <input
              type="number"
              value={backupSettings.retentionPeriod}
              onChange={(e) => setBackupSettings({ ...backupSettings, retentionPeriod: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoBackup"
              checked={backupSettings.autoBackup}
              onChange={(e) => setBackupSettings({ ...backupSettings, autoBackup: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="autoBackup" className="ml-2 text-sm text-gray-700">
              Enable automatic backups
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="encryptBackups"
              checked={backupSettings.encryptBackups}
              onChange={(e) => setBackupSettings({ ...backupSettings, encryptBackups: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="encryptBackups" className="ml-2 text-sm text-gray-700">
              Encrypt backup files
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="offSiteBackup"
              checked={backupSettings.offSiteBackup}
              onChange={(e) => setBackupSettings({ ...backupSettings, offSiteBackup: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="offSiteBackup" className="ml-2 text-sm text-gray-700">
              Enable off-site backup storage
            </label>
          </div>
        </div>
      </div>

      {/* Security Status */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">Security Score: 85/100</span>
          </div>
          <div className="mt-2 text-sm text-green-700">
            <p>Your system security is good. Consider enabling two-factor authentication for better protection.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Last Security Scan</div>
            <div className="text-gray-600">2025-01-10 14:30</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Failed Login Attempts</div>
            <div className="text-gray-600">3 in last 24 hours</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Active Sessions</div>
            <div className="text-gray-600">12 users online</div>
          </div>
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

export default SecuritySettings;