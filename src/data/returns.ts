export interface ReturnCard {
  form: string;
  title: string;
  period: string;
  dueDate: string;
  status: 'Filed' | 'Ready to File' | 'Not Started';
  arn?: string;
  filedDate?: string;
  taxableValue?: number;
  taxLiability?: number;
}

export const CURRENT_RETURNS: ReturnCard[] = [
  {
    form: 'GSTR-1',
    title: 'Sales & Outward Supplies',
    period: 'October 2026',
    dueDate: '11 Nov 2026',
    status: 'Filed',
    arn: 'AA3210260019284',
    filedDate: '11 Oct 2026',
    taxableValue: 1240000,
    taxLiability: 223200,
  },
  {
    form: 'GSTR-3B',
    title: 'Summary Return & Tax Payment',
    period: 'October 2026',
    dueDate: '20 Nov 2026',
    status: 'Ready to File',
    taxableValue: 1240000,
    taxLiability: 104800,
  },
];

export interface FilingHistoryItem {
  id: string;
  period: string;
  returnType: string;
  filedDate: string;
  arn: string;
  taxPaid: number;
  itcClaimed: number;
  status: 'On Time' | 'Late';
}

export const FILING_HISTORY: FilingHistoryItem[] = [
  { id: 'fh-1', period: 'September 2026', returnType: 'GSTR-3B', filedDate: '19 Oct 2026', arn: 'AA3209260084721', taxPaid: 99800, itcClaimed: 118000, status: 'On Time' },
  { id: 'fh-2', period: 'September 2026', returnType: 'GSTR-1', filedDate: '10 Oct 2026', arn: 'AA3209260011943', taxPaid: 0, itcClaimed: 0, status: 'On Time' },
  { id: 'fh-3', period: 'August 2026', returnType: 'GSTR-3B', filedDate: '18 Sep 2026', arn: 'AA3208260073210', taxPaid: 102400, itcClaimed: 111800, status: 'On Time' },
  { id: 'fh-4', period: 'July 2026', returnType: 'GSTR-3B', filedDate: '19 Aug 2026', arn: 'AA3207260064119', taxPaid: 96000, itcClaimed: 105600, status: 'On Time' },
  { id: 'fh-5', period: 'June 2026', returnType: 'GSTR-3B', filedDate: '20 Jul 2026', arn: 'AA3206260055201', taxPaid: 91500, itcClaimed: 97500, status: 'On Time' },
  { id: 'fh-6', period: 'May 2026', returnType: 'GSTR-3B', filedDate: '19 Jun 2026', arn: 'AA3205260044192', taxPaid: 82000, itcClaimed: 94400, status: 'On Time' },
];

export const OTHER_FORMS = [
  { code: 'CMP-08', label: 'Composition Scheme Tax', applicable: false },
  { code: 'GSTR-9', label: 'Annual Return FY 25-26', applicable: true, note: 'Due 31 Dec 2026' },
  { code: 'GSTR-9C', label: 'Reconciliation Statement', applicable: false },
  { code: 'ITC-04', label: 'Job Work Supplies', applicable: false },
];

