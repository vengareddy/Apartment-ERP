import React from 'react';
import { Bell, Menu, Search, User, LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'treasurer' | 'resident' | 'auditor' | 'cultural_committee';
  flatNumber?: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onToggleSidebar }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'treasurer': return 'bg-blue-100 text-blue-800';
      case 'cultural_committee': return 'bg-orange-100 text-orange-800';
      case 'auditor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, flats, vendors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user?.role || 'resident')}`}>
                  {user?.role?.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-500">{user?.email}</p>
              {user?.flatNumber && (
                <p className="text-xs text-gray-500">Flat: {user.flatNumber}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <button
                onClick={onLogout}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;