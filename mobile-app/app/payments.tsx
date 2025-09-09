import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function PaymentsScreen() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [upiId, setUpiId] = useState('');

  const pendingBills = [
    { id: '1', type: 'Maintenance', amount: 5400, dueDate: '2025-01-31', description: 'January 2025 Maintenance' },
    { id: '2', type: 'Water Bill', amount: 1200, dueDate: '2025-01-31', description: 'December 2024 Water Usage' },
  ];

  const paymentHistory = [
    { id: '1', description: 'December Maintenance', amount: 5400, date: '2024-12-10', status: 'Paid', method: 'UPI' },
    { id: '2', description: 'November Water Bill', amount: 980, date: '2024-12-08', status: 'Paid', method: 'Net Banking' },
    { id: '3', description: 'November Maintenance', amount: 5400, date: '2024-11-10', status: 'Paid', method: 'UPI' },
  ];

  const handlePayNow = (bill: any) => {
    setSelectedBill(bill);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    if (!upiId) {
      Alert.alert('Error', 'Please enter your UPI ID');
      return;
    }

    // Simulate payment processing
    Alert.alert(
      'Payment Successful!',
      `Your payment of ₹${selectedBill.amount.toLocaleString()} has been processed successfully.\n\nTransaction ID: TXN${Date.now()}\n\nA confirmation will be sent via WhatsApp.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowPaymentModal(false);
            setSelectedBill(null);
            setUpiId('');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payments</Text>
          <Text style={styles.headerSubtitle}>Manage your bills and payments</Text>
        </View>

        {/* Pending Bills */}
        {pendingBills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Bills</Text>
            {pendingBills.map((bill) => (
              <View key={bill.id} style={styles.billCard}>
                <View style={styles.billInfo}>
                  <Text style={styles.billType}>{bill.type}</Text>
                  <Text style={styles.billDescription}>{bill.description}</Text>
                  <Text style={styles.billDueDate}>Due: {bill.dueDate}</Text>
                </View>
                <View style={styles.billActions}>
                  <Text style={styles.billAmount}>₹{bill.amount.toLocaleString()}</Text>
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayNow(bill)}
                  >
                    <Text style={styles.payButtonText}>Pay Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* No Pending Bills */}
        {pendingBills.length === 0 && (
          <View style={styles.noBillsCard}>
            <Text style={styles.noBillsIcon}>✅</Text>
            <Text style={styles.noBillsTitle}>All Caught Up!</Text>
            <Text style={styles.noBillsText}>You have no pending bills at the moment.</Text>
          </View>
        )}

        {/* Payment History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <View style={styles.historyContainer}>
            {paymentHistory.map((payment) => (
              <View key={payment.id} style={styles.historyCard}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDescription}>{payment.description}</Text>
                  <Text style={styles.historyDate}>{payment.date} • {payment.method}</Text>
                </View>
                <View style={styles.historyAmount}>
                  <Text style={styles.historyAmountText}>₹{payment.amount.toLocaleString()}</Text>
                  <View style={styles.historyStatusBadge}>
                    <Text style={styles.historyStatusText}>{payment.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pay Bill</Text>
            
            {selectedBill && (
              <View style={styles.billSummary}>
                <Text style={styles.billSummaryTitle}>{selectedBill.type}</Text>
                <Text style={styles.billSummaryAmount}>₹{selectedBill.amount.toLocaleString()}</Text>
                <Text style={styles.billSummaryDue}>Due: {selectedBill.dueDate}</Text>
              </View>
            )}

            <View style={styles.paymentForm}>
              <Text style={styles.inputLabel}>UPI ID</Text>
              <TextInput
                style={styles.upiInput}
                value={upiId}
                onChangeText={setUpiId}
                placeholder="your-upi-id@bank"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowPaymentModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmPayButton}
                onPress={processPayment}
              >
                <Text style={styles.confirmPayButtonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  billCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  billInfo: {
    flex: 1,
  },
  billType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  billDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  billDueDate: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  billActions: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  noBillsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  noBillsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noBillsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  noBillsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  historyContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyInfo: {
    flex: 1,
  },
  historyDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyAmount: {
    alignItems: 'flex-end',
  },
  historyAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  historyStatusBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  historyStatusText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  billSummary: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  billSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  billSummaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  billSummaryDue: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentForm: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  upiInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmPayButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  confirmPayButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});