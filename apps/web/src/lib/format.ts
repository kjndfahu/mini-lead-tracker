export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString();
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '—';
  return Number(value).toLocaleString();
}
