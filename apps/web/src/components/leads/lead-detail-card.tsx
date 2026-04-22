import type { Lead, UpdateLeadData } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/format';
import { StatusBadge } from '@/components/status-badge';
import { Spinner } from '@/components/spinner';
import { LeadForm } from '@/components/lead-form';

interface LeadDetailCardProps {
  lead: Lead;
  editing: boolean;
  deleting: boolean;
  onToggleEdit: () => void;
  onUpdate: (data: UpdateLeadData) => Promise<unknown>;
  onDelete: () => void;
}

export function LeadDetailCard({
  lead,
  editing,
  deleting,
  onToggleEdit,
  onUpdate,
  onDelete,
}: LeadDetailCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{lead.name}</h1>
          {lead.company && <p className="text-sm text-gray-500">{lead.company}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={lead.status} />
          <button
            onClick={onToggleEdit}
            className="rounded-lg cursor-pointer border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="flex items-center gap-1 cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
          >
            {deleting && <Spinner className="h-3 w-3" />}
            Delete
          </button>
        </div>
      </div>

      {editing ? (
        <LeadForm initial={lead} onSubmit={onUpdate} submitLabel="Save Changes" />
      ) : (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{lead.email ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Value</dt>
            <dd className="font-medium text-gray-900">{formatCurrency(lead.value)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Created</dt>
            <dd className="font-medium text-gray-900">{formatDate(lead.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Updated</dt>
            <dd className="font-medium text-gray-900">{formatDate(lead.updatedAt)}</dd>
          </div>
          {lead.notes && (
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-gray-500">Notes</dt>
              <dd className="mt-0.5 whitespace-pre-wrap font-medium text-gray-900">{lead.notes}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
