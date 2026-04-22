'use client';

import { useState } from 'react';
import type { LeadStatus, LeadsQuery } from '@/lib/types';
import { useLeads, useCreateLead } from '@/lib/hooks/use-leads';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { Spinner } from '@/components/spinner';
import { ErrorMessage } from '@/components/error-message';
import { Pagination } from '@/components/pagination';
import { LeadForm } from '@/components/lead-form';
import { Modal } from '@/components/modal';
import { LeadsHeader } from '@/components/leads/leads-header';
import { LeadsFilters } from '@/components/leads/leads-filters';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadsEmpty } from '@/components/leads/leads-empty';

const LIMIT = 10;

export default function LeadsPage() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [query, setQuery] = useState<LeadsQuery>({
    status: '',
    sort: 'createdAt',
    order: 'desc',
    page: 1,
    limit: LIMIT,
  });

  const debouncedQuery = { ...query, q: debouncedSearch };
  const { data, isLoading, isError, error } = useLeads(debouncedQuery);
  const createLead = useCreateLead(() => setShowForm(false));

  const leads = data?.data ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <LeadsHeader total={total} onNewLead={() => setShowForm(true)} />

        {showForm && (
          <Modal title="New Lead" onClose={() => setShowForm(false)}>
            <LeadForm
              onSubmit={(data) => createLead.mutateAsync(data)}
              submitLabel="Create Lead"
            />
          </Modal>
        )}

        <LeadsFilters
          search={search}
          status={query.status as LeadStatus | ''}
          onSearchChange={(q) => { setSearch(q); setQuery((prev) => ({ ...prev, page: 1 })); }}
          onStatusChange={(status) => setQuery((prev) => ({ ...prev, status, page: 1 }))}
        />

        {isError && <ErrorMessage message={error instanceof Error ? error.message : 'Failed to load leads'} />}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner className="h-8 w-8 text-blue-600" />
          </div>
        ) : leads.length === 0 ? (
          <LeadsEmpty
            hasFilters={!!(search || query.status)}
            onClearFilters={() => { setSearch(''); setQuery((p) => ({ ...p, status: '', page: 1 })); }}
          />
        ) : (
          <>
            <LeadsTable leads={leads} />
            <div className="mt-4">
              <Pagination
                page={query.page ?? 1}
                total={total}
                limit={LIMIT}
                onChange={(page) => setQuery((prev) => ({ ...prev, page }))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
