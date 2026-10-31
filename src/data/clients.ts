export interface ClientAccount {
  id: string;
  businessName: string;
  gstin: string;
  tradeType: string;
  complianceScore: number;
  ragStatus: 'ok' | 'warn' | 'risk';
  nextDue: string;
  daysRemaining: number;
  status: 'Ready to file' | 'Action required' | 'Filed' | 'Pending invoices';
  assignedManager: string;
  estimatedTax: number;
  itcMismatch: number;
}

export const CA_CLIENTS: ClientAccount[] = [
  { id: 'c-1', businessName: 'Malabar Spice Traders', gstin: '32ABCDE1234F1Z5', tradeType: 'Spice Wholesaler', complianceScore: 92, ragStatus: 'warn', nextDue: '20 Nov 2026', daysRemaining: 20, status: 'Ready to file', assignedManager: 'CA Rajesh V.', estimatedTax: 104800, itcMismatch: 22900 },
  { id: 'c-2', businessName: 'Cochin Seafoods International', gstin: '32AAACS9988K1Z3', tradeType: 'Marine Exports', complianceScore: 98, ragStatus: 'ok', nextDue: '20 Nov 2026', daysRemaining: 20, status: 'Filed', assignedManager: 'CA Meera N.', estimatedTax: 345000, itcMismatch: 0 },
  { id: 'c-3', businessName: 'Wayanad Green Plantations', gstin: '32AAAWP1122Q1Z4', tradeType: 'Coffee & Pepper', complianceScore: 68, ragStatus: 'risk', nextDue: '04 Nov 2026', daysRemaining: 4, status: 'Action required', assignedManager: 'CA Rajesh V.', estimatedTax: 78000, itcMismatch: 45000 },
  { id: 'c-4', businessName: 'Calicut Timber & Wood Works', gstin: '32AABCT3344R1Z5', tradeType: 'Lumber & Timber', complianceScore: 84, ragStatus: 'warn', nextDue: '05 Nov 2026', daysRemaining: 5, status: 'Pending invoices', assignedManager: 'CA Anjali S.', estimatedTax: 165000, itcMismatch: 12000 },
  { id: 'c-5', businessName: 'Travancore Brass Crafts', gstin: '32AAEFT5566T1Z6', tradeType: 'Handicrafts', complianceScore: 95, ragStatus: 'ok', nextDue: '20 Nov 2026', daysRemaining: 20, status: 'Ready to file', assignedManager: 'CA Rajesh V.', estimatedTax: 42000, itcMismatch: 0 },
  { id: 'c-6', businessName: 'Palakkad Grain Mills', gstin: '32AABPG7788U1Z7', tradeType: 'Agri Processing', complianceScore: 90, ragStatus: 'ok', nextDue: '20 Nov 2026', daysRemaining: 20, status: 'Ready to file', assignedManager: 'CA Meera N.', estimatedTax: 89000, itcMismatch: 3200 },
  { id: 'c-7', businessName: 'Alleppey Coir Heritage', gstin: '32AAACA9900V1Z8', tradeType: 'Coir Export', complianceScore: 74, ragStatus: 'warn', nextDue: '04 Nov 2026', daysRemaining: 4, status: 'Action required', assignedManager: 'CA Anjali S.', estimatedTax: 121000, itcMismatch: 31400 },
  { id: 'c-8', businessName: 'Kottayam Rubber Mart', gstin: '32AAEKR2233W1Z9', tradeType: 'Rubber Trading', complianceScore: 96, ragStatus: 'ok', nextDue: '20 Nov 2026', daysRemaining: 20, status: 'Filed', assignedManager: 'CA Rajesh V.', estimatedTax: 210000, itcMismatch: 0 },
  { id: 'c-9', businessName: 'Kannur Handloom Weavers', gstin: '32AAACH4455X1Z0', tradeType: 'Textiles', complianceScore: 88, ragStatus: 'ok', nextDue: '10 Nov 2026', daysRemaining: 10, status: 'Ready to file', assignedManager: 'CA Meera N.', estimatedTax: 56000, itcMismatch: 1500 },
  { id: 'c-10', businessName: 'Thrissur Gold Jewelcraft', gstin: '32AAATG6677Y1Z1', tradeType: 'Jewellery', complianceScore: 61, ragStatus: 'risk', nextDue: '04 Nov 2026', daysRemaining: 4, status: 'Action required', assignedManager: 'CA Rajesh V.', estimatedTax: 580000, itcMismatch: 112000 },
  { id: 'c-11', businessName: 'Kasaragod Cashew Processing', gstin: '32AAAKC8899Z1Z2', tradeType: 'Dry Fruits', complianceScore: 93, ragStatus: 'ok', nextDue: '20 Nov 2026', daysRemaining: 20, status: 'Filed', assignedManager: 'CA Anjali S.', estimatedTax: 134000, itcMismatch: 0 },
  { id: 'c-12', businessName: 'Munnar Tea Leaf Traders', gstin: '32AAATM0011B1Z3', tradeType: 'Beverages', complianceScore: 82, ragStatus: 'warn', nextDue: '08 Nov 2026', daysRemaining: 8, status: 'Pending invoices', assignedManager: 'CA Meera N.', estimatedTax: 175000, itcMismatch: 18900 },
];

