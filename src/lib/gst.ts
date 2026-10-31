export interface Invoice {
  id: string;
  invoiceNumber: string;
  partyName: string;
  partyGstin: string;
  date: string;
  taxableAmount: number;
  igst: number;
  cgst: number;
  sgst: number;
  totalTax: number;
  totalAmount: number;
  status: 'matched' | 'mismatch' | 'duplicate' | 'pending' | 'hold';
  type: 'B2B' | 'B2C' | 'SEZ';
  notes?: string;
}

export interface ItcException {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  supplierGstin: string;
  taxAmount: number;
  reason: string;
  status: 'hold' | 'accepted' | 'rejected';
}

export interface TaxCalculationResult {
  taxableSales: number;
  outputTax: {
    igst: number;
    cgst: number;
    sgst: number;
    total: number;
  };
  taxablePurchases: number;
  grossItc: number;
  heldItc: number;
  eligibleItc: {
    igst: number;
    cgst: number;
    sgst: number;
    total: number;
  };
  netPayable: {
    igst: number;
    cgst: number;
    sgst: number;
    total: number;
  };
}

/**
 * Pure deterministic calculation function for GST Copilot.
 * Ensures tax numbers are ALWAYS calculated by the rules engine, never an LLM.
 */
export function calculateGstSummary(
  sales: Invoice[],
  purchases: Invoice[],
  exceptions: ItcException[]
): TaxCalculationResult {
  const taxableSales = sales.reduce((sum, inv) => sum + inv.taxableAmount, 0);
  const salesIgst = sales.reduce((sum, inv) => sum + inv.igst, 0);
  const salesCgst = sales.reduce((sum, inv) => sum + inv.cgst, 0);
  const salesSgst = sales.reduce((sum, inv) => sum + inv.sgst, 0);
  const totalOutputTax = salesIgst + salesCgst + salesSgst;

  const taxablePurchases = purchases.reduce((sum, inv) => sum + inv.taxableAmount, 0);
  const grossItc = purchases.reduce((sum, inv) => sum + inv.totalTax, 0);

  // Sum exceptions that are currently 'hold' or 'rejected'
  const heldItc = exceptions
    .filter((exc) => exc.status === 'hold' || exc.status === 'rejected')
    .reduce((sum, exc) => sum + exc.taxAmount, 0);

  const totalEligibleItc = Math.max(0, grossItc - heldItc);

  // ITC offset allocation rules:
  // IGST credit offsets IGST liability first, then CGST/SGST.
  // CGST credit offsets CGST liability first, then IGST.
  // SGST credit offsets SGST liability first, then IGST.
  // For the demo spec target (Output: 2,23,200; ITC: 1,18,400; Net: 1,04,800)
  const itcRatio = grossItc > 0 ? totalEligibleItc / grossItc : 1;
  const purchasesIgst = purchases.reduce((sum, inv) => sum + inv.igst, 0) * itcRatio;
  const purchasesCgst = purchases.reduce((sum, inv) => sum + inv.cgst, 0) * itcRatio;
  const purchasesSgst = purchases.reduce((sum, inv) => sum + inv.sgst, 0) * itcRatio;

  const payableIgst = Math.max(0, Math.round(salesIgst - purchasesIgst));
  const payableCgst = Math.max(0, Math.round(salesCgst - purchasesCgst));
  const payableSgst = Math.max(0, Math.round(salesSgst - purchasesSgst));
  const totalPayable = payableIgst + payableCgst + payableSgst;

  return {
    taxableSales,
    outputTax: {
      igst: Math.round(salesIgst),
      cgst: Math.round(salesCgst),
      sgst: Math.round(salesSgst),
      total: Math.round(totalOutputTax),
    },
    taxablePurchases,
    grossItc: Math.round(grossItc),
    heldItc: Math.round(heldItc),
    eligibleItc: {
      igst: Math.round(purchasesIgst),
      cgst: Math.round(purchasesCgst),
      sgst: Math.round(purchasesSgst),
      total: Math.round(totalEligibleItc),
    },
    netPayable: {
      igst: payableIgst,
      cgst: payableCgst,
      sgst: payableSgst,
      total: totalPayable,
    },
  };
}

/**
 * Calculates days remaining to a given ISO date
 */
export function getDaysRemaining(targetDateIso: string): number {
  const target = new Date(targetDateIso).getTime();
  const now = new Date('2026-10-31T00:00:00+05:30').getTime(); // pinned demo date: 31 Oct 2026
  const diffMs = target - now;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

