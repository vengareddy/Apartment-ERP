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

// Production configuration
export const PRODUCTION_CONFIG = {
  SOCIETY_NAME: 'Your Society Name',
  SOCIETY_ADDRESS: 'Your Society Address',
  CONTACT_PHONE: '+91 XXXXX XXXXX',
  CONTACT_EMAIL: 'admin@yoursociety.com',
  UPI_ID: 'yourupiid@bank',
  WHATSAPP_NUMBER: '+91 XXXXX XXXXX',
  TOTAL_FLATS: 84,
  TOTAL_BUILDINGS: 3
};

// Sample flat structure for production setup
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
          bhkType: '2BHK', // Default, can be customized
          carpetArea: 800,
          maintenanceRate: 5400,
          status: 'vacant' // Will be updated when residents are added
        });
      }
    }
  }
  
  return flats;
};