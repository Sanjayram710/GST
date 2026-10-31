import { Invoice } from '../lib/gst';

// Generate 48 sales invoices that strictly sum to:
// Taxable: 12,40,000
// IGST: 79,200, CGST: 72,000, SGST: 72,000
// Total Tax: 2,23,200
// Gross Total: 14,63,200

const sampleBuyers = [
  { name: 'Cochin Agro Exports Ltd', gstin: '32AAACC1234A1Z1', state: 'KL', type: 'intra' },
  { name: 'Bangalore Culinary Spices', gstin: '29AABCB5678B1Z2', state: 'KA', type: 'inter' },
  { name: 'Chennai Organic Retailers', gstin: '33AABCC9012C1Z3', state: 'TN', type: 'inter' },
  { name: 'Calicut Wholesale Depot', gstin: '32AADCD3456D1Z4', state: 'KL', type: 'intra' },
  { name: 'Travancore Food Packers', gstin: '32AAEFE7890E1Z5', state: 'KL', type: 'intra' },
  { name: 'Hyderabad Gourmet Foods', gstin: '36AAACF1122F1Z6', state: 'TS', type: 'inter' },
  { name: 'Mumbai Spice Emporium', gstin: '27AABCM3344G1Z7', state: 'MH', type: 'inter' },
  { name: 'Kottayam Pepper Mart', gstin: '32AAECK5566H1Z8', state: 'KL', type: 'intra' },
];

export const SALES_INVOICES: Invoice[] = [
  // 10 larger inter-state invoices summing to: Taxable 4,40,000; IGST 79,200 (18%)
  { id: 's-1', invoiceNumber: 'MST-26-001', partyName: 'Bangalore Culinary Spices', partyGstin: '29AABCB5678B1Z2', date: '2026-10-02', taxableAmount: 60000, igst: 10800, cgst: 0, sgst: 0, totalTax: 10800, totalAmount: 70800, status: 'matched', type: 'B2B' },
  { id: 's-2', invoiceNumber: 'MST-26-002', partyName: 'Chennai Organic Retailers', partyGstin: '33AABCC9012C1Z3', date: '2026-10-03', taxableAmount: 50000, igst: 9000, cgst: 0, sgst: 0, totalTax: 9000, totalAmount: 59000, status: 'matched', type: 'B2B' },
  { id: 's-3', invoiceNumber: 'MST-26-003', partyName: 'Hyderabad Gourmet Foods', partyGstin: '36AAACF1122F1Z6', date: '2026-10-05', taxableAmount: 45000, igst: 8100, cgst: 0, sgst: 0, totalTax: 8100, totalAmount: 53100, status: 'matched', type: 'B2B' },
  { id: 's-4', invoiceNumber: 'MST-26-004', partyName: 'Mumbai Spice Emporium', partyGstin: '27AABCM3344G1Z7', date: '2026-10-07', taxableAmount: 75000, igst: 13500, cgst: 0, sgst: 0, totalTax: 13500, totalAmount: 88500, status: 'matched', type: 'B2B' },
  { id: 's-5', invoiceNumber: 'MST-26-005', partyName: 'Bangalore Culinary Spices', partyGstin: '29AABCB5678B1Z2', date: '2026-10-09', taxableAmount: 40000, igst: 7200, cgst: 0, sgst: 0, totalTax: 7200, totalAmount: 47200, status: 'matched', type: 'B2B' },
  { id: 's-6', invoiceNumber: 'MST-26-006', partyName: 'Chennai Organic Retailers', partyGstin: '33AABCC9012C1Z3', date: '2026-10-12', taxableAmount: 35000, igst: 6300, cgst: 0, sgst: 0, totalTax: 6300, totalAmount: 41300, status: 'matched', type: 'B2B' },
  { id: 's-7', invoiceNumber: 'MST-26-007', partyName: 'Hyderabad Gourmet Foods', partyGstin: '36AAACF1122F1Z6', date: '2026-10-14', taxableAmount: 30000, igst: 5400, cgst: 0, sgst: 0, totalTax: 5400, totalAmount: 35400, status: 'matched', type: 'B2B' },
  { id: 's-8', invoiceNumber: 'MST-26-008', partyName: 'Mumbai Spice Emporium', partyGstin: '27AABCM3344G1Z7', date: '2026-10-16', taxableAmount: 45000, igst: 8100, cgst: 0, sgst: 0, totalTax: 8100, totalAmount: 53100, status: 'matched', type: 'B2B' },
  { id: 's-9', invoiceNumber: 'MST-26-009', partyName: 'Bangalore Culinary Spices', partyGstin: '29AABCB5678B1Z2', date: '2026-10-18', taxableAmount: 30000, igst: 5400, cgst: 0, sgst: 0, totalTax: 5400, totalAmount: 35400, status: 'matched', type: 'B2B' },
  { id: 's-10', invoiceNumber: 'MST-26-010', partyName: 'Chennai Organic Retailers', partyGstin: '33AABCC9012C1Z3', date: '2026-10-20', taxableAmount: 30000, igst: 5400, cgst: 0, sgst: 0, totalTax: 5400, totalAmount: 35400, status: 'matched', type: 'B2B' },

  // 38 intra-state (Kerala) invoices summing to: Taxable 8,00,000; CGST 72,000 (9%), SGST 72,000 (9%)
  // 38 invoices: 36 * 20,000 (taxable 7,20,000; CGST 64,800; SGST 64,800) + 2 * 40,000 (taxable 80,000; CGST 7,200; SGST 7,200)
  ...Array.from({ length: 36 }, (_, i) => {
    const invNum = `MST-26-${String(i + 11).padStart(3, '0')}`;
    const buyer = sampleBuyers[(i + 3) % sampleBuyers.length];
    const day = (i % 25) + 1;
    return {
      id: `s-${i + 11}`,
      invoiceNumber: invNum,
      partyName: buyer.name,
      partyGstin: buyer.gstin,
      date: `2026-10-${String(day).padStart(2, '0')}`,
      taxableAmount: 20000,
      igst: 0,
      cgst: 1800,
      sgst: 1800,
      totalTax: 3600,
      totalAmount: 23600,
      status: 'matched' as const,
      type: 'B2B' as const,
    };
  }),
  {
    id: 's-47',
    invoiceNumber: 'MST-26-047',
    partyName: 'Cochin Agro Exports Ltd',
    partyGstin: '32AAACC1234A1Z1',
    date: '2026-10-27',
    taxableAmount: 40000,
    igst: 0,
    cgst: 3600,
    sgst: 3600,
    totalTax: 7200,
    totalAmount: 47200,
    status: 'matched' as const,
    type: 'B2B' as const,
  },
  {
    id: 's-48',
    invoiceNumber: 'MST-26-048',
    partyName: 'Calicut Wholesale Depot',
    partyGstin: '32AADCD3456D1Z4',
    date: '2026-10-29',
    taxableAmount: 40000,
    igst: 0,
    cgst: 3600,
    sgst: 3600,
    totalTax: 7200,
    totalAmount: 47200,
    status: 'matched' as const,
    type: 'B2B' as const,
  },
];

