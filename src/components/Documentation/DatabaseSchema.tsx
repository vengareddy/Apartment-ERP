import React from 'react';
import { Database, Key, Link, Shield } from 'lucide-react';

const DatabaseSchema: React.FC = () => {
  const tables = [
    {
      name: 'users',
      description: 'User accounts and authentication',
      partitionKey: 'user_id (String)',
      sortKey: null,
      attributes: [
        { name: 'user_id', type: 'String', description: 'Unique user identifier (UUID)' },
        { name: 'email', type: 'String', description: 'User email address (unique)' },
        { name: 'name', type: 'String', description: 'Full name of the user' },
        { name: 'role', type: 'String', description: 'User role (admin, treasurer, resident, auditor)' },
        { name: 'flat_number', type: 'String', description: 'Flat number (for residents)' },
        { name: 'user_type', type: 'String', description: 'resident or owner (for rental tracking)' },
        { name: 'tenant_name', type: 'String', description: 'Current tenant name (for owners)' },
        { name: 'tenant_phone', type: 'String', description: 'Current tenant phone (for owners)' },
        { name: 'tenant_email', type: 'String', description: 'Current tenant email (for owners)' },
        { name: 'phone', type: 'String', description: 'Phone number' },
        { name: 'is_active', type: 'Boolean', description: 'Account status' },
        { name: 'created_at', type: 'String', description: 'Account creation timestamp' },
        { name: 'updated_at', type: 'String', description: 'Last update timestamp' }
      ],
      gsi: [
        { name: 'email-index', partitionKey: 'email', sortKey: null },
        { name: 'flat-index', partitionKey: 'flat_number', sortKey: null }
      ]
    },
    {
      name: 'flats',
      description: 'Apartment flat information',
      partitionKey: 'flat_id (String)',
      sortKey: null,
      attributes: [
        { name: 'flat_id', type: 'String', description: 'Unique flat identifier' },
        { name: 'flat_number', type: 'String', description: 'Flat number (e.g., A-101)' },
        { name: 'building', type: 'String', description: 'Building name/number' },
        { name: 'floor', type: 'Number', description: 'Floor number' },
        { name: 'bhk_type', type: 'String', description: 'Flat type (1BHK, 2BHK, etc.)' },
        { name: 'carpet_area', type: 'Number', description: 'Carpet area in sq ft' },
        { name: 'owner_id', type: 'String', description: 'Owner user ID' },
        { name: 'tenant_id', type: 'String', description: 'Current tenant user ID (if rented)' },
        { name: 'maintenance_rate', type: 'Number', description: 'Monthly maintenance amount' },
        { name: 'status', type: 'String', description: 'occupied, vacant, under_maintenance' },
        { name: 'created_at', type: 'String', description: 'Record creation timestamp' }
      ],
      gsi: [
        { name: 'flat-number-index', partitionKey: 'flat_number', sortKey: null },
        { name: 'owner-index', partitionKey: 'owner_id', sortKey: null }
      ]
    },
    {
      name: 'bills',
      description: 'Generated bills for residents',
      partitionKey: 'bill_id (String)',
      sortKey: null,
      attributes: [
        { name: 'bill_id', type: 'String', description: 'Unique bill identifier' },
        { name: 'flat_id', type: 'String', description: 'Reference to flat' },
        { name: 'flat_number', type: 'String', description: 'Flat number for easy reference' },
        { name: 'user_id', type: 'String', description: 'Resident user ID' },
        { name: 'bill_type', type: 'String', description: 'maintenance, water, electricity, parking' },
        { name: 'billing_period', type: 'String', description: 'Billing period (YYYY-MM)' },
        { name: 'amount', type: 'Number', description: 'Total bill amount' },
        { name: 'due_date', type: 'String', description: 'Payment due date' },
        { name: 'status', type: 'String', description: 'pending, paid, overdue, cancelled' },
        { name: 'line_items', type: 'List', description: 'Detailed breakdown of charges' },
        { name: 'generated_at', type: 'String', description: 'Bill generation timestamp' },
        { name: 'paid_at', type: 'String', description: 'Payment timestamp' }
      ],
      gsi: [
        { name: 'flat-period-index', partitionKey: 'flat_number', sortKey: 'billing_period' },
        { name: 'user-index', partitionKey: 'user_id', sortKey: 'generated_at' },
        { name: 'status-index', partitionKey: 'status', sortKey: 'due_date' }
      ]
    },
    {
      name: 'payments',
      description: 'Payment transactions',
      partitionKey: 'payment_id (String)',
      sortKey: null,
      attributes: [
        { name: 'payment_id', type: 'String', description: 'Unique payment identifier' },
        { name: 'bill_id', type: 'String', description: 'Reference to bill' },
        { name: 'flat_number', type: 'String', description: 'Flat number' },
        { name: 'user_id', type: 'String', description: 'Payer user ID' },
        { name: 'amount', type: 'Number', description: 'Payment amount' },
        { name: 'payment_method', type: 'String', description: 'upi, net_banking, cash, cheque' },
        { name: 'transaction_id', type: 'String', description: 'External transaction reference' },
        { name: 'status', type: 'String', description: 'success, failed, pending, cancelled' },
        { name: 'gateway_response', type: 'Map', description: 'Payment gateway response data' },
        { name: 'created_at', type: 'String', description: 'Payment initiation timestamp' },
        { name: 'completed_at', type: 'String', description: 'Payment completion timestamp' }
      ],
      gsi: [
        { name: 'bill-index', partitionKey: 'bill_id', sortKey: null },
        { name: 'user-index', partitionKey: 'user_id', sortKey: 'created_at' },
        { name: 'flat-date-index', partitionKey: 'flat_number', sortKey: 'created_at' }
      ]
    },
    {
      name: 'expenses',
      description: 'Society expenses and vendor payments',
      partitionKey: 'expense_id (String)',
      sortKey: null,
      attributes: [
        { name: 'expense_id', type: 'String', description: 'Unique expense identifier' },
        { name: 'vendor_id', type: 'String', description: 'Reference to vendor' },
        { name: 'category', type: 'String', description: 'maintenance, utilities, security, garden' },
        { name: 'description', type: 'String', description: 'Expense description' },
        { name: 'amount', type: 'Number', description: 'Expense amount' },
        { name: 'expense_date', type: 'String', description: 'Date of expense' },
        { name: 'payment_method', type: 'String', description: 'Payment method used' },
        { name: 'invoice_number', type: 'String', description: 'Invoice/receipt number' },
        { name: 'invoice_url', type: 'String', description: 'S3 URL of uploaded invoice' },
        { name: 'approved_by', type: 'String', description: 'Approver user ID' },
        { name: 'status', type: 'String', description: 'pending, approved, paid, rejected' },
        { name: 'created_at', type: 'String', description: 'Record creation timestamp' }
      ],
      gsi: [
        { name: 'vendor-index', partitionKey: 'vendor_id', sortKey: 'expense_date' },
        { name: 'category-date-index', partitionKey: 'category', sortKey: 'expense_date' },
        { name: 'status-index', partitionKey: 'status', sortKey: 'created_at' }
      ]
    },
    {
      name: 'vendors',
      description: 'Vendor and service provider information',
      partitionKey: 'vendor_id (String)',
      sortKey: null,
      attributes: [
        { name: 'vendor_id', type: 'String', description: 'Unique vendor identifier' },
        { name: 'vendor_name', type: 'String', description: 'Vendor company name' },
        { name: 'contact_person', type: 'String', description: 'Primary contact person' },
        { name: 'phone', type: 'String', description: 'Phone number' },
        { name: 'email', type: 'String', description: 'Email address' },
        { name: 'address', type: 'String', description: 'Vendor address' },
        { name: 'service_type', type: 'String', description: 'Type of service provided' },
        { name: 'gstin', type: 'String', description: 'GST identification number' },
        { name: 'pan', type: 'String', description: 'PAN number' },
        { name: 'bank_details', type: 'Map', description: 'Bank account information' },
        { name: 'is_active', type: 'Boolean', description: 'Vendor status' },
        { name: 'created_at', type: 'String', description: 'Record creation timestamp' }
      ],
      gsi: [
        { name: 'name-index', partitionKey: 'vendor_name', sortKey: null },
        { name: 'service-type-index', partitionKey: 'service_type', sortKey: null }
      ]
    },
    {
      name: 'reminders',
      description: 'Payment reminders sent to residents',
      partitionKey: 'reminder_id (String)',
      sortKey: null,
      attributes: [
        { name: 'reminder_id', type: 'String', description: 'Unique reminder identifier' },
        { name: 'bill_id', type: 'String', description: 'Reference to bill' },
        { name: 'user_id', type: 'String', description: 'Recipient user ID' },
        { name: 'flat_number', type: 'String', description: 'Flat number' },
        { name: 'reminder_type', type: 'String', description: 'email, sms, whatsapp, push' },
        { name: 'message', type: 'String', description: 'Reminder message content' },
        { name: 'sent_at', type: 'String', description: 'Reminder sent timestamp' },
        { name: 'status', type: 'String', description: 'sent, failed, delivered, read' },
        { name: 'delivery_receipt', type: 'Map', description: 'Delivery confirmation data' }
      ],
      gsi: [
        { name: 'bill-index', partitionKey: 'bill_id', sortKey: 'sent_at' },
        { name: 'user-index', partitionKey: 'user_id', sortKey: 'sent_at' }
      ]
    },
    {
      name: 'corpus_fund_transactions',
      description: 'Corpus fund collections and expenses tracking',
      partitionKey: 'transaction_id (String)',
      sortKey: null,
      attributes: [
        { name: 'transaction_id', type: 'String', description: 'Unique transaction identifier' },
        { name: 'transaction_type', type: 'String', description: 'collection or expense' },
        { name: 'flat_id', type: 'String', description: 'Reference to flat (for collections)' },
        { name: 'flat_number', type: 'String', description: 'Flat number (for collections)' },
        { name: 'user_id', type: 'String', description: 'User ID (for collections)' },
        { name: 'vendor_id', type: 'String', description: 'Reference to vendor (for expenses)' },
        { name: 'quarter', type: 'String', description: 'Collection quarter (Q1-2025, Q2-2025, etc.)' },
        { name: 'amount', type: 'Number', description: 'Transaction amount' },
        { name: 'description', type: 'String', description: 'Transaction description' },
        { name: 'category', type: 'String', description: 'infrastructure, maintenance, safety, amenities' },
        { name: 'status', type: 'String', description: 'pending, completed, failed, pending_approval' },
        { name: 'payment_method', type: 'String', description: 'Payment method used' },
        { name: 'invoice_number', type: 'String', description: 'Invoice/receipt number' },
        { name: 'invoice_url', type: 'String', description: 'S3 URL of uploaded invoice' },
        { name: 'approved_by', type: 'String', description: 'Approver user ID (for expenses)' },
        { name: 'transaction_date', type: 'String', description: 'Date of transaction' },
        { name: 'created_at', type: 'String', description: 'Record creation timestamp' },
        { name: 'updated_at', type: 'String', description: 'Last update timestamp' }
      ],
      gsi: [
        { name: 'type-date-index', partitionKey: 'transaction_type', sortKey: 'transaction_date' },
        { name: 'flat-quarter-index', partitionKey: 'flat_number', sortKey: 'quarter' },
        { name: 'quarter-index', partitionKey: 'quarter', sortKey: 'transaction_date' },
        { name: 'status-index', partitionKey: 'status', sortKey: 'created_at' }
      ]
    },
    {
      name: 'corpus_fund_settings',
      description: 'Corpus fund configuration and rates',
      partitionKey: 'setting_id (String)',
      sortKey: null,
      attributes: [
        { name: 'setting_id', type: 'String', description: 'Unique setting identifier' },
        { name: 'quarter', type: 'String', description: 'Applicable quarter' },
        { name: 'amount_per_flat', type: 'Number', description: 'Collection amount per flat' },
        { name: 'due_date', type: 'String', description: 'Collection due date' },
        { name: 'description', type: 'String', description: 'Purpose of collection' },
        { name: 'is_active', type: 'Boolean', description: 'Whether collection is active' },
        { name: 'created_at', type: 'String', description: 'Setting creation timestamp' }
      ],
      gsi: [
        { name: 'quarter-index', partitionKey: 'quarter', sortKey: null },
        { name: 'active-index', partitionKey: 'is_active', sortKey: 'created_at' }
      ]
    },
    {
      name: 'audit_logs',
      description: 'System audit trail for all operations',
      partitionKey: 'log_id (String)',
      sortKey: null,
      attributes: [
        { name: 'log_id', type: 'String', description: 'Unique log entry identifier' },
        { name: 'user_id', type: 'String', description: 'User who performed the action' },
        { name: 'action', type: 'String', description: 'Action performed' },
        { name: 'resource_type', type: 'String', description: 'Type of resource affected' },
        { name: 'resource_id', type: 'String', description: 'ID of affected resource' },
        { name: 'old_values', type: 'Map', description: 'Previous values (for updates)' },
        { name: 'new_values', type: 'Map', description: 'New values (for creates/updates)' },
        { name: 'ip_address', type: 'String', description: 'Client IP address' },
        { name: 'user_agent', type: 'String', description: 'Client user agent' },
        { name: 'timestamp', type: 'String', description: 'When the action occurred' }
      ],
      gsi: [
        { name: 'user-index', partitionKey: 'user_id', sortKey: 'timestamp' },
        { name: 'resource-index', partitionKey: 'resource_type', sortKey: 'timestamp' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Schema</h1>
        <p className="text-lg text-gray-600">DynamoDB table structure for Apartment ERP System</p>
      </div>

      {/* Database Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Database className="w-6 h-6 mr-2 text-blue-600" />
          Database Design Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Design Patterns</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Single Table Design where applicable
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Global Secondary Indexes for query patterns
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Normalized schema for financial accuracy
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Immutable audit trail records
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Time-based partitioning for scalability
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Row-level security policies
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Automatic backup and point-in-time recovery
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Encryption at rest and in transit
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Comprehensive audit logging
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                Data validation constraints
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tables */}
      {tables.map((table) => (
        <div key={table.name} className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{table.name}</h2>
              <p className="text-gray-600 mt-1">{table.description}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div className="flex items-center">
                <Key className="w-4 h-4 mr-1" />
                <span>PK: {table.partitionKey}</span>
              </div>
              {table.sortKey && (
                <div className="flex items-center mt-1">
                  <Key className="w-4 h-4 mr-1" />
                  <span>SK: {table.sortKey}</span>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attribute
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.attributes.map((attr) => (
                  <tr key={attr.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <code className="text-sm font-mono text-gray-900">{attr.name}</code>
                        {(table.partitionKey.includes(attr.name) || (table.sortKey && table.sortKey.includes(attr.name))) && (
                          <Key className="w-3 h-3 ml-2 text-yellow-500" title="Primary Key" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        attr.type === 'String' ? 'bg-blue-100 text-blue-800' :
                        attr.type === 'Number' ? 'bg-green-100 text-green-800' :
                        attr.type === 'Boolean' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {attr.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{attr.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Global Secondary Indexes */}
          {table.gsi && table.gsi.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Global Secondary Indexes</h3>
              <div className="space-y-3">
                {table.gsi.map((index) => (
                  <div key={index.name} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Link className="w-4 h-4 text-blue-600 mr-2" />
                      <code className="text-sm font-mono text-gray-900">{index.name}</code>
                    </div>
                    <div className="text-sm text-gray-600">
                      PK: {index.partitionKey}
                      {index.sortKey && ` • SK: ${index.sortKey}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Relationships */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Entity Relationships</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-3">User → Flat Relationship</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• One flat can have one owner (users.user_id → flats.owner_id)</li>
                <li>• One flat can have zero or one tenant (users.user_id → flats.tenant_id)</li>
                <li>• Users can have multiple roles across different flats</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-3">Billing Relationships</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• One flat generates multiple bills (flats.flat_id → bills.flat_id)</li>
                <li>• One bill can have multiple payments (bills.bill_id → payments.bill_id)</li>
                <li>• Bills are linked to users for easy access</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-3">Expense Management</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Vendors can have multiple expenses (vendors.vendor_id → expenses.vendor_id)</li>
                <li>• Expenses are categorized for better reporting</li>
                <li>• All transactions maintain audit trails</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-3">Audit & Compliance</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Every action creates an audit log entry</li>
                <li>• Audit logs are immutable and time-ordered</li>
                <li>• Financial transactions are fully traceable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Implementation Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Security Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <strong>Role-based Access:</strong> Implement fine-grained permissions based on user roles
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <strong>Data Encryption:</strong> Use KMS for encryption keys and encrypt sensitive data
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <strong>Audit Everything:</strong> Log all financial operations with complete context
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Performance Optimization</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <strong>Query Patterns:</strong> Design GSIs based on application access patterns
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <strong>Batch Operations:</strong> Use batch reads/writes for bulk operations
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <strong>Caching Strategy:</strong> Cache frequently accessed read-only data
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchema;