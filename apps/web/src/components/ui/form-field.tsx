export const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black placeholder-gray-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export const labelClass =
  'block text-xs font-semibold uppercase tracking-wide text-black mb-1';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
