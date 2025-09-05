import React, { useState } from 'react';
import { Save, Database, Server, HardDrive, Activity, RefreshCw } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState({
    version: '1.2.3',
    buildDate: '2025-01-10',
    environment: 'production',
    uptime: '15 days, 8 hours',
    lastRestart: '2024-12-26 10:30'
  });

  const [performanceSettings, setPerformanceSettings] = useState({
    cacheEnabled: true,
    cacheTimeout: 3600,
    maxConcurrentUsers: 100,
    queryTimeout: 30,
    sessionCleanup: true,
    compressionEnabled: true
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    maintenanceMode: false,
    maintenanceMessage: 'System is under maintenance. Please try again later.',
    scheduledMaintenance: '',
    autoUpdates: false,
    updateChannel: 'stable'
  });

  const [loggingSettings, setLoggingSettings] = useState({
    logLevel: 'info',
    maxLogSize: 100,
    logRetention: 30,
    enableDebugMode: false,
    logToFile: true,
    logToDatabase: true
  });

  const handleSave = () => {
    alert('System settings saved successfully!');
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart the system? This will temporarily interrupt service.')) {
      alert('System restart initiated. Please wait...');
    }
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear the system cache?')) {
      alert('Cache cleared successfully!');
    }
  };

  return (
    <div className="space-y-8">
      {/* System Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Server className="w-5 h-5 mr-2 text-blue-600" />
          System Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Version</div>
            <div className="text-lg font-semibold text-gray-900">{systemInfo.version}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Environment</div>
            <div className="text-lg font-semibold text-gray-900 capitalize">{systemInfo.environment}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Uptime</div>
            <div className="text-lg font-semibold text-gray-900">{systemInfo.uptime}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Build Date</div>
            <div className="text-lg font-semibold text-gray-900">{systemInfo.buildDate}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Last Restart</div>
            <div className="text-lg font-semibold text-gray-900">{systemInfo.lastRestart}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-700">Status</div>
            <div className="text-lg font-semibold text-green-900 flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Healthy
            </div>
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Performance Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cache Timeout (seconds)
            </label>
            <input
              type="number"
              value={performanceSettings.cacheTimeout}
              onChange={(e) => setPerformanceSettings({ ...performanceSettings, cacheTimeout: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Concurrent Users
            </label>
            <input
              type="number"
              value={performanceSettings.maxConcurrentUsers}
              onChange={(e) => setPerformanceSettings({ ...performanceSettings, maxConcurrentUsers: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Query Timeout (seconds)
            </label>
            <input
              type="number"
              value={performanceSettings.queryTimeout}
              onChange={(e) => setPerformanceSettings({ ...performanceSettings, queryTimeout: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cacheEnabled"
              checked={performanceSettings.cacheEnabled}
              onChange={(e) => setPerformanceSettings({ ...performanceSettings, cacheEnabled: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="cacheEnabled" className="ml-2 text-sm text-gray-700">
              Enable system caching
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sessionCleanup"
              checked={performanceSettings.sessionCleanup}
              onChange={(e) => setPerformanceSettings({ ...performanceSettings, sessionCleanup: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="sessionCleanup" className="ml-2 text-sm text-gray-700">
              Automatic session cleanup
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="compressionEnabled"
              checked={performanceSettings.compressionEnabled}
              onChange={(e) => setPerformanceSettings({ ...performanceSettings, compressionEnabled: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="compressionEnabled" className="ml-2 text-sm text-gray-700">
              Enable response compression
            </label>
          </div>
        </div>
      </div>

      {/* Maintenance Settings */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <HardDrive className="w-5 h-5 mr-2 text-orange-600" />
          Maintenance Settings
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <input
              type="checkbox"
              id="maintenanceMode"
              checked={maintenanceSettings.maintenanceMode}
              onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, maintenanceMode: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="maintenanceMode" className="ml-2 text-sm font-medium text-yellow-800">
              Enable Maintenance Mode
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Message
            </label>
            <textarea
              value={maintenanceSettings.maintenanceMessage}
              onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, maintenanceMessage: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Maintenance
              </label>
              <input
                type="datetime-local"
                value={maintenanceSettings.scheduledMaintenance}
                onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, scheduledMaintenance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Channel
              </label>
              <select
                value={maintenanceSettings.updateChannel}
                onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, updateChannel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="stable">Stable</option>
                <option value="beta">Beta</option>
                <option value="alpha">Alpha</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoUpdates"
              checked={maintenanceSettings.autoUpdates}
              onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, autoUpdates: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="autoUpdates" className="ml-2 text-sm text-gray-700">
              Enable automatic updates
            </label>
          </div>
        </div>
      </div>

      {/* Logging Settings */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-purple-600" />
          Logging Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Log Level
            </label>
            <select
              value={loggingSettings.logLevel}
              onChange={(e) => setLoggingSettings({ ...loggingSettings, logLevel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Log File Size (MB)
            </label>
            <input
              type="number"
              value={loggingSettings.maxLogSize}
              onChange={(e) => setLoggingSettings({ ...loggingSettings, maxLogSize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Log Retention (Days)
            </label>
            <input
              type="number"
              value={loggingSettings.logRetention}
              onChange={(e) => setLoggingSettings({ ...loggingSettings, logRetention: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableDebugMode"
              checked={loggingSettings.enableDebugMode}
              onChange={(e) => setLoggingSettings({ ...loggingSettings, enableDebugMode: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="enableDebugMode" className="ml-2 text-sm text-gray-700">
              Enable debug mode
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="logToFile"
              checked={loggingSettings.logToFile}
              onChange={(e) => setLoggingSettings({ ...loggingSettings, logToFile: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="logToFile" className="ml-2 text-sm text-gray-700">
              Log to file system
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="logToDatabase"
              checked={loggingSettings.logToDatabase}
              onChange={(e) => setLoggingSettings({ ...loggingSettings, logToDatabase: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="logToDatabase" className="ml-2 text-sm text-gray-700">
              Log to database
            </label>
          </div>
        </div>
      </div>

      {/* System Actions */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Actions</h2>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Clear Cache</span>
          </button>

          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restart System</span>
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>Backup Database</span>
          </button>

          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <HardDrive className="w-4 h-4" />
            <span>System Health Check</span>
          </button>
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

export default SystemSettings;