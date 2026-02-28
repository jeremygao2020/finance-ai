import { useState, useMemo } from 'react';
import { Search, Calendar, CheckCircle, Edit3, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { VoucherDisplay } from '../components/VoucherDisplay';
import { RuleEditModal } from '../components/RuleEditModal';
import { invoiceData } from '../data/mockData';
import type { InvoiceRecord, VoucherEntry } from '../types';

function StatusBadge({ status }: { status: '未审核' | '已审核' }) {
  if (status === '已审核') {
    return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />已审核
    </span>;
  }
  return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />未审核
  </span>;
}

function InvoiceItemsDisplay({ items }: { items: string[] }) {
  if (!items || items.length === 0) return <span className="text-gray-400 text-xs">—</span>;
  const max = 2;
  const display = items.slice(0, max);
  const hasMore = items.length > max;
  const content = (
    <div>
      {display.map((item, i) => <div key={i} className="text-xs text-gray-700">{item}</div>)}
      {hasMore && <div className="text-xs text-blue-500">+{items.length - max}项...</div>}
    </div>
  );
  if (!hasMore) return content;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">{content}</div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 border-gray-700 p-3">
          <div className="text-[11px] text-gray-400 mb-1.5">完整发票明细</div>
          {items.map((item, i) => <div key={i} className="text-xs text-gray-200">{item}</div>)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function InvoiceAnnotation() {
  const [records, setRecords] = useState<InvoiceRecord[]>(invoiceData);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(true);
  const [reviewTarget, setReviewTarget] = useState<InvoiceRecord | null>(null);
  const [editTarget, setEditTarget] = useState<InvoiceRecord | null>(null);
  const [batchReviewOpen, setBatchReviewOpen] = useState(false);

  const [filters, setFilters] = useState({
    company: '', eID: '', enterprise: '', serviceId: '',
    invoiceItem: '', remarks: '', startDate: '', endDate: '',
  });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (filters.company && !r.accountingCompany.includes(filters.company)) return false;
      if (filters.eID && !r.accountingCompanyEID.includes(filters.eID)) return false;
      if (filters.enterprise && !r.enterpriseName.includes(filters.enterprise)) return false;
      if (filters.serviceId && !r.serviceId.includes(filters.serviceId)) return false;
      if (filters.invoiceItem && !r.invoiceItems.join(',').includes(filters.invoiceItem)) return false;
      if (filters.remarks && !r.invoiceRemarks.includes(filters.remarks)) return false;
      if (filters.startDate && r.invoiceDate < filters.startDate) return false;
      if (filters.endDate && r.invoiceDate > filters.endDate) return false;
      return true;
    });
  }, [records, filters]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };
  const toggleAll = () => {
    const ids = paged.map(r => r.id);
    const allSelected = ids.every(id => selected.has(id));
    if (allSelected) {
      setSelected(prev => { const s = new Set(prev); ids.forEach(id => s.delete(id)); return s; });
    } else {
      setSelected(prev => { const s = new Set(prev); ids.forEach(id => s.add(id)); return s; });
    }
  };

  const doReview = (id: string) => {
    setRecords(prev => prev.map(r => r.id === id
      ? { ...r, status: '已审核', reviewer: '张三丰', reviewTime: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-') }
      : r
    ));
    setReviewTarget(null);
  };

  const doBatchReview = () => {
    const now = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
    setRecords(prev => prev.map(r =>
      selected.has(r.id) && r.status === '未审核'
        ? { ...r, status: '已审核', reviewer: '张三丰', reviewTime: now }
        : r
    ));
    setSelected(new Set());
    setBatchReviewOpen(false);
  };

  const doEdit = (data: { industry: string; businessType: string; keywords: string[]; voucherEntries: VoucherEntry[] }) => {
    if (!editTarget) return;
    setRecords(prev => prev.map(r => r.id === editTarget.id
      ? { ...r, userVoucherEntries: data.voucherEntries }
      : r
    ));
    setEditTarget(null);
  };

  const resetFilters = () => {
    setFilters({ company: '', eID: '', enterprise: '', serviceId: '', invoiceItem: '', remarks: '', startDate: '', endDate: '' });
    setPage(1);
  };

  const selectedUnreviewed = [...selected].filter(id => records.find(r => r.id === id)?.status === '未审核');
  const thClass = "px-3 py-2.5 text-left text-xs text-gray-500 font-medium whitespace-nowrap bg-gray-50";
  const tdClass = "px-3 py-2.5 text-sm align-top";

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">发票标注</h1>
          <p className="text-sm text-gray-500 mt-1">审核AI推荐的发票记账凭证规则，标注并反哺模型</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm" onClick={() => setFilterOpen(v => !v)}>
          <Filter size={14} />{filterOpen ? '收起筛选' : '展开筛选'}
          {filterOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </Button>
      </div>

      {/* Filters */}
      {filterOpen && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '代账公司名称', key: 'company', icon: true },
              { label: '代账公司eID', key: 'eID', icon: true },
              { label: '企业名称', key: 'enterprise', icon: true },
              { label: '服务ID', key: 'serviceId', icon: true },
            ].map(f => (
              <div key={f.key} className="relative">
                {f.icon && <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />}
                <Input className="pl-8 h-9 text-sm" placeholder={f.label}
                  value={filters[f.key as keyof typeof filters]}
                  onChange={e => { setFilters({ ...filters, [f.key]: e.target.value }); setPage(1); }} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              <Input className="pl-8 h-9 text-sm" placeholder="发票项目名称"
                value={filters.invoiceItem}
                onChange={e => { setFilters({ ...filters, invoiceItem: e.target.value }); setPage(1); }} />
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              <Input className="pl-8 h-9 text-sm" placeholder="发票备注"
                value={filters.remarks}
                onChange={e => { setFilters({ ...filters, remarks: e.target.value }); setPage(1); }} />
            </div>
            <div className="relative">
              <Calendar size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              <Input type="date" className="pl-8 h-9 text-sm" placeholder="发票起始日期"
                value={filters.startDate}
                onChange={e => { setFilters({ ...filters, startDate: e.target.value }); setPage(1); }} />
            </div>
            <div className="relative">
              <Calendar size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
              <Input type="date" className="pl-8 h-9 text-sm" placeholder="发票结束日期"
                value={filters.endDate}
                onChange={e => { setFilters({ ...filters, endDate: e.target.value }); setPage(1); }} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-500 gap-1" onClick={resetFilters}>
              <X size={12} />重置筛选
            </Button>
          </div>
        </div>
      )}

      {/* Batch bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2.5 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          共 <b className="text-gray-700">{filtered.length}</b> 条记录
          {selected.size > 0 && <span className="ml-2 text-blue-600">，已选 <b>{selected.size}</b> 条</span>}
        </span>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1 text-green-700 border-green-300 hover:bg-green-50"
                onClick={() => setBatchReviewOpen(true)} disabled={selectedUnreviewed.length === 0}>
                <CheckCircle size={12} />批量审核 ({selectedUnreviewed.length})
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1"
                onClick={() => setEditTarget(records.find(r => r.id === [...selected][0]) || null)}>
                <Edit3 size={12} />批量修改规则
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px]">
            <thead className="border-b border-gray-100">
              <tr>
                <th className={`${thClass} w-10 px-3`}>
                  <Checkbox
                    checked={paged.length > 0 && paged.every(r => selected.has(r.id))}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className={thClass}>代账公司</th>
                <th className={thClass}>企业名称</th>
                <th className={thClass}>服务ID</th>
                <th className={`${thClass} min-w-[160px]`}>AI推荐凭证规则</th>
                <th className={`${thClass} min-w-[160px]`}>用户修正凭证规则</th>
                <th className={thClass}>状态</th>
                <th className={thClass}>当前处理人</th>
                <th className={thClass}>审核人</th>
                <th className={thClass}>审核时间</th>
                <th className={`${thClass} min-w-[120px]`}>发票明细</th>
                <th className={thClass}>发票备注</th>
                <th className={thClass}>发票日期</th>
                <th className={thClass}>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.map(row => (
                <tr key={row.id} className={`hover:bg-blue-50/20 transition-colors ${selected.has(row.id) ? 'bg-blue-50/30' : ''}`}>
                  <td className={`${tdClass} w-10 pt-3`}>
                    <Checkbox checked={selected.has(row.id)} onCheckedChange={() => toggleSelect(row.id)} />
                  </td>
                  <td className={tdClass}>
                    <div className="text-xs font-medium text-gray-800">{row.accountingCompany}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{row.accountingCompanyEID}</div>
                  </td>
                  <td className={tdClass}><span className="text-xs">{row.enterpriseName}</span></td>
                  <td className={tdClass}><span className="text-xs text-gray-500">{row.serviceId}</span></td>
                  <td className={tdClass}>
                    <VoucherDisplay entries={row.aiVoucherEntries} />
                  </td>
                  <td className={tdClass}>
                    <VoucherDisplay entries={row.userVoucherEntries} />
                  </td>
                  <td className={`${tdClass} pt-3`}><StatusBadge status={row.status} /></td>
                  <td className={tdClass}><span className="text-xs">{row.processor}</span></td>
                  <td className={tdClass}><span className="text-xs text-gray-500">{row.reviewer || '—'}</span></td>
                  <td className={tdClass}><span className="text-xs text-gray-400">{row.reviewTime || '—'}</span></td>
                  <td className={tdClass}><InvoiceItemsDisplay items={row.invoiceItems} /></td>
                  <td className={tdClass}><span className="text-xs text-gray-600">{row.invoiceRemarks}</span></td>
                  <td className={tdClass}><span className="text-xs text-gray-500">{row.invoiceDate}</span></td>
                  <td className={`${tdClass} pt-3`}>
                    <div className="flex flex-col gap-1.5">
                      <Button size="sm"
                        onClick={() => setReviewTarget(row)}
                        disabled={row.status === '已审核'}
                        className={`h-6 text-xs px-2.5 ${row.status === '已审核' ? 'bg-gray-100 text-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                        <CheckCircle size={11} className="mr-1" />审核规则
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditTarget(row)}
                        className="h-6 text-xs px-2.5 text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Edit3 size={11} className="mr-1" />修改规则
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paged.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">暂无数据</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">第 {page} / {totalPages} 页</span>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="h-7 px-3 text-xs">上一页</Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Button key={p} variant={p === page ? 'default' : 'outline'} size="sm"
                  onClick={() => setPage(p)} className={`h-7 w-7 p-0 text-xs ${p === page ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' : ''}`}>
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="h-7 px-3 text-xs">下一页</Button>
            </div>
          </div>
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={!!reviewTarget} onOpenChange={() => setReviewTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />审核凭证规则
            </DialogTitle>
          </DialogHeader>
          <div className="py-3 space-y-3">
            <p className="text-sm text-gray-600">确认对以下企业的凭证规则进行审核通过？</p>
            {reviewTarget && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1.5">
                <div className="flex gap-2"><span className="text-gray-500 w-16 flex-shrink-0">企业</span><span className="text-gray-800 font-medium">{reviewTarget.enterpriseName}</span></div>
                <div className="flex gap-2"><span className="text-gray-500 w-16 flex-shrink-0">代账公司</span><span className="text-gray-700">{reviewTarget.accountingCompany}</span></div>
                <div className="flex gap-2 mt-2"><span className="text-gray-500 w-16 flex-shrink-0">修正规则</span>
                  <div className="flex-1">
                    <VoucherDisplay entries={reviewTarget.userVoucherEntries} />
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-amber-600 bg-amber-50 rounded p-2">审核通过后，该规则将标记为已审核并纳入模型训练集</p>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setReviewTarget(null)} className="h-8 text-sm">取消</Button>
            <Button size="sm" onClick={() => reviewTarget && doReview(reviewTarget.id)} className="h-8 text-sm bg-green-600 hover:bg-green-700 text-white">
              确认审核通过
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Review Dialog */}
      <Dialog open={batchReviewOpen} onOpenChange={setBatchReviewOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">批量审核规则</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p className="text-sm text-gray-600">确认批量审核 <b className="text-green-700">{selectedUnreviewed.length}</b> 条未审核的凭证规则？</p>
            <p className="text-xs text-amber-600 bg-amber-50 rounded p-2 mt-3">审核通过的规则将纳入模型训练集，请确保规则正确</p>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setBatchReviewOpen(false)} className="h-8 text-sm">取消</Button>
            <Button size="sm" onClick={doBatchReview} className="h-8 text-sm bg-green-600 hover:bg-green-700 text-white">确认批量审核</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <RuleEditModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSave={doEdit}
        initialData={editTarget ? {
          industry: '商贸',
          businessType: '',
          keywords: [],
          voucherEntries: editTarget.userVoucherEntries,
        } : undefined}
        title="修改凭证规则"
      />
    </div>
  );
}
