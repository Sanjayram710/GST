export interface BusinessProfile {
  legalName: string;
  tradeName: string;
  gstin: string;
  pan: string;
  ownerName: string;
  address: string;
  state: string;
  pinCode: string;
  filingFrequency: 'Monthly' | 'Quarterly (QRMP)';
  scheme: 'Regular' | 'Composition';
  complianceScore: number;
  currentPeriod: string;
  nextFilingDeadline: string;
  daysRemaining: number;
}

export const CURRENT_BUSINESS: BusinessProfile = {
  legalName: "Malabar Spice Traders LLP",
  tradeName: "Malabar Spice Traders",
  gstin: "32ABCDE1234F1Z5", // Demo GSTIN
  pan: "ABCDE1234F",
  ownerName: "Anil Kumar",
  address: "Building 4, Spice Market Road, Mattancherry, Kochi",
  state: "Kerala (32)",
  pinCode: "682002",
  filingFrequency: "Monthly",
  scheme: "Regular",
  complianceScore: 92,
  currentPeriod: "October 2026",
  nextFilingDeadline: "20 Nov 2026",
  daysRemaining: 20,
};

export const COMPLIANCE_RAG_ITEMS = [
  { id: '1', title: 'GST Registration Active', status: 'ok' as const, detail: 'Verified with GSTN portal' },
  { id: '2', title: 'GSTR-1 (Sep) Filed', status: 'ok' as const, detail: 'Filed on 11 Oct 2026 · ARN AA3210260019284' },
  { id: '3', title: 'GSTR-3B (Sep) Filed', status: 'ok' as const, detail: 'Previous period filed without penalty' },
  { id: '4', title: 'ITC Reconciliation — 2 mismatches', status: 'warn' as const, detail: '₹22,900 held pending supplier verification' },
  { id: '5', title: 'GSTR-1 (Oct) due 11 Nov', status: 'risk' as const, detail: 'Due on 11 Nov 2026 · Invoice data uploaded' },
];

export const TAX_TREND_DATA = [
  { month: 'May 26', sales: 980000, taxPayable: 82000, itcClaimed: 94400 },
  { month: 'Jun 26', sales: 1050000, taxPayable: 91500, itcClaimed: 97500 },
  { month: 'Jul 26', sales: 1120000, taxPayable: 96000, itcClaimed: 105600 },
  { month: 'Aug 26', sales: 1190000, taxPayable: 102400, itcClaimed: 111800 },
  { month: 'Sep 26', sales: 1210000, taxPayable: 99800, itcClaimed: 118000 },
  { month: 'Oct 26', sales: 1240000, taxPayable: 104800, itcClaimed: 118400 },
];

