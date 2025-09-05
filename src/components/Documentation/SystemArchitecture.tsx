import React from 'react';
import { Database, Server, Smartphone, Globe, Shield, Bell, CreditCard } from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h1>
        <p className="text-lg text-gray-600">Apartment ERP Software - Financial Management System</p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">High-Level Architecture</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Frontend Layer */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-blue-600 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Frontend Layer
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Web Portal (Admin)</h4>
                <p className="text-sm text-blue-700">React + TypeScript + Tailwind CSS</p>
                <ul className="text-xs text-blue-600 mt-2 space-y-1">
                  <li>• Dashboard & Analytics</li>
                  <li>• Billing Management</li>
                  <li>• Financial Reports</li>
                  <li>• User Management</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile App (Residents)
                </h4>
                <p className="text-sm text-green-700">React Native / Flutter</p>
                <ul className="text-xs text-green-600 mt-2 space-y-1">
                  <li>• View Bills & Payments</li>
                  <li>• UPI Integration</li>
                  <li>• Push Notifications</li>
                  <li>• Complaint Management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Backend Layer */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-purple-600 flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Backend Layer
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">API Gateway</h4>
                <p className="text-sm text-purple-700">FastAPI / Django REST Framework</p>
                <ul className="text-xs text-purple-600 mt-2 space-y-1">
                  <li>• RESTful APIs</li>
                  <li>• JWT Authentication</li>
                  <li>• Rate Limiting</li>
                  <li>• API Documentation</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900">Business Logic</h4>
                <p className="text-sm text-orange-700">Python Microservices</p>
                <ul className="text-xs text-orange-600 mt-2 space-y-1">
                  <li>• Billing Engine</li>
                  <li>• Payment Processing</li>
                  <li>• Notification Service</li>
                  <li>• Report Generation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Layer */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-600 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Data Layer
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900">Primary Database</h4>
                <p className="text-sm text-red-700">DynamoDB (NoSQL)</p>
                <ul className="text-xs text-red-600 mt-2 space-y-1">
                  <li>• User Management</li>
                  <li>• Financial Transactions</li>
                  <li>• Billing Records</li>
                  <li>• Audit Logs</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">File Storage</h4>
                <p className="text-sm text-gray-700">AWS S3</p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1">
                  <li>• Invoice Documents</li>
                  <li>• Payment Receipts</li>
                  <li>• Profile Images</li>
                  <li>• Report Files</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Recommended Technology Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Frontend</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• React 18 + TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• React Router</li>
              <li>• React Query</li>
              <li>• Chart.js / Recharts</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Backend</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• FastAPI (Python)</li>
              <li>• Pydantic</li>
              <li>• Celery (Background Tasks)</li>
              <li>• Redis (Caching)</li>
              <li>• Boto3 (AWS SDK)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Database & Storage</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• DynamoDB</li>
              <li>• AWS S3</li>
              <li>• ElasticSearch (Search)</li>
              <li>• Redis (Session Store)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Infrastructure</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• AWS Lambda</li>
              <li>• API Gateway</li>
              <li>• CloudWatch</li>
              <li>• SES (Email)</li>
              <li>• SNS (SMS)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-green-600" />
          Security & Compliance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Security Measures</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                JWT-based authentication with refresh tokens
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Role-based access control (RBAC)
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Data encryption at rest and in transit
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                API rate limiting and DDoS protection
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Input validation and sanitization
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Regular security audits and penetration testing
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Audit & Compliance</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Complete audit trail for all financial transactions
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                GDPR compliance for data privacy
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                PCI DSS compliance for payment processing
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Immutable transaction records
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Automated backup and disaster recovery
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Detailed logging and monitoring
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Points */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">External Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-lg">
            <div className="flex items-center mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-medium text-green-900 ml-3">Payment Gateways</h3>
            </div>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• Razorpay UPI Integration</li>
              <li>• Net Banking Support</li>
              <li>• Credit/Debit Cards</li>
              <li>• Digital Wallets</li>
              <li>• QR Code Payments</li>
            </ul>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-4">
              <Bell className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-medium text-blue-900 ml-3">Notifications</h3>
            </div>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• AWS SES (Email)</li>
              <li>• AWS SNS (SMS)</li>
              <li>• WhatsApp Business API</li>
              <li>• Push Notifications (FCM)</li>
              <li>• In-app Notifications</li>
            </ul>
          </div>
          
          <div className="p-6 bg-purple-50 rounded-lg">
            <div className="flex items-center mb-4">
              <Server className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-medium text-purple-900 ml-3">Third-party Services</h3>
            </div>
            <ul className="text-sm text-purple-700 space-y-2">
              <li>• Accounting Software APIs</li>
              <li>• Bank Statement Parsing</li>
              <li>• Document Generation</li>
              <li>• Analytics & Reporting</li>
              <li>• Backup Services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scalability & Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Scalability & Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Performance Optimization</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• CDN for static assets (CloudFront)</li>
              <li>• Database query optimization</li>
              <li>• API response caching (Redis)</li>
              <li>• Image optimization and compression</li>
              <li>• Lazy loading for large datasets</li>
              <li>• Background job processing (Celery)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Scalability Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Auto-scaling Lambda functions</li>
              <li>• DynamoDB on-demand scaling</li>
              <li>• Load balancing with ALB</li>
              <li>• Microservices architecture</li>
              <li>• Horizontal database sharding</li>
              <li>• Multi-region deployment support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;