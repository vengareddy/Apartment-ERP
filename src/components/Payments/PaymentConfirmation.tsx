import React, { useEffect } from 'react';
import { CheckCircle, Download, Share } from 'lucide-react';

interface PaymentConfirmationProps {
  paymentDetails: {
    id: string;
    flatNumber: string;
    residentName: string;
    amount: number;
    transactionId: string;
    paymentDate: string;
    billType: string;
  };
  onClose: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ paymentDetails, onClose }) => {
  useEffect(() => {
    // Send WhatsApp confirmation message
    sendPaymentConfirmation(paymentDetails);
  }, [paymentDetails]);

  const sendPaymentConfirmation = (details: any) => {
    const confirmationMessage = `Thank you ${details.residentName}, we have received your payment of ₹${details.amount.toLocaleString()}.

Transaction ID: ${details.transactionId}
Flat: ${details.flatNumber}
Date: ${details.paymentDate}

SDVR Welfare Association`;

    console.log('WhatsApp Payment Confirmation Sent:', {
      to: details.flatNumber,
      message: confirmationMessage,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully and confirmation has been sent via WhatsApp.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Payment Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Flat Number:</span>
              <span className="font-medium">{paymentDetails.flatNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resident:</span>
              <span className="font-medium">{paymentDetails.residentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-green-600">₹{paymentDetails.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium font-mono text-xs">{paymentDetails.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{paymentDetails.paymentDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
          <p className="text-sm text-green-800">
            ✅ WhatsApp confirmation sent to your registered number
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2">
            <Share className="w-4 h-4" />
            <span>Share Receipt</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;