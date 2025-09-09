import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Receipt, 
  CreditCard, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Settings,
  Building2,
  Calendar,
  BookOpen,
  Database,
  Code,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  userRole: string;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, userRole, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'treasurer', 'resident', 'auditor'] },
    { path: '/billing', label: 'Billing', icon: Receipt, roles: ['admin', 'treasurer'] },
    { path: '/corpus-fund', label: 'Corpus Fund', icon: Building2, roles: ['admin', 'treasurer'] },
    { path: '/cultural-committee', label: 'Cultural Activities', icon: Calendar, roles: ['admin', 'treasurer', 'cultural_committee'] },
    { path: '/payments', label: 'Payments', icon: CreditCard, roles: ['admin', 'treasurer', 'resident'] },
    { path: '/expenses', label: 'Expenses', icon: TrendingUp, roles: ['admin', 'treasurer'] },
    { path: '/reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'treasurer', 'auditor', 'resident'] },
    { path: '/users', label: 'Users', icon: Users, roles: ['admin'] },
    { path: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'treasurer'] },
  ];

  const docItems = [
    { path: '/docs/architecture', label: 'Architecture', icon: Building2 },
    { path: '/docs/api', label: 'API Docs', icon: Code },
    { path: '/docs/database', label: 'Database', icon: Database },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Society ERP</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {!collapsed && userRole !== 'auditor' && userRole !== 'cultural_committee' && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {userRole === 'resident' ? 'Help & Guide' : 'Documentation'}
          </h3>
          <div className="space-y-1">
            {(userRole === 'resident' ? [
              { path: '/docs/architecture', label: 'User Guide', icon: BookOpen },
            ] : docItems).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-2 py-1 text-sm rounded transition-colors ${
                  isActive(item.path)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
