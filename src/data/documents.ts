export interface VaultDocument {
  id: string;
  name: string;
  category: 'Certificate' | 'Return' | 'Challan' | 'Acknowledgment' | 'Audit';
  date: string;
  size: string;
  arn?: string;
  format: 'PDF' | 'JSON' | 'ZIP';
}

export const VAULT_DOCUMENTS: VaultDocument[] = [
  { id: 'doc-1', name: 'GST_Registration_Certificate_REG-06.pdf', category: 'Certificate', date: '15 Jan 2024', size: '240 KB', format: 'PDF' },
  { id: 'doc-2', name: 'GSTR-3B_Filing_Ack_Sep_2026.pdf', category: 'Acknowledgment', date: '19 Oct 2026', size: '185 KB', arn: 'AA3209260084721', format: 'PDF' },
  { id: 'doc-3', name: 'GST_Payment_Challan_PMT-06_Sep26.pdf', category: 'Challan', date: '19 Oct 2026', size: '142 KB', format: 'PDF' },
  { id: 'doc-4', name: 'GSTR-1_Filing_Ack_Sep_2026.pdf', category: 'Acknowledgment', date: '10 Oct 2026', size: '178 KB', arn: 'AA3209260011943', format: 'PDF' },
  { id: 'doc-5', name: 'GSTR-3B_Filing_Ack_Aug_2026.pdf', category: 'Acknowledgment', date: '18 Sep 2026', size: '190 KB', arn: 'AA3208260073210', format: 'PDF' },
  { id: 'doc-6', name: 'Annual_Return_GSTR-9_FY24-25.pdf', category: 'Return', date: '28 Dec 2025', size: '420 KB', format: 'PDF' },
  { id: 'doc-7', name: 'Audited_Financial_Statement_FY25-26.pdf', category: 'Audit', date: '30 Jun 2026', size: '1.2 MB', format: 'PDF' },
  { id: 'doc-8', name: 'Authorized_Signatory_Letter.pdf', category: 'Certificate', date: '10 Jan 2024', size: '98 KB', format: 'PDF' },
];

