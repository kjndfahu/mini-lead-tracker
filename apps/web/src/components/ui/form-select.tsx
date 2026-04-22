import { inputClass } from './form-field';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function FormSelect({ children, className = '', ...props }: FormSelectProps) {
  return (
    <select {...props} className={`${inputClass} ${className}`}>
      {children}
    </select>
  );
}
