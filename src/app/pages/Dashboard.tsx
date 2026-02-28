import { useState, useMemo } from 'react';
import { Search, TrendingUp, Building2, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { dashboardData } from '../data/mockData';
import type { DashboardRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

function AccuracyBadge({ value }: { value: number }) {
  const color = value >= 90 ? 'text-green-600 bg-green-50 border-green-200'
    : value >= 80 ? 'text-yellow-600 bg-yellow-50 border-yellow-200'
    : 'text-red-600 bg-red-50 border-red-200';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs border font-medium ${color}`}>
      {value.toFixed(1)}%
    </span>
  );
}

type SortKey = keyof DashboardRecord;
type SortDir = 'asc' | 'desc';

export function Dashboard() {
  const [search, setSearch] = useState({ company: '', eID: '', enterprise: '', serviceId: '' });
  const [sortKey, setSortKey] = useState<SortKey>('lastAiTime');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let data = dashboardData.filter(r => {
      if (search.company && !r.accountingCompany.includes(search.company)) return false;
      if (search.eID && !r.eID.includes(search.eID)) return false;
      if (search.enterprise && !r.companyName.includes(search.enterprise)) return false;
      if (search.serviceId && !r.serviceId.includes(search.serviceId)) return false;
      return true;
    });
    data = [...data].sort((a, b) => {
      const va = a[sortKey] as number | string;
      const vb = b[sortKey] as number | string;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
    return data;
  }, [search, sortKey, sortDir]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  // KPI
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const kpis = {
    total: dashboardData.length,
    avgFlow: avg(dashboardData.map(d => d.aiAccuracyFlow)),
    avgInvoice: avg(dashboardData.map(d => d.aiAccuracyInvoice)),
    below90: dashboardData.filter(d => d.aiAccuracyFlow < 90 || d.aiAccuracyInvoice < 90).length,
  };

  // Chart data (top 6)
  const chartData = dashboardData.slice(0, 6).map(d => ({
    name: d.accountingCompany.slice(0, 4),
    流水AI准确率: d.aiAccuracyFlow,
    发票AI准确率: d.aiAccuracyInvoice,
  }));

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="inline-flex flex-col ml-0.5 opacity-50">
      {sortKey === col ? (sortDir === 'asc' ? <ChevronUp size={12} className="opacity-100" /> : <ChevronDown size={12} className="opacity-100" />) : <ChevronDown size={12} />}
    </span>
  );

  const thClass = "px-3 py-2.5 text-left text-xs text-gray-500 font-medium whitespace-nowrap cursor-pointer hover:text-gray-700 select-none";
  const tdClass = "px-3 py-2.5 text-sm text-gray-700 whitespace-nowrap";

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">AI记账看板</h1>
        <p className="text-sm text-gray-500 mt-1">监控各企业AI记账推荐准确率，实时掌握模型表现</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900 font-semibold">{kpis.total}</div>
              <div className="text-xs text-gray-500 mt-0.5">监控企业数</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900 font-semibold">{kpis.avgFlow.toFixed(1)}%</div>
              <div className="text-xs text-gray-500 mt-0.5">平均流水AI准确率</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} className="text-purple-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900 font-semibold">{kpis.avgInvoice.toFixed(1)}%</div>
              <div className="text-xs text-gray-500 mt-0.5">平均发票AI准确率</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-orange-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900 font-semibold">{kpis.below90}</div>
              <div className="text-xs text-gray-500 mt-0.5">准确率低于90%企业</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="text-sm text-gray-700 font-medium mb-4">各代账公司AI准确率概览（前6家）</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} barSize={18} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="流水AI准确率" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="发票AI准确率" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            <Input className="pl-8 h-9 text-sm" placeholder="代账公司名称" value={search.company}
              onChange={e => { setSearch({ ...search, company: e.target.value }); setPage(1); }} />
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            <Input className="pl-8 h-9 text-sm" placeholder="代账公司eID" value={search.eID}
              onChange={e => { setSearch({ ...search, eID: e.target.value }); setPage(1); }} />
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            <Input className="pl-8 h-9 text-sm" placeholder="企业名称" value={search.enterprise}
              onChange={e => { setSearch({ ...search, enterprise: e.target.value }); setPage(1); }} />
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            <Input className="pl-8 h-9 text-sm" placeholder="服务ID" value={search.serviceId}
              onChange={e => { setSearch({ ...search, serviceId: e.target.value }); setPage(1); }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm text-gray-500">共 <b className="text-gray-700">{filtered.length}</b> 条记录</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className={thClass} onClick={() => toggleSort('accountingCompany')}>代账公司名称 <SortIcon col="accountingCompany" /></th>
                <th className={thClass} onClick={() => toggleSort('companyName')}>企业名称 <SortIcon col="companyName" /></th>
                <th className={thClass} onClick={() => toggleSort('aiSetsCount')}>AI账套数 <SortIcon col="aiSetsCount" /></th>
                <th className={thClass} onClick={() => toggleSort('aiAccuracyFlow')}>AI准确率-流水 <SortIcon col="aiAccuracyFlow" /></th>
                <th className={thClass} onClick={() => toggleSort('aiRuleAccuracyFlow')}>AI+规则准确率-流水 <SortIcon col="aiRuleAccuracyFlow" /></th>
                <th className={thClass} onClick={() => toggleSort('aiAccuracyInvoice')}>AI准确率-发票 <SortIcon col="aiAccuracyInvoice" /></th>
                <th className={thClass} onClick={() => toggleSort('aiRuleAccuracyInvoice')}>AI+规则准确率-发票 <SortIcon col="aiRuleAccuracyInvoice" /></th>
                <th className={thClass} onClick={() => toggleSort('flowRulesCount')}>近1月流水规则数 <SortIcon col="flowRulesCount" /></th>
                <th className={thClass} onClick={() => toggleSort('invoiceRulesCount')}>近1月发票规则数 <SortIcon col="invoiceRulesCount" /></th>
                <th className={thClass} onClick={() => toggleSort('lastAiTime')}>最后AI推荐时间 <SortIcon col="lastAiTime" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.map(row => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className={tdClass}>
                    <div className="font-medium text-gray-800">{row.accountingCompany}</div>
                    <div className="text-xs text-gray-400">{row.eID}</div>
                  </td>
                  <td className={tdClass}>{row.companyName}</td>
                  <td className={tdClass}>
                    <span className="inline-flex items-center justify-center min-w-[32px] h-6 bg-blue-50 text-blue-700 rounded text-xs font-medium px-2">
                      {row.aiSetsCount}
                    </span>
                  </td>
                  <td className={tdClass}><AccuracyBadge value={row.aiAccuracyFlow} /></td>
                  <td className={tdClass}><AccuracyBadge value={row.aiRuleAccuracyFlow} /></td>
                  <td className={tdClass}><AccuracyBadge value={row.aiAccuracyInvoice} /></td>
                  <td className={tdClass}><AccuracyBadge value={row.aiRuleAccuracyInvoice} /></td>
                  <td className={tdClass}>{row.flowRulesCount}</td>
                  <td className={tdClass}>{row.invoiceRulesCount}</td>
                  <td className={tdClass}><span className="text-gray-500 text-xs">{row.lastAiTime}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </div>
  );
}
