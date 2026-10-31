import { Invoice } from '../lib/gst';

// 31 Purchase Invoices
// Total Taxable: 7,85,000
// Gross Tax: 1,41,300 (IGST: 48,300, CGST: 46,500, SGST: 46,500)
// Held Invoices (2 exceptions):
// 1) KCW-902 (Kochi Coir Works): Taxable 1,00,000, Tax 18,000 (CGST 9,000, SGST 9,000)
// 2) CP-331 (Calicut Packaging Ltd): Taxable 27,222.22, Tax 4,900 (CGST 2,450, SGST 2,450)
// Remaining Eligible ITC: 1,41,300 - 22,900 = 1,18,400

const sampleVendors = [
  { name: 'Idukki Cardamom Planters', gstin: '32AADCP9911K1Z1', state: 'KL' },
  { name: 'Wayanad Pepper Collective', gstin: '32AABWP4433L1Z2', state: 'KL' },
  { name: 'Tamil Nadu Clove Traders', gstin: '33AABCT8877T1Z5', state: 'TN' },
  { name: 'Karnataka Ginger Farms', gstin: '29AAEKG6655K1Z8', state: 'KA' },
  { name: 'Alleppey Packaging Supplies', gstin: '32AABAP2211A1Z9', state: 'KL' },
];

export const PURCHASE_INVOICES: Invoice[] = [
  // Exception 1: Kochi Coir Works (Held in 2B)
  {
    id: 'p-1',
    invoiceNumber: 'KCW-902',
    partyName: 'Kochi Coir Works',
    partyGstin: '32AABCK9876Q1Z3',
    date: '2026-10-14',
    taxableAmount: 100000,
    igst: 0,
    cgst: 9000,
    sgst: 9000,
    totalTax: 18000,
    totalAmount: 118000,
    status: 'hold',
    type: 'B2B',
    notes: 'Supplier has not filed GSTR-1 yet. ITC blocked by GSTR-2B rules.',
  },
  // Exception 2: Calicut Packaging Ltd (Date mismatch)
  {
    id: 'p-2',
    invoiceNumber: 'CP-331',
    partyName: 'Calicut Packaging Ltd',
    partyGstin: '32AABCC4567M1Z1',
    date: '2026-09-28',
    taxableAmount: 27222,
    igst: 0,
    cgst: 2450,
    sgst: 2450,
    totalTax: 4900,
    totalAmount: 32122,
    status: 'hold',
    type: 'B2B',
    notes: 'Invoice date 28-Sep found in October book. Verification needed.',
  },
  // Inter-state purchases (IGST = 48,300, Taxable = 2,68,333)
  {
    id: 'p-3',
    invoiceNumber: 'TN-CLV-801',
    partyName: 'Tamil Nadu Clove Traders',
    partyGstin: '33AABCT8877T1Z5',
    date: '2026-10-04',
    taxableAmount: 140000,
    igst: 25200,
    cgst: 0,
    sgst: 0,
    totalTax: 25200,
    totalAmount: 165200,
    status: 'matched',
    type: 'B2B',
  },
  {
    id: 'p-4',
    invoiceNumber: 'KA-GIN-104',
    partyName: 'Karnataka Ginger Farms',
    partyGstin: '29AAEKG6655K1Z8',
    date: '2026-10-08',
    taxableAmount: 128333,
    igst: 23100,
    cgst: 0,
    sgst: 0,
    totalTax: 23100,
    totalAmount: 151433,
    status: 'matched',
    type: 'B2B',
  },
  // Remaining 27 intra-state invoices (Taxable: 785000 - 100000 - 27222 - 268333 = 389445; CGST 35,050; SGST 35,050)
  ...Array.from({ length: 27 }, (_, i) => {
    const isLast = i === 26;
    const taxable = isLast ? 25445 : 14000;
    const cgst = Math.round(taxable * 0.09);
    const sgst = cgst;
    const vendor = sampleVendors[i % sampleVendors.length];
    const day = (i % 26) + 2;

    return {
      id: `p-${i + 5}`,
      invoiceNumber: `VND-26-${String(i + 5).padStart(3, '0')}`,
      partyName: vendor.name,
      partyGstin: vendor.gstin,
      date: `2026-10-${String(day).padStart(2, '0')}`,
      taxableAmount: taxable,
      igst: 0,
      cgst: cgst,
      sgst: sgst,
      totalTax: cgst + sgst,
      totalAmount: taxable + cgst + sgst,
      status: 'matched' as const,
      type: 'B2B' as const,
    };
  }),
];

