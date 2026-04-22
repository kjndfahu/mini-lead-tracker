'use client';

import { useState } from 'react';
import type { Comment } from '@/lib/types';
import { Spinner } from '@/components/spinner';
import { ErrorMessage } from '@/components/error-message';

interface LeadCommentsProps {
  comments: Comment[];
  loading: boolean;
  onAdd: (text: string) => Promise<unknown>;
}

export function LeadComments({ comments, loading, onAdd }: LeadCommentsProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) { setError('Comment cannot be empty'); return; }
    if (text.length > 500) { setError('Max 500 characters'); return; }
    setError('');
    setSubmitting(true);
    try {
      await onAdd(text.trim());
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        {error && <div className="mb-2"><ErrorMessage message={error} /></div>}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Add a comment..."
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">{text.length}/500</span>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {submitting && <Spinner className="h-4 w-4" />}
            Add Comment
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-6">
          <Spinner className="h-6 w-6 text-blue-600" />
        </div>
      ) : comments.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">No comments yet</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="whitespace-pre-wrap text-sm text-gray-800">{c.text}</p>
              <p className="mt-1 text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
