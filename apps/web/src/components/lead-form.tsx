'use client';

import { useState } from 'react';
import { leadSchema } from '@/lib/schemas';
import type { Lead, CreateLeadData, LeadStatus } from '@/lib/types';
import { ALL_STATUSES, STATUS_LABELS } from '@/lib/constants';
import { Spinner } from './spinner';
import { FormField } from './ui/form-field';
import { FormInput } from './ui/form-input';
import { FormSelect } from './ui/form-select';
import { FormTextarea } from './ui/form-textarea';

interface Props {
  initial?: Partial<Lead>;
  onSubmit: (data: CreateLeadData) => Promise<unknown>;
  submitLabel?: string;
}

type FieldErrors = Partial<Record<string, string>>;

export function LeadForm({ initial, onSubmit, submitLabel = 'Save' }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    email: initial?.email ?? '',
    company: initial?.company ?? '',
    status: (initial?.status ?? 'NEW') as LeadStatus,
    value: initial?.value != null ? String(initial.value) : '',
    notes: initial?.notes ?? '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');

    const parsed = leadSchema.safeParse({
      name: form.name.trim(),
      email: form.email.trim() || undefined,
      company: form.company.trim() || undefined,
      status: form.status,
      value: form.value !== '' ? Number(form.value) : undefined,
      notes: form.notes.trim() || undefined,
    });

    if (!parsed.success) {
      const errors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(parsed.data as CreateLeadData);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <FormField label="Name" required error={fieldErrors.name}>
        <FormInput
          type="text"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          error={fieldErrors.name}
          placeholder="John Doe"
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Email" error={fieldErrors.email}>
          <FormInput
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            error={fieldErrors.email}
            placeholder="john@example.com"
          />
        </FormField>
        <FormField label="Company">
          <FormInput
            type="text"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            placeholder="Acme Inc."
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Status">
          <FormSelect value={form.status} onChange={(e) => set('status', e.target.value)}>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </FormSelect>
        </FormField>
        <FormField label="Value ($)" error={fieldErrors.value}>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            value={form.value}
            onChange={(e) => set('value', e.target.value)}
            error={fieldErrors.value}
            placeholder="0.00"
          />
        </FormField>
      </div>

      <FormField label="Notes" error={fieldErrors.notes}>
        <FormTextarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          error={fieldErrors.notes}
          rows={3}
          placeholder="Any additional notes..."
        />
      </FormField>

      <div className="flex items-center justify-end pt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading && <Spinner className="h-4 w-4" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
