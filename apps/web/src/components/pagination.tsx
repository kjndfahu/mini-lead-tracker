'use client';

interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

type PageItem = number | '...';

function buildPages(page: number, totalPages: number): PageItem[] {
  const pages: PageItem[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      const last = pages[pages.length - 1];
      if (typeof last === 'number' && last < p - 1) pages.push('...');
      pages.push(p);
    }
  }
  return pages;
}

export function Pagination({ page, total, limit, onChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);

  return (
    <div className="flex items-center justify-between text-sm text-gray-900">
      <span>
        {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="rounded border border-gray-300 px-3 py-1 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ←
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 py-1">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`rounded border px-3 py-1 transition-colors ${
                p === page
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="rounded border border-gray-300 px-3 py-1 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}
