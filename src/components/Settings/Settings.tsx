import React, { useState } from 'react';
import { Settings as SettingsIcon, Building, CreditCard, Bell, Shield, Database, Calendar } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import BillingSettings from './BillingSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import SystemSettings from './SystemSettings';
import CulturalTemplates from './CulturalTemplates';
import MasterDataSettings from './MasterDataSettings';

interface SettingsProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const Settings: React.FC<SettingsProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('general');

  const adminTabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'master-data', name: 'Master Data', icon: Database },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'system', name: 'System', icon: Database },
  ];

  const treasurerTabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'cultural-templates', name: 'Cultural Templates', icon: Calendar },
  ];

  const tabs = currentUser?.role === 'admin' ? adminTabs : treasurerTabs;

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings currentUser={currentUser} />;
      case 'master-data':
        return <MasterDataSettings />;
      case 'billing':
        return <BillingSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'system':
        return <SystemSettings />;
      case 'cultural-templates':
        return <CulturalTemplates />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-500">System Configuration</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;