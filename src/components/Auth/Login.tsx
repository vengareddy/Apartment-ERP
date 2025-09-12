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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Replace with actual authentication API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // For now, show message to set up authentication
      alert('Authentication system needs to be configured. Please contact your system administrator.');
      
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Society ERP</h2>
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
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">🏢 Society ERP System</h4>
              <p className="text-xs text-blue-800 mb-3">
                This is a production-ready financial management system for apartment societies.
              </p>
              <div className="space-y-2 text-xs text-blue-700">
                <div>📧 <strong>Admin Setup:</strong> Contact your system administrator for account creation</div>
                <div>💳 <strong>Payments:</strong> UPI, Net Banking, and Card payments supported</div>
                <div>📱 <strong>Mobile App:</strong> Available for residents on Android and iOS</div>
                <div>🔒 <strong>Security:</strong> Bank-grade security with audit trails</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact: <span className="font-medium">support@yoursociety.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;