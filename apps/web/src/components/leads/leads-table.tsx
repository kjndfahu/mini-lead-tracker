import Link from 'next/link';
import type { Lead } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/format';
import { StatusBadge } from '@/components/status-badge';

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
            <th className="hidden px-4 py-3 text-left font-medium text-gray-600 sm:table-cell">Company</th>
            <th className="hidden px-4 py-3 text-left font-medium text-gray-600 md:table-cell">Email</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
            <th className="hidden px-4 py-3 text-right font-medium text-gray-600 sm:table-cell">Value</th>
            <th className="hidden px-4 py-3 text-left font-medium text-gray-600 lg:table-cell">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="transition-colors hover:bg-gray-50">
              <td className="px-4 py-3">
                <Link href={`/leads/${lead.id}`} className="font-medium text-blue-600 hover:underline">
                  {lead.name}
                </Link>
              </td>
              <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{lead.company ?? '—'}</td>
              <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{lead.email ?? '—'}</td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="hidden px-4 py-3 text-right text-gray-600 sm:table-cell">
                {formatCurrency(lead.value)}
              </td>
              <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">
                {formatDate(lead.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
