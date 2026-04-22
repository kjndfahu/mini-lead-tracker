import { inputClass } from './form-field';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <input
      {...props}
      className={`${inputClass} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${className}`}
    />
  );
}
