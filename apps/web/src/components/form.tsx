import { cn } from '@/lib/utils';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormField({ className, children, ...props }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  );
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export function FormLabel({
  className,
  children,
  required,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-slate-200',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-rose-400">*</span>}
    </label>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FormInput({ className, ...props }: FormInputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition',
        'focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30',
        'disabled:bg-slate-950/40 disabled:text-slate-500',
        className
      )}
      {...props}
    />
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function FormTextarea({ className, ...props }: FormTextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition',
        'focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30',
        'disabled:bg-slate-950/40 disabled:text-slate-500',
        className
      )}
      {...props}
    />
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function FormSelect({ className, children, ...props }: FormSelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition',
        'focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30',
        'disabled:bg-slate-950/40 disabled:text-slate-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function FormError({ className, children, ...props }: FormErrorProps) {
  return (
    <p className={cn('text-sm text-rose-400', className)} {...props}>
      {children}
    </p>
  );
}

interface FormHelperProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function FormHelper({ className, children, ...props }: FormHelperProps) {
  return (
    <p className={cn('text-xs text-slate-400', className)} {...props}>
      {children}
    </p>
  );
}
