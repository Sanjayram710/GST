import { ItcException } from '../lib/gst';

export const INITIAL_ITC_EXCEPTIONS: ItcException[] = [
  {
    id: 'exc-1',
    invoiceNumber: 'KCW-902',
    supplierName: 'Kochi Coir Works',
    supplierGstin: '32AABCK9876Q1Z3',
    taxAmount: 18000,
    reason: 'Supplier has not filed GSTR-1 yet. ITC blocked under Rule 36(4).',
    status: 'hold',
  },
  {
    id: 'exc-2',
    invoiceNumber: 'CP-331',
    supplierName: 'Calicut Packaging Ltd',
    supplierGstin: '32AABCC4567M1Z1',
    taxAmount: 4900,
    reason: 'Invoice date mismatch (Sep invoice booked in Oct purchase register).',
    status: 'hold',
  },
];

export interface ReconcileSummary {
  matchedCount: number;
  matchedAmount: number;
  mismatchCount: number;
  mismatchAmount: number;
  missingIn2bCount: number;
  missingIn2bAmount: number;
  extraIn2bCount: number;
  extraIn2bAmount: number;
}

export const RECONCILE_SUMMARY: ReconcileSummary = {
  matchedCount: 29,
  matchedAmount: 118400,
  mismatchCount: 2,
  mismatchAmount: 22900,
  missingIn2bCount: 1,
  missingIn2bAmount: 18000,
  extraIn2bCount: 0,
  extraIn2bAmount: 0,
};

export interface MismatchItem {
  id: string;
  invoiceNo: string;
  supplier: string;
  gstin: string;
  bookTax: number;
  portalTax: number;
  difference: number;
  reason: string;
  status: 'hold' | 'accepted' | 'rejected';
  aiExplanation: string;
}

export const MISMATCH_ITEMS: MismatchItem[] = [
  {
    id: 'm-1',
    invoiceNo: 'KCW-902',
    supplier: 'Kochi Coir Works',
    gstin: '32AABCK9876Q1Z3',
    bookTax: 18000,
    portalTax: 0,
    difference: 18000,
    reason: 'Supplier filed late / Not in GSTR-2B',
    status: 'hold',
    aiExplanation: 'Kochi Coir Works has not uploaded their GSTR-1 for October. Under Section 16(2)(aa) of the CGST Act, you cannot claim ITC until this invoice appears in your auto-drafted GSTR-2B. We recommend holding this credit or sending a reminder on WhatsApp.',
  },
  {
    id: 'm-2',
    invoiceNo: 'CP-331',
    supplier: 'Calicut Packaging Ltd',
    gstin: '32AABCC4567M1Z1',
    bookTax: 4900,
    portalTax: 4900,
    difference: 0,
    reason: 'Invoice date mismatch (Sep invoice in Oct book)',
    status: 'hold',
    aiExplanation: 'The invoice was dated 28th September 2026 but entered in October books. Although the tax amount matches, claiming it in the wrong tax period may trigger a system query. You can either accept it now under amendment or claim it in the revised schedule.',
  },
];

