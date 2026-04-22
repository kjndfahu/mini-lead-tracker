import type { LeadStatus } from '@/lib/types';
import { ALL_STATUSES, STATUS_LABELS } from '@/lib/constants';

interface LeadsFiltersProps {
  search: string;
  status: LeadStatus | '';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeadStatus | '') => void;
}

export function LeadsFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: LeadsFiltersProps) {
  const inputClass =
    'rounded-lg cursor-pointer border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name, email, company..."
        className={`flex-1 ${inputClass}`}
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as LeadStatus | '')}
        className={inputClass}
      >
        <option value="">All statuses</option>
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
