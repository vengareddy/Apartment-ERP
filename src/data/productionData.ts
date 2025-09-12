// Production data structure - replace demo data with real data management
export const getEmptyDataStructure = () => ({
  users: [],
  flats: [],
  bills: [],
  payments: [],
  expenses: [],
  vendors: [],
  culturalActivities: [],
  corpusFundTransactions: []
});

// Production configuration - UPDATE THESE VALUES FOR YOUR SOCIETY
export const PRODUCTION_CONFIG = {
  // REQUIRED: Update with your society details
  SOCIETY_NAME: 'Your Society Name',
  SOCIETY_ADDRESS: 'Your Complete Society Address with Pin Code',
  CONTACT_PHONE: '+91 XXXXX XXXXX',
  CONTACT_EMAIL: 'admin@yoursociety.com',
  
  // REQUIRED: Payment configuration
  UPI_ID: 'yourupiid@bank',
  WHATSAPP_NUMBER: '+91 XXXXX XXXXX',
  
  // REQUIRED: Property details
  TOTAL_FLATS: 84,
  TOTAL_BUILDINGS: 3,
  
  // Optional: Additional details
  REGISTRATION_NUMBER: 'REG/2020/YOUR/001',
  ESTABLISHED_YEAR: 2020,
  WEBSITE: 'www.yoursociety.com'
};

// Flat structure generator for production setup
export const generateFlatStructure = (buildings: number, flatsPerFloor: number, floorsPerBuilding: number) => {
  const flats = [];
  const buildingNames = ['A', 'B', 'C', 'D', 'E'];
  
  for (let building = 0; building < buildings; building++) {
    for (let floor = 1; floor <= floorsPerBuilding; floor++) {
      for (let flat = 1; flat <= flatsPerFloor; flat++) {
        const flatNumber = `${buildingNames[building]}-${floor}${flat.toString().padStart(2, '0')}`;
        flats.push({
          id: `flat_${building}_${floor}_${flat}`,
          flatNumber,
          building: buildingNames[building],
          floor,
          bhkType: '2BHK', // Default, customize as needed
          carpetArea: 800,
          maintenanceRate: 5400,
          status: 'vacant', // Will be updated when residents are added
          ownerName: '',
          ownerPhone: '',
          ownerEmail: '',
          tenantName: null,
          tenantPhone: null,
          tenantEmail: null,
          occupancyType: 'owner-occupied' // or 'rented'
        });
      }
    }
  }
  
  return flats;
};

// Production maintenance rates - UPDATE THESE VALUES
export const MAINTENANCE_RATES = {
  '1BHK': 4500,
  '2BHK': 5400,
  '3BHK': 6800,
  '4BHK': 8200
};

// Water billing rates - UPDATE THESE VALUES
export const WATER_RATES = {
  ratePerUnit: 15,
  minimumCharge: 200,
  sewageCharge: 50
};

// Production vendors - ADD YOUR ACTUAL VENDORS
export const PRODUCTION_VENDORS = [
  {
    name: 'Your Security Agency',
    contactPerson: 'Contact Person Name',
    phone: '+91 XXXXX XXXXX',
    email: 'contact@securityagency.com',
    serviceType: 'Security',
    gstin: 'GSTIN_NUMBER'
  },
  {
    name: 'Your Cleaning Service',
    contactPerson: 'Contact Person Name',
    phone: '+91 XXXXX XXXXX',
    email: 'contact@cleaningservice.com',
    serviceType: 'Cleaning',
    gstin: 'GSTIN_NUMBER'
  }
  // Add more vendors as needed
];

// Production employees - ADD YOUR ACTUAL STAFF
export const PRODUCTION_EMPLOYEES = [
  {
    name: 'Security Guard Name',
    designation: 'Security Guard',
    phone: '+91 XXXXX XXXXX',
    salary: 25000,
    joinDate: '2024-01-01'
  },
  {
    name: 'Housekeeping Staff Name',
    designation: 'Housekeeping',
    phone: '+91 XXXXX XXXXX',
    salary: 18000,
    joinDate: '2024-01-01'
  }
  // Add more employees as needed
];

// Expense categories for production
export const EXPENSE_CATEGORIES = [
  { name: 'Maintenance', description: 'General maintenance and repairs', color: 'blue' },
  { name: 'Utilities', description: 'Electricity, water, gas bills', color: 'purple' },
  { name: 'Security', description: 'Security services and equipment', color: 'red' },
  { name: 'Gardening', description: 'Garden maintenance and landscaping', color: 'green' },
  { name: 'Cleaning', description: 'Cleaning services and supplies', color: 'cyan' },
  { name: 'Infrastructure', description: 'Major infrastructure improvements', color: 'indigo' },
  { name: 'Safety & Security', description: 'Fire safety, emergency equipment', color: 'orange' },
  { name: 'Amenities', description: 'Swimming pool, gym, community hall', color: 'pink' }
];