# Data Cleanup Guide for Production

## Files Containing Test Data to Clear

### 1. Authentication (CRITICAL - Clear First)
**File:** `src/components/Auth/Login.tsx`
- ✅ **DONE:** Removed demo user accounts
- ✅ **DONE:** Removed demo login buttons
- **TODO:** Set up real authentication system

### 2. Billing Test Data
**File:** `src/components/Billing/BillsList.tsx`
```typescript
// REMOVE this test data array:
const bills = [
  { id: '1', flatNumber: 'A-101', residentName: 'John Smith', ... },
  // ... all test bills
];

// REPLACE with:
const bills = []; // Will be populated from database
```

### 3. Payment Test Data
**File:** `src/components/Payments/PaymentsList.tsx`
```typescript
// REMOVE this test data array:
const payments = [
  { id: '1', flatNumber: 'A-101', residentName: 'John Smith', ... },
  // ... all test payments
];

// REPLACE with:
const payments = []; // Will be populated from database
```

### 4. Expense Test Data
**File:** `src/components/Expenses/ExpensesList.tsx`
```typescript
// REMOVE this test data array:
const expenses = [
  { id: '1', vendor: 'Green Gardens Services', ... },
  // ... all test expenses
];

// REPLACE with:
const expenses = []; // Will be populated from database
```

### 5. User Management Test Data
**File:** `src/components/UserManagement/UsersList.tsx`
```typescript
// REMOVE this test data array:
const users = [
  { id: '1', name: 'John Admin', email: 'admin@apartment.com', ... },
  // ... all test users
];

// REPLACE with:
const users = []; // Will be populated from database
```

### 6. Dashboard Test Data
**File:** `src/components/Dashboard/RecentTransactions.tsx`
```typescript
// REMOVE test transactions:
const adminTransactions = [
  { id: '1', type: 'income', description: 'Maintenance - A-101', ... },
  // ... all test transactions
];

// REPLACE with:
const adminTransactions = []; // Will be populated from database
```

### 7. Reports Test Data
**Files to clean:**
- `src/components/Reports/CollectionReport.tsx`
- `src/components/Reports/FlatLedgerReport.tsx`
- `src/components/Reports/IncomeExpenseReport.tsx`
- `src/components/Reports/ExpenseCategoryReport.tsx`
- `src/components/Reports/OwnerTenantReport.tsx`

### 8. Cultural Committee Test Data
**File:** `src/components/CulturalCommittee/CulturalCommittee.tsx`
```typescript
// REMOVE the test activities array and replace with empty array
const [activities] = useState([]);
```

### 9. Corpus Fund Test Data
**Files to clean:**
- `src/components/CorpusFund/CorpusFundOverview.tsx`
- `src/components/CorpusFund/CorpusTransactionsList.tsx`

## Database Integration Steps

### 1. Connect to Supabase
1. Click "Connect to Supabase" button in the application
2. Create your Supabase project
3. Note down your project URL and API keys

### 2. Create Database Tables
The system will automatically create these tables:
- `users` - User accounts and authentication
- `flats` - Flat information and ownership
- `bills` - Generated bills
- `payments` - Payment transactions
- `expenses` - Society expenses
- `vendors` - Vendor information
- `audit_logs` - System audit trail

### 3. Import Production Data
Use the admin interface to:
- Add real flat information
- Import resident contact details
- Set up vendor accounts
- Configure employee records

## Configuration Priority Order

### Phase 1: Critical Setup (Do First)
1. **Society Information** - Update basic details
2. **Admin User** - Create first admin account
3. **Database Connection** - Set up Supabase
4. **Payment Integration** - Configure UPI and payment gateway

### Phase 2: Core Features
1. **Billing Rates** - Set maintenance and utility rates
2. **Master Data** - Add vendors, employees, categories
3. **User Accounts** - Add resident accounts
4. **Flat Assignment** - Assign flats to residents

### Phase 3: Advanced Features
1. **Notifications** - Set up email, SMS, WhatsApp
2. **Security** - Configure security policies
3. **Mobile App** - Build and distribute mobile app
4. **Reports** - Test all reporting features

### Phase 4: Go Live
1. **Final Testing** - Test all features end-to-end
2. **User Training** - Train admin and treasurer users
3. **Resident Onboarding** - Send welcome messages
4. **Monitor** - Monitor system performance

## Quick Start Commands

### Clear Test Data (Manual Steps)
1. Open each file listed above
2. Replace test data arrays with empty arrays
3. Update configuration values
4. Test with real data

### Build Mobile App
```bash
cd mobile-app
npm install
expo start  # For development
expo build:android  # For production Android
expo build:ios      # For production iOS
```

### Deploy Web Application
The web application is already deployed at your Bolt Hosting URL.

## Important Security Notes

1. **Change Default Passwords** - Never use default or demo passwords
2. **Secure API Keys** - Store API keys securely, never in code
3. **Enable HTTPS** - Ensure all communications are encrypted
4. **Regular Backups** - Set up automated database backups
5. **Audit Logs** - Monitor all financial transactions
6. **Access Control** - Regularly review user permissions

## Support and Maintenance

### Daily Tasks
- Monitor payment collections
- Check system alerts
- Review audit logs

### Weekly Tasks
- Generate collection reports
- Update vendor payments
- Review user accounts

### Monthly Tasks
- Generate financial reports
- Backup database
- Review security logs
- Update system if needed

---

**Remember:** This is a financial management system handling real money transactions. Always prioritize security and accuracy over convenience.