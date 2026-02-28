import type { DashboardRecord, InvoiceRecord, BankFlowRecord, AccountingRule } from '../types';

export const dashboardData: DashboardRecord[] = [
  { id: '1', accountingCompany: '上海云账房', companyName: '上海贸易有限公司', eID: 'E100021', serviceId: 'SV-20240101', aiSetsCount: 45, aiAccuracyFlow: 87.3, aiRuleAccuracyFlow: 92.1, aiAccuracyInvoice: 85.6, aiRuleAccuracyInvoice: 91.4, flowRulesCount: 128, invoiceRulesCount: 96, lastAiTime: '2026-02-27 14:23' },
  { id: '2', accountingCompany: '北京账无忧', companyName: '北京科技有限公司', eID: 'E100034', serviceId: 'SV-20240203', aiSetsCount: 32, aiAccuracyFlow: 91.2, aiRuleAccuracyFlow: 94.5, aiAccuracyInvoice: 89.8, aiRuleAccuracyInvoice: 93.2, flowRulesCount: 85, invoiceRulesCount: 72, lastAiTime: '2026-02-27 11:45' },
  { id: '3', accountingCompany: '广州云财税', companyName: '广州餐饮管理公司', eID: 'E100056', serviceId: 'SV-20240312', aiSetsCount: 28, aiAccuracyFlow: 82.5, aiRuleAccuracyFlow: 87.3, aiAccuracyInvoice: 80.1, aiRuleAccuracyInvoice: 85.6, flowRulesCount: 67, invoiceRulesCount: 54, lastAiTime: '2026-02-26 16:32' },
  { id: '4', accountingCompany: '深圳智账', companyName: '深圳电商有限公司', eID: 'E100078', serviceId: 'SV-20240401', aiSetsCount: 56, aiAccuracyFlow: 93.4, aiRuleAccuracyFlow: 96.2, aiAccuracyInvoice: 91.7, aiRuleAccuracyInvoice: 95.3, flowRulesCount: 145, invoiceRulesCount: 128, lastAiTime: '2026-02-28 09:12' },
  { id: '5', accountingCompany: '成都慧财', companyName: '成都制造业有限公司', eID: 'E100091', serviceId: 'SV-20240502', aiSetsCount: 21, aiAccuracyFlow: 76.8, aiRuleAccuracyFlow: 83.4, aiAccuracyInvoice: 74.5, aiRuleAccuracyInvoice: 81.2, flowRulesCount: 43, invoiceRulesCount: 38, lastAiTime: '2026-02-25 10:55' },
  { id: '6', accountingCompany: '杭州账易', companyName: '杭州互联网公司', eID: 'E100103', serviceId: 'SV-20240601', aiSetsCount: 38, aiAccuracyFlow: 88.9, aiRuleAccuracyFlow: 92.7, aiAccuracyInvoice: 87.3, aiRuleAccuracyInvoice: 91.8, flowRulesCount: 98, invoiceRulesCount: 86, lastAiTime: '2026-02-28 08:34' },
  { id: '7', accountingCompany: '武汉云税', companyName: '武汉服务业有限公司', eID: 'E100115', serviceId: 'SV-20240702', aiSetsCount: 18, aiAccuracyFlow: 79.4, aiRuleAccuracyFlow: 85.1, aiAccuracyInvoice: 77.6, aiRuleAccuracyInvoice: 83.4, flowRulesCount: 52, invoiceRulesCount: 47, lastAiTime: '2026-02-24 14:21' },
  { id: '8', accountingCompany: '南京财智', companyName: '南京零售有限公司', eID: 'E100128', serviceId: 'SV-20240801', aiSetsCount: 42, aiAccuracyFlow: 90.1, aiRuleAccuracyFlow: 93.8, aiAccuracyInvoice: 88.6, aiRuleAccuracyInvoice: 92.4, flowRulesCount: 112, invoiceRulesCount: 95, lastAiTime: '2026-02-27 17:08' },
  { id: '9', accountingCompany: '西安云财', companyName: '西安建筑有限公司', eID: 'E100142', serviceId: 'SV-20240902', aiSetsCount: 25, aiAccuracyFlow: 84.2, aiRuleAccuracyFlow: 89.6, aiAccuracyInvoice: 82.3, aiRuleAccuracyInvoice: 87.9, flowRulesCount: 76, invoiceRulesCount: 63, lastAiTime: '2026-02-26 11:18' },
  { id: '10', accountingCompany: '重庆智税', companyName: '重庆物流有限公司', eID: 'E100156', serviceId: 'SV-20241001', aiSetsCount: 33, aiAccuracyFlow: 86.7, aiRuleAccuracyFlow: 91.3, aiAccuracyInvoice: 84.9, aiRuleAccuracyInvoice: 90.2, flowRulesCount: 89, invoiceRulesCount: 74, lastAiTime: '2026-02-27 15:43' },
  { id: '11', accountingCompany: '苏州账云', companyName: '苏州精密制造有限公司', eID: 'E100167', serviceId: 'SV-20241102', aiSetsCount: 29, aiAccuracyFlow: 85.1, aiRuleAccuracyFlow: 90.4, aiAccuracyInvoice: 83.7, aiRuleAccuracyInvoice: 89.5, flowRulesCount: 71, invoiceRulesCount: 59, lastAiTime: '2026-02-25 13:27' },
  { id: '12', accountingCompany: '天津财智云', companyName: '天津港务贸易公司', eID: 'E100179', serviceId: 'SV-20241201', aiSetsCount: 37, aiAccuracyFlow: 89.3, aiRuleAccuracyFlow: 93.1, aiAccuracyInvoice: 87.8, aiRuleAccuracyInvoice: 91.9, flowRulesCount: 94, invoiceRulesCount: 82, lastAiTime: '2026-02-28 10:22' },
];

