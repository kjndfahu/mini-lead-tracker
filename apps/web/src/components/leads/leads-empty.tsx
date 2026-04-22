interface LeadsEmptyProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function LeadsEmpty({ hasFilters, onClearFilters }: LeadsEmptyProps) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
      <p className="text-gray-500">No leads found</p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
