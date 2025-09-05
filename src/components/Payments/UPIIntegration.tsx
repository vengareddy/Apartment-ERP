import React, { useState } from 'react';
import { X, CreditCard, QrCode, Smartphone, CheckCircle } from 'lucide-react';
import PaymentConfirmation from './PaymentConfirmation';

interface UPIIntegrationProps {
  onClose: () => void;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    flatNumber?: string;
  } | null;
}

const UPIIntegration: React.FC<UPIIntegrationProps> = ({ onClose, currentUser }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [billId, setBillId] = useState('');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [paymentStep, setPaymentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentStep(2);
    setTimeout(() => {
      setPaymentStep(3);
      
      // Create payment details for confirmation
      const details = {
        id: Date.now().toString(),
        flatNumber: currentUser?.flatNumber || 'A-101',
        residentName: currentUser?.name || 'John Smith',
        amount: parseInt(amount),
        transactionId: `TXN${Date.now()}`,
        paymentDate: new Date().toLocaleDateString(),
        billType: selectedBill?.type || 'maintenance'
      };
      
      setPaymentDetails(details);
      
      setTimeout(() => {
        setShowConfirmation(true);
      }, 1000);
    }, 2000);
  };

  const availableBills = [
    { id: 'BILL001', flatNumber: currentUser?.flatNumber || 'A-101', type: 'Maintenance', amount: 5400, dueDate: '2025-01-31' },
    { id: 'BILL002', flatNumber: currentUser?.flatNumber || 'A-101', type: 'Water Bill', amount: 1200, dueDate: '2025-01-31' },
    { id: 'BILL003', flatNumber: currentUser?.flatNumber || 'A-101', type: 'Electricity', amount: 2800, dueDate: '2025-01-31' },
  ];

  const selectedBill = availableBills.find(bill => bill.id === billId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentUser?.role === 'resident' ? `Pay Bills - ${currentUser.flatNumber}` : 'Record Payment'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {paymentStep === 1 && (
            <div className="space-y-6">
              {/* Bill Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bill
                </label>
                <select
                  value={billId}
                  onChange={(e) => {
                    setBillId(e.target.value);
                    const bill = availableBills.find(b => b.id === e.target.value);
                    if (bill) setAmount(bill.amount.toString());
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a bill to pay</option>
                  {availableBills.map(bill => (
                    <option key={bill.id} value={bill.id}>
                      {bill.flatNumber} - {bill.type} - ₹{bill.amount}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bill Details */}
              {selectedBill && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Bill Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Flat:</span>
                      <span className="text-blue-900 font-medium">{selectedBill.flatNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Type:</span>
                      <span className="text-blue-900 font-medium">{selectedBill.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Due Date:</span>
                      <span className="text-blue-900 font-medium">{selectedBill.dueDate}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-2 mt-2">
                      <span className="text-blue-700">Amount:</span>
                      <span className="text-blue-900 font-bold">₹{selectedBill.amount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 ${
                      paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium">UPI</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 ${
                      paymentMethod === 'qr' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium">QR Code</span>
                  </button>
                </div>
              </div>

              {/* UPI ID Input */}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="your-upi-id@paytm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* QR Code Display */}
              {paymentMethod === 'qr' && (
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">QR Code for Payment</p>
                      <p className="text-xs text-gray-500 mt-1">₹{amount}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Scan this QR code using any UPI app to make the payment
                  </p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!billId || (paymentMethod === 'upi' && !upiId)}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {paymentMethod === 'qr' ? 'Generate QR Code' : `Pay ₹${amount}`}
              </button>
            </div>
          )}

          {paymentStep === 2 && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment...</p>
            </div>
          )}

          {paymentStep === 3 && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your payment of ₹{amount} has been processed successfully.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-green-800 mb-2">
                  Transaction ID: <span className="font-mono">{paymentDetails?.transactionId}</span>
                </p>
                <p className="text-sm text-green-800">
                  ✅ WhatsApp confirmation will be sent shortly
                </p>
              </div>
              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Receipt
              </button>
            </div>
          )}
        </div>
        
        {showConfirmation && paymentDetails && (
          <PaymentConfirmation 
            paymentDetails={paymentDetails}
            onClose={() => {
              setShowConfirmation(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UPIIntegration;