export interface VoucherEntry {
  id: string;
  direction: '借' | '贷';
  accountCode: string;
  accountName: string;
  amount?: string;
}

export interface AnnotationRecord {
  id: string;
  accountingCompany: string;
  accountingCompanyEID: string;
  enterpriseName: string;
  serviceId: string;
  aiVoucherEntries: VoucherEntry[];
  userVoucherEntries: VoucherEntry[];
  status: '未审核' | '已审核';
  processor: string;
  reviewer?: string;
  reviewTime?: string;
}

export interface InvoiceRecord extends AnnotationRecord {
  invoiceItems: string[];
  invoiceRemarks: string;
  invoiceDate: string;
}

export interface BankFlowRecord extends AnnotationRecord {
  flowSummary: string;
  flowRemarks: string;
  counterpartyName: string;
  flowDate: string;
}

export interface AccountingRule {
  id: string;
  industry: string;
  businessType: string;
  keywords: string[];
  voucherEntries: VoucherEntry[];
  type: 'invoice' | 'bankflow';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardRecord {
  id: string;
  accountingCompany: string;
  companyName: string;
  eID: string;
  serviceId: string;
  aiSetsCount: number;
  aiAccuracyFlow: number;
  aiRuleAccuracyFlow: number;
  aiAccuracyInvoice: number;
  aiRuleAccuracyInvoice: number;
  flowRulesCount: number;
  invoiceRulesCount: number;
  lastAiTime: string;
}
