import { useStore } from '../../store/useStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthFilter() {
  const { selectedMonth, setSelectedMonth } = useStore();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const handlePrevious = () => {
    if (selectedMonth === null) {
      setSelectedMonth(currentMonth);
    } else {
      setSelectedMonth(selectedMonth > 0 ? selectedMonth - 1 : 11);
    }
  };

  const handleNext = () => {
    if (selectedMonth === null) {
      setSelectedMonth(currentMonth);
    } else {
      setSelectedMonth(selectedMonth < 11 ? selectedMonth + 1 : 0);
    }
  };

  const handleMonthSelect = (month: number) => {
    if (selectedMonth === month) return;
    setSelectedMonth(month);
  };

  const displayMonth = selectedMonth !== null ? selectedMonth : currentMonth;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrevious}
        className="p-2 hover:bg-accent rounded-lg transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        <select
          value={displayMonth}
          onChange={(e) => handleMonthSelect(parseInt(e.target.value))}
          className="bg-background border border-input rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          {currentDate.getFullYear()}
        </span>
      </div>

      <button
        onClick={handleNext}
        className="p-2 hover:bg-accent rounded-lg transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {selectedMonth !== null && (
        <button
          onClick={() => setSelectedMonth(null)}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
