import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Plus, Trash2 } from 'lucide-react';
import type { VoucherEntry } from '../types';

interface RuleEditData {
  industry: string;
  businessType: string;
  keywords: string[];
  voucherEntries: VoucherEntry[];
}

interface RuleEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: RuleEditData) => void;
  initialData?: Partial<RuleEditData>;
  title?: string;
}

const INDUSTRIES = ['商贸', '服务业', '制造业', '餐饮', 'IT/互联网', '建筑', '物流运输', '房地产', '医疗', '教育'];
const BUSINESS_TYPES: Record<string, string[]> = {
  '商贸': ['商品销售', '商品采购', '工资发放', '办公费用', '税款缴纳', '销售费用', '其他'],
  '服务业': ['服务收款', '差旅费报销', '工资发放', '咨询费用', '其他'],
  '制造业': ['原材料采购', '产品销售', '设备采购', '工资发放', '税款缴纳', '其他'],
  '餐饮': ['食材采购', '营业收款', '工资发放', '水电费', '其他'],
  'IT/互联网': ['软件服务收入', '服务器采购', '广告推广', '研发费用', '其他'],
  '建筑': ['材料采购', '工程结算', '工资发放', '税款缴纳', '其他'],
  '物流运输': ['运费收款', '运费支出', '油费', '维修费', '其他'],
  '房地产': ['预售款收取', '工程款支付', '土地款', '其他'],
  '医疗': ['医疗服务收入', '药品采购', '设备采购', '工资发放', '其他'],
  '教育': ['学费收入', '课时费', '设备采购', '工资发放', '其他'],
};

export function RuleEditModal({ open, onClose, onSave, initialData, title = '修改规则' }: RuleEditModalProps) {
  const [industry, setIndustry] = useState(initialData?.industry || '商贸');
  const [businessType, setBusinessType] = useState(initialData?.businessType || '');
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');
  const [voucherEntries, setVoucherEntries] = useState<VoucherEntry[]>(
    initialData?.voucherEntries || [
      { id: '1', direction: '借', accountCode: '', accountName: '' },
      { id: '2', direction: '贷', accountCode: '', accountName: '' },
    ]
  );

  useEffect(() => {
    if (open && initialData) {
      setIndustry(initialData.industry || '商贸');
      setBusinessType(initialData.businessType || '');
      setKeywords(initialData.keywords || []);
      setVoucherEntries(initialData.voucherEntries || [
        { id: '1', direction: '借', accountCode: '', accountName: '' },
        { id: '2', direction: '贷', accountCode: '', accountName: '' },
      ]);
    }
  }, [open, initialData]);

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && !keywords.includes(kw)) {
      setKeywords([...keywords, kw]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const addVoucherEntry = (direction: '借' | '贷') => {
    setVoucherEntries([...voucherEntries, {
      id: Date.now().toString(),
      direction,
      accountCode: '',
      accountName: '',
    }]);
  };

  const removeVoucherEntry = (id: string) => {
    setVoucherEntries(voucherEntries.filter(e => e.id !== id));
  };

  const updateVoucherEntry = (id: string, field: keyof VoucherEntry, value: string) => {
    setVoucherEntries(voucherEntries.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const handleSave = () => {
    onSave({ industry, businessType, keywords, voucherEntries });
    onClose();
  };

  const businessTypes = BUSINESS_TYPES[industry] || ['其他'];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Industry & Business Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">行业</Label>
              <Select value={industry} onValueChange={(v) => { setIndustry(v); setBusinessType(''); }}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">业务类型</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="选择业务类型" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map(bt => (
                    <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label className="text-sm">关键词</Label>
            <div className="flex gap-2">
              <Input
                className="h-9 text-sm flex-1"
                placeholder="输入关键词后按 Enter 或点击添加"
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addKeyword()}
              />
              <Button variant="outline" size="sm" onClick={addKeyword} className="h-9 px-3">
                <Plus size={14} className="mr-1" />添加
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {keywords.map(kw => (
                  <span key={kw} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-xs">
                    {kw}
                    <button onClick={() => removeKeyword(kw)} className="hover:text-blue-900">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Voucher Template */}
          <div className="space-y-2">
            <Label className="text-sm">借贷方凭证模板</Label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 grid grid-cols-[60px_1fr_1fr_36px] gap-2 px-3 py-2 text-xs text-gray-500 font-medium">
                <span>借/贷</span>
                <span>科目编码</span>
                <span>科目名称</span>
                <span></span>
              </div>
              <div className="divide-y divide-gray-100">
                {voucherEntries.map((entry) => (
                  <div key={entry.id} className="grid grid-cols-[60px_1fr_1fr_36px] gap-2 px-3 py-1.5 items-center">
                    <Select value={entry.direction} onValueChange={(v) => updateVoucherEntry(entry.id, 'direction', v as '借' | '贷')}>
                      <SelectTrigger className="h-7 text-xs border-0 bg-transparent p-0 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="借">
                          <span className="text-blue-600 font-medium">借</span>
                        </SelectItem>
                        <SelectItem value="贷">
                          <span className="text-orange-600 font-medium">贷</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      className="h-7 text-xs"
                      placeholder="如 1002"
                      value={entry.accountCode}
                      onChange={e => updateVoucherEntry(entry.id, 'accountCode', e.target.value)}
                    />
                    <Input
                      className="h-7 text-xs"
                      placeholder="如 银行存款"
                      value={entry.accountName}
                      onChange={e => updateVoucherEntry(entry.id, 'accountName', e.target.value)}
                    />
                    <button
                      onClick={() => removeVoucherEntry(entry.id)}
                      className="flex items-center justify-center w-7 h-7 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => addVoucherEntry('借')} className="h-7 text-xs px-3 text-blue-600 border-blue-200 hover:bg-blue-50">
                <Plus size={12} className="mr-1" />添加借方
              </Button>
              <Button variant="outline" size="sm" onClick={() => addVoucherEntry('贷')} className="h-7 text-xs px-3 text-orange-600 border-orange-200 hover:bg-orange-50">
                <Plus size={12} className="mr-1" />添加贷方
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={onClose} className="h-8 text-sm">取消</Button>
          <Button onClick={handleSave} className="h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white">保存规则</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
