import { inputClass } from './form-field';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function FormTextarea({ error, className = '', ...props }: FormTextareaProps) {
  return (
    <textarea
      {...props}
      className={`${inputClass} resize-none ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${className}`}
    />
  );
}
