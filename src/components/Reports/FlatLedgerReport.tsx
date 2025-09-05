import React, { useState } from 'react';
import { Search, Home, User } from 'lucide-react';

interface FlatLedgerReportProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

const FlatLedgerReport: React.FC<FlatLedgerReportProps> = ({ dateRange }) => {
  const [selectedFlat, setSelectedFlat] = useState('A-101');

  const flats = ['A-101', 'A-102', 'A-103', 'B-201', 'B-202', 'B-203', 'C-301', 'C-302'];

  const ledgerData = {
    'A-101': {
      residentName: 'John Smith',
      openingBalance: 0,
      transactions: [
        { date: '2025-01-01', description: 'Opening Balance', debit: 0, credit: 0, balance: 0 },
        { date: '2025-01-01', description: 'January Maintenance Bill', debit: 5400, credit: 0, balance: 5400 },
        { date: '2025-01-01', description: 'January Water Bill', debit: 1200, credit: 0, balance: 6600 },
        { date: '2025-01-10', description: 'Payment - Maintenance', debit: 0, credit: 5400, balance: 1200 },
        { date: '2025-01-15', description: 'Payment - Water Bill', debit: 0, credit: 1200, balance: 0 },
        { date: '2025-01-20', description: 'Late Fee', debit: 100, credit: 0, balance: 100 },
        { date: '2025-01-25', description: 'Payment - Late Fee', debit: 0, credit: 100, balance: 0 },
      ]
    }
  };

  const currentLedger = ledgerData[selectedFlat as keyof typeof ledgerData] || {
    residentName: 'Unknown Resident',
    openingBalance: 0,
    transactions: []
  };

  const totalDebits = currentLedger.transactions.reduce((sum, t) => sum + t.debit, 0);
  const totalCredits = currentLedger.transactions.reduce((sum, t) => sum + t.credit, 0);
  const closingBalance = currentLedger.transactions.length > 0 
    ? currentLedger.transactions[currentLedger.transactions.length - 1].balance 
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Flat-wise Ledger Report</h2>
        <div className="text-sm text-gray-500">
          Period: {dateRange.startDate} to {dateRange.endDate}
        </div>
      </div>

      {/* Flat Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">Select Flat:</label>
          </div>
          <select
            value={selectedFlat}
            onChange={(e) => setSelectedFlat(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {flats.map(flat => (
              <option key={flat} value={flat}>{flat}</option>
            ))}
          </select>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{currentLedger.residentName}</span>
          </div>
        </div>
      </div>

      {/* Ledger Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">Opening Balance</p>
            <p className="text-2xl font-bold text-blue-900">₹{currentLedger.openingBalance.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-center">
            <p className="text-sm font-medium text-red-600">Total Debits</p>
            <p className="text-2xl font-bold text-red-900">₹{totalDebits.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-center">
            <p className="text-sm font-medium text-green-600">Total Credits</p>
            <p className="text-2xl font-bold text-green-900">₹{totalCredits.toLocaleString()}</p>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${closingBalance > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
          <div className="text-center">
            <p className={`text-sm font-medium ${closingBalance > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
              Closing Balance
            </p>
            <p className={`text-2xl font-bold ${closingBalance > 0 ? 'text-yellow-900' : 'text-green-900'}`}>
              ₹{Math.abs(closingBalance).toLocaleString()}
            </p>
            <p className={`text-xs ${closingBalance > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
              {closingBalance > 0 ? 'Outstanding' : 'Advance'}
            </p>
          </div>
        </div>
      </div>

      {/* Ledger Transactions */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLedger.transactions.map((transaction, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {transaction.debit > 0 ? (
                      <span className="text-red-600 font-medium">₹{transaction.debit.toLocaleString()}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {transaction.credit > 0 ? (
                      <span className="text-green-600 font-medium">₹{transaction.credit.toLocaleString()}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    <span className={transaction.balance > 0 ? 'text-red-600' : transaction.balance < 0 ? 'text-green-600' : 'text-gray-900'}>
                      ₹{Math.abs(transaction.balance).toLocaleString()}
                      {transaction.balance > 0 && ' Dr'}
                      {transaction.balance < 0 && ' Cr'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100">
              <tr>
                <td colSpan={2} className="px-6 py-4 text-sm font-bold text-gray-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 text-sm font-bold text-red-600 text-right">
                  ₹{totalDebits.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-green-600 text-right">
                  ₹{totalCredits.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right">
                  <span className={closingBalance > 0 ? 'text-red-600' : closingBalance < 0 ? 'text-green-600' : 'text-gray-900'}>
                    ₹{Math.abs(closingBalance).toLocaleString()}
                    {closingBalance > 0 && ' Dr'}
                    {closingBalance < 0 && ' Cr'}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Account Summary for {selectedFlat}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Resident:</span>
            <span className="ml-2 font-medium text-gray-900">{currentLedger.residentName}</span>
          </div>
          <div>
            <span className="text-gray-600">Last Transaction:</span>
            <span className="ml-2 font-medium text-gray-900">
              {currentLedger.transactions.length > 1 ? 
                currentLedger.transactions[currentLedger.transactions.length - 1].date : 
                'No transactions'
              }
            </span>
          </div>
          <div>
            <span className="text-gray-600">Account Status:</span>
            <span className={`ml-2 font-medium ${closingBalance === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
              {closingBalance === 0 ? 'Clear' : 'Outstanding'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatLedgerReport;