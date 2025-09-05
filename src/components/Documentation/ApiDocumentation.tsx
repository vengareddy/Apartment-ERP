import React, { useState } from 'react';
import { Code, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['auth']);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const apiSections = [
    {
      id: 'auth',
      title: 'Authentication',
      description: 'User authentication and authorization endpoints',
      endpoints: [
        {
          method: 'POST',
          path: '/api/auth/login',
          description: 'Authenticate user and get JWT token',
          body: {
            email: 'string',
            password: 'string'
          },
          response: {
            access_token: 'string',
            refresh_token: 'string',
            user: {
              id: 'string',
              name: 'string',
              email: 'string',
              role: 'string'
            }
          }
        },
        {
          method: 'POST',
          path: '/api/auth/refresh',
          description: 'Refresh access token',
          body: {
            refresh_token: 'string'
          },
          response: {
            access_token: 'string'
          }
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing Management',
      description: 'Create, manage, and track bills',
      endpoints: [
        {
          method: 'GET',
          path: '/api/bills',
          description: 'Get all bills with pagination and filters',
          queryParams: {
            page: 'number',
            limit: 'number',
            flat_number: 'string',
            bill_type: 'string',
            status: 'string'
          },
          response: {
            bills: [
              {
                id: 'string',
                flat_number: 'string',
                resident_name: 'string',
                bill_type: 'string',
                amount: 'number',
                due_date: 'string',
                status: 'string',
                created_at: 'string'
              }
            ],
            total: 'number',
            page: 'number',
            pages: 'number'
          }
        },
        {
          method: 'POST',
          path: '/api/bills',
          description: 'Create new bills',
          body: {
            bill_type: 'string',
            period: 'string',
            flat_numbers: ['string'],
            rates: {
              flat_number: 'number'
            }
          },
          response: {
            message: 'string',
            bills_created: 'number'
          }
        },
        {
          method: 'GET',
          path: '/api/bills/{bill_id}',
          description: 'Get specific bill details',
          response: {
            id: 'string',
            flat_number: 'string',
            resident_name: 'string',
            bill_type: 'string',
            amount: 'number',
            due_date: 'string',
            status: 'string',
            line_items: [
              {
                description: 'string',
                quantity: 'number',
                rate: 'number',
                amount: 'number'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payment Processing',
      description: 'Handle payments and transaction records',
      endpoints: [
        {
          method: 'POST',
          path: '/api/payments',
          description: 'Record a payment',
          body: {
            bill_id: 'string',
            amount: 'number',
            payment_method: 'string',
            transaction_id: 'string',
            payment_date: 'string'
          },
          response: {
            payment_id: 'string',
            status: 'string',
            message: 'string',
            whatsapp_confirmation_sent: 'boolean'
          }
        },
        {
          method: 'GET',
          path: '/api/payments',
          description: 'Get payment history',
          queryParams: {
            page: 'number',
            limit: 'number',
            flat_number: 'string',
            start_date: 'string',
            end_date: 'string'
          },
          response: {
            payments: [
              {
                id: 'string',
                bill_id: 'string',
                flat_number: 'string',
                amount: 'number',
                payment_method: 'string',
                transaction_id: 'string',
                status: 'string',
                created_at: 'string'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'reminders',
      title: 'Reminder System',
      description: 'Send automated reminders for due payments',
      endpoints: [
        {
          method: 'POST',
          path: '/api/reminders/send',
          description: 'Send payment reminders',
          body: {
            bill_ids: ['string'],
            reminder_type: 'string',
            message_template: 'string'
          },
          response: {
            reminders_sent: 'number',
            failed: 'number'
          }
        },
        {
          method: 'GET',
          path: '/api/reminders',
          description: 'Get reminder history',
          response: {
            reminders: [
              {
                id: 'string',
                bill_id: 'string',
                flat_number: 'string',
                reminder_type: 'string',
                sent_at: 'string',
                status: 'string'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      description: 'Generate financial reports and analytics',
      endpoints: [
        {
          method: 'GET',
          path: '/api/reports/income-expense',
          description: 'Get income vs expense report',
          queryParams: {
            start_date: 'string',
            end_date: 'string',
            group_by: 'string'
          },
          response: {
            total_income: 'number',
            total_expense: 'number',
            net_income: 'number',
            breakdown: [
              {
                period: 'string',
                income: 'number',
                expense: 'number'
              }
            ]
          }
        },
        {
          method: 'GET',
          path: '/api/reports/flat-ledger/{flat_number}',
          description: 'Get flat-wise ledger',
          queryParams: {
            start_date: 'string',
            end_date: 'string'
          },
          response: {
            flat_number: 'string',
            resident_name: 'string',
            opening_balance: 'number',
            transactions: [
              {
                date: 'string',
                description: 'string',
                debit: 'number',
                credit: 'number',
                balance: 'number'
              }
            ],
            closing_balance: 'number'
          }
        }
      ]
    },
    {
      id: 'corpus-fund',
      title: 'Corpus Fund Management',
      description: 'Manage corpus fund collections and expenses',
      endpoints: [
        {
          method: 'POST',
          path: '/api/corpus-fund/collections',
          description: 'Initiate corpus fund collection for a quarter',
          body: {
            quarter: 'string',
            amount_per_flat: 'number',
            due_date: 'string',
            description: 'string',
            flat_numbers: ['string']
          },
          response: {
            collection_id: 'string',
            total_flats: 'number',
            total_target_amount: 'number',
            status: 'string'
          }
        },
        {
          method: 'POST',
          path: '/api/corpus-fund/expenses',
          description: 'Record corpus fund expense',
          body: {
            description: 'string',
            category: 'string',
            amount: 'number',
            vendor_id: 'string',
            invoice_number: 'string',
            expense_date: 'string',
            requires_approval: 'boolean'
          },
          response: {
            expense_id: 'string',
            status: 'string',
            approval_required: 'boolean'
          }
        },
        {
          method: 'GET',
          path: '/api/corpus-fund/transactions',
          description: 'Get corpus fund transactions',
          queryParams: {
            type: 'string',
            quarter: 'string',
            status: 'string',
            page: 'number',
            limit: 'number'
          },
          response: {
            transactions: [
              {
                id: 'string',
                type: 'string',
                amount: 'number',
                description: 'string',
                status: 'string',
                transaction_date: 'string'
              }
            ],
            balance: {
              total_collected: 'number',
              total_expenses: 'number',
              current_balance: 'number'
            }
          }
        },
        {
          method: 'GET',
          path: '/api/corpus-fund/balance',
          description: 'Get current corpus fund balance and summary',
          response: {
            current_balance: 'number',
            total_collected: 'number',
            total_expenses: 'number',
            quarterly_summary: [
              {
                quarter: 'string',
                collected: 'number',
                expenses: 'number',
                net_amount: 'number'
              }
            ]
          }
        }
      ]
    }
  ];

  const CodeBlock: React.FC<{ code: string; language: string; endpoint?: string }> = ({ code, language, endpoint }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-gray-400 text-sm">{language}</span>
        <button
          onClick={() => copyToClipboard(code, endpoint || '')}
          className="text-gray-400 hover:text-white"
        >
          {copiedEndpoint === endpoint ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
        <p className="text-lg text-gray-600">RESTful API for Apartment ERP System</p>
      </div>

      {/* API Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">API Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Base URL</h3>
            <CodeBlock code="https://api.apartmenterp.com/v1" language="url" />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Authentication</h3>
            <CodeBlock code="Authorization: Bearer {access_token}" language="header" />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Standard Response Format</h3>
          <CodeBlock 
            code={`{
  "status": "success|error",
  "message": "Response message",
  "data": {...},
  "timestamp": "2025-01-10T10:30:00Z"
}`}
            language="json" 
          />
        </div>
      </div>

      {/* API Endpoints */}
      {apiSections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg border border-gray-200">
          <div 
            className="p-6 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                <p className="text-gray-600 mt-1">{section.description}</p>
              </div>
              {expandedSections.includes(section.id) ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </div>
          </div>

          {expandedSections.includes(section.id) && (
            <div className="p-6 space-y-8">
              {section.endpoints.map((endpoint, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-800">{endpoint.path}</code>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{endpoint.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Request */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Request</h4>
                      
                      {endpoint.queryParams && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Query Parameters</h5>
                          <CodeBlock 
                            code={JSON.stringify(endpoint.queryParams, null, 2)}
                            language="json"
                            endpoint={endpoint.path}
                          />
                        </div>
                      )}

                      {endpoint.body && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Request Body</h5>
                          <CodeBlock 
                            code={JSON.stringify(endpoint.body, null, 2)}
                            language="json"
                            endpoint={endpoint.path}
                          />
                        </div>
                      )}
                    </div>

                    {/* Response */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Response</h4>
                      <CodeBlock 
                        code={JSON.stringify({
                          status: 'success',
                          data: endpoint.response
                        }, null, 2)}
                        language="json"
                        endpoint={endpoint.path}
                      />
                    </div>
                  </div>

                  {/* cURL Example */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">cURL Example</h4>
                    <CodeBlock 
                      code={`curl -X ${endpoint.method} \\
  "https://api.apartmenterp.com/v1${endpoint.path}" \\
  -H "Authorization: Bearer {access_token}" \\
  -H "Content-Type: application/json"${endpoint.body ? ` \\
  -d '${JSON.stringify(endpoint.body)}'` : ''}`}
                      language="bash"
                      endpoint={`curl-${endpoint.path}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Error Codes */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Error Codes</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { code: 400, message: 'Bad Request', description: 'Invalid request parameters' },
                { code: 401, message: 'Unauthorized', description: 'Authentication required' },
                { code: 403, message: 'Forbidden', description: 'Insufficient permissions' },
                { code: 404, message: 'Not Found', description: 'Resource not found' },
                { code: 422, message: 'Validation Error', description: 'Request data validation failed' },
                { code: 429, message: 'Rate Limited', description: 'Too many requests' },
                { code: 500, message: 'Internal Error', description: 'Server error occurred' }
              ].map((error) => (
                <tr key={error.code}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{error.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{error.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{error.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
