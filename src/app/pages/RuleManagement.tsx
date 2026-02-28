import { useState, useMemo } from 'react';
import { Search, Plus, Edit3, Trash2, Tag, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { RuleEditModal } from '../components/RuleEditModal';
import { rulesData } from '../data/mockData';
import type { AccountingRule, VoucherEntry } from '../types';

const INDUSTRY_COLORS: Record<string, string> = {
  '商贸': 'bg-blue-50 text-blue-700 border-blue-200',
  '服务业': 'bg-purple-50 text-purple-700 border-purple-200',
  '制造业': 'bg-orange-50 text-orange-700 border-orange-200',
  '餐饮': 'bg-red-50 text-red-700 border-red-200',
  'IT/互联网': 'bg-green-50 text-green-700 border-green-200',
  '建筑': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  '物流运输': 'bg-sky-50 text-sky-700 border-sky-200',
};

function IndustryTag({ industry }: { industry: string }) {
  const cls = INDUSTRY_COLORS[industry] || 'bg-gray-50 text-gray-700 border-gray-200';
  return <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${cls}`}>{industry}</span>;
}

function VoucherEntryList({ entries }: { entries: VoucherEntry[] }) {
  const max = 2;
  const display = entries.slice(0, max);
  const hasMore = entries.length > max;
  const content = (
    <div>
      {display.map(e => (
        <div key={e.id} className="flex items-center gap-1 text-xs py-0.5">
          <span className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded text-[10px] font-semibold flex-shrink-0 ${e.direction === '借' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
            {e.direction}
          </span>
          <span className="text-gray-600">{e.accountCode && <span className="text-gray-400">{e.accountCode} </span>}{e.accountName}</span>
        </div>
      ))}
      {hasMore && <div className="text-[11px] text-blue-500">+{entries.length - max}行...</div>}
    </div>
  );
  if (!hasMore) return content;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><div className="cursor-help">{content}</div></TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 border-gray-700 p-3">
          <div className="text-[11px] text-gray-400 mb-1.5">完整凭证分录</div>
          {entries.map(e => (
            <div key={e.id} className="flex items-center gap-1 text-xs py-0.5">
              <span className={`inline-flex items-center justify-center w-[16px] h-[16px] rounded text-[10px] font-semibold ${e.direction === '借' ? 'bg-blue-500/30 text-blue-300' : 'bg-orange-500/30 text-orange-300'}`}>{e.direction}</span>
              <span className="text-gray-300">{e.accountCode && <span className="text-gray-500">{e.accountCode} </span>}{e.accountName}</span>
            </div>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function KeywordTags({ keywords, maxShow = 3 }: { keywords: string[]; maxShow?: number }) {
  if (!keywords.length) return <span className="text-gray-400 text-xs">—</span>;
  const display = keywords.slice(0, maxShow);
  const hasMore = keywords.length > maxShow;
  const content = (
    <div className="flex flex-wrap gap-1">
      {display.map(kw => (
        <span key={kw} className="inline-flex items-center px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[11px]">
          <Tag size={9} className="mr-0.5" />{kw}
        </span>
      ))}
      {hasMore && <span className="text-xs text-blue-500">+{keywords.length - maxShow}</span>}
    </div>
  );
  if (!hasMore) return content;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><div className="cursor-help">{content}</div></TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 border-gray-700 p-3 max-w-[200px]">
          <div className="text-[11px] text-gray-400 mb-1.5">全部关键词</div>
          <div className="flex flex-wrap gap-1">
            {keywords.map(kw => (
              <span key={kw} className="inline-flex items-center px-1.5 py-0.5 bg-white/10 text-gray-200 rounded text-[11px]">{kw}</span>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type TabType = 'bankflow' | 'invoice';

export function RuleManagement() {
  const [rules, setRules] = useState<AccountingRule[]>(rulesData);
  const [activeTab, setActiveTab] = useState<TabType>('bankflow');
  const [searchText, setSearchText] = useState('');
  const [industryFilter, setIndustryFilter] = useState('商贸');
  const [editTarget, setEditTarget] = useState<AccountingRule | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AccountingRule | null>(null);
  const [expandedKeywords, setExpandedKeywords] = useState<Set<string>>(new Set());

  const industries = [...new Set(rulesData.map(r => r.industry))];

  const filtered = useMemo(() => {
    return rules.filter(r => {
      if (r.type !== activeTab) return false;
      if (industryFilter && r.industry !== industryFilter) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        return r.businessType.toLowerCase().includes(q) ||
          r.keywords.some(k => k.includes(searchText)) ||
          r.industry.includes(searchText);
      }
      return true;
    });
  }, [rules, activeTab, industryFilter, searchText]);

  const handleEdit = (data: { industry: string; businessType: string; keywords: string[]; voucherEntries: VoucherEntry[] }) => {
    if (!editTarget) return;
    setRules(prev => prev.map(r => r.id === editTarget.id
      ? { ...r, ...data, updatedAt: new Date().toISOString().split('T')[0] }
      : r
    ));
    setEditTarget(null);
  };

  const handleAdd = (data: { industry: string; businessType: string; keywords: string[]; voucherEntries: VoucherEntry[] }) => {
    const newRule: AccountingRule = {
      id: `R${Date.now()}`,
      ...data,
      type: activeTab,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRules(prev => [newRule, ...prev]);
    setAddOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setRules(prev => prev.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const toggleKeywords = (id: string) => {
    setExpandedKeywords(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const thClass = "px-3 py-2.5 text-left text-xs text-gray-500 font-medium whitespace-nowrap bg-gray-50";
  const tdClass = "px-3 py-3 text-sm align-top";

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">规则管理</h1>
          <p className="text-sm text-gray-500 mt-1">维护AI记账凭证规则库，支持添加、编辑和管理关键词</p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
          <Plus size={15} />添加{activeTab === 'bankflow' ? '流水' : '发票'}规则
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 bg-white rounded-xl shadow-sm border border-gray-100 p-1 w-fit">
        {[
          { key: 'bankflow' as TabType, label: '流水记账规则' },
          { key: 'invoice' as TabType, label: '发票记账规则' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setIndustryFilter('商贸'); }}
            className={`px-5 py-1.5 rounded-lg text-sm transition-all font-medium ${activeTab === tab.key
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-semibold px-1
              ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {rules.filter(r => r.type === tab.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
            <Input className="pl-8 h-9 text-sm" placeholder="搜索业务类型、关键词..."
              value={searchText} onChange={e => setSearchText(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 whitespace-nowrap">按行业：</span>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setIndustryFilter('')}
                className={`px-3 py-1 rounded-full text-xs border transition-all ${!industryFilter ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
              >全部</button>
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setIndustryFilter(industryFilter === ind ? '' : ind)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${industryFilter === ind ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">
          共 <b className="text-gray-700">{filtered.length}</b> 条规则
          {industryFilter && <span className="ml-1">（{industryFilter}行业）</span>}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-gray-100">
              <tr>
                <th className={thClass}>行业</th>
                <th className={thClass}>业务类型</th>
                <th className={`${thClass} min-w-[200px]`}>关键词</th>
                <th className={`${thClass} min-w-[200px]`}>凭证模板</th>
                <th className={thClass}>创建时间</th>
                <th className={thClass}>更新时间</th>
                <th className={thClass}>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(rule => (
                <tr key={rule.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className={tdClass}><IndustryTag industry={rule.industry} /></td>
                  <td className={tdClass}>
                    <span className="text-sm text-gray-800 font-medium">{rule.businessType}</span>
                  </td>
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <KeywordTags keywords={rule.keywords} maxShow={expandedKeywords.has(rule.id) ? 99 : 3} />
                      {rule.keywords.length > 3 && (
                        <button
                          onClick={() => toggleKeywords(rule.id)}
                          className="text-[11px] text-blue-500 hover:text-blue-700 flex items-center gap-0.5"
                        >
                          {expandedKeywords.has(rule.id) ? <><ChevronUp size={11} />收起</> : <><ChevronDown size={11} />展开全部关键词</>}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className={tdClass}>
                    <VoucherEntryList entries={rule.voucherEntries} />
                  </td>
                  <td className={tdClass}><span className="text-xs text-gray-400">{rule.createdAt}</span></td>
                  <td className={tdClass}><span className="text-xs text-gray-400">{rule.updatedAt}</span></td>
                  <td className={`${tdClass} pt-3`}>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => setEditTarget(rule)}
                        className="h-6 text-xs px-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                        <Edit3 size={11} className="mr-1" />编辑
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDeleteTarget(rule)}
                        className="h-6 text-xs px-2 text-red-500 border-red-200 hover:bg-red-50">
                        <Trash2 size={11} className="mr-1" />删除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-gray-400 text-sm mb-2">暂无规则数据</div>
            <Button size="sm" onClick={() => setAddOpen(true)} className="h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white gap-1">
              <Plus size={14} />添加第一条规则
            </Button>
          </div>
        )}
      </div>

      {/* Add Rule Modal */}
      <RuleEditModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
        title={`添加${activeTab === 'bankflow' ? '流水' : '发票'}记账规则`}
        initialData={{ industry: '商贸', businessType: '', keywords: [], voucherEntries: [
          { id: '1', direction: '借', accountCode: '', accountName: '' },
          { id: '2', direction: '贷', accountCode: '', accountName: '' },
        ]}}
      />

      {/* Edit Rule Modal */}
      <RuleEditModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
        initialData={editTarget ? {
          industry: editTarget.industry,
          businessType: editTarget.businessType,
          keywords: editTarget.keywords,
          voucherEntries: editTarget.voucherEntries,
        } : undefined}
        title="编辑记账规则"
      />

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">确认删除规则</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p className="text-sm text-gray-600">确认删除以下规则？此操作不可撤销。</p>
            {deleteTarget && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex gap-2"><span className="text-gray-500 w-16">行业</span><span>{deleteTarget.industry}</span></div>
                <div className="flex gap-2 mt-1"><span className="text-gray-500 w-16">业务类型</span><span>{deleteTarget.businessType}</span></div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)} className="h-8 text-sm">取消</Button>
            <Button size="sm" onClick={handleDelete} className="h-8 text-sm bg-red-600 hover:bg-red-700 text-white">确认删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
