'use client';

import { createContext, useActionState, useContext, type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import type { ActionState } from '@/lib/validation';

const FormCtx = createContext<ActionState>(null);

/** Formulaire relié à une Server Action : états chargement / succès / erreur, anti double soumission. */
export function ActionForm({
  action,
  children,
  className,
  resetOnSuccess = false,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction] = useActionState(action, null);
  return (
    <FormCtx.Provider value={state}>
      <form
        action={formAction}
        className={className}
        noValidate
        key={resetOnSuccess && state?.ok ? 'reset-' + (state.message ?? '') : undefined}
      >
        <FormMessage />
        {children}
      </form>
    </FormCtx.Provider>
  );
}

export function FormMessage() {
  const state = useContext(FormCtx);
  if (!state) return null;
  if (state.error) return <div role="alert" className="alert alert-error">{state.error}</div>;
  if (state.ok) return <div role="status" className="alert alert-ok">{state.message ?? 'Enregistré.'}</div>;
  return null;
}

export function SubmitButton({ children, className = 'btn btn-primary', pendingLabel = 'Envoi en cours…' }: { children: ReactNode; className?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  defaultValue?: string | number;
  placeholder?: string;
  autoComplete?: string;
  min?: string | number;
  max?: string | number;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel';
  maxLength?: number;
  dir?: 'rtl' | 'ltr';
}

export function Field({ name, label, type = 'text', required, hint, ...rest }: FieldProps) {
  const state = useContext(FormCtx);
  const err = state?.fieldErrors?.[name];
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <input id={name} name={name} type={type} required={required} className="input" aria-invalid={err ? true : undefined}
        aria-describedby={[hint ? `${name}-hint` : '', err ? `${name}-err` : ''].filter(Boolean).join(' ') || undefined} {...rest} />
      {hint ? <span id={`${name}-hint`} className="hint">{hint}</span> : null}
      {err ? <span id={`${name}-err`} className="field-error">{err}</span> : null}
    </div>
  );
}

export function TextArea({ name, label, required, hint, defaultValue, rows = 5, maxLength, dir }: { name: string; label: string; required?: boolean; hint?: string; defaultValue?: string; rows?: number; maxLength?: number; dir?: 'rtl' | 'ltr' }) {
  const state = useContext(FormCtx);
  const err = state?.fieldErrors?.[name];
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <textarea id={name} name={name} rows={rows} required={required} className="textarea" defaultValue={defaultValue} maxLength={maxLength} dir={dir}
        aria-invalid={err ? true : undefined} aria-describedby={err ? `${name}-err` : undefined} />
      {hint ? <span className="hint">{hint}</span> : null}
      {err ? <span id={`${name}-err`} className="field-error">{err}</span> : null}
    </div>
  );
}

export function Select({ name, label, options, required, defaultValue, hint }: { name: string; label: string; options: Array<{ value: string; label: string }>; required?: boolean; defaultValue?: string; hint?: string }) {
  const state = useContext(FormCtx);
  const err = state?.fieldErrors?.[name];
  return (
    <div className="field">
      <label htmlFor={name}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <select id={name} name={name} required={required} className="select" defaultValue={defaultValue ?? ''} aria-invalid={err ? true : undefined}>
        {!required || !defaultValue ? <option value="">{required ? '— Choisir —' : '— Aucun —'}</option> : null}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint ? <span className="hint">{hint}</span> : null}
      {err ? <span id={`${name}-err`} className="field-error">{err}</span> : null}
    </div>
  );
}

export function Checkbox({ name, label, required, defaultChecked }: { name: string; label: ReactNode; required?: boolean; defaultChecked?: boolean }) {
  const state = useContext(FormCtx);
  const err = state?.fieldErrors?.[name];
  return (
    <div className="field">
      <label className="flex items-start gap-2 font-normal" htmlFor={name}>
        <input id={name} name={name} type="checkbox" required={required} defaultChecked={defaultChecked} className="mt-1 h-5 w-5 accent-[#405C43]" aria-invalid={err ? true : undefined} />
        <span>{label}</span>
      </label>
      {err ? <span className="field-error">{err}</span> : null}
    </div>
  );
}
