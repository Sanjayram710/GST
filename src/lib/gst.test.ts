import { calculateGstSummary } from './gst';
import { SALES_INVOICES } from '../data/salesInvoices';
import { PURCHASE_INVOICES } from '../data/purchaseInvoices';
import { INITIAL_ITC_EXCEPTIONS } from '../data/reconcile';

/**
 * Sanity test verifying that deterministic rules in src/lib/gst.ts
 * calculate precisely the demo target numbers:
 * - Output tax: ₹2,23,200
 * - Eligible ITC: ₹1,18,400
 * - Net payable: ₹1,04,800
 */
export function runGstSanityCheck(): { passed: boolean; message: string; summary: any } {
  const summary = calculateGstSummary(SALES_INVOICES, PURCHASE_INVOICES, INITIAL_ITC_EXCEPTIONS);

  const passed =
    summary.outputTax.total === 223200 &&
    summary.eligibleItc.total === 118400 &&
    summary.netPayable.total === 104800;

  const message = passed
    ? `Sanity Check Passed! Output: ₹${summary.outputTax.total}, ITC: ₹${summary.eligibleItc.total}, Net: ₹${summary.netPayable.total}`
    : `Sanity Check FAILED! Output: ₹${summary.outputTax.total} (exp 223200), ITC: ₹${summary.eligibleItc.total} (exp 118400), Net: ₹${summary.netPayable.total} (exp 104800)`;

  return { passed, message, summary };
}

