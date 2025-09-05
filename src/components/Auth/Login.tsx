import React, { useState } from 'react';
import { Building2, Lock, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'treasurer' | 'resident' | 'auditor';
  flatNumber?: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Demo users for different roles
  const demoUsers = [
    { id: '1', name: 'John Admin', email: 'admin@apartment.com', role: 'admin' as const, password: 'admin123', flatNumber: undefined },
    { id: '2', name: 'Sarah Treasurer', email: 'treasurer@apartment.com', role: 'treasurer' as const, password: 'treasurer123', flatNumber: undefined },
    { id: '8', name: 'Cultural Committee', email: 'cultural@apartment.com', role: 'cultural_committee' as const, password: 'cultural123', flatNumber: undefined },
    { id: '3', name: 'John Smith (A-101 Owner)', email: 'john.smith@email.com', role: 'resident' as const, flatNumber: 'A-101', password: 'owner123' },
    { id: '5', name: 'Suresh Reddy (A-102 Owner)', email: 'suresh.reddy@email.com', role: 'resident' as const, flatNumber: 'A-102', password: 'owner123' },
    { id: '6', name: 'Lakshmi Devi (B-203 Owner)', email: 'lakshmi.devi@email.com', role: 'resident' as const, flatNumber: 'B-203', password: 'owner123' },
    { id: '4', name: 'Lisa Auditor', email: 'auditor@apartment.com', role: 'auditor' as const, password: 'auditor123', flatNumber: undefined },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      alert('Invalid credentials. Try the demo accounts shown below.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">ApartmentERP</h2>
          <p className="mt-2 text-sm text-gray-600">Financial Management System</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts - All Residents Use Owner Login:</h3>
            <div className="space-y-2 text-sm">
              {demoUsers.map((user) => (
                <div key={user.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <div>
                    <span className="font-medium">{user.role.toUpperCase()}</span>
                    <div className="text-xs text-gray-600">{user.email}</div>
                    {user.role === 'resident' && user.flatNumber && (
                      <div className="text-xs text-blue-600">
                        {['A-102', 'B-203', 'C-301'].includes(user.flatNumber) ? 'Owner - Has Tenant' : 'Owner - Self Occupied'}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(user.email);
                      setPassword(user.password);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-xs"
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Owner Login System:</h4>
              <p className="text-xs text-blue-800">
                All residents use their owner login credentials. Flat owners (whether self-occupied or rented out) login with their 
                owner account to access their flat's information, monitor tenant payments, receive society notices, and track expenses.
                There are no separate tenant login accounts - owners manage everything for their flats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;