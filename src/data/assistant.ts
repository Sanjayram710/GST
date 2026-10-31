export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  tag?: string;
}

export interface AssistantFAQ {
  id: string;
  prompt: string;
  response: string;
  tag: string;
}

export const ASSISTANT_FAQS: AssistantFAQ[] = [
  {
    id: 'faq-itc-diff',
    prompt: 'Why is my ITC different?',
    tag: 'ITC & Reconciliation',
    response: `Your available Input Tax Credit for October is **₹1,18,400**, which is **₹22,900 lower** than your total book tax (₹1,41,300).

Here is why:
1. **Kochi Coir Works (₹18,000)**: Your supplier has not yet filed their GSTR-1. Under GST Rule 36(4), you cannot claim credit until the supplier uploads it to the portal.
2. **Calicut Packaging Ltd (₹4,900)**: The invoice date was 28 September, but entered in October books. We have held it to avoid portal matching penalties.

Once Kochi Coir Works files or you confirm the invoice date with Calicut Packaging, this credit will automatically unlock for next month's return.`,
  },
  {
    id: 'faq-due-date',
    prompt: 'What is my next GST deadline?',
    tag: 'Deadlines',
    response: `Your next deadline is **4 November 2026** (in **4 days**). 

This is the scheduled payment date for **October 2026 GSTR-3B**. Your estimated net tax payable calculated by the rules engine is **₹1,04,800**.

Filing before 4 November ensures zero interest and protects your **92/100** compliance score.`,
  },
  {
    id: 'faq-need-file',
    prompt: 'Do I need to file this month?',
    tag: 'Filing Status',
    response: `**Yes, you do.** Even if you had zero transactions in any month, a Nil return is required by law. 

For October 2026, you have **48 sales invoices** (tax liability ₹2,23,200) and **31 purchase invoices** (eligible ITC ₹1,18,400). Your return is already prepared in the Copilot and ready for review.`,
  },
  {
    id: 'faq-tax-owe',
    prompt: 'How much tax do I approximately owe?',
    tag: 'Calculations',
    response: `According to deterministic calculation in our rules engine:

• **Output Tax on Sales**: ₹2,23,200 (₹12,40,000 taxable value)
• **Eligible Input Tax Credit (ITC)**: ₹1,18,400 (after holding 2 exceptions)
• **Net Cash Payable**: **₹1,04,800**
  - IGST: ₹36,400
  - CGST: ₹34,200
  - SGST: ₹34,200

*(Calculated by rules engine, verified against your uploaded vouchers.)*`,
  },
  {
    id: 'faq-mismatch',
    prompt: 'Why do I have this mismatch?',
    tag: 'Reconciliation',
    response: `Mismatches happen when data in your accounting software doesn't align with what your vendors submitted to the government's GST portal (GSTR-2B).

For October, our reconciler detected **2 mismatches** totaling ₹22,900. Our system automatically holds these transactions so your GSTR-3B is 100% audit-proof, preventing government notices.`,
  },
  {
    id: 'faq-docs-needed',
    prompt: 'What documents do I need?',
    tag: 'Compliance',
    response: `For filing October GSTR-3B, you need:
1. Sales Invoices / Daybook export for October 2026
2. Purchase Invoices / Bills from your suppliers
3. Bank statement for challan payment verification
4. Valid Aadhaar OTP or Digital Signature Certificate (DSC) for EVC authorization.

All files can be dragged directly into the Copilot or uploaded in the Document Vault.`,
  },
  {
    id: 'faq-return-ready',
    prompt: 'My return is ready, what next?',
    tag: 'Next Steps',
    response: `Great news! Since your numbers are verified:
1. Go to **GST Copilot** (/app/copilot)
2. Review Step 4 (Tax Liability Breakdown)
3. Proceed to Step 5 (File with 1-click OTP)
4. Enter the 6-digit EVC code to receive your instant Government ARN!`,
  },
];

