interface LeadsHeaderProps {
  total: number;
  onNewLead: () => void;
}

export function LeadsHeader({ total, onNewLead }: LeadsHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="mt-0.5 text-sm text-gray-500">{total} total</p>
      </div>
      <button
        onClick={onNewLead}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
      >
        + New Lead
      </button>
    </div>
  );
}
