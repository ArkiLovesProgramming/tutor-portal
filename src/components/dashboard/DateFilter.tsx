import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';

export function DateFilter() {
  const { dateRange, setDateRange } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const hasDateRange = !!(dateRange.from && dateRange.to);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      from: e.target.value ? new Date(e.target.value) : undefined
    });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      to: e.target.value ? new Date(e.target.value) : undefined
    });
  };

  const handleClear = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-background border rounded-lg",
          "hover:bg-accent transition-colors",
          hasDateRange && "border-primary"
        )}
      >
        <CalendarIcon className="w-4 h-4" />
        <span className="text-sm">
          {hasDateRange ? (
            <>
              {format(dateRange.from!, 'MMM d')} - {format(dateRange.to!, 'MMM d')}
            </>
          ) : (
            'Select dates'
          )}
        </span>
        {hasDateRange && (
          <X
            className="w-3 h-3 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 p-4 bg-card border border-border rounded-xl shadow-lg z-20 min-w-[280px]">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  From
                </label>
                <input
                  type="date"
                  value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                  onChange={handleFromChange}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  To
                </label>
                <input
                  type="date"
                  value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                  onChange={handleToChange}
                  min={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm"
                />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
