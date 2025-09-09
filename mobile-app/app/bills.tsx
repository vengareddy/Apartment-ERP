import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function BillsScreen() {
  const [activeTab, setActiveTab] = useState('current');

  const currentBills = [
    { id: '1', type: 'Maintenance', amount: 5400, dueDate: '2025-01-31', status: 'pending', period: 'January 2025' },
    { id: '2', type: 'Water Bill', amount: 1200, dueDate: '2025-01-31', status: 'pending', period: 'December 2024' },
  ];

  const paidBills = [
    { id: '3', type: 'Maintenance', amount: 5400, paidDate: '2024-12-10', status: 'paid', period: 'December 2024' },
    { id: '4', type: 'Water Bill', amount: 980, paidDate: '2024-12-08', status: 'paid', period: 'November 2024' },
    { id: '5', type: 'Maintenance', amount: 5400, paidDate: '2024-11-10', status: 'paid', period: 'November 2024' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'paid': return '#D1FAE5';
      case 'pending': return '#FEF3C7';
      case 'overdue': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bills</Text>
        <Text style={styles.headerSubtitle}>View and manage your bills</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
            Current Bills
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Payment History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'current' && (
          <View style={styles.billsList}>
            {currentBills.length > 0 ? (
              currentBills.map((bill) => (
                <View key={bill.id} style={styles.billCard}>
                  <View style={styles.billHeader}>
                    <Text style={styles.billType}>{bill.type}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(bill.status) }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(bill.status) }]}>
                        {bill.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.billPeriod}>{bill.period}</Text>
                  <View style={styles.billFooter}>
                    <View>
                      <Text style={styles.amountLabel}>Amount Due</Text>
                      <Text style={styles.amountValue}>₹{bill.amount.toLocaleString()}</Text>
                    </View>
                    <View>
                      <Text style={styles.dueDateLabel}>Due Date</Text>
                      <Text style={styles.dueDateValue}>{bill.dueDate}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.viewBillButton}>
                    <Text style={styles.viewBillButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📄</Text>
                <Text style={styles.emptyTitle}>No Current Bills</Text>
                <Text style={styles.emptyText}>All your bills are up to date!</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.billsList}>
            {paidBills.map((bill) => (
              <View key={bill.id} style={styles.billCard}>
                <View style={styles.billHeader}>
                  <Text style={styles.billType}>{bill.type}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(bill.status) }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(bill.status) }]}>
                      PAID
                    </Text>
                  </View>
                </View>
                <Text style={styles.billPeriod}>{bill.period}</Text>
                <View style={styles.billFooter}>
                  <View>
                    <Text style={styles.amountLabel}>Amount Paid</Text>
                    <Text style={styles.amountValue}>₹{bill.amount.toLocaleString()}</Text>
                  </View>
                  <View>
                    <Text style={styles.dueDateLabel}>Paid On</Text>
                    <Text style={styles.dueDateValue}>{bill.paidDate}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>Download Receipt</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 20,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  billsList: {
    paddingBottom: 20,
  },
  billCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  billType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  billPeriod: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  billFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  dueDateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'right',
  },
  dueDateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
  },
  viewBillButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewBillButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});