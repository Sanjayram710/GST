import * as XLSX from 'xlsx';
import { Invoice } from './gst';

export interface ParseResult {
  success: boolean;
  fileName: string;
  rowCount: number;
  invoices: Invoice[];
  error?: string;
}

/**
 * Parses an Excel (.xlsx, .xls) or CSV file into Invoice objects.
 */
export async function parseInvoiceFile(file: File, type: 'B2B' | 'B2C' = 'B2B'): Promise<ParseResult> {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array', cellDates: true });

    // Pick first worksheet
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      return { success: false, fileName: file.name, rowCount: 0, invoices: [], error: 'Worksheet is empty.' };
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    if (rawJson.length === 0) {
      return { success: false, fileName: file.name, rowCount: 0, invoices: [], error: 'No data rows found in spreadsheet.' };
    }

    const parsedInvoices: Invoice[] = rawJson.map((row, index) => {
      // Flexible column key resolution (case-insensitive)
      const findVal = (patterns: string[]): any => {
        const foundKey = Object.keys(row).find((k) =>
          patterns.some((p) => k.toLowerCase().replace(/[^a-z0-9]/g, '').includes(p.toLowerCase()))
        );
        return foundKey ? row[foundKey] : undefined;
      };

      const invNo =
        findVal(['invno', 'invoiceno', 'invoice', 'billno', 'number']) ||
        `IMP-26-${String(index + 1).padStart(3, '0')}`;

      const party =
        findVal(['party', 'customer', 'supplier', 'vendor', 'name', 'buyer']) ||
        'Imported Business Client';

      const gstin =
        findVal(['gstin', 'gst', 'uin']) ||
        '32ABCDE9999F1Z9';

      const dateRaw = findVal(['date', 'invoicedate', 'billdate']) || '2026-10-15';
      const dateStr = typeof dateRaw === 'object' && dateRaw instanceof Date
        ? dateRaw.toISOString().split('T')[0]
        : String(dateRaw);

      const taxable = Number(
        String(findVal(['taxable', 'value', 'amount', 'taxablevalue']) || 20000).replace(/[^0-9.]/g, '')
      ) || 20000;

      const igst = Number(String(findVal(['igst', 'integrated']) || 0).replace(/[^0-9.]/g, '')) || 0;
      let cgst = Number(String(findVal(['cgst', 'central']) || 0).replace(/[^0-9.]/g, '')) || 0;
      let sgst = Number(String(findVal(['sgst', 'state']) || 0).replace(/[^0-9.]/g, '')) || 0;

      // Default 18% intra-state if no taxes specified
      if (igst === 0 && cgst === 0 && sgst === 0) {
        cgst = Math.round(taxable * 0.09);
        sgst = Math.round(taxable * 0.09);
      }

      const totalTax = igst + cgst + sgst;
      const totalAmount = taxable + totalTax;

      return {
        id: `imp-${Date.now()}-${index}`,
        invoiceNumber: String(invNo),
        partyName: String(party),
        partyGstin: String(gstin),
        date: dateStr,
        taxableAmount: taxable,
        igst,
        cgst,
        sgst,
        totalTax,
        totalAmount,
        status: 'matched' as const,
        type: type,
      };
    });

    return {
      success: true,
      fileName: file.name,
      rowCount: parsedInvoices.length,
      invoices: parsedInvoices,
    };
  } catch (err: any) {
    return {
      success: false,
      fileName: file.name,
      rowCount: 0,
      invoices: [],
      error: err?.message || 'Failed to read spreadsheet file.',
    };
  }
}

/**
 * Downloads a sample template file in Excel (.xlsx) or CSV format.
 */
export function downloadSampleTemplate(format: 'xlsx' | 'csv') {
  const sampleData = [
    {
      'Invoice Number': 'MST-26-101',
      'Party Name': 'Cochin Agro Exports Ltd',
      'GSTIN': '32AAACC1234A1Z1',
      'Invoice Date': '2026-10-05',
      'Taxable Value': 50000,
      'IGST': 0,
      'CGST': 4500,
      'SGST': 4500,
      'Total Amount': 59000,
      'Supply Type': 'B2B',
    },
    {
      'Invoice Number': 'MST-26-102',
      'Party Name': 'Bangalore Culinary Spices',
      'GSTIN': '29AABCB5678B1Z2',
      'Invoice Date': '2026-10-08',
      'Taxable Value': 75000,
      'IGST': 13500,
      'CGST': 0,
      'SGST': 0,
      'Total Amount': 88500,
      'Supply Type': 'B2B',
    },
    {
      'Invoice Number': 'MST-26-103',
      'Party Name': 'Calicut Wholesale Depot',
      'GSTIN': '32AADCD3456D1Z4',
      'Invoice Date': '2026-10-12',
      'Taxable Value': 30000,
      'IGST': 0,
      'CGST': 2700,
      'SGST': 2700,
      'Total Amount': 35400,
      'Supply Type': 'B2B',
    },
    {
      'Invoice Number': 'MST-26-104',
      'Party Name': 'Chennai Organic Retailers',
      'GSTIN': '33AABCC9012C1Z3',
      'Invoice Date': '2026-10-15',
      'Taxable Value': 42000,
      'IGST': 7560,
      'CGST': 0,
      'SGST': 0,
      'Total Amount': 49560,
      'Supply Type': 'B2B',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sales Invoices');

  const filename = `Sample_GST_Sales_Invoices.${format}`;
  XLSX.writeFile(wb, filename, { bookType: format });
}

/**
 * Exports invoice list to Excel or CSV.
 */
export function exportInvoicesToFile(invoices: Invoice[], filename: string, format: 'xlsx' | 'csv') {
  const exportData = invoices.map((inv) => ({
    'Invoice Number': inv.invoiceNumber,
    'Party Name': inv.partyName,
    'GSTIN': inv.partyGstin,
    'Invoice Date': inv.date,
    'Taxable Value': inv.taxableAmount,
    'IGST': inv.igst,
    'CGST': inv.cgst,
    'SGST': inv.sgst,
    'Total Tax': inv.totalTax,
    'Total Amount': inv.totalAmount,
    'Status': inv.status,
    'Supply Type': inv.type,
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Invoices');

  XLSX.writeFile(wb, `${filename}.${format}`, { bookType: format });
}