export const invoiceData: InvoiceRecord[] = [
  {
    id: 'INV001', accountingCompany: '上海云账房', accountingCompanyEID: 'E100021', enterpriseName: '上海贸易有限公司', serviceId: 'SV-20240101',
    aiVoucherEntries: [
      { id: 'v1', direction: '借', accountCode: '1122', accountName: '应收账款', amount: '' },
      { id: 'v2', direction: '贷', accountCode: '6001', accountName: '主营业务收入', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v3', direction: '借', accountCode: '1122', accountName: '应收账款', amount: '' },
      { id: 'v4', direction: '贷', accountCode: '6001', accountName: '主营业务收入', amount: '' },
      { id: 'v5', direction: '贷', accountCode: '2221', accountName: '应交税费-增值税', amount: '' },
    ],
    status: '未审核', processor: '张三丰', invoiceItems: ['电脑配件×10', '鼠标×20', '键盘×15'],
    invoiceRemarks: '2024年2月办公设备采购', invoiceDate: '2026-02-15',
  },
  {
    id: 'INV002', accountingCompany: '北京账无忧', accountingCompanyEID: 'E100034', enterpriseName: '北京科技有限公司', serviceId: 'SV-20240203',
    aiVoucherEntries: [
      { id: 'v6', direction: '借', accountCode: '5602', accountName: '管理费用', amount: '' },
      { id: 'v7', direction: '贷', accountCode: '1001', accountName: '库存现金', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v8', direction: '借', accountCode: '5601', accountName: '销售费用', amount: '' },
      { id: 'v9', direction: '贷', accountCode: '1001', accountName: '库存现金', amount: '' },
    ],
    status: '已审核', processor: '李丽', reviewer: '王总', reviewTime: '2026-02-20 10:30',
    invoiceItems: ['差旅费报销×1'], invoiceRemarks: '出差北京费用', invoiceDate: '2026-02-10',
  },
  {
    id: 'INV003', accountingCompany: '广州云财税', accountingCompanyEID: 'E100056', enterpriseName: '广州餐饮管理公司', serviceId: 'SV-20240312',
    aiVoucherEntries: [
      { id: 'v10', direction: '借', accountCode: '1403', accountName: '原材料', amount: '' },
      { id: 'v11', direction: '贷', accountCode: '2202', accountName: '应付账款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v12', direction: '借', accountCode: '1403', accountName: '原材料', amount: '' },
      { id: 'v13', direction: '借', accountCode: '2221', accountName: '应交税费-进项税额', amount: '' },
      { id: 'v14', direction: '贷', accountCode: '2202', accountName: '应付账款', amount: '' },
    ],
    status: '未审核', processor: '陈晓', invoiceItems: ['食材采购×5', '调料×10', '包装材料×3'],
    invoiceRemarks: '1月份食材采购', invoiceDate: '2026-01-28',
  },
  {
    id: 'INV004', accountingCompany: '深圳智账', accountingCompanyEID: 'E100078', enterpriseName: '深圳电商有限公司', serviceId: 'SV-20240401',
    aiVoucherEntries: [
      { id: 'v15', direction: '借', accountCode: '2202', accountName: '应付账款', amount: '' },
      { id: 'v16', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v17', direction: '借', accountCode: '2202', accountName: '应付账款', amount: '' },
      { id: 'v18', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '已审核', processor: '王芳', reviewer: '刘总', reviewTime: '2026-02-22 14:15',
    invoiceItems: ['快递费×100'], invoiceRemarks: '2月份快递费结算', invoiceDate: '2026-02-18',
  },
  {
    id: 'INV005', accountingCompany: '杭州账易', accountingCompanyEID: 'E100103', enterpriseName: '杭州互联网公司', serviceId: 'SV-20240601',
    aiVoucherEntries: [
      { id: 'v19', direction: '借', accountCode: '5602', accountName: '管理费用-办公费', amount: '' },
      { id: 'v20', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v21', direction: '借', accountCode: '5602', accountName: '管理费用-办公费', amount: '' },
      { id: 'v22', direction: '借', accountCode: '2221', accountName: '应交税费-进项税额', amount: '' },
      { id: 'v23', direction: '贷', accountCode: '2202', accountName: '应付账款', amount: '' },
      { id: 'v24', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '未审核', processor: '赵磊', invoiceItems: ['云服务器×1年', '域名续费×3', '安全防护软件×1'],
    invoiceRemarks: '年度IT服务费用', invoiceDate: '2026-01-05',
  },
  {
    id: 'INV006', accountingCompany: '南京财智', accountingCompanyEID: 'E100128', enterpriseName: '南京零售有限公司', serviceId: 'SV-20240801',
    aiVoucherEntries: [
      { id: 'v25', direction: '借', accountCode: '1401', accountName: '库存商品', amount: '' },
      { id: 'v26', direction: '贷', accountCode: '2202', accountName: '应付账款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v27', direction: '借', accountCode: '1401', accountName: '库存商品', amount: '' },
      { id: 'v28', direction: '贷', accountCode: '2202', accountName: '应付账款', amount: '' },
    ],
    status: '未审核', processor: '孙悦', invoiceItems: ['服装×200件', '鞋类×50双'],
    invoiceRemarks: '春季服装采购', invoiceDate: '2026-02-01',
  },
  {
    id: 'INV007', accountingCompany: '重庆智税', accountingCompanyEID: 'E100156', enterpriseName: '重庆物流有限公司', serviceId: 'SV-20241001',
    aiVoucherEntries: [
      { id: 'v29', direction: '借', accountCode: '5601', accountName: '销售费用-运费', amount: '' },
      { id: 'v30', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v31', direction: '借', accountCode: '6402', accountName: '营业成本-运费', amount: '' },
      { id: 'v32', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '未审核', processor: '吴刚', invoiceItems: ['物流运输费×30票'],
    invoiceRemarks: '1月运输费用结算', invoiceDate: '2026-02-05',
  },
  {
    id: 'INV008', accountingCompany: '成都慧财', accountingCompanyEID: 'E100091', enterpriseName: '成都制造业有限公司', serviceId: 'SV-20240502',
    aiVoucherEntries: [
      { id: 'v33', direction: '借', accountCode: '2221', accountName: '应交税费-增值税', amount: '' },
      { id: 'v34', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'v35', direction: '借', accountCode: '2221', accountName: '应交税费-增值税', amount: '' },
      { id: 'v36', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '已审核', processor: '周敏', reviewer: '林总', reviewTime: '2026-02-18 09:00',
    invoiceItems: ['增值税缴纳'], invoiceRemarks: '1月份增值税申报缴纳', invoiceDate: '2026-02-15',
  },
];

export const bankFlowData: BankFlowRecord[] = [
  {
    id: 'BF001', accountingCompany: '上海云账房', accountingCompanyEID: 'E100021', enterpriseName: '上海贸易有限公司', serviceId: 'SV-20240101',
    aiVoucherEntries: [
      { id: 'bv1', direction: '借', accountCode: '1002', accountName: '银行存款', amount: '' },
      { id: 'bv2', direction: '贷', accountCode: '6001', accountName: '主营业务收入', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv3', direction: '借', accountCode: '1002', accountName: '银行存款', amount: '' },
      { id: 'bv4', direction: '贷', accountCode: '1122', accountName: '应收账款', amount: '' },
    ],
    status: '未审核', processor: '张三丰',
    flowSummary: '收到货款', flowRemarks: '上海XX客户2月货款', counterpartyName: '上海华联商贸', flowDate: '2026-02-20',
  },
  {
    id: 'BF002', accountingCompany: '北京账无忧', accountingCompanyEID: 'E100034', enterpriseName: '北京科技有限公司', serviceId: 'SV-20240203',
    aiVoucherEntries: [
      { id: 'bv5', direction: '借', accountCode: '5602', accountName: '管理费用', amount: '' },
      { id: 'bv6', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv7', direction: '借', accountCode: '5601', accountName: '销售费用-广告费', amount: '' },
      { id: 'bv8', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '已审核', processor: '李丽', reviewer: '王总', reviewTime: '2026-02-21 11:20',
    flowSummary: '支付广告费', flowRemarks: '百度推广费2月', counterpartyName: '百度在线网络', flowDate: '2026-02-15',
  },
  {
    id: 'BF003', accountingCompany: '广州云财税', accountingCompanyEID: 'E100056', enterpriseName: '广州餐饮管理公司', serviceId: 'SV-20240312',
    aiVoucherEntries: [
      { id: 'bv9', direction: '借', accountCode: '2202', accountName: '应付账款', amount: '' },
      { id: 'bv10', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv11', direction: '借', accountCode: '2202', accountName: '应付账款', amount: '' },
      { id: 'bv12', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '未审核', processor: '陈晓',
    flowSummary: '付货款', flowRemarks: '偿还1月食材供应商货款', counterpartyName: '广州鲜丰食材', flowDate: '2026-02-10',
  },
  {
    id: 'BF004', accountingCompany: '深圳智账', accountingCompanyEID: 'E100078', enterpriseName: '深圳电商有限公司', serviceId: 'SV-20240401',
    aiVoucherEntries: [
      { id: 'bv13', direction: '借', accountCode: '5602', accountName: '管理费用-工资', amount: '' },
      { id: 'bv14', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv15', direction: '借', accountCode: '2211', accountName: '应付职工薪酬', amount: '' },
      { id: 'bv16', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '未审核', processor: '王芳',
    flowSummary: '工资发放', flowRemarks: '2月份员工工资', counterpartyName: '代发工资', flowDate: '2026-02-28',
  },
  {
    id: 'BF005', accountingCompany: '杭州账易', accountingCompanyEID: 'E100103', enterpriseName: '杭州互联网公司', serviceId: 'SV-20240601',
    aiVoucherEntries: [
      { id: 'bv17', direction: '借', accountCode: '1002', accountName: '银行存款', amount: '' },
      { id: 'bv18', direction: '贷', accountCode: '6001', accountName: '主营业务收入', amount: '' },
      { id: 'bv19', direction: '贷', accountCode: '2221', accountName: '应交税费-增值税', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv20', direction: '借', accountCode: '1002', accountName: '银行存款', amount: '' },
      { id: 'bv21', direction: '贷', accountCode: '1122', accountName: '应收账款', amount: '' },
    ],
    status: '未审核', processor: '赵磊',
    flowSummary: '收到服务款', flowRemarks: '云服务年费收款', counterpartyName: '杭州融远科技', flowDate: '2026-02-12',
  },
  {
    id: 'BF006', accountingCompany: '南京财智', accountingCompanyEID: 'E100128', enterpriseName: '南京零售有限公司', serviceId: 'SV-20240801',
    aiVoucherEntries: [
      { id: 'bv22', direction: '借', accountCode: '2221', accountName: '应交税费', amount: '' },
      { id: 'bv23', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv24', direction: '借', accountCode: '2221', accountName: '应交税费-增值税', amount: '' },
      { id: 'bv25', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    status: '已审核', processor: '孙悦', reviewer: '何总', reviewTime: '2026-02-23 15:45',
    flowSummary: '缴纳增值税', flowRemarks: '2026年1月增值税', counterpartyName: '国家税务局', flowDate: '2026-02-17',
  },
  {
    id: 'BF007', accountingCompany: '重庆智税', accountingCompanyEID: 'E100156', enterpriseName: '重庆物流有限公司', serviceId: 'SV-20241001',
    aiVoucherEntries: [
      { id: 'bv26', direction: '借', accountCode: '1002', accountName: '银行存款', amount: '' },
      { id: 'bv27', direction: '贷', accountCode: '6001', accountName: '主营业务收入', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv28', direction: '借', accountCode: '1002', accountName: '银行存款', amount: '' },
      { id: 'bv29', direction: '贷', accountCode: '6001', accountName: '主营业务收入-运费', amount: '' },
      { id: 'bv30', direction: '贷', accountCode: '2221', accountName: '应交税费-增值税销项税', amount: '' },
    ],
    status: '未审核', processor: '吴刚',
    flowSummary: '运费收款', flowRemarks: '重庆到成都干线运费', counterpartyName: '成都物流园', flowDate: '2026-02-08',
  },
  {
    id: 'BF008', accountingCompany: '苏州账云', accountingCompanyEID: 'E100167', enterpriseName: '苏州精密制造有限公司', serviceId: 'SV-20241102',
    aiVoucherEntries: [
      { id: 'bv31', direction: '借', accountCode: '1403', accountName: '原材料', amount: '' },
      { id: 'bv32', direction: '贷', accountCode: '1002', accountName: '银行存款', amount: '' },
    ],
    userVoucherEntries: [
      { id: 'bv33', direction: '借', accountCode: '1403', accountName: '原材料', amount: '' },
      { id: 'bv34', direction: '借', accountCode: '2221', accountName: '应交税费-进项税额', amount: '' },
      { id: 'bv35', direction: '贷', accountCode: '2202', accountName: '应付账款', amount: '' },
    ],
    status: '未审核', processor: '周敏',
    flowSummary: '采购付款', flowRemarks: '精密零件采购款', counterpartyName: '无锡精工材料', flowDate: '2026-02-22',
  },
];

const baseVouchers = (dir1: '借' | '贷', acc1: string, name1: string, dir2: '借' | '贷', acc2: string, name2: string) => [
  { id: Math.random().toString(36).slice(2), direction: dir1, accountCode: acc1, accountName: name1 },
  { id: Math.random().toString(36).slice(2), direction: dir2, accountCode: acc2, accountName: name2 },
];

export const rulesData: AccountingRule[] = [
  // 商贸行业 - 流水
  {
    id: 'R001', industry: '商贸', businessType: '商品销售收款', keywords: ['货款', '销售款', '收款', '回款'],
    voucherEntries: baseVouchers('借', '1002', '银行存款', '贷', '1122', '应收账款'),
    type: 'bankflow', createdAt: '2025-10-01', updatedAt: '2026-01-15',
  },
  {
    id: 'R002', industry: '商贸', businessType: '采购付款', keywords: ['采购', '进货', '货款', '供应商'],
    voucherEntries: baseVouchers('借', '2202', '应付账款', '贷', '1002', '银行存款'),
    type: 'bankflow', createdAt: '2025-10-01', updatedAt: '2026-01-20',
  },
  {
    id: 'R003', industry: '商贸', businessType: '工资发放', keywords: ['工资', '薪酬', '薪资', '代发'],
    voucherEntries: baseVouchers('借', '2211', '应付职工薪酬', '贷', '1002', '银行存款'),
    type: 'bankflow', createdAt: '2025-10-05', updatedAt: '2026-02-01',
  },
  {
    id: 'R004', industry: '商贸', businessType: '增值税缴纳', keywords: ['增值税', '税款', '国税', '税务'],
    voucherEntries: baseVouchers('借', '2221', '应交税费-增值税', '贷', '1002', '银行存款'),
    type: 'bankflow', createdAt: '2025-10-10', updatedAt: '2026-01-28',
  },
  {
    id: 'R005', industry: '商贸', businessType: '销售费用支出', keywords: ['广告', '推广', '促销', '营销'],
    voucherEntries: baseVouchers('借', '5601', '销售费用', '贷', '1002', '银行存款'),
    type: 'bankflow', createdAt: '2025-11-01', updatedAt: '2026-01-10',
  },
  // 商贸行业 - 发票
  {
    id: 'R006', industry: '商贸', businessType: '商品采购', keywords: ['采购', '进货', '商品', '库存'],
    voucherEntries: [
      { id: 'rv1', direction: '借', accountCode: '1401', accountName: '库存商品' },
      { id: 'rv2', direction: '借', accountCode: '2221', accountName: '应交税费-进项税额' },
      { id: 'rv3', direction: '贷', accountCode: '2202', accountName: '应付账款' },
    ],
    type: 'invoice', createdAt: '2025-10-01', updatedAt: '2026-01-22',
  },
  {
    id: 'R007', industry: '商贸', businessType: '商品销售', keywords: ['销售', '出售', '商品', '零售'],
    voucherEntries: [
      { id: 'rv4', direction: '借', accountCode: '1122', accountName: '应收账款' },
      { id: 'rv5', direction: '贷', accountCode: '6001', accountName: '主营业务收入' },
      { id: 'rv6', direction: '贷', accountCode: '2221', accountName: '应交税费-增值税销项税' },
    ],
    type: 'invoice', createdAt: '2025-10-01', updatedAt: '2026-02-05',
  },
  {
    id: 'R008', industry: '商贸', businessType: '办公费用', keywords: ['办公', '文具', '耗材', '行政'],
    voucherEntries: baseVouchers('借', '5602', '管理费用-办公费', '贷', '1002', '银行存款'),
    type: 'invoice', createdAt: '2025-10-15', updatedAt: '2025-12-20',
  },
  // 服务业
  {
    id: 'R009', industry: '服务业', businessType: '服务收款', keywords: ['服务费', '咨询费', '顾问费', '技术服务'],
    voucherEntries: baseVouchers('借', '1002', '银行存款', '贷', '6001', '主营业务收入'),
    type: 'bankflow', createdAt: '2025-11-05', updatedAt: '2026-01-30',
  },
  {
    id: 'R010', industry: '服务业', businessType: '差旅费报销', keywords: ['差旅', '出差', '交通', '住宿'],
    voucherEntries: baseVouchers('借', '5601', '销售费用-差旅费', '贷', '1001', '库存现金'),
    type: 'invoice', createdAt: '2025-11-10', updatedAt: '2026-02-12',
  },
  // 制造业
  {
    id: 'R011', industry: '制造业', businessType: '原材料采购', keywords: ['原材料', '钢材', '零件', '原料'],
    voucherEntries: [
      { id: 'rv7', direction: '借', accountCode: '1403', accountName: '原材料' },
      { id: 'rv8', direction: '借', accountCode: '2221', accountName: '应交税费-进项税额' },
      { id: 'rv9', direction: '贷', accountCode: '2202', accountName: '应付账款' },
    ],
    type: 'invoice', createdAt: '2025-12-01', updatedAt: '2026-01-18',
  },
  {
    id: 'R012', industry: '制造业', businessType: '产品销售', keywords: ['销售', '出库', '产品', '成品'],
    voucherEntries: [
      { id: 'rv10', direction: '借', accountCode: '1122', accountName: '应收账款' },
      { id: 'rv11', direction: '贷', accountCode: '6001', accountName: '主营业务收入' },
      { id: 'rv12', direction: '贷', accountCode: '2221', accountName: '应交税费-增值税销项税' },
    ],
    type: 'invoice', createdAt: '2025-12-01', updatedAt: '2026-02-08',
  },
  // IT行业
  {
    id: 'R013', industry: 'IT/互联网', businessType: '软件服务收入', keywords: ['软件', 'SaaS', '订阅', '年费'],
    voucherEntries: baseVouchers('借', '1122', '应收账款', '贷', '6001', '主营业务收入'),
    type: 'invoice', createdAt: '2025-12-15', updatedAt: '2026-02-01',
  },
  {
    id: 'R014', industry: 'IT/互联网', businessType: '服务器采购', keywords: ['服务器', '云服务', '硬件', '设备'],
    voucherEntries: baseVouchers('借', '1601', '固定资产', '贷', '2202', '应付账款'),
    type: 'invoice', createdAt: '2026-01-05', updatedAt: '2026-02-10',
  },
  // 餐饮
  {
    id: 'R015', industry: '餐饮', businessType: '食材采购', keywords: ['食材', '蔬菜', '肉类', '调料'],
    voucherEntries: [
      { id: 'rv13', direction: '借', accountCode: '1403', accountName: '原材料-食材' },
      { id: 'rv14', direction: '贷', accountCode: '2202', accountName: '应付账款' },
    ],
    type: 'invoice', createdAt: '2026-01-10', updatedAt: '2026-02-15',
  },
];
