'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLead, useUpdateLead, useDeleteLead, useComments, useAddComment } from '@/lib/hooks/use-lead';
import { Spinner } from '@/components/spinner';
import { ErrorMessage } from '@/components/error-message';
import { LeadDetailCard } from '@/components/leads/lead-detail-card';
import { LeadComments } from '@/components/leads/lead-comments';

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  const { data: lead, isLoading, isError, error } = useLead(id);
  const { data: comments = [], isLoading: loadingComments } = useComments(id);

  const updateLead = useUpdateLead(id, () => setEditing(false));
  const deleteLead = useDeleteLead(id, () => router.push('/leads'));
  const addComment = useAddComment(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <ErrorMessage message={error instanceof Error ? error.message : 'Failed to load lead'} />
          <Link href="/leads" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Back to leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/leads" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          Back to leads
        </Link>

        {deleteLead.isError && (
          <ErrorMessage message={deleteLead.error instanceof Error ? deleteLead.error.message : 'Failed to delete'} />
        )}

        <LeadDetailCard
          lead={lead}
          editing={editing}
          deleting={deleteLead.isPending}
          onToggleEdit={() => setEditing((v) => !v)}
          onUpdate={(data) => updateLead.mutateAsync(data)}
          onDelete={() => {
            if (confirm('Delete this lead? This cannot be undone.')) {
              deleteLead.mutate();
            }
          }}
        />

        <LeadComments
          comments={comments}
          loading={loadingComments}
          onAdd={(text) => addComment.mutateAsync(text)}
        />
      </div>
    </div>
  );
}
