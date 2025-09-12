# Society ERP Production Configuration Guide

## 1. Society Configuration

### Location: `src/data/productionData.ts`

Update the society details in the `PRODUCTION_CONFIG` object:

```typescript
export const PRODUCTION_CONFIG = {
  SOCIETY_NAME: 'Your Society Name Here',
  SOCIETY_ADDRESS: 'Complete Society Address with Pin Code',
  CONTACT_PHONE: '+91 XXXXX XXXXX',
  CONTACT_EMAIL: 'admin@yoursociety.com',
  UPI_ID: 'yourupiid@bank',
  WHATSAPP_NUMBER: '+91 XXXXX XXXXX',
  TOTAL_FLATS: 84,
  TOTAL_BUILDINGS: 3
};
```

### Also Update: `src/components/Settings/GeneralSettings.tsx`
- Society name, address, phone, email
- Registration number
- Total flats and buildings
- UPI ID for payments
- WhatsApp business number

## 2. Clear Test Data

### Remove Demo Users
**File:** `src/components/Auth/Login.tsx`
- Remove the `demoUsers` array
- Remove the demo accounts section from the UI
- Implement real authentication

### Remove Sample Data
**Files to clean:**
- `src/components/Billing/BillsList.tsx` - Remove sample bills
- `src/components/Payments/PaymentsList.tsx` - Remove sample payments
- `src/components/Expenses/ExpensesList.tsx` - Remove sample expenses
- `src/components/UserManagement/UsersList.tsx` - Remove sample users

## 3. User Management

### Initial Admin Setup
**File:** `src/components/Auth/Login.tsx`

Create your first admin user:
```typescript
// Replace demo users with your admin account
const adminUser = {
  id: '1',
  name: 'Your Name',
  email: 'admin@yoursociety.com',
  role: 'admin',
  password: 'your-secure-password'
};
```

### Add Real Users
**File:** `src/components/UserManagement/AddUserModal.tsx`
- Use this form to add real residents
- Include actual flat numbers
- Add owner/tenant information
- Set up proper WhatsApp numbers for notifications

## 4. Payment Integration

### UPI Configuration
**File:** `src/components/Settings/GeneralSettings.tsx`

Update UPI settings:
```typescript
upiId: 'yoursociety@paytm', // Your actual UPI ID
whatsappBusinessNumber: '+91 XXXXX XXXXX' // Your WhatsApp Business number
```

### Payment Gateway Setup
**File:** `src/components/Payments/UPIIntegration.tsx`
- Configure Razorpay/PayU integration
- Update payment success/failure handling
- Set up webhook endpoints

## 5. Database Setup

### Supabase Configuration
1. Click "Connect to Supabase" button in the top right
2. Create your Supabase project
3. The system will automatically create required tables:
   - users
   - flats
   - bills
   - payments
   - expenses
   - vendors
   - audit_logs

### Data Migration
**File:** `src/data/productionData.ts`

Use the `generateFlatStructure` function to create your flat layout:
```typescript
// Example: 3 buildings, 4 flats per floor, 7 floors each
const flats = generateFlatStructure(3, 4, 7);
```

## 6. Security Configuration

### Password Policies
**File:** `src/components/Settings/SecuritySettings.tsx`
- Set minimum password length
- Enable two-factor authentication
- Configure session timeouts
- Set up audit logging

### Role-Based Access
**File:** `src/components/UserManagement/UserRoleModal.tsx`
- Review and customize user roles
- Set appropriate permissions
- Configure access controls

## 7. Notification Services

### Email Setup
**File:** `src/components/Settings/NotificationSettings.tsx`

Configure SMTP settings:
```typescript
smtpHost: 'smtp.gmail.com',
smtpPort: 587,
smtpUsername: 'your-email@gmail.com',
smtpPassword: 'your-app-password',
fromName: 'Your Society Name',
fromEmail: 'noreply@yoursociety.com'
```

### SMS Configuration
Configure SMS provider (Twilio/MSG91):
```typescript
provider: 'twilio',
apiKey: 'your-api-key',
apiSecret: 'your-api-secret',
senderId: 'YOURSOC'
```

### WhatsApp Business API
```typescript
businessApiKey: 'your-whatsapp-business-api-key',
phoneNumberId: 'your-phone-number-id'
```

## 8. Mobile App Configuration

### Update App Details
**File:** `mobile-app/app.json`

```json
{
  "expo": {
    "name": "Your Society Name",
    "slug": "your-society-erp",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yoursociety.mobile"
    },
    "android": {
      "package": "com.yoursociety.mobile"
    }
  }
}
```

### API Endpoints
**File:** `mobile-app/app/login.tsx`

Update API endpoints to point to your production server:
```typescript
const API_BASE_URL = 'https://your-domain.com/api';
```

### Build Mobile App
```bash
cd mobile-app
npm install
expo build:android  # For Android APK
expo build:ios      # For iOS App Store
```

## 9. Billing Configuration

### Maintenance Rates
**File:** `src/components/Settings/BillingSettings.tsx`

Set your actual maintenance rates:
```typescript
const billingRates = [
  { flatType: '1 BHK', maintenanceRate: 4500, area: 600 },
  { flatType: '2 BHK', maintenanceRate: 5400, area: 800 },
  { flatType: '3 BHK', maintenanceRate: 6800, area: 1200 },
  // Add your actual rates
];
```

### Water Billing
```typescript
const waterRates = {
  ratePerUnit: 15,      // Your rate per unit
  minimumCharge: 200,   // Minimum monthly charge
  sewageCharge: 50      // Sewage treatment charge
};
```

## 10. Master Data Setup

### Vendors
**File:** `src/components/Settings/MasterDataSettings.tsx`

Add your actual vendors:
- Security agencies
- Cleaning services
- Gardening contractors
- Maintenance providers
- Utility companies

### Employees
Add your society staff:
- Security guards
- Housekeeping staff
- Gardeners
- Maintenance personnel

### Expense Categories
Customize categories based on your needs:
- Maintenance
- Utilities
- Security
- Gardening
- Cleaning
- Infrastructure

## 11. Final Steps

### 1. Test Everything
- Create test bills
- Process test payments
- Send test notifications
- Generate test reports

### 2. User Training
- Train admin and treasurer users
- Provide user guides to residents
- Set up support channels

### 3. Go Live
- Import resident data
- Generate first month's bills
- Send welcome notifications
- Monitor system performance

## 12. Ongoing Maintenance

### Regular Tasks
- Monitor payment collections
- Generate monthly reports
- Update user accounts
- Backup data regularly
- Review audit logs

### Monthly Checklist
- [ ] Generate bills for all flats
- [ ] Send payment reminders
- [ ] Process payments
- [ ] Generate financial reports
- [ ] Update vendor payments
- [ ] Review security logs

## Support Contacts

- **Technical Support:** Contact your system administrator
- **Payment Issues:** Contact treasurer
- **User Account Issues:** Contact admin
- **Mobile App Issues:** Check app store for updates

---

**Important:** Always backup your data before making configuration changes!