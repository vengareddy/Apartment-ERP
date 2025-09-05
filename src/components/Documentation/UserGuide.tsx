import React, { useState } from 'react';
import { 
  CreditCard, 
  Receipt, 
  Bell, 
  User, 
  Home, 
  Download,
  Smartphone,
  QrCode,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react';

const UserGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Home },
    { id: 'payments', title: 'Making Payments', icon: CreditCard },
    { id: 'bills', title: 'Viewing Bills', icon: Receipt },
    { id: 'notifications', title: 'Notifications', icon: Bell },
    { id: 'profile', title: 'Profile Settings', icon: User },
    { id: 'support', title: 'Help & Support', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ApartmentERP</h2>
              <p className="text-gray-600 mb-6">
                Your personal portal for managing apartment finances, payments, and staying updated with society activities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-blue-900">Dashboard Overview</h3>
                </div>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• View your current dues and payment status</li>
                  <li>• Check recent transactions and payment history</li>
                  <li>• See important notifications and announcements</li>
                  <li>• Access quick payment options</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">Quick Actions</h3>
                </div>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Pay maintenance and utility bills instantly</li>
                  <li>• Download payment receipts and invoices</li>
                  <li>• Set up payment reminders</li>
                  <li>• Update your contact information</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">
                  Important: Keep your contact details updated to receive payment reminders and society announcements.
                </span>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Making Payments</h2>
              <p className="text-gray-600 mb-6">
                Learn how to pay your bills quickly and securely using various payment methods.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                  UPI Payment (Recommended)
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                    <div>
                      <p className="font-medium text-gray-900">Select Your Bill</p>
                      <p className="text-sm text-gray-600">Go to Payments section and choose the bill you want to pay</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                    <div>
                      <p className="font-medium text-gray-900">Choose UPI Payment</p>
                      <p className="text-sm text-gray-600">Enter your UPI ID (e.g., yourname@paytm) or scan QR code</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                    <div>
                      <p className="font-medium text-gray-900">Complete Payment</p>
                      <p className="text-sm text-gray-600">Confirm the amount and complete payment in your UPI app</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">✓</div>
                    <div>
                      <p className="font-medium text-gray-900">Payment Confirmed</p>
                      <p className="text-sm text-gray-600">You'll receive a confirmation and can download the receipt</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <QrCode className="w-5 h-5 mr-2 text-green-600" />
                  QR Code Payment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Perfect for quick payments using any UPI app:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Click "Pay with QR Code"</li>
                      <li>• Scan the generated QR code</li>
                      <li>• Confirm payment in your UPI app</li>
                      <li>• Payment is automatically verified</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Sample QR Code</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    Pro Tip: Save your UPI ID in the app for faster future payments!
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bills':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Viewing Your Bills</h2>
              <p className="text-gray-600 mb-6">
                Access and manage all your apartment-related bills in one place.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Types of Bills</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Maintenance Bills</h4>
                    <p className="text-sm text-blue-700">Monthly charges for common area maintenance, security, and amenities</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-medium text-cyan-900 mb-2">Water Bills</h4>
                    <p className="text-sm text-cyan-700">Based on your water meter readings and usage</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Utility Bills</h4>
                    <p className="text-sm text-orange-700">Electricity, gas, and other utility charges</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Your Bill</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Receipt className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Bill Details</p>
                      <p className="text-sm text-gray-600">Each bill shows the billing period, due date, and breakdown of charges</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Due Dates</p>
                      <p className="text-sm text-gray-600">Pay attention to due dates to avoid late fees</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Download className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Download Options</p>
                      <p className="text-sm text-gray-600">Download bills and payment receipts for your records</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications & Alerts</h2>
              <p className="text-gray-600 mb-6">
                Stay updated with payment reminders, society announcements, and important alerts.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Types of Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <p className="font-medium text-yellow-900">Payment Reminders</p>
                      <p className="text-sm text-yellow-700">Automatic reminders before due dates to help you avoid late fees</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-green-900">Payment Confirmations</p>
                      <p className="text-sm text-green-700">Instant confirmation when your payments are successfully processed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Society Announcements</p>
                      <p className="text-sm text-blue-700">Important updates about meetings, maintenance work, and events</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <p className="text-sm text-gray-600 mb-4">You can receive notifications through:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Email notifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">SMS alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">Push notifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">WhatsApp messages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h2>
              <p className="text-gray-600 mb-6">
                Manage your personal information and account preferences.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Contact Details</p>
                    <p className="text-sm text-gray-600">Keep your phone number and email updated to receive important notifications</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Flat Information</p>
                    <p className="text-sm text-gray-600">Your flat number and ownership details (contact admin for changes)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Emergency Contact</p>
                    <p className="text-sm text-gray-600">Add an emergency contact for important communications</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Change Password</p>
                    <p className="text-sm text-gray-600">Update your password regularly for better security</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Login History</p>
                    <p className="text-sm text-gray-600">Monitor your account access and login activities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Help & Support</h2>
              <p className="text-gray-600 mb-6">
                Get help with common issues and contact support when needed.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900 mb-2">How do I pay my bills?</p>
                    <p className="text-sm text-gray-600">Go to the Payments section, select your bill, and choose your preferred payment method (UPI, QR code, etc.)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">When are bills generated?</p>
                    <p className="text-sm text-gray-600">Bills are typically generated on the 1st of each month and are due by the end of the month</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">How can I download receipts?</p>
                    <p className="text-sm text-gray-600">After successful payment, you can download receipts from the Payments section or your transaction history</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">What if my payment fails?</p>
                    <p className="text-sm text-gray-600">Failed payments can be retried immediately. If issues persist, contact support or try a different payment method</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Phone Support</p>
                        <p className="text-sm text-gray-600">+91 98765 43210</p>
                        <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-gray-600">support@apartmenterp.com</p>
                        <p className="text-xs text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Quick Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Keep your app updated</li>
                      <li>• Check your internet connection</li>
                      <li>• Clear browser cache if needed</li>
                      <li>• Have your flat number ready when contacting support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Guide</h1>
        <p className="text-lg text-gray-600">Learn how to use ApartmentERP effectively</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap px-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.title}</span>
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

export default UserGuide;