import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { VoucherEntry } from '../types';

interface VoucherDisplayProps {
  entries: VoucherEntry[];
  maxRows?: number;
}

export function VoucherDisplay({ entries, maxRows = 2 }: VoucherDisplayProps) {
  if (!entries || entries.length === 0) {
    return <span className="text-gray-400 text-xs">—</span>;
  }

  const displayEntries = entries.slice(0, maxRows);
  const hasMore = entries.length > maxRows;

  const EntryRow = ({ entry, dark = false }: { entry: VoucherEntry; dark?: boolean }) => (
    <div className="flex items-center gap-1 text-xs py-0.5">
      <span className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded text-[10px] font-semibold flex-shrink-0
        ${entry.direction === '借'
          ? (dark ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-50 text-blue-600')
          : (dark ? 'bg-orange-500/30 text-orange-300' : 'bg-orange-50 text-orange-600')
        }`}>
        {entry.direction}
      </span>
      <span className={dark ? 'text-gray-300' : 'text-gray-700'}>
        {entry.accountCode && <span className={dark ? 'text-gray-400' : 'text-gray-400'}>{entry.accountCode} </span>}
        {entry.accountName}
      </span>
    </div>
  );

  const content = (
    <div>
      {displayEntries.map((entry) => (
        <EntryRow key={entry.id} entry={entry} />
      ))}
      {hasMore && (
        <div className="text-[11px] text-blue-500 mt-0.5 cursor-pointer">
          +{entries.length - maxRows}行分录...
        </div>
      )}
    </div>
  );

  if (!hasMore) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">{content}</div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 border-gray-700 p-3 max-w-[280px]">
          <div className="text-[11px] text-gray-400 mb-2">完整凭证分录</div>
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} dark />
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
