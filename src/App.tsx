import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Billing from './components/Billing/Billing';
import Payments from './components/Payments/Payments';
import Expenses from './components/Expenses/Expenses';
import Reports from './components/Reports/Reports';
import UserManagement from './components/UserManagement/UserManagement';
import Settings from './components/Settings/Settings';
import Login from './components/Auth/Login';
import CorpusFund from './components/CorpusFund/CorpusFund';
import CulturalCommittee from './components/CulturalCommittee/CulturalCommittee';
import SystemArchitecture from './components/Documentation/SystemArchitecture';
import ApiDocumentation from './components/Documentation/ApiDocumentation';
import DatabaseSchema from './components/Documentation/DatabaseSchema';
import UserGuide from './components/Documentation/UserGuide';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'treasurer' | 'resident' | 'auditor' | 'cultural_committee';
  flatNumber?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          userRole={currentUser?.role || 'resident'}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header 
            user={currentUser} 
            onLogout={handleLogout}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard userRole={currentUser?.role || 'resident'} currentUser={currentUser} />} />
              <Route path="/billing" element={<Billing currentUser={currentUser} />} />
              <Route path="/payments" element={<Payments currentUser={currentUser} />} />
              <Route path="/expenses" element={<Expenses currentUser={currentUser} />} />
              <Route path="/reports" element={<Reports currentUser={currentUser} />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings currentUser={currentUser} />} />
              <Route path="/corpus-fund" element={<CorpusFund currentUser={currentUser} />} />
              <Route path="/cultural-committee" element={<CulturalCommittee currentUser={currentUser} />} />
              <Route path="/docs/architecture" element={currentUser?.role === 'resident' ? <UserGuide /> : <SystemArchitecture />} />
              <Route path="/docs/api" element={currentUser?.role === 'resident' ? <UserGuide /> : <ApiDocumentation />} />
              <Route path="/docs/database" element={currentUser?.role === 'resident' ? <UserGuide /> : <DatabaseSchema />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;